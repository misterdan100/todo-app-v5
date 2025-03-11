import { HeaderPage } from "@/components";
import { ShowTasksSection } from "@/components/task/ShowTasksSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Overdue Tasks',
    description: 'Show all your done tasks'
}

export default function OverduePage() {
  

  return (
    <>
    {/* Title */}
      <HeaderPage title='Overdue Tasks' />

      <ShowTasksSection page='overdue'/>

    </>
  )
}