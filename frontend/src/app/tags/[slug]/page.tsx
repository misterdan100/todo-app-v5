import { HeaderPage } from "@/components"
import { ShowTasksSection } from "@/components/task/ShowTasksSection"
import { capitalizeText } from "@/utils"


export default async function TagPage({params}: {params: Promise<{ slug: string }>}) {
  
  const { slug } = await params
  
  return (
    <>
    {/* Title */}
      <HeaderPage title={`${capitalizeText(slug)} Tag`} />

      {/* <ShowTasksSection page='pending'/> */}
    </>
  )
}