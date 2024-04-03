'use server';

import { Section, Assignment, Submission} from '@/app/lib/definitions'
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
    title: z.string(),
    section_id: z.string(),
    state: z.string(),
    points_possible: z.coerce.number(),
    due_date: z.string(),
});

//const CreateAssignment = FormSchema.omit({ title: true, state: true, points_possible: true, due_date: true });
const CreateAssignment = FormSchema
const UpdateAssignment = FormSchema.omit({ title: true, state: true, points_possible: true, due_date: true });

export async function createAssignment(formData: FormData) {
    
    const date = new Date().toISOString().split('T')[0];

    // POST form data to Clever API to create new assignment for section
    const { title, section_id, state, points_possible, due_date } = CreateAssignment.parse({
        title: formData.get('title'),
        section_id: formData.get('section_id'),
        state: formData.get('state'),
        points_possible: formData.get('points_possible'),
        due_date: formData.get('due_date'),
    })

    const response = await fetch(`https://api.clever.com/v3.1/sections/${section_id}/assignments`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer' + process.env.DAC_TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, state, points_possible, due_date})
    });
    const data = await response.json();
    const assignment: Assignment = data;

    const id = assignment.id

    console.log(assignment.id, section_id)

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