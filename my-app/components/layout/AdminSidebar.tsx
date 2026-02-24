'use client';
import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu.types";
import logo from '@/public/logo w 2.jpg'
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const menu: MenuItem[] = [
  { label: "Dashboard", href: "/commonLayout/roleBasedDashboard" },
  { label: "User Management", href: "/commonLayout/userManagement" },
  { label: "Hierarchy", href: "/commonLayout/hierarchy" },
  { label: "Directory", href: "/commonLayout/directory" },
  { label: "Settings", href: "/commonLayout/settings" },
];

const Sidebar = () => {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const handleLogout = async () => {

    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <>
        <aside className="border-r border-zinc-600 bg-[#0F0E23] max-w-[25%] w-full p-3 md:p-5 z-60 top-0 h-screen fixed flex flex-col z-10">
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

export default Sidebar;
