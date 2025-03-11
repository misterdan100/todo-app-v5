import { HeaderPage } from "@/components";
import { ShowTasksSection } from "@/components/task/ShowTasksSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Completed Tasks',
    description: 'Show all your done tasks'
}

export default function CompletedPage() {
  

  return (
    <>
    {/* Title */}
      <HeaderPage title='Completed Tasks' />

      <ShowTasksSection page='completed'/>

    </>
  )
}