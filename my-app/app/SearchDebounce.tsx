"use client";
import React, { useEffect, useState } from "react";

function debounce(fn,delay){
    let timeout;
    return(...args)=>{
         clearTimeout(timeout);
         timeout=setTimeout(()=>fn(...args),delay)
    }
  }

const SearchDebounce = () => {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  
useEffect(() => {
  async function getUsers() {
    const res = await fetch("https://fakestoreapi.com/users");
    const data = await res.json();
    setResult(data);
    console.log("Fetched users:", data);
  }

  getUsers();
}, []);

const searchAPI = (value) => {
    
    const result1 = result.filter((u) =>
      u.username.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result1);
    console.log("API SEARCH triggered with:", value) ;
  };


  const debounceSearch=debounce(searchAPI,500);
  
  useEffect(()=>{
    if(search.trim().length > 2){
        debounceSearch(search);
        
    }else{
        setFiltered([]);
    }
  },[search])

  

  return (
    <>
      <div className="flex justify-center gap-4 p-5">
        <label>search</label>
        <input className="h-5 w-55 bg-gray-300 p-5" placeholder=" search " value={search}  onChange={(e)=>setSearch(e.target.value)} />
        <ul className="flex flex-col gap-5 ">
           {filtered.length>0 && 
          filtered.map((item, index) => 
            (<li key={index}>{item.username}</li>))}
          
        </ul>
      </div>
    </>
  );
};

export default SearchDebounce;
