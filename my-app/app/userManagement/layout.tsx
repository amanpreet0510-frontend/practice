'use client';
import AdminSidebar from "@/components/layout/AdminSidebar";
import Sidebar from "@/components/layout/Sidebar";
import HrSidebar from "@/components/layout/HrSidebar";
import { useUserStore } from "@/store/userStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const { user } = useUserStore();

  function RoleBasedSidebar({ role }: { role?: string }) {
    if (role === "admin") return <AdminSidebar />;
    if (role === "hr") return <HrSidebar />;
    return <Sidebar />;
  }
  return (
    <div className="flex  shadow-white shadow-lg rounded-2xl">
      <RoleBasedSidebar role={user?.role} />
      <div className="flex-1 ">
        <main className="">{children}</main>
        </div>
    </div>
  )
}
