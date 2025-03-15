export const revalidate = 0

import { HeaderPage } from "@/components";
import { PageAllSection } from "./PageAllSection";

export default function Home() {


return (
      <>
        <HeaderPage title="All Tasks" />

        <PageAllSection />
      </>
    );
  }

