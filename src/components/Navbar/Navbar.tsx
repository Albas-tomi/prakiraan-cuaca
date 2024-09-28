"use client";
import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      <header className="navbar flex   flex-col-reverse mb-4 bg-none">
        <SearchBox />
        <div className="flex-none flex md:flex-none md:justify-center justify-between  w-full   gap-2">
          <div className="flex-1 text-white ">
            <Link href={"/"} className="btn italic  btn-ghost text-2xl">
              Weather App
            </Link>
          </div>
          <div className="dropdown  dropdown-end ">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => signOut()}
            >
              <MdLogout className="text-2xl" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
