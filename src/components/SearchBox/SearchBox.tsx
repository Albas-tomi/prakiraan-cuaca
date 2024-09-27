"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import style from "./SearchBox.module.css";
import { useAppContext } from "@/lib/context/context";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const { setSearchCity } = useAppContext();
  return (
    <div className={style.form}>
      <input
        className={style.input}
        onChange={(e) => setKeyword(e.target.value)}
        type="search"
        placeholder="Search for location"
      />
      <button
        type="submit"
        onClick={() => setSearchCity(keyword)}
        className={style.button}
      >
        <CiSearch className={style.icon} />
      </button>
    </div>
  );
};

export default SearchBox;
