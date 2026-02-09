'use client';
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 ">
        {/* <Navbar /> */}
        <div className="bg-gradient-to-r from-[#0D091E] to-[#54239B] sticky top-0 z-100  border-b border-zinc-500 shadow-sm  p-10">
        <h1 className="text-5xl text-white font-bold">Tasks</h1>
        <p className="text-zinc-300 pt-5 text-xl">Manage and track tasks</p>
        </div>
        <main className="">{children}</main>
        </div>
    </div>
  )
}
