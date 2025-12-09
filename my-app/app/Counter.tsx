"use client";
import React, { useState } from "react";

interface State {
  count: number;
}

const Counter = () => {
  const [state, setState] = useState<State>({ count: 0 });

  const add = () => {
    setState({ count: state.count + 1 });
  };
  const reset=()=>{
    setState({count:0})
  }

  return (
    <>
      <div className="bg-blue-300 flex justify-around">
        <span className="text-red-500 font-extrabold bg-black w-100 text-center p-10">{state.count}</span>
        <button onClick={add} className="text-white text-center bg-black font-extrabold p-10 w-80">+</button>
        <button onClick={reset} className="bg-black text-white font-extrabold p-10 w-100">Reset</button>
      </div>
    </>
  );
};

export default Counter;
