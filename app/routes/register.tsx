/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import loginimg from "../../assets/loginremovebg.png";
import { json, useFetcher } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";
import { connectDB } from "~/db/mongo";
import { registerUser } from "~/services/register.service";
import toast from "react-hot-toast";
interface FetchData {
  success?: string;
  error?: string;
}
// app/routes/register.tsx (Action Function)
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const fullname = formData.get("fullname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await connectDB(); // Connect to MongoDB

  try {
    // Call registerUser to create a new user
    await registerUser(fullname, email, password);

    // Return success message to frontend
    return json({ success: "Registration successful!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 500 });
    } else {
      // Handle the case where error is not an instance of Error
      return json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
};

const Register: React.FC = () => {
  const fetcher = useFetcher<FetchData>();

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
            Register Your Account to
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
              Remix Todo
            </span>
          </p>
          <p className="mt-6 text-center font-medium md:text-left">
            Register in to your account below.
          </p>

          <fetcher.Form
            className="flex flex-col items-stretch pt-3 md:pt-8"
            method="post"
          >
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="text"
                  id="register-name"
                  name="fullname"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="email"
                  name="email"
                  id="register-email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="register-password"
                  name="password"
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
              Sign up
            </button>
          </fetcher.Form>
          <div className="py-12 text-left">
            <p className="">
              Already have an account?
              <a
                href="/login"
                className="whitespace-nowrap font-semibold text-zinc-400 underline underline-offset-4 ml-2"
              >
                Sign in
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

export default Register;
