import { HeaderPage } from "@/components"
import { capitalizeText } from "@/utils"
import { Metadata, ResolvingMetadata } from "next"
import { TagSection } from "./TagSection"
import axios from '@/config/axios'
import { cache } from "react"
import { Tag } from "@/interface"

type Props = {
  params: Promise<{slug: string}>
}

const getTag = cache( async (slug: string) => {
  try {
    const res = await axios(`tags/name/${slug}`)
    return res.data as Tag
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
})

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {

  const { slug } = await params

  return {
    title: `${capitalizeText(slug)} Tag`
  }
}



export default async function TagPage({params}: {params: Promise<{ slug: string }>}) {
  const { slug } = await params

  const tag = await getTag(slug)
  if(!tag) {
    console.log('entrandooooooooooooo')
    return <div className="text-red-500 font-bold mt-6 text-center w-full">Error loading data, plese refresh the page.</div>;
  }

  return (
    <>
    {/* Title */}
      <HeaderPage title={`${capitalizeText(slug)} Tag`} />

      {/* <ShowTasksSection page='pending'/> */}
      <TagSection tag={tag}/>
    </>
  )
}