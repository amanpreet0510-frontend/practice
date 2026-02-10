'use client';
import React  from "react";
import Sidebar from "@/components/layout/Sidebar";
import AdminSidebar from '@/components/layout/AdminSidebar'
import HrSidebar from '@/components/layout/HrSidebar'
import { useUserStore } from "@/store/userStore";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const { user } = useUserStore();

  function RoleBasedSidebar({ role }: { role?: string }) {
    if (role === "admin") return <AdminSidebar />;
    if (role === "hr") return <HrSidebar />;
    return <Sidebar />;
  }

  return (
    <div className="flex ">
      <RoleBasedSidebar role={user?.role}/>
      <div className="flex-1">
        <div className="bg-gradient-to-r from-[#0D091E] to-[#54239B] sticky top-0 z-100  border-b border-zinc-500 shadow-sm  p-10">
        <h1 className="text-5xl text-white font-bold">Tasks</h1>
        <p className="text-zinc-300 pt-5 text-xl">Manage and track tasks</p>
        </div>
        <main className="">{children}</main>
        </div>
    </div>
  )
}
