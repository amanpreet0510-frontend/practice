import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu.types";

const menu: MenuItem[] = [
  { label: "Dashboard", href: "/" ,image:''},
  { label: "Leave management", href: "/",image:'' },
  {label: "Employee Directory", href: "/roleBasedDashboard",image:''},
  {label: "Profile", href: "/roleBasedDashboard",image:''},
   {label: "Settings", href: "/roleBasedDashboard",image:''},
];

const sidebar = () => {
  return (
    <>
      <aside className="bg-gray-400 w-100">
        <h1 className="text-2xl font-bold p-20">Dashboard App</h1>
        <ul className="text-center pt-1 p-20">
          {menu.map((item,id) => (
            <React.Fragment key={id}>
                <Link href={item.href}>
              <li className="mt-10 text-2xl font-extrabold underline  w-max items-center">
                {item.label}
              </li>
              </Link>
            </React.Fragment>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default sidebar;
