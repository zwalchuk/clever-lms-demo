//table view for submissions

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { inter } from '@/app/ui/fonts';
import { CleverDataFetcher, fetchAssignmentById } from '@/app/lib/clever';

export default async function SubmissionsTable() {
    
    const assignment = await fetchAssignmentById();
    const fetcher = new CleverDataFetcher();
    const submissionData = await fetcher.getSubmissions(assignment.section_id, assignment.id);

    return (
        <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Submissions
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {<div className="bg-white px-6">
          {submissionData.map((submission, i) => {
            return (
              <div
                key={submission.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <Link 
                    href={`/dashboard/sections`}
                    className="truncate text-lg text-gray-700 font-semibold sm:block">
                      {submission.id}
                    </Link>
                    <p className="text-sm text-gray-400 font-normal md:text-base">
                      {submission.assignment_id}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div> }
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}