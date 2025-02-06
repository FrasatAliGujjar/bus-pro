"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/app/assets/images/logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBus, faEnvelope, faUserShield, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-red-800 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="flex self-center text-2xl font-bold whitespace-nowrap text-white ml-5">
            <Link href="/pages/home" className="flex items-center space-x-3">
              <Image
                alt="logo"
                className="-mt-2 -ml-4 rounded-full"
                src={Logo}
                width={60}
                height={60}
                priority
              />
            </Link>
          </span>
          <button
            onClick={showMenu}
            aria-expanded={isMenuOpen}
            className="p-2 w-10 h-10 inline-flex items-center justify-center text-white rounded-md md:hidden hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                d="M1 1h15M1 7h15M1 13h15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden md:max-h-full md:opacity-100 w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-red-800 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  href="/pages/home"
                  className="block py-2 px-3 text-white rounded hover:bg-red-400 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                >
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/buses"
                  className="block py-2 px-3 text-white rounded hover:bg-red-400 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                >
                  <FontAwesomeIcon icon={faBus} /> Buses
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/contact"
                  className="block py-2 px-3 text-white rounded hover:bg-red-400 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                >
                  <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/dashboard"
                  className="block py-2 px-3 text-white rounded hover:bg-red-400 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                >
                  <FontAwesomeIcon icon={faUserShield} /> Admin
                </Link>
              </li>
              <li className="bg-white text-red-800 rounded-md px-5 py-1 text-center">
                <Link
                  href="/"
                  className="block py-2 px-3 rounded-md hover:text-red-800 md:border-0 md:p-0"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
