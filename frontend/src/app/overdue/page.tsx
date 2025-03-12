import { HeaderPage } from "@/components";
import { Metadata } from "next";
import { OverduePageSection } from "./OverduePageSection";

export const metadata: Metadata = {
    title: 'Overdue Tasks',
    description: 'Show all your done tasks'
}

export default function OverduePage() {
  

  return (
    <>
    {/* Title */}
      <HeaderPage title='Overdue Tasks' />

      <OverduePageSection />

    </>
  )
}