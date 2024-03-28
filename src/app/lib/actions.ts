'use server';

import { Section, Assignment, Submission} from '@/app/lib/definitions'
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    assignee: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateAssignment = FormSchema.omit({ id: true, date: true });
const UpdateAssignment = FormSchema.omit({ id: true, date: true });

export async function createAssignment(formData: FormData) {
    const { id, amount, status } = CreateAssignment.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;

        revalidatePath('/dashboard/invoices');
        redirect('/dashboard/invoices');
}