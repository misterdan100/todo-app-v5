"use client";

import { uiConfig } from "@/config/uiConfig";
import { IoList, IoLogoGithub, IoMoon, IoPersonSharp, IoSunnySharp } from "react-icons/io5";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { CreateTaskModal } from "../modals/CreateTaskModal/CreateTaskModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { switchSidebarMain, switchSidebarRight } from "@/store/ui/sidebarSlice";
import { usePathname, useRouter } from "next/navigation";
import { verifySession } from "@/store/auth/sessionSlice";
import { mutate } from "swr";
import { useTasks } from "@/hooks";
import { toggleTheme } from "@/store/ui/themeSlice";

const { mainColor } = uiConfig;

const StyledLink = styled(Link)<{ $sidebarOpen?: boolean }>`
  color: ${(props) => (props.$sidebarOpen ? "white" : mainColor)};
  background-color: ${(props) => (props.$sidebarOpen ? mainColor : "white")};

  &:hover {
    background-color: ${mainColor};
    color: white;
  }
`;

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const {user, activeSession, loadingSession} = useSelector( (state: RootState) => state.session)
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const isSidebarMainOpen = useSelector((state: RootState) => state.sidebar.isSidebarMainOpen);
  const isSidebarRightOpen = useSelector((state: RootState) => state.sidebar.isSidebarRightOpen);
  const theme = useSelector( (state: RootState) => state.theme.theme)
  const dispatch = useDispatch<AppDispatch>();
  const [totalTasks, setTotalTasks] = useState(0);

  const {} = useTasks({})

  useEffect(() => {
    dispatch(verifySession())
    mutate('/tasks')
  }, [dispatch]);
  
  useEffect(() => {
    setTotalTasks(allTasks.length);
  }, [allTasks]);

  if(!loadingSession && !activeSession) {
    if(pathname !== '/login' && pathname !== '/register') {
      router.push('/login')
    }
  }

  return (
    <header className="flex flex-col items-center justify-between w-full gap-4 px-6 my-4 md:flex-row dark:bg-slate-900">
      {/* Title, name and tasks */}
      <div className="flex items-center gap-2 text-center md:text-start">
        <Link href="/" className="flex items-center justify-center sm:hidden">
          <Image src="/logotipo.svg" width={80} height={80} alt="logo" />
        </Link>
        <div>
          <h1 className="text-lg font-medium">
            <span role="img" aria-label="wave">
              👋
            </span>
            {user ? ` Welcome, ${user.name}!` : " Welcome to Mister Todos"}
          </h1>

          <p className="dark:text-gray-300">
            {user ? (
              <>
                You have{" "}
                <span
                  className={`font-bold dark:text-violet-400`}
                  style={{
                    color: theme === 'light' ? mainColor : '',
                  }}
                >
                  {totalTasks}
                </span>{" "}
                active tasks
              </>
            ) : (
              <>
              Please 
              <Link
                href="/login"
                className="font-bold"
                style={{
                  color: theme === 'light' ? mainColor : '',
                }}
              > login </Link>
              
              or 
              <Link
                href="/register"
                className="font-bold"
                style={{
                  color: theme === 'light' ? mainColor : '',
                }}
              > register </Link>
              to view your tasks
              </>
            )}
          </p>
        </div>
      </div>

      {/* Button add tasks */}
      <div className=" flex items-center gap-4 md:gap-[10.4rem] ">
        <div
          className=" sm:hidden"
          onClick={() => dispatch(switchSidebarMain(!isSidebarMainOpen))}
        >

            <IoList className="h-[35px] w-[35px] text-gray-400 hover:text-gray-600 cursor-pointer justify-self-start" />

        </div>
            {user && <CreateTaskModal /> }
        

        <div className="flex items-center gap-4">
          <StyledLink
            href="https://github.com/misterdan100/todo-app-v5"
            target="_blank"
            passHref
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]  dark:border-violet-400 transition-colors"
          >
            {" "}
            <IoLogoGithub />{" "}
          </StyledLink>

          <StyledLink
            href=""
            passHref
            className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]  dark:border-violet-400 transition-colors"
            onClick={() => dispatch(toggleTheme())}
          >
            { theme === 'light' ? (
              <IoMoon />
            ) : (
              <IoSunnySharp />
            )}
          </StyledLink>

          <StyledLink
            href=""
            passHref
            className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]  dark:border-violet-400 transition-colors"
            onClick={() => !user ? router.push('/login') : dispatch(switchSidebarRight(!isSidebarRightOpen))}
            $sidebarOpen={isSidebarRightOpen}
          >
            {" "}
            <IoPersonSharp />{" "}
          </StyledLink>
        </div>
      </div>
    </header>
  );
};
