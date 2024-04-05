import Form from '@/app/ui/assignments/create-form';
import Breadcrumbs from '@/app/ui/assignments/breadcrumbs';
import { fetchSections } from '@/app/lib/clever';
 
export default async function Page() {
  //const fetcher = new CleverDataFetcher();
  const sections = await fetchSections();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Assignments', href: '/dashboard/assignments' },
          {
            label: 'Create Assignment',
            href: '/dashboard/assignments/create',
            active: true,
          },
        ]}
      />
      <Form sections={sections} />
    </main>
  );
}