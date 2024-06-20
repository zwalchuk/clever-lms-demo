import Breadcrumbs from "@/app/ui/assignments/breadcrumbs";
import { CleverDataFetcher, fetchSectionByAssignmentId} from "@/app/lib/clever";
import { Submission } from "@/app/lib/definitions";
import Form from "@/app/ui/submissions/edit-form";

export default async function Page({ params }: {params: {id: string, user_id:string, sectionID: string} }) {
    const user_id = params.user_id;
    const id = params.id;
    const section = params.sectionID;


    //hard coding these values to save time
    const fetcher = new CleverDataFetcher
    const submission = await fetcher.getUserSubmission(section, id, user_id)

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
          <Form submission={submission} section={section} id={id} />
        </main>
      );
}