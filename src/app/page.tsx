import { CleverDataFetcher } from '@/app/lib/clever';

export default async function Home() {
  const fetcher = new CleverDataFetcher("YOUR_TOKEN_GOES_HERE");

  const userData = await fetcher.fetchStudents();
  const sectionData = await fetcher.fetchSections();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        {
          userData.map((student) => {
            return (<span>{student.email ? student.email : "no email"}</span>);
          })
        }
      </div>
    </main>
  )
}
