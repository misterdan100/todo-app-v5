"use client";

import { uiConfig } from "@/config/uiConfig";
import { useProjects } from "@/hooks";
import { AppDispatch, RootState } from "@/store/store";
import { switchSidebarMain } from "@/store/ui/sidebarSlice";
import { capitalizeText, container, item, generateRandomReadableColor } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoAlarmOutline,
  IoAlbumsOutline,
  IoCheckboxOutline,
  IoGridOutline,
  IoPricetagsOutline,
  IoTrendingUp,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

export const Sidebar = () => {
  const isSidebarMainOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarMainOpen
  );
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { activeSession } = useSelector((state: RootState) => state.session);
  
  const [showItemTexts, setShowItemTexts] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  // Efecto para detectar el tamaño de la ventana y ocultar el sidebar en pantallas pequeñas
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && isSidebarMainOpen) {
        dispatch(switchSidebarMain(false));
      }
    };

    // Ejecutar al montar y cuando cambie el tamaño
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data, error, isLoading } = useProjects();

  const { mainColor } = uiConfig;
  const pathname = usePathname();

  const getSelectedColor = (link: string) => {
    const color = theme === 'light' ? mainColor : '#8b5cf6'
    return pathname === link ? color : "#71717a";
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
      icon: <IoTrendingUp color={getSelectedColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IoAlarmOutline color={getSelectedColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
    {
      icon: <IoPricetagsOutline color={getSelectedColor("/tags")} />,
      title: "Tags",
      link: "/tags",
    },
    {
      icon: <IoAlbumsOutline color={getSelectedColor("/projects")} />,
      title: "Projects",
      link: "/projects",
    },
  ];

  return (
    <div
      className={`basis-[5rem] ${
        isSidebarMainOpen ? "sm:flex" : "hidden sm:flex"
      } flex-col h-full `}
    >
      <Link
        href={activeSession ? '/' : "/login"}
        className="flex items-center justify-center h-[5rem] w-full mt-4 "
        onClick={() => setShowItemTexts((prev) => !prev)}
      >
        <Image src={theme === 'light' ? "/logotipo.svg" : '/logotipo_dark.svg'} width={100} height={100} alt="logo" priority />
      </Link>

      <div className="flex flex-col items-center  px-2">
        <ul className="flex flex-col gap-4">
          {navItems.map((item, i) => (
            <li
              key={i}
              className={clsx("relative group py-2 px-4 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors rounded-md",
                {'text-primary bg-gray-100 dark:text-gray-300 dark:bg-slate-700': pathname === item.link}
              )}
            >
              <Link
                href={activeSession ? item.link : "/login"}
                className='text-[22px] flex items-center gap-2'
              >
                {item.icon}
                {showItemTexts && (
                  <p className="text-base antialiased font-normal ">
                    {item.title}
                  </p>
                )}
              </Link>

              {!showItemTexts && (
                <span
                  className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: mainColor,
                  }}
                >
                  {item.title}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {(data && showItemTexts) && activeSession && (
        <div className="flex flex-col items-center justify-start flex-1 px-2 h-full overflow-y-hidden">
          <p className="text-base text-center antialiased font-semibold uppercase pt-2 text-gray-500 dark:text-gray-400 border-t-2 border-gray-200 dark:border-slate-600  mt-6">
            Projects
          </p>
          <div className=" mt-2 pr-2 h-full overflow-y-auto pb-[1.5rem]">
            <motion.ul 
              className="flex flex-col "
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {data.map((item1, i) => (
                <motion.li
                  variants={item}
                  key={i}
                  className="relative group py-2 px-4 text-gray-600 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors rounded-md dark:text-gray-400"
                >
                  <Link
                    href={`/projects/${item1.name.replaceAll(' ', '-')}`}
                    replace
                    className="text-[22px] flex items-center gap-2 "
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: generateRandomReadableColor(),
                      }}
                    ></div>

                    <p className="text-base antialiased font-normal ">
                      {capitalizeText(item1.name).slice(0, 10)}
                    </p>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      )}
    </div>
  );
};
