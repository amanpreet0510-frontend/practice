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
      <aside className="flex flex-col border-r border-zinc-600 bg-[#0F0E23] w-56 md:w-60 lg:w-80 xl:w-96 p-3 md:p-5 sticky top-0 min-h-screen h-screen shrink-0">
        <div className="flex justify-center items-center pt-6 md:pt-10 gap-2 md:gap-3 shrink-0">
          <Image alt="logo" height={50} width={80} src={logo} className="h-8 w-12 md:h-10 md:w-14 shrink-0" />
          <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold text-white truncate">WorkFlow</h1>
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto py-4">
          <ul className="text-center ps-5 md:ps-10 lg:ps-16 xl:ps-20 space-y-2 md:space-y-4">
            {menu.map((item, id) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={id}>
                  <li className="w-max flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-lg xl:text-xl text-zinc-300 hover:text-white hover:scale-105 transition-all duration-300">
                    {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />}
                    <span className="truncate">{item.label}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
        <div className="pt-4 shrink-0 border-t border-zinc-700">
          <button
            onClick={handleLogout}
            className="flex justify-center text-zinc-400 text-sm md:text-base lg:text-lg p-3 md:p-5 py-2 md:py-3 rounded-xl border-l border-r border-2 border-zinc-700 shadow-lg shadow-zinc-700 bg-transparent hover:bg-zinc-100 transition w-full m-auto">
            LogOut
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
