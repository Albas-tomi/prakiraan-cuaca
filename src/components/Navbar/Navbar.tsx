"use client";
import React from "react";
import style from "./Navbar.module.css";
import SearchBox from "../SearchBox/SearchBox";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <header id="header" className={style.header}>
      <h1 className={style.h1}>Weather Forecast</h1>
      <button onClick={() => signOut()}>Sign Out</button>
      <SearchBox />
    </header>
  );
};

export default Navbar;
