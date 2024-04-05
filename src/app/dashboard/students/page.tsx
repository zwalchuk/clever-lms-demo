import { CleverDataFetcher } from "@/app/lib/clever";
import { inter } from '@/app/ui/fonts';
import MyStudents from '@/app/ui/dashboard/my-students';
import { Suspense } from 'react';
import { MyStudentsSkeleton } from '@/app/ui/skeletons';

export default async function getStudents(){
  const fetcher = new CleverDataFetcher(process.env.DAC_TOKEN);
  const studentData = await fetcher.fetchStudents();

    return(
        <main>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={<MyStudentsSkeleton />}>
        <MyStudents />
        </Suspense>
      </div>
    </main>
 )
}