import { HeaderPage } from "@/components";
import { ShowTasksSection } from "@/components/task/ShowTasksSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Pending Tasks',
    description: 'Show all your done tasks'
}

export default function PendingPage() {
  

  return (
    <>
    {/* Title */}
      <HeaderPage title='Pending Tasks' />

      <ShowTasksSection page='pending'/>
    </>
  )
}