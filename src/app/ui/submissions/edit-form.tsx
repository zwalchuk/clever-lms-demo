// Edit Assignments Form

'use client';

import { useFormState } from 'react-dom';
import { AssignmentSql, Section, SectionIdSql, Submission } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  ClipboardDocumentCheckIcon,
  InboxIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  LinkIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateSubmission } from '@/app/lib/actions';
import { UpdateSubmission } from './buttons';

export default function UpdateSubmissionForm({
    submission,
    section,
    id
}: {
    submission: Submission;
    section: string;
    id: string;
}) {
  const user_id = submission.data.user_id;
  const initialState = { message: {user_id, section, id }, errors: {}, };
  const [state, dispatch] = useFormState(updateSubmission, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Text Body 
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Submission Text
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="textInput"
                name="textInput"
                rows="2"
                placeholder="Lorem ipsum..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby='title-error'
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="textInput-error" aria-live="polite" aria-atomic="true">
              {state.errors?.textInput &&
                state.errors.textInput.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div> */}

        {/* Link */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Submit Your Favorite Math Website
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="URL"
                name="URL"
                type="link"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby='URL-error'
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="link-error" aria-live="polite" aria-atomic="true">
              {state.errors?.URL &&
                state.errors.URL.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/assignments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Update Submission</Button>
      </div>
    </form>
  );
}
