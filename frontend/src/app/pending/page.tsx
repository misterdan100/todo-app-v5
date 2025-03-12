import { HeaderPage } from "@/components";
import { Metadata } from "next";
import { PendingPageSection } from "./PendingPageSection";

export const metadata: Metadata = {
    title: 'Pending Tasks',
    description: 'Show all your done tasks'
}

export default function PendingPage() {
  

  return (
    <>
    {/* Title */}
      <HeaderPage title='Pending Tasks' />

      <PendingPageSection />
    </>
  )
}