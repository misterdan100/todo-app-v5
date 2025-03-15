import Link from "next/link";
import { uiConfig } from "@/config/uiConfig";
import clsx from "clsx";

export default async function NotFound() {

  return (
    <div className="h-full w-full flex justify-center pt-10">
      <div className="container flex flex-col md:flex-row  justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry we couldn't find this page.{" "}
          </p>
          <p className="mb-8">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <Link
            href="/"
            className={'px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue hover:bg-violet-400'}
            style={{
                backgroundColor: uiConfig.mainColor,
            }}
          >
            Back to Homepage
          </Link>
        </div>
        <div className="max-w-lg"></div>
      </div>
    </div>
  );
}
