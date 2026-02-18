'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu.types";
import logo from '@/public/logo w 2.jpg'
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { Home, ListTodo, Settings, CalendarClock, Notebook } from "lucide-react";

const menu: MenuItem[] = [
  { label: "Dashboard", href: "/commonLayout/roleBasedDashboard", icon: Home },
  { label: "Employee Directory", href: "/commonLayout/directory", icon: Home },
  { label: "Attendance", href: "/commonLayout/attendance", icon: CalendarClock },
  { label: "Leave Request", href: "/commonLayout/leaveRequest", icon: Notebook },
  { label: "Tasks", href: "/commonLayout/assignTask", icon: ListTodo },
  { label: "Documents", href: "/commonLayout/documents", icon: ListTodo },
  { label: "Leave History", href: "/commonLayout/leavehistory", icon: ListTodo },
  { label: "Settings", href: "/commonLayout/settings", icon: Settings },
];


const HrSidebar = () => {
  const router = useRouter();

  const user = useUserStore((s) => s.user);

  const handleLogout = async () => {

    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  

  return (
    <>
      <aside className="border-r border-zinc-600 bg-[#0F0E23] max-w-[25%] w-full p-3 md:p-5 z-60 top-0 h-screen fixed flex flex-col">
        <div className="flex justify-center items-center pt-6 md:pt-10 gap-2 md:gap-3 shrink-0">
          <Image alt="logo" height={50} width={80} src={logo} className="h-8 w-12 md:h-10 md:w-14 xl:h-12 xl:w-16 shrink-0" />
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-white truncate">WorkFlow</h1>
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto py-4">
          <ul className="text-center ps-3 md:ps-5 xl:ps-10 space-y-2 md:space-y-4 mt-5">
            {menu.map((item, id) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={id}>
                  <li className="w-max flex items-center gap-2 mt-10 md:gap-3 text-sm md:text-base lg:text-lg xl:text-xl text-zinc-400 hover:text-white hover:scale-105 transition-all duration-300">
                    {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />}
                    <span className="truncate">{item.label}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
        <div className="pt-4 shrink-0 border-t border-zinc-700">
          <button onClick={handleLogout} className="flex justify-center m-auto text-zinc-400 text-sm md:text-base lg:text-lg p-3 md:p-5 py-2 md:py-3 rounded-xl border-l border-r border-2 border-zinc-700 shadow-lg shadow-zinc-700 bg-transparent hover:bg-zinc-100 transition w-full">LogOut</button>
        </div>
      </aside>
    </>
  );
};

export default HrSidebar;
