import { inter } from "@/app/ui/fonts"
import { CleverDataFetcher, fetchAssignmentById, fetchSectionByAssignmentId, fetchSections } from "@/app/lib/clever";
import { Suspense } from "react";
import { MySectionsSkeleton } from "@/app/ui/skeletons";
import SubmissionsTable from "@/app/ui/submissions/submissions-list"



export default async function Page({ params }: {params: {id:string; sectionID:string;}}) {
    const id = params.id;
    const sectionID = params.sectionID;

    const fetcher = new CleverDataFetcher
    const submissionData = await fetcher.getSubmissions(sectionID, id)

    return (
      <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-4xl`}>
        Assignment
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={<MySectionsSkeleton />}>
        <SubmissionsTable submissionData = {submissionData} section_id = {sectionID} assignment_id = {id}/>
        </Suspense>
      </div>
    </main>
      );
}