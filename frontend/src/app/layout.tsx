import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Sidebar, SidebarRight } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mister ToDo App | Next.js Node.js Express.js PostgreSQL",
  description: "Todo app with MERN Stack and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "flex bg-[#f9f9f9] h-full w-full"}>
        {/* Main container */}
        <div className="flex w-full h-full">
          <Sidebar />

          <div className="flex flex-col flex-1 w-full h-screen">
            <Header />

            <div id="container" className="flex flex-1 h-full pb-6 overflow-hidden">

              <main className="flex-1 bg-[#ededed] border-2 border-white rounded-[1.5rem] h-full overflow-y-auto w-full p-6">
                <div
                  className="h-full pr-2 "
                  // className="h-[calc(100%-3rem)] m-6 overflow-y-auto pr-2"
                >
                  {children}
                  
                </div>
              </main>

              <SidebarRight />
              
            </div>
          </div>
        </div>
        
      </body>
    </html>
  );
}
