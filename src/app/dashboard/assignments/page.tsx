import Pagination from '@/app/ui/assignments/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/assignments/table';
import { CreateAssignment } from '@/app/ui/assignments/buttons';
import { inter } from '@/app/ui/fonts';
import { AssignmentsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchAssignmentsPages } from '@/app/lib/clever';
 
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const totalPages = await fetchAssignmentsPages(query);
    
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${inter.className} text-2xl`}>Assignments</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search assignments..." />
          <CreateAssignment />
        </div>
        <Suspense key={query + currentPage} fallback={<AssignmentsTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
  }