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
    <div className="flex min-h-screen overflow-x-hidden">
      <div className="hidden md:flex shrink-0">
      <RoleBasedSidebar role={user?.role} />
      </div>
      <div className="flex-1 min-w-0 w-full flex flex-col">
      <Navbar />
        <div className="bg-gradient-to-r from-[#0D091E] to-[#54239B] rounded-2xl m-3 sm:m-4 md:m-5 2xl:ms-10 2xl:me-10 2xl:mt-10 sticky top-0 z-50 shadow-sm p-4 sm:p-5 2xl:p-10">
        <h1 className="text-lg sm:text-xl md:text-2xl 2xl:text-4xl text-white font-bold">Attendance</h1>
        <p className="text-zinc-400 text-sm sm:text-base 2xl:text-lg">Track your work hours</p>
        </div>
        <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
        </div>
    </div>
  )
}
