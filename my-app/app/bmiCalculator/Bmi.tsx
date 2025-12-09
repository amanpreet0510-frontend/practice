"use client";
import React, { FormEvent, useState } from "react";

const Bmi = () => {
  const [height, setHeight] = useState<number>(Number);
  const [weight, setWeight] = useState<number>(Number);
  const [bmi, setBmi] = useState<string>("");
  const [result, setResult] = useState<number>(Number);

  const bmiValue = (e:FormEvent) => {
    e.preventDefault();

    const ht= (height) / 100;
    setResult((weight) / (ht * ht));

    if (result < 18 && result > 0) {
      setBmi("Underweight");
    } else if (result > 18 && result < 24) {
      setBmi("Normal");
    } else if (result > 24) {
      setBmi("Overweight");
    }
  };

  return (
    <>
      <div className="main bg-gray-200 p-14">
        <div className="container">
          <div className=" justify-center h-210 w-200 m-auto bg-[#8FABD4]">
            <h1 className="text-center text-4xl font-extrabold pt-15 underline underline-offset-10">
              BMI Calculator
            </h1>
            <div className="mt-[200px] flex flex-col gap-20">
              <div className="flex justify-around gap-5">
                <label className="text-2xl">Height</label>
                <input
                  className="h-10 w-100 p-8 bg-[#B4DEBD]"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
              <div className="flex justify-around gap-5">
                <label className="text-2xl">Weight</label>
                <input
                  className="h-10 w-100 p-8 bg-[#B4DEBD]"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </div>
            </div>
            <form
              className="flex justify-center gap-10 m-15"
              onSubmit={bmiValue}
            >
              <button className=" bg-[#50589C] rounded-2xl p-5 text-2xl font-bold text-white">
                Calculate
              </button>
              <p className="bg-[#50589C] p-8 h-10 w-200 text-white">{result}</p>
              <span className="bg-[#50589C] p-8 h-10 w-400 text-white">
                Your weight is={bmi}
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bmi;
