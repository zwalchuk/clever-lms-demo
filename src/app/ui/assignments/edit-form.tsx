// Edit Assignments Form

'use client';

import { useFormState } from 'react-dom';
import { AssignmentSql, Section, SectionIdSql } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  ClipboardDocumentCheckIcon,
  InboxIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  LinkIcon,
  DocumentTextIcon,
  Bars3CenterLeftIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createAssignment, updateAssignment } from '@/app/lib/actions';
import { UpdateAssignment } from './buttons';

export default function EditAssignmentForm({
    assignment,
}: {
    assignment: AssignmentSql;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateAssignment, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

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
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby='title-error'
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
        
        {/* Assignment Description */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Assignment Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="string"
                placeholder="Unit 1 Review"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby='description-error'
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Due Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="dueDate"
                name="dueDate"
                type="datetime-local"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby='dueDate-error'
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="dueDate-error" aria-live="polite" aria-atomic="true">
              {state.errors?.dueDate &&
                state.errors.dueDate.map((error: string) => (
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
                id="points_possible"
                name="points_possible"
                type="string"
                placeholder="100"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby='points_possible-error'
              />
              <ClipboardDocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="points_possible-error" aria-live="polite" aria-atomic="true">
              {state.errors?.points_possible &&
                state.errors.points_possible.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Submission Types
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Submission Types
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="link"
                  name="submission_types"
                  type="checkbox"
                  value="link"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby='submission_types-error'
                />
                <label
                  htmlFor="link"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <LinkIcon className="h-4 w-4" /> Link 
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="file"
                  name="submission_types"
                  type="checkbox"
                  value="file"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="file"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <DocumentTextIcon className="h-4 w-4" /> File
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="text"
                  name="submission_types"
                  type="checkbox"
                  value="text"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="text"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <Bars3CenterLeftIcon className="h-4 w-4" /> Text
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="discussion"
                  name="submission_types"
                  type="checkbox"
                  value="discussion"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="text"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4" /> Discussion
                </label>
              </div>
              <div id="submission_types-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.submission_types &&
                    state.errors.submission_types.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
              </div>
            </div>
          </div>
        </fieldset> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/assignments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Assignment</Button>
      </div>
    </form>
  );
}
