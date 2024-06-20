import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteAssignment } from '@/app/lib/actions';

export function CreateAssignment({ sectionID }: { sectionID: string }) {
  return (
    <Link
      href={`/dashboard/sections/${sectionID}/assignments/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Assignment</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSubmission({ sectionID, id }: { sectionID: string; id: string }) {
  return (
    <Link
      href={`/dashboard/sections/${sectionID}/assignments/${id}/submissions/${user_id}/edit`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Update Submission</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAssignment({ sectionID, id }: { sectionID: string; id: string }) {
  return (
    <Link
      href={`/dashboard/sections/${sectionID}/assignments/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAssignment({ id }: { id: string }) {
  const deleteAssignmentWithId = deleteAssignment.bind(null, id);
  return (
    <form action={deleteAssignmentWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
