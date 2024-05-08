import { inter } from "@/app/ui/fonts"
import { CleverDataFetcher, fetchAssignmentById, fetchSectionByAssignmentId, fetchSections } from "@/app/lib/clever";
import { Suspense } from "react";
import { MySectionsSkeleton } from "@/app/ui/skeletons";
import SubmissionsTable from "@/app/ui/submissions/submissions-list"



export default async function Page({ params }: {params: {id:string}}) {
    const id = params.id;
    const assignment = await fetchAssignmentById(id);
    const section = await fetchSectionByAssignmentId(id);
    
    console.log(section, assignment)

    const fetcher = new CleverDataFetcher
    const assignmentData = await fetcher.getAssignment(assignment.section_id, assignment.id)
    const submissionData = await fetcher.getSubmissions(assignment.section_id, assignment.id)

    return (
      <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-4xl`}>
        Assignment
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={<MySectionsSkeleton />}>
        <SubmissionsTable />
        </Suspense>
      </div>
    </main>
      );
}