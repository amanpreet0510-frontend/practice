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
      <aside className="border-r border-zinc-600 bg-[#0F0E23] w-100 p-5 sticky top-0 max-h-screen">
        <div className="flex justify-center items-center pt-10 gap-3">
          <Image alt="logo" height={50} width={80} src='/logo w 2.jpg' className="bg-white rounded-2xl " />
          <h1 className="text-5xl font-extrabold text-white">WorkFlow</h1>
        </div>
        <ul className="text-center ps-20 pt-1">
          {menu.map((item, id) => (
            <React.Fragment key={id}>
              <Link href={item.href}>
                <li className="mt-12 font-extrabold w-max flex items-center gap-3 text-2xl text-zinc-400 hover:text-white hover:scale-110 transition-all duration-300">
                  {item.label}
                </li>
              </Link>
            </React.Fragment>
          ))}
        </ul>
        <button onClick={handleLogout} className="text-zinc-400 text-xl font-bold mt-70 p-5 w-full py-3 rounded-xl border-l border-r border-2 border-zinc-700 shadow-lg shadow-zinc-700 hover:bg-zinc-300 hover:text-black transition">LogOut</button>
      </aside>
    </>
  );
};

export default Sidebar;
