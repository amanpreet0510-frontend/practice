'use client';
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
    <div className="flex">
      <RoleBasedSidebar role={user?.role} />
      <div className="flex-1">
        {/* <Navbar /> */}
        <div className="bg-gradient-to-r from-[#0D091E] to-[#54239B] rounded-2xl m-5 sticky top-0 z-50 shadow-sm  p-10 ">
        <h1 className="text-4xl text-white font-bold">Attendance</h1>
        <p className="text-zinc-400 text-lg">Track your work hours</p>
        </div>
        <main className="">{children}</main>
        </div>
    </div>
  )
}
