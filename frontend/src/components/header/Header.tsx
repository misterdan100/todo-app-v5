"use client";

import { uiConfig } from "@/config/uiConfig";
import { IoList, IoLogoGithub, IoMoon, IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { CreateTaskModal } from "../modals/CreateTaskModal/CreateTaskModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { switchSidebarMain, switchSidebarRight } from "@/store/ui/sidebarSlice";
import { useRouter } from "next/navigation";
import { verifySession } from "@/store/auth/sessionSlice";
import { mutate } from "swr";
import { useTasks } from "@/hooks";


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
  const user = useSelector( (state: RootState) => state.session.user)
  const dispatch = useDispatch<AppDispatch>();
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const isSidebarRightOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarRightOpen
  );
  const isSidebarMainOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarMainOpen
  );
  const [totalTasks, setTotalTasks] = useState(0);


  const {} = useTasks({})



  useEffect(() => {
    dispatch(verifySession())
    mutate('/tasks')
    setTotalTasks(allTasks.length);
  }, [allTasks]);

  return (
    <header className="flex flex-col items-center justify-between w-full gap-4 px-6 my-4 md:flex-row">
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
            {user ? `Welcome, ${user.name}!` : "Welcome to Mister Todos"}
          </h1>

          <p>
            {user ? (
              <>
                You have{" "}
                <span
                  className={`font-bold`}
                  style={{
                    color: mainColor,
                  }}
                >
                  {totalTasks}
                </span>{" "}
                active tasks
              </>
            ) : (
              "Please login or register to view your tasks"
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
            className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] transition-colors"
          >
            {" "}
            <IoLogoGithub />{" "}
          </StyledLink>

          <StyledLink
            href=""
            passHref
            className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] transition-colors"
          >
            {" "}
            <IoMoon />{" "}
          </StyledLink>

          <StyledLink
            href=""
            passHref
            className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] transition-colors"
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
