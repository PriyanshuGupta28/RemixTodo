import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="">
      <div className="mx-auto h-full px-4 py-28 md:py-40 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="">
            <div className="lg:max-w-xl lg:pr-5">
              <p className="flex text-sm uppercase text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 inline h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
                An agency for high growth startups
              </p>
              <h2 className="mb-6 max-w-lg text-5xl font-bold leading-snug tracking-tight text-white sm:text-7xl sm:leading-snug">
                We make you look
                <span className="my-1 inline-block border-b-8 border-white bg-blue-400 px-4 font-bold text-white">
                  different
                </span>
              </h2>
              <p className="text-base text-gray-400">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque it.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center md:flex-row">
              <a
                href="/"
                className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-blue-700 px-6 font-medium tracking-wide text-white shadow-md transition md:mr-4 md:mb-0 md:w-auto focus:outline-none hover:bg-blue-800"
              >
                Stream Now{" "}
              </a>
              <a
                href="/"
                aria-label=""
                className="group inline-flex items-center font-semibold text-white"
              >
                Watch how it works
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:translate-x-2 ml-4 h-6 w-6 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto my-6 h-10 w-10 animate-bounce rounded-full bg-blue-50 p-2 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
            <div className="abg-orange-400 w-fit rounded-[6rem] mx-auto overflow-hidden rounded-tl-none rounded-br-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -left-10 -top-20 h-28 w-28 rounded-xl text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 -bottom-20 h-28 w-28 rounded-xl text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex w-96 flex-wrap">
                <div className="h-48 w-1/2 rounded-full rounded-br-none bg-red-400"></div>
                <div className="rounded-[6rem] h-48 w-1/2 rounded-tl-none rounded-br-none bg-violet-400"></div>
                <div className="h-48 w-1/2 rounded-full rounded-b-none rounded-br-none bg-yellow-400"></div>
                <div className="h-48 w-1/2 rounded-full rounded-t-none rounded-br-none bg-indigo-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
