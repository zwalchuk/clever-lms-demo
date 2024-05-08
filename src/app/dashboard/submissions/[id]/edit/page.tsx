import Breadcrumbs from "@/app/ui/assignments/breadcrumbs";
import { CleverDataFetcher, fetchAssignmentById, fetchSectionByAssignmentId } from "@/app/lib/clever";
import { Submission } from "@/app/lib/definitions";
import Form from "@/app/ui/assignments/edit-form";

export default async function Page({ params }: {params: {id:string} }) {
    const id = params.id;
    const assignment = await fetchAssignmentById(id);
    const section = await fetchSectionByAssignmentId(id);

    const fetcher = new CleverDataFetcher
    const submission = await fetcher.getSubmission('657b35c16a1a3e5c217dcd67', 'f7696d7a-d8f3-492f-ab99-64a3c300d12e', '657b35c16a1a3e5c217dcd30')

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
          <Form submission={submission} section={section} />
        </main>
      );
}