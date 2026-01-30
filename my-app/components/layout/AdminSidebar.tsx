'use client';
import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu.types";
import logo from '../../public/logo.png'
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";    

const menu: MenuItem[] = [
  { label: "Dashboard", href: "/roleBasedDashboard", image: '' },
  { label: "User Management", href: "/userManagement", image: '' },
  { label: "Hierarchy", href: "/hierarchy", image: '' },
  { label: "Directory", href: "/directory", image: '' },
  { label: "Settings", href: "/settings", image: '' },
];



const Sidebar = () => {
  const router = useRouter();
   const supabase=getSupabaseClient();
  
  const handleLogout = async () => {
   
        await supabase.auth.signOut();
        router.replace("/login");
        router.refresh();
      }

  return (
    <>
      <aside className="bg-gray-700 w-100 p-5 sticky top-0 ">
        <div className="flex justify-center items-center pt-10 gap-3">
          <Image alt="logo" height={50} width={80} src={logo} className="bg-white rounded-[100%] p-1" />
          <h1 className="text-5xl font-extrabold text-white">WorkFlow</h1>
          </div>
        <ul className="text-center pt-10 p-20">
          {menu.map((item, id) => (
            <React.Fragment key={id}>
              <Link href={item.href}>
                <li className="mt-15 font-extrabold w-max items-center text-2xl text-white hover:text-black hover:scale-110 transition-all duration-300">
                  {item.label}
                </li>
              </Link>
            </React.Fragment>
          ))}
        </ul>
        <button onClick={handleLogout} className="text-white  text-xl font-bold mt-35 border-transparent w-full p-5 shadow-md">LogOut</button>
      </aside>
    </>
  );
};

export default Sidebar;
