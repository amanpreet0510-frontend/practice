'use client';
import Sidebar from "@/components/layout/Sidebar";
import AdminSidebar from '@/components/layout/AdminSidebar'
import HrSidebar from '@/components/layout/HrSidebar'
import { useUserStore } from "@/store/userStore";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  const { user } = useUserStore();

  function RoleBasedSidebar({ role }: { role?: string }) {
    if (role === "admin") return <AdminSidebar />;
    if (role === "hr") return <HrSidebar />;
    return <Sidebar />;
  }

  return (
    <div className="flex">
      <div className="hidden md:flex ">
      <RoleBasedSidebar role={user?.role} />
      </div>
      <div className="flex-1 w-full">
      <Navbar />
        <div className="bg-gradient-to-r from-[#0D091E] to-[#54239B] rounded-2xl m-5 2xl:ms-10 2xl:me-10 2xl:mt-10 sticky top-0 z-50 shadow-sm p-5 2xl:p-10 ">
        <h1 className="text-xl 2xl:text-4xl text-white font-bold">Attendance</h1>
        <p className="text-zinc-400 text-md 2xl:text-lg">Track your work hours</p>
        </div>
        <main className="">{children}</main>
        </div>
    </div>
  )
}
