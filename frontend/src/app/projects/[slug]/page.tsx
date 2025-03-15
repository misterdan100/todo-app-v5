import { HeaderPage } from "@/components"
import { capitalizeText } from "@/utils"
import { Metadata, ResolvingMetadata } from "next"
import { ProjectSection } from "./ProjectSection"

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {slug} = await params

  return {
    title: `${capitalizeText(slug)} Project`
  }
}

export default async function ProjectPage({ params }: {params: Promise<{slug: string}>}) {
  const { slug } = await params
  
  
  
  return (
    <>
    {/* Title */}
      <HeaderPage title={`${capitalizeText(slug)} Tag`} />

      {/* <ShowTasksSection page='pending'/> */}
      <ProjectSection project={slug}/>
    </>
  )
}