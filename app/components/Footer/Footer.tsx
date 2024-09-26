import React from "react";
import logo from "../../../assets/logo.jpeg";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gray-900 px-4 pt-20 w-full ">
      <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-zinc-700 bg-zinc-900 p-1">
        <img className="h-full object-contain" src={logo} alt="remix-todo" />
      </div>
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
      >
        <a href="/" className="font-medium text-white">
          Demo
        </a>
        <a href="/" className="font-medium text-white">
          Support
        </a>
        <a href="/" className="font-medium text-white">
          Privacy Policy
        </a>
        <a href="/" className="font-medium text-white">
          Terms & Conditions
        </a>
      </nav>
      <p className="py-10 text-center text-gray-300">
        © 2022 Boleno | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
