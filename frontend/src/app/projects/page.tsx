import { HeaderPage } from "@/components";
import { ProjectsSection } from "./ProjectsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Projects'
}

export default function pagePage() {
  
  return (
    <>
        <HeaderPage title="Projects" filters={false} />

        <ProjectsSection />
    </>
  )
}