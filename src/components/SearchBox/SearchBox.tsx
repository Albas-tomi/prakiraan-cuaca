"use client";
import React, { useState } from "react";
import { useAppContext } from "@/lib/context/context";
import { BsSearch } from "react-icons/bs";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const { setSearchCity } = useAppContext();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchCity(keyword);
  };
  return (
    <form className="flex relative  bg-none  items-center gap-2  outline-none">
      <input
        className="bg-transparent px-5 border-b-2 border-gray-300 text-black placeholder-gray-500 focus:outline-none"
        type="search"
        placeholder="Search City"
        value={keyword}
        name="search"
        id="search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <BsSearch
        className={`absolute right-6 text-gray-500 ${keyword && "hidden"}`}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}></button>
    </form>
  );
};

export default SearchBox;
