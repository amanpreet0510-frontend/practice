'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu.types";
import logo from '@/public/logo w 2.jpg'
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { titleValues } from "@/types/menu.types";
import { Home, ListTodo, Settings, CalendarClock, Notebook } from "lucide-react";

const menu: MenuItem[] = [
  { label: "Dashboard", href: "/roleBasedDashboard", icon: Home },
  { label: "Attendance", href: "/attendance", icon: CalendarClock },
  { label: "Leave Request", href: "/leaveRequest", icon: Notebook },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
  { label: "Settings", href: "/settings", icon: Settings },
];


const Sidebar = () => {
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
      <aside className="flex flex-col border-r border-zinc-600 bg-[#0F0E23] w-100 p-5 sticky top-0 h-screen">
        <div className="flex justify-center items-center pt-10 gap-3">
          <Image alt="logo" height={50} width={80} src={logo} className="" />
          <h1 className="text-5xl font-extrabold text-white">WorkFlow</h1>
        </div>
        <ul className="text-center ps-20 pt-10">
          {menu.map((item, id) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={id}>
                <li className="mt-10  w-max flex items-center gap-3 text-xl text-zinc-300 hover:text-white hover:scale-110 transition-all duration-300">
                  {Icon && <Icon className="w-6 h-6" />}
                  <span>{item.label}</span>
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex justify-center text-zinc-400 text-lg p-5 py-3 rounded-xl 
                 border-l border-r border-2 border-zinc-700 
                 shadow-lg shadow-zinc-700 bg-transparent
                 hover:bg-zinc-100 transition w-full m-auto">
            LogOut
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
