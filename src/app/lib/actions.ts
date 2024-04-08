// Server actions for creating, updating, deleting assignments

'use server';

import { Section, Assignment, Submission, SectionIdSql} from '@/app/lib/definitions'
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import AssignmentsTable from '../ui/assignments/table';
import { CleverDataFetcher, fetchAssignmentById, fetchSectionByAssignmentId } from './clever';

const token = process.env.DAC_TOKEN;

const FormSchema = z.object({
    section_id: z
        .string()
        .min(1, { message: 'Please enter a section id.' }),
    title: z
        .string()
        .min(1, { message: 'Please provide a title.' }),
    description: z
        .string()
        .min(1, { message: 'Please provide a description.'}),
    dueDate: z.coerce.date(),
    points_possible: z.coerce
        .number()
        .gt(0, {message: 'Please enter an amount greater than 0.'}),
    /*submission_types: z.enum(['link', 'file', 'text', 'discussion'], {
        invalid_type_error: 'Please select a submission type.',
    }),*/
});

const CreateAssignment = FormSchema
const UpdateAssignment = FormSchema

export type State = {
    errors?: {
        section_id?: string[];
        title?: string[];
        description?: string[];
        dueDate?: string[];
        points_possible?: string[];
        //submission_types?: Array<String>;
    }
    message?: string | null;
}

export async function createAssignment(prevState: State, formData: FormData) {
    
    // Validate form fields using Zod
    const validatedFields = CreateAssignment.safeParse({
        section_id: formData.get('section_id'),
        title: formData.get('title'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        points_possible: formData.get('points_possible'),
        //submission_types: formData.get('submission_types'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to Create Assignment.',
        };
    }
    
    const { section_id, title, description, dueDate, points_possible } = validatedFields.data;
    const due_date = new Date(dueDate);

    // POST form data to Clever API to create new assignment for section
    const response = await fetch(`https://api.clever.com/v3.1/sections/${section_id}/assignments`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, due_date, points_possible })
    });
    const data = await response.json();
    const assignment = Object.assign(new Assignment(data.data), response.json)

    if (response.status !== 200) {
        throw new Error(data.message)
    }
    else console.log(`Create assignment complete...make a GET request using assignment id: ${assignment.id} and section id: ${section_id} to confirm successful POST.`)

    // insert database record for assignment
    try {
        await sql`
        INSERT INTO assignments (id, section_id)
        VALUES (${assignment.id}, ${section_id})
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to save assignment.'}
    }
        revalidatePath('/dashboard/assignments');
        redirect('/dashboard/assignments');
}

export async function updateAssignment(
    id: string,
    prevState: State,
    formData: FormData,
) {
    console.log(id);
    const assignment = await fetchAssignmentById(id);
    const section = await fetchSectionByAssignmentId(id);

    console.log(section);
    const fetcher = new CleverDataFetcher;
    const assignmentData = await fetcher.getAssignment(section, id);
    console.log(assignmentData);
    
    const validatedFields = UpdateAssignment.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        points_possible: formData.get('points_possible'),
        //submission_types: formData.get('submission_types'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to Update Assignment.',
        };
    }

    const { title, description, dueDate, points_possible } = validatedFields.data;
    const due_date = new Date(dueDate);

    const response = await fetch(`https://api.clever.com/v3.1/sections/${section.section_id}/assignments/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, due_date, points_possible })
    });
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data.message)
    }
    else console.log('Successfully updated assignment')

    revalidatePath('/dashboard/assignments');
    redirect('/dashboard/assignments');

}

//TODO: need to add Clever API delete function
export async function deleteAssignment(id: string) {
    const section_id = await fetchSectionByAssignmentId(id);
    const response = await fetch(`https://api.clever.com/v3.1/sections/${section_id}/assignments/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data.message)
    }
    else console.log('Assignment successfully deleted.')

    try {
        await sql`
        DELETE FROM assignments
        WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to delete assignment from SQL database.'}
    }

    revalidatePath('/dashboard/assignments');
}