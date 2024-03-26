import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { inter } from '@/app/ui/fonts';
import { CleverDataFetcher } from '@/app/lib/clever';

export default async function fetchSectionData() {
    const fetcher = new CleverDataFetcher('0732139414727428d3b5d221c2087708add16d6e')
    const sectionData = await fetcher.fetchSections();
    return (
        <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        My Sections
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {<div className="bg-white px-6">
          {sectionData.map((section, i) => {
            return (
              <div
                key={section.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-md text-gray-700 sm:block">
                      {section.name}
                    </p>
                    <p className="text-sm text-gray-400 font-normal md:text-base">
                      {section.id}, {section.sis_id}
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