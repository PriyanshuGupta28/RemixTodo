/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import loginimg from "../../assets/loginremovebg.png";
import toast from "react-hot-toast";
import { ActionFunction, json } from "@remix-run/node";
import { connectDB } from "~/db/mongo";
import { loginUser } from "~/services/login.service";
import { useFetcher } from "@remix-run/react";

interface FetchData {
  success?: string;
  error?: string;
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await connectDB();
  try {
    // Call loginUser to authenticate the user
    await loginUser(email, password);

    // Show success message
    // Redirect to the dashboard or another page after successful login
    return json({
      success: `Login successful! Welcome back.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error during login: " + error.message);
    } else {
      throw new Error("An unknown error occurred during login");
    }
  }
};
const Login: React.FC = () => {
  const fetcher = useFetcher<FetchData>();
  console.log(fetcher);
  useEffect(() => {
    if (fetcher.data?.success) {
      toast.success(fetcher.data.success);
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);
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

          <fetcher.Form
            method="post"
            className="flex flex-col items-stretch pt-3 md:pt-8"
          >
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  name="password"
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
          </fetcher.Form>
          <div className="py-12 text-left">
            <p className="">
              Don't have an account?
              <a
                href="/register"
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

export default Login;
