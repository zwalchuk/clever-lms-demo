import Form from '@/app/ui/assignments/create-form';
import Breadcrumbs from '@/app/ui/assignments/breadcrumbs';
import { fetchSections } from '@/app/lib/clever';
 
export default async function Page({ params }: {params: {sectionID: string}}) {
  //const fetcher = new CleverDataFetcher();
  const sectionID = params.sectionID;
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Assignments', href: `/dashboard/sections/${sectionID}/assignments` },
          {
            label: 'Create Assignment',
            href: `/dashboard/sections/${sectionID}/assignments/create`,
            active: true,
          },
        ]}
      />
      <Form section_id={sectionID} />
    </main>
  );
}