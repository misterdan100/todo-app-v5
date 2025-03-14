"use client";

import { AppDispatch } from "@/store/store";
import { cleanFilter, selectFilter } from "@/store/tasks/tasksSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const filterDictionary: Record<string, number> = {
  low: 1,
  medium: 2,
  high: 3,
  favorite: 4,
};

export const FilterButtons = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const filters = ["All", "Low", "Medium", "High", "Favorite"];

  const handleSelectFilter = (filter: string, index: number) => {
    setActiveIndex(index);

    if (filter === "all") {
      dispatch(cleanFilter());
      return;
    }

    dispatch(selectFilter(filter));
  };

  return (
    <div className="relative py-2 px-2 grid grid-cols-5 items-center gap-3 bg-[#f9f9f9] border-2 border-white rounded-md w-fit">
      <span
        className="absolute left-[5px] bg-[#EDEDED] rounded-md transition-all duration-300"
        style={{
          width: "calc(100% / 5 - 10px)",
          height: "calc(100% - 10px)",
          top: "50%",
          transform: `translate(calc(${activeIndex * 100}% + ${
            activeIndex * 10
          }px), -50%)`,
          transition: "transform 300ms cubic-bezier(.95,.03,1,1)",
        }}
      ></span>

      {filters.map((filter, index) => (
        <button
          key={index}
          className={`relative px-1 z-10 font-medium text-sm ${
            activeIndex === index ? "text-violet-500" : "text-gray-500"
          }`}
          onClick={() => handleSelectFilter(filter.toLowerCase(), index)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
