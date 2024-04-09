import { inter } from '@/app/ui/fonts';
import MySections from '@/app/ui/dashboard/my-sections';
//import CardWrapper from '@/app/ui/dashboard/cards';
//import Card from '@/app/ui/dashboard/cards';
import { Suspense } from 'react';
import { SectionSkeleton, CardsSkeleton, MySectionsSkeleton } from '@/app/ui/skeletons';

export default async function Home() {
    return( 
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-4xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={<MySectionsSkeleton />}>
        <MySections />
        </Suspense>
      </div>
    </main>
  );

}