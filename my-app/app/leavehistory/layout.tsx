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
        <main className="">{children}</main>
        </div>
    </div>
  )
}
