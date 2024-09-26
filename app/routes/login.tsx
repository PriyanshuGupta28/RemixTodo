/* eslint-disable react/no-unescaped-entities */
import React from "react";
import loginimg from "../../assets/loginremovebg.png";

const login: React.FC = () => {
  return (
    <div className="flex w-full bg-zinc-900 flex-wrap text-zinc-200">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12"></div>
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
            Welcome back <br />
            to{" "}
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
              Remix Todo
            </span>
          </p>
          <p className="mt-6 text-center font-medium md:text-left">
            Sign in to your account below.
          </p>

          <form className="flex flex-col items-stretch pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="email"
                  id="login-email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>
            <a
              href="/forget-password"
              className="mb-6 text-center text-sm font-medium md:text-left"
            >
              Forgot password?
            </a>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
            >
              Sign in
            </button>
          </form>
          <div className="py-12 text-left">
            <p className="">
              Don't have an account?
              <a
                href="/login"
                className="whitespace-nowrap font-semibold text-zinc-400 underline underline-offset-4 ml-2"
              >
                Sign up for free.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className=" justify-center items-center h-screen relative hidden select-none md:block md:w-1/2">
        <img
          className="w-full rounded-lg object-cover h-full"
          src={loginimg}
          alt="hero"
        />
      </div>
    </div>
  );
};

export default login;
