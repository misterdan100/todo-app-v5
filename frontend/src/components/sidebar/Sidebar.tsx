"use client";

import { uiConfig } from "@/config/uiConfig";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCheckboxOutline, IoGridOutline } from "react-icons/io5";

export const Sidebar = () => {
  const { mainColor } = uiConfig;
  const pathname = usePathname();

  const getSelectedColor = (link: string) => {
    return pathname === link ? mainColor : "#71717a";
  };

  const navItems = [
    {
      icon: <IoGridOutline color={getSelectedColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IoCheckboxOutline color={getSelectedColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IoCheckboxOutline color={getSelectedColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IoCheckboxOutline color={getSelectedColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <div className="basis-[5rem] sm:flex flex-col hidden">
      <Link href='/' className="flex items-center justify-center h-[5rem] w-[5rem]">
        <Image 
        src="/logo.png" width={28} height={28} alt="logo" />
      </Link>

      <div className="flex flex-col items-center flex-1 mt-8">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, i) => (
            <li key={i} className="relative group">
              <Link href={item.link}
                className="text-[22px]"
              >{item.icon}</Link>
              <span
                className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    backgroundColor: mainColor
                }}
              >
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
