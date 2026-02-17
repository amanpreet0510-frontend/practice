'use client';
import AdminSidebar from "@/components/layout/AdminSidebar";
import Sidebar from "../dashboardppr/Sidebar";
import HrSidebar from "@/components/layout/HrSidebar";
import { useUserStore } from "@/store/userStore";
import Navbar from "@/components/layout/Navbar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const { user, setUser } = useUserStore();

  function RoleBasedSidebar({ role }: { role?: string }) {
    if (role === "admin") return <AdminSidebar />;
    if (role === "hr") return <HrSidebar />;
    return <Sidebar />;
  }

  return (
    <div className="flex ">
      <div className=" hidden md:block">
      <RoleBasedSidebar role={user?.role} />
      </div>
      
      <div className="flex flex-col flex-1 w-full">
        <Navbar />
        <main className="xl:p-5 w-full 2xl:p-5">{children}</main>
      </div>
    </div>
  )
}
