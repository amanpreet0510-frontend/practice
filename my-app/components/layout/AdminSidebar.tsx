'use client';
import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu.types";
import logo from '../../public/logo.png'
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const menu: MenuItem[] = [
  { label: "Dashboard", href: "/roleBasedDashboard" },
  { label: "User Management", href: "/userManagement" },
  { label: "Hierarchy", href: "/hierarchy" },
  { label: "Directory", href: "/directory" },
  { label: "Settings", href: "/settings" },
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
      <aside className="border-r border-zinc-600 bg-[#0F0E23] w-56 md:w-60 lg:w-80 xl:w-96 p-3 md:p-5 sticky top-0 min-h-screen h-screen flex flex-col shrink-0">
        <div className="flex justify-center items-center pt-6 md:pt-10 gap-2 md:gap-3 shrink-0">
          <Image alt="logo" height={50} width={80} src='/logo w 2.jpg' className="bg-white rounded-2xl h-8 w-12 md:h-10 md:w-14 shrink-0 object-cover" />
          <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold text-white truncate">WorkFlow</h1>
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto py-4">
          <ul className="text-center ps-5 md:ps-10 lg:ps-16 xl:ps-20 space-y-2 md:space-y-4">
            {menu.map((item, id) => (
              <React.Fragment key={id}>
                <Link href={item.href}>
                  <li className="font-extrabold w-max flex items-center gap-3 text-base md:text-lg lg:text-xl xl:text-2xl text-zinc-400 hover:text-white hover:scale-105 transition-all duration-300">
                    {item.label}
                  </li>
                </Link>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="pt-4 shrink-0 border-t border-zinc-700">
          <button onClick={handleLogout} className="text-zinc-400 text-sm md:text-base lg:text-lg xl:text-xl font-bold p-3 md:p-5 w-full py-2 md:py-3 rounded-xl border-l border-r border-2 border-zinc-700 shadow-lg shadow-zinc-700 hover:bg-zinc-300 hover:text-black transition">LogOut</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
