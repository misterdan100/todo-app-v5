import { HeaderPage } from "@/components";
import { useTasks } from "@/hooks";
import { Metadata } from "next";
import { CompletedPageSection } from "./CompletedPageSection";

export const metadata: Metadata = {
    title: 'Completed Tasks',
    description: 'Show all your done tasks'
}

export default function CompletedPage() {
  

  return (
    <>
    {/* Title */}
      <HeaderPage title='Completed Tasks' />

      <CompletedPageSection />

    </>
  )
}