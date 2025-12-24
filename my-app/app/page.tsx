import React, { Suspense } from "react";
import "./globals.css";
import Notifications from "./dashboardppr/Notifications";
import SalesChart from "./dashboardppr/SalesChart";
import Navbar from "./dashboardppr/Navbar";
// import SearchDebounce from "./SearchDebounce";
// import Throttling from "./Throttling";
import Bmi from "./bmiCalculator/Bmi";
import Todo from "./todo/Todo";
import ProductList from "./ProductList";
import Sidebar from "../components/layout/Sidebar";
import Layout from "../app/layout";
import { redirect } from "next/navigation";
import { Counter } from "./Counter";

export const experimental_ppr = true;

import Link from "next/link";
import { MenuItem } from "@/types/menu.types";

const menu: MenuItem[] = [{ label: "signup", href: "/signup", image: "" }];

export default function homepage() {
  redirect("/signup");
  return (
 <>
{/* <Counter/> */}
 </>
  );
}
