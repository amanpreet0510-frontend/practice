'use client';
import React, { useState } from "react";
import { useSearchStore } from '../../store/searchStore';



const Search = () => {

    const{search,setSearch}=useSearchStore();

      

  return (
    <>
      <input
        className="rounded-4xl bg-[#CBDCEB] max-h-max w-100 p-3 mt-10 placeholder:text-gray-600 placeholder:font-extrabold"
        placeholder="  search......"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      ></input>
      <div>{}</div>
    </>
  );
};

export default Search;
