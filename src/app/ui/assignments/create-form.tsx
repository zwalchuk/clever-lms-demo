// Create Assignments Form

'use client';

import { useFormState } from 'react-dom';
import { Assignment, Section } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserIcon,
  UserGroupIcon,
  PresentationChartBarIcon,
  ClipboardDocumentCheckIcon,
  InboxIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createAssignment } from '@/app/lib/actions';

export default function Form({ sections }: { sections: Section[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createAssignment, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Assignment Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Section ID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="sectionID"
                name="sectionID"
                type="string"
                placeholder="657b35c16a1a3e5c217dcd64"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='sectionID-error'
              />
              <PresentationChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.section_id &&
                state.errors.section_id.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Assignment Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Assignment Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="string"
                placeholder="Week 1 Homework"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='title-error'
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Points Possible */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Points Possible
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pointsPossible"
                name="pointsPossible"
                type="string"
                placeholder="100"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='pointsPossible-error'
              />
              <ClipboardDocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="pointsPossible-error" aria-live="polite" aria-atomic="true">
              {state.errors?.pointsPossible &&
                state.errors.pointsPossible.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

         {/* Submission Types */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Submission Types
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="submissionTypes"
                name="submissionTypes"
                type="string"
                placeholder="File"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='submissionTypes-error'
              />
              <InboxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.submissionTypes &&
                state.errors.submissionTypes.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Assignee Mode */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Assignment Mode
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="all"
                  name="assignee-mode"
                  type="radio"
                  value="all"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby='title-error'
                />
                <label
                  htmlFor="all"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  All <UserGroupIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="individual"
                  name="individual"
                  type="radio"
                  value="individual"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="individual"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-400 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Individual <UserIcon className="h-4 w-4" />
                </label>
              </div>
              <div id="status-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.assigneeMode &&
                    state.errors.assigneeMode.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/assignments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Assignment</Button>
      </div>
    </form>
  );
}
