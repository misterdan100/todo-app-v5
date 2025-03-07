"use client";

import { uiConfig } from "@/config/uiConfig";
import { Button } from "../ui/button";
import { IoLogoGithub, IoMoon, IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

const { mainColor } = uiConfig;

const StyledLink = styled(Link)`
  color: ${mainColor};

  &:hover {
    background-color: ${mainColor};
    color: white;
  }
`;

export const Header = () => {
  const userId = true; // temporal meanwhile we have auth and context
  const name = "Daniel Caceres";

  return (
    <header className="flex flex-col items-center justify-between w-full gap-4 px-6 my-4 md:flex-row">
      {/* Title, name and tasks */}
      <div className="flex items-center gap-2 text-center md:text-start">
        <Link href="/" className=" sm:hidden flex items-center justify-center h-[5rem]">
          <Image src="/logo.png" width={28} height={28} alt="logo" />
        </Link>
        <div>
          <h1 className="text-lg font-medium">
            <span role="img" aria-label="wave">
              👋
            </span>
            {userId ? `Welcome, ${name}!` : "Welcome to Mister Todos"}
          </h1>

          <p>
            {userId ? (
              <>
                You have{" "}
                <span
                  className={`font-bold`}
                  style={{
                    color: mainColor,
                  }}
                >
                  {99}
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
        <Button className="" onClick={() => console.log("Open modal")}>
          {userId ? "Add a new Task" : "Login / Register"}
        </Button>

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
            href="/profile"
            passHref
            className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] transition-colors"
          >
            {" "}
            <IoPersonSharp />{" "}
          </StyledLink>
        </div>
      </div>
    </header>
  );
};
