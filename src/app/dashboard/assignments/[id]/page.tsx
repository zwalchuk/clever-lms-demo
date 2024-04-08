import Breadcrumbs from "@/app/ui/assignments/breadcrumbs";
import { CleverDataFetcher, fetchAssignmentById, fetchSectionByAssignmentId, fetchSections } from "@/app/lib/clever";
import { CreateSubmission } from "@/app/ui/assignments/buttons";
import { Assignment } from "@/app/lib/definitions";
import Form from "@/app/ui/assignments/edit-form";



export default async function Page({ params }: {params: {id:string} }) {
    const id = params.id;
    const assignment= await fetchAssignmentById(id);
    const section = await fetchSectionByAssignmentId(id);
    
    console.log(section, assignment)

    const fetcher = new CleverDataFetcher
    const assignmentData = await fetcher.getAssignment(section.section_id, id)

    return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Assignments', href: '/dashboard/assignments' },
              {
                label: 'View Assignment',
                href: `/dashboard/assignments/${id}`,
                active: true,
              },
            ]}
          />
          <Form assignment={assignment} section={section} />
        </main>
      );
}