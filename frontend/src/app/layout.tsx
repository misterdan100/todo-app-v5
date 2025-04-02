import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Sidebar, SidebarRight, ThemeManager } from "@/components";
import ClientProvider from "@/store/ClientProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Node.js Express.js PostgreSQL", //default title
    default: "Mister ToDo App", // default replace to %s
  },
  description: "Todo app with MERN Stack and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + "flex bg-[#f9f9f9] h-full w-full dark:bg-slate-900"
        }
      >
        <ClientProvider>
          <ThemeManager />

          {/* Main container */}
          <div className="flex w-full h-screen">
            <Sidebar />

            <div className="flex flex-col flex-1 w-full h-screen">
              <Header />

              <div
                id="container"
                className="flex flex-1 h-full pb-6 overflow-hidden"
              >
                <main className="flex-1 bg-[#ededed] border-2 border-white rounded-[1.5rem] h-full overflow-y-auto w-full p-6 dark:bg-slate-800 dark:border-slate-700">
                  <div
                    className="h-full pr-2 "
                  >
                    {children}
                  </div>
                </main>

                <SidebarRight />
              </div>

              <a
                href="https://github.com/misterdan100/"
                target="_blank"
                className="ps-4 absolute bottom-1 text-[12px] text-gray-400 italic dark:text-gray-400 transition"
              >Coded by 
                <span className="text-primary hover:font-semibold dark:text-violet-500 dark:hover:text-violet-400 cursor-pointer"> Daniel Caceres</span>
              </a>
            </div>
          </div>

          <Toaster 
            position="top-right" 
            expand={true} 
            closeButton 
            richColors />
        </ClientProvider>
      </body>
    </html>
  );
}
