'use client';
import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu.types";
import logo from '../../public/logo.png'
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";    

const menu: MenuItem[] = [
  { label: "Dashboard", href: "/roleBasedDashboard", image: '' },
  { label: "Attendance", href: "/attendance", image: '' },
  { label: "Leave Request", href: "/leaveRequest", image: '' },
  { label: "Tasks", href: "/tasks", image: '' },
  { label: "Settings", href: "/roleBasedDashboard", image: '' },
];



const Sidebar = () => {

  const handleLogout = async () => {
    const router = useRouter();
        await supabase.auth.signOut();
        router.replace("/login");
        router.refresh();
      }

  return (
    <>
      <aside className="bg-[#BBC863] w-100 p-5 sticky top-0 h-screen">
        <div className="flex justify-center items-center pt-10 gap-3">
          <Image alt="logo" height={50} width={80} src={logo} className="bg-[#F4FFC3] rounded-[100%] p-1" />
          <h1 className="text-5xl font-extrabold text-[#F4FFC3]">WorkFlow</h1>
          </div>
        <ul className="text-center pt-10 p-20">
          {menu.map((item, id) => (
            <React.Fragment key={id}>
              <Link href={item.href}>
                <li className="mt-15 font-extrabold w-max items-center text-2xl text-[#F4FFC3] hover:text-black hover:scale-110 transition-all duration-300">
                  {item.label}
                </li>
              </Link>
            </React.Fragment>
          ))}
        </ul>
        <button onClick={handleLogout} className="text-[#F4FFC3]  text-xl font-bold mt-35 border-transparent w-full p-5 shadow-md">LogOut</button>
      </aside>
    </>
  );
};

export default Sidebar;
