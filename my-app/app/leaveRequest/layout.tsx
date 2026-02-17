'use client';
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import AdminSidebar from '@/components/layout/AdminSidebar';
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
    <div className="flex min-h-screen overflow-x-hidden">
     <div className="hidden md:block shrink-0"><RoleBasedSidebar role={user?.role} /></div>
      <div className="flex-1 min-w-0 w-full">
        <Navbar />
        <main className="p-4 sm:p-6 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
