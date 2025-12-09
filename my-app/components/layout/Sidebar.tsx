import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu.types";

const menu: MenuItem[] = [
  { label: "Home", href: "/" ,image:''},
  { label: "Users Dashboard", href: "/dashboard",image:'' },
  {label: "Admin", href: "/roleBasedDashboard",image:''},
  {label: "HR", href: "/roleBasedDashboard",image:''},
];

const sidebar = () => {
  return (
    <>
      <aside className="bg-gray-400 w-100 h-screen">
        <ul className="text-center pt-10">
          {menu.map((item,id) => (
            <React.Fragment key={id}>
                <Link href={item.href}>
              <li className="mt-10 text-4xl font-extrabold underline">
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
