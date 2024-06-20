import { redirect } from 'next/navigation'

export default async function Page({ params }: {params: {id:string; sectionID:string;}}) {
    const id = params.id;
    const sectionID = params.sectionID;
    console.log(id)
    console.log(sectionID)


 
    redirect(`/dashboard/sections/${sectionID}/assignments/${id}/submissions/664d092426cf6205b826b284/edit`)
}