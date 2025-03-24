import { HeaderPage } from "@/components"
import { capitalizeText } from "@/utils"
import { Metadata, ResolvingMetadata } from "next"
import { ProjectSection } from "./ProjectSection"

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {slug} = await params

  const pageName = slug.replaceAll('-', ' ')

  return {
    title: `${capitalizeText(pageName)} Project`
  }
}

export default async function ProjectPage({ params }: {params: Promise<{slug: string}>}) {
  const { slug } = await params
  const pageName = slug.replaceAll('-', ' ')
  
  
  
  return (
    <>
    {/* Title */}
      <HeaderPage title={`${capitalizeText(pageName)} Project`} />

      {/* <ShowTasksSection page='pending'/> */}
      <ProjectSection project={pageName}/>
    </>
  )
}