"use client";

import clsx from "clsx";
import { motion } from 'motion/react';
import { container } from "@/utils";

// ShadCN imports
import { ErrorGetData, TagCard } from "@/components";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useTagsTasks } from "@/hooks";


export default function TagsSection() {
  const { tags, error, isLoading } = useTagsTasks()

  if (isLoading)
    return (
      <LoadingSpinner message="Loding tags..."/>
    );

  if(error) return <ErrorGetData message="Error loading data in TagSection, plese refresh the page." />

  return (
      <>
        <motion.div 
          className={clsx('py-6 gap-6', {
            // 'flex flex-wrap justify-between' : false,
            'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4' : true
          })}
          variants={container}
          initial='hidden'
          animate='visible'
        >
          {tags?.length === 0 ? (
            <p>There are not tags to show</p>
          ): tags?.map((item) => (
            <TagCard 
              key={item.id}
              tag={item}
            />
          ))}

        </motion.div>

      </>
    );

}
