import { FilterButtons, HeaderPage } from "@/components";
import { ShowTasksSection } from '@/components/task/ShowTasksSection';


export default function Home() {


  return (
    <>
    {/* Title */}
      <HeaderPage title='All Tasks' />

      <ShowTasksSection page='all'/>

    </>
  )
}
