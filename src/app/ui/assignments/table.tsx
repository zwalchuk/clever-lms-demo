//assignments table at /dashboard/assignments

import { UpdateAssignment, DeleteAssignment } from '@/app/ui/assignments/buttons';
import { fetchAssignments, fetchFilteredAssignments } from '@/app/lib/clever';
import Link from 'next/link';

export default async function AssignmentsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const assignments = await fetchFilteredAssignments(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {assignments?.map((assignment) => (
              <div
                key={assignment.id}
                className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                    <Link 
                    href={`/dashboard/sections/${assignment.section_id}/assignments/${assignment.id}`}
                    className="truncate sm:block">
                      {assignment.title}
                    </Link>
                    </div>
                    <p className="text-sm text-gray-500">
                      {assignment.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {assignment.section_id}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  {/*<div>
                    <p>{assignment.due_date}</p>
                  </div> */}
                  <div className="flex justify-end gap-2">
                    <UpdateAssignment sectionID={assignment.section_id} id={assignment.id} />
                    <DeleteAssignment id={assignment.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Assignment Title
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Assignment ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Section ID
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {assignments?.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Link 
                    href={`/dashboard/sections/${assignment.section_id}/assignments/${assignment.id}`}
                    className="truncate sm:block">
                      {assignment.title}
                    </Link>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {assignment.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {assignment.section_id}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateAssignment sectionID = {assignment.section_id} id={assignment.id} />
                      <DeleteAssignment id={assignment.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}