"use client";
import React, { useState } from "react";

interface Product {
  id: number;
  product: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [input, setInput] = useState<string>(" ");

  const addProduct = () => {
    if (!input.trim()) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      product: input,
      price: Math.floor(Math.random() * 1000),
    };
    setProducts([...products, newProduct]);
    setInput(" ");
  };
  const Reset=()=>{
    setProducts([]);
    setInput(" ")
  };
  return (
    <>
      <div className="mt-10 ">
        <div className="flex justify-center gap-20">
        <input
           className="Placeholder:text-gray-500 Placeholder:italic bg-amber-300 p-7 "
          placeholder="     type here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
        </div>
        <div className=" flex justify-center mt-20">
        <ul>
          {products.map((item) => (
              <div key={item.id} className="bg-blue-300 rounded-2xl  w-100 flex text-2xl justify-around ">
                <li>{item.product}</li>
                <li>{item.price}</li>
                <button key={item.id} onClick={Reset} className="p-5 w-50 justify-between bg-green-300 rounded-2xl ">Delete</button>
              </div>
          ))}
        </ul>
        </div>
      </div>
    </>
  );
};

export default ProductList;
