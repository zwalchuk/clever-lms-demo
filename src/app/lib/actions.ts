// Server actions for creating, updating, deleting assignments

'use server';

import { Section, Assignment, Submission} from '@/app/lib/definitions'
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CleverDataFetcher, fetchSections } from './clever';

const FormSchema = z.object({
    section_id: z.string({
        invalid_type_error: 'Please select a section.',
    }),
    title: z.string({
        invalid_type_error: 'Please enter a title.',
    }),
    dueDate: z.date(),
    assigneeMode: z.enum(['all', 'individials'], {
        invalid_type_error: 'Please select an assignee mode.'
    }),
    pointsPossible: z.coerce
        .number()
        .gt(0, {message: 'Please enter an amount greater than 0.'}),
    submissionTypes: z.enum(['Link', 'File', 'Text', 'Discussion'], {
        invalid_type_error: 'Accepted values: Link, File, Text, or Discussion.'
    }),
});

const CreateAssignment = FormSchema
const UpdateAssignment = FormSchema.omit({ title: true, assignees: true, points_possible: true, due_date: true });

export type State = {
    errors?: {
        section_id?: string[];
        title?: string[];
        dueDate?: Date[];
        assigneeMode?: string[];
        pointsPossible?: string[];
        submissionTypes?: string[];
    }
    message?: string | null;
}

export async function createAssignment(prevState: State, formData: FormData) {
    
    // Validate form fields using Zod
    const validatedFields = CreateAssignment.safeParse({
        section_id: formData.get('section_id'),
        title: formData.get('title'),
        dueDate: formData.get('dueDate'),
        assigneeMode: formData.get('assigneeMode'),
        pointsPossible: formData.get('pointsPossible'),
        submissionTypes: formData.get('submissionTypes'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to Create Assignment.',
        };
    }
    
    const { section_id, title, dueDate, assigneeMode, pointsPossible, submissionTypes } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    // POST form data to Clever API to create new assignment for section
    const response = await fetch(`https://api.clever.com/v3.1/sections/${section_id}/assignments`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer' + process.env.DAC_TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, dueDate, assigneeMode, pointsPossible, submissionTypes })
    });
    const data = await response.json();
    const assignment: Assignment = data;

    const id = assignment.id

    console.log(`Create assignment function complete...make a GET request using assignment id: ${assignment.id} and section id: ${section_id} to confirm successful POST.`)

    // insert database record for assignment
    await sql`
        INSERT INTO assignments (id, section_id)
        VALUES (${id}, ${section_id})
        `;

        revalidatePath('/dashboard/assignments');
        redirect('/dashboard/assignments');
}

export async function deleteAssignment(id: string) {
    try {
        await sql`
        DELETE FROM assignments
        WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to delete assignment.'}
    }

    revalidatePath('/dashboard/assignments');
}