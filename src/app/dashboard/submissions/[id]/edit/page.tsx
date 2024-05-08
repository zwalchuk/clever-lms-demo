import Breadcrumbs from "@/app/ui/assignments/breadcrumbs";
import { CleverDataFetcher } from "@/app/lib/clever";
import { Submission } from "@/app/lib/definitions";
import Form from "@/app/ui/submissions/edit-form";

export default async function Page({ params }: {params: {id:string} }) {
    const id = params.id;

    //hard coding these values to save time
    const fetcher = new CleverDataFetcher
    const submission = await fetcher.getUserSubmission('657b35c16a1a3e5c217dcd67', 'f7696d7a-d8f3-492f-ab99-64a3c300d12e', '657b35c16a1a3e5c217dcd30')

    return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Submissions', href: '/dashboard/submissions' },
              {
                label: 'Edit Submission',
                href: `/dashboard/submissions/${id}`,
                active: true,
              },
            ]}
          />
          <Form submission={submission} />
        </main>
      );
}