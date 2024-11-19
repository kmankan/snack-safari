"use client";

import Image from "next/image";
import Link from "next/link";
import XLoginButton from "./XLoginButton";
import { useState } from "react";
import XLogoutButton from "./XLogoutButton";

export default function XNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-amber-100 border-b-2 border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/monkey.png"
                alt="Monkey mascot"
                width={40}
                height={40}
                className="transform hover:rotate-12 transition-transform"
              />
              <span className="text-xl sm:text-2xl font-bold text-amber-800 font-['Comic_Sans_MS']">
                Snack Safari
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/home"
              className="text-amber-800 hover:text-amber-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-amber-800 hover:text-amber-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <XLoginButton />
            <XLogoutButton />
            <button className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition-colors font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Cart
            </button>
          </div>
        </div>

        {/* Mobile menu with smooth transition */}
        <div
          className={`
            absolute top-16 left-0 right-0 bg-amber-100
            md:hidden 
            overflow-hidden 
            transition-all duration-300 ease-in-out
            shadow-lg
            ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col gap-2 py-4">
            <Link
              href="/"
              className="text-amber-800 hover:text-amber-600 transition-colors px-3 py-2 rounded-md text-sm font-medium transform hover:translate-x-2 transition-transform duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-amber-800 hover:text-amber-600 transition-colors px-3 py-2 rounded-md text-sm font-medium transform hover:translate-x-2 transition-transform duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <button className="bg-amber-500 text-white mx-3 px-4 py-2 rounded-full hover:bg-amber-600 transition-all duration-200 font-medium flex items-center gap-2 justify-center transform hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Cart
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
