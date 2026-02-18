'use client';
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import AdminSidebar from '@/components/layout/AdminSidebar';
import HrSidebar from '@/components/layout/HrSidebar';
import Navbar from "@/components/layout/Navbar";
import { useUserStore } from "@/store/userStore";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const { user } = useUserStore();

  function RoleBasedSidebar({ role }: { role?: string }) {
    if (role === "admin") return <AdminSidebar />;
    if (role === "hr") return <HrSidebar />;
    return <Sidebar />;
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <div className="hidden md:block shrink-0"><RoleBasedSidebar role={user?.role}/></div>
      <div className="flex-1 min-w-0 w-full flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="bg-gradient-to-r from-[#0D091E] to-[#54239B] sticky top-16 sm:top-20 z-[99] border-b border-zinc-500 shadow-sm p-3 sm:p-4 md:p-6 lg:p-8 mx-2 sm:mx-4 md:mx-6 lg:mx-10 my-3 sm:my-4 md:my-6 rounded-xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold">Tasks</h1>
          <p className="text-zinc-400 pt-1 sm:pt-2 md:pt-3 text-xs sm:text-sm md:text-base lg:text-lg">Manage and track tasks</p>
        </div>
        <main className="p-3 sm:p-4 md:p-6 lg:p-8 flex-1 min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
