// Server actions for creating, updating, deleting assignments

'use server';

import { Section, Assignment, Submission, SectionIdSql, AssignmentSql} from '@/app/lib/definitions'
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import AssignmentsTable from '../ui/assignments/table';
import { CleverDataFetcher, fetchAssignmentById, fetchSectionByAssignmentId } from './clever';

const token = process.env.DAC_TOKEN;

const FormSchema = z.object({
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
    submission_types: z.string().array()
});

const UpdateFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    dueDate: z.coerce.date(),
    points_possible: z.coerce.number(),
    submission_types: z.string().array()
});

const CreateAssignment = FormSchema
const UpdateAssignment = UpdateFormSchema

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        dueDate?: string[];
        points_possible?: string[];
        submission_types?: Array<String>;
    }
    message?: string | null;
}

export async function createAssignment(section_id: string, prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateAssignment.safeParse({
        title: formData.get('title'),
        description: "First Assignment",
        dueDate: formData.get('dueDate'),
        points_possible: 100,
        submission_types: ['link']
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to Create Assignment.',
        };
    }
    const { title, description, dueDate, points_possible, submission_types } = validatedFields.data;
    const due_date = new Date(dueDate);
    const attachments = [
        {  
            "url": "http://localhost:3000/assignment",  
            "type": "link",  
            "title": "Math Homework",  
            "description": "A sample of math problems"  
        }
    ]

    // POST form data to Clever API to create new assignment for section
    const response = await fetch(`https://api.clever.com/v3.1/sections/${section_id}/assignments`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, attachments, description, due_date, points_possible, submission_types })
    });
    const data = await response.json();
    console.log(data)
    const assignment = Object.assign(new Assignment(data.data), response.json)

    if (response.status !== 200) {
        throw new Error(data.message)
    }
    else console.log(`Created assignment succesfully. id: ${assignment.id} section id: ${section_id} title: ${title}`)

    // insert database record for assignment
    try {
        await sql`
        INSERT INTO assignments (id, section_id, title)
        VALUES (${assignment.id}, ${section_id}, ${title})
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to save assignment.'}
    }
        revalidatePath('/dashboard/sections/' + section_id + '/assignments');
        redirect('/dashboard/sections/' + section_id + '/assignments');
}

export async function updateAssignment(section_id: string, id: string, prevState: State, formData: FormData) {

    const validatedFields = UpdateAssignment.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        points_possible: formData.get('points_possible'),
        submission_types: ['link']
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to Update Assignment.',
        };
    }

    const { title, description, dueDate, points_possible } = validatedFields.data;
    const due_date = new Date(dueDate);

    
    //const sectionId = fetchSectionByAssignmentId(Assignment.id)
    //console.log(sectionId)

    const response = await fetch(`https://api.clever.com/v3.1/sections/${section_id}/assignments/${id}`, {
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

//TODO: still need to test and tweak
export async function deleteAssignment(id: string) {
    const section_id = await fetchSectionByAssignmentId(id);

    console.log(section_id.section_id)

    const response = await fetch(`https://api.clever.com/v3.1/sections/${section_id.section_id}/assignments/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });




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

const SubmissionSchema = z.object({
    type: z.literal('link'),
    title: z.literal('Homework'),
    description: z.literal('Homework Submission'),
    URL: z
        .string()
        .min(1, { message: 'Please provide a submission link.'}),
});

const UpdateSubmission = SubmissionSchema

//hard coding the values for now - ideally this function would be similar to the updateAssignment function above
export async function updateSubmission(prevState: State, formData: FormData, section: string) {
    console.log(prevState);
    const userId = prevState.message.user_id;
    const section_id = prevState.message.section;
    const assignmentId = prevState.message.id;
    
    const validatedFields = UpdateSubmission.safeParse({
        type: "link",
        title: "Homework",
        description: "Homework Submission",
        URL: formData.get("URL")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update Submission.',
        };
    }

    const attachments = [validatedFields.data]
    const grade_points = 95.0
    console.log(attachments)

    const response = await fetch(`https://api.clever.com/v3.1/sections/${section_id}/assignments/${assignmentId}/submissions/${userId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grade_points
        })
    });

    const new_response = await fetch(`https://api.clever.com/v3.1/sections/${section_id}/assignments/${assignmentId}/submissions/${userId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            attachments
        })
    });
    
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data.message)
    }
    else console.log ('Submission successfully updated.')

    revalidatePath(`/dashboard/sections/${section_id}/assignments`);
    redirect(`/dashboard/sections/${section_id}/assignments`);
}

export async function login() {

    redirect(`https://dev.clever.com/docs/oauth-implementation`);
  }