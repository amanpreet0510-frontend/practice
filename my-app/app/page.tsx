import { Suspense } from "react";
import "./globals.css";
import Notifications from "./dashboardppr/Notifications";
import SalesChart from "./dashboardppr/SalesChart";

import Navbar from "./dashboardppr/Navbar";
import SearchDebounce from "./SearchDebounce";
import Throttling from "./Throttling";
import Bmi from "./bmiCalculator/Bmi";
import Todo from "./todo/Todo";
import Counter from "./Counter";
import ProductList from "./ProductList";
import Sidebar from "../components/layout/Sidebar";
import Layout from "../app/layout";

export const experimental_ppr = true;

export default function DashboardPage() {
  return (
    <>
    <div className="container">
    <div className="text-[65px] font-extrabold text-blue-400 flex justify-center -translate-y-150 translate-x-50 ">
      <h1>Welcome to homepage!</h1>
    </div>
    </div>
      {/* <Todo/>
     <Bmi/>
    <Counter/>
    <ProductList/> */}
    </>
    // <div style={{ display: "flex" }}>
    //   <Sidebar />     {/* FULLY STATIC */}
    //   <div style={{ flex: 1 }}>
    //     <Navbar />    {/* FULLY STATIC */}

    //     <h1>Dashboard</h1>

    //     <Suspense fallback={<p>Loading notifications…</p>}>
    //       <Notifications />  {/* DYNAMIC */}
    //     </Suspense>

    //     <Suspense fallback={<p>Loading sales chart…</p>}>
    //       <SalesChart />      {/* DYNAMIC */}
    //     </Suspense>
    //   </div>
    // </div>
  );
}
