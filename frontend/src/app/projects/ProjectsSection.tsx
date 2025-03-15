"use client";

import { ErrorGetData, ProjectCard } from "@/components";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useProjectsTasks } from "@/hooks";
import { container } from "@/utils";

// ui imports
import { motion } from "motion/react";

export const ProjectsSection = () => {
  const { data, error, isLoading } = useProjectsTasks();

  if (isLoading) return <LoadingSpinner message="Loading Projects..." />;

  if (error)
    return (
      <ErrorGetData message="Error loading data in Projects Section, plese refresh the page." />
    );



  if (data)
    return (
      <>
        <motion.div
          className="py-6 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {data?.map((item) => (
            <ProjectCard key={item.id} project={item} />
          ))}
        </motion.div>
      </>
    );
};
