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
import { Home,ListTodo,Settings,CalendarClock,Notebook } from "lucide-react";

const menu: MenuItem[] = [
  { label: "Dashboard", href: "/roleBasedDashboard", icon: Home },
  { label: "Attendance", href: "/attendance", icon: CalendarClock  },
  { label: "Leave Request", href: "/leaveRequest", icon:Notebook },
  { label: "Tasks", href: "/tasks", icon:ListTodo},
  { label: "Settings", href: "/settings", icon:Settings},
];



const Sidebar = () => {
  const router = useRouter();

  const user = useUserStore((s) => s.user);

  const title: titleValues[] = [
    {
      label: `${user?.name} `,
      role: `${user?.role}`
    },
  ];



  const handleLogout = async () => {

    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      <aside className="border-r border-zinc-600 bg-[#0F0E23] w-100 p-5 sticky top-0 max-h-screen">
        <div className="flex justify-center items-center pt-10 gap-3">
          <Image alt="logo" height={50} width={80} src={logo} className="" />
          <h1 className="text-5xl font-extrabold text-white">WorkFlow</h1>
        </div>
        <ul className="text-center ps-20 pt-1">
          {menu.map((item, id) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={id}>
                <li className="mt-15 font-extrabold w-max flex items-center gap-3 text-2xl text-zinc-400 hover:text-white hover:scale-110 transition-all duration-300">
                  {Icon && <Icon className="w-6 h-6" />}
                  <span>{item.label}</span>
                </li>
              </Link>
            );
          })}
        </ul>

        <button onClick={handleLogout} className="text-zinc-400 text-xl font-bold mt-70 p-5 w-full py-3 rounded-xl border-l border-r border-2 border-zinc-700 shadow-lg shadow-zinc-700 hover:bg-zinc-900 transition">LogOut</button>
      </aside>
    </>
  );
};

export default Sidebar;
