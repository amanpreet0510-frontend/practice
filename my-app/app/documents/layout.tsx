'use client';
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import HrSidebar from "@/components/layout/HrSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <HrSidebar/>
      <div className="flex-1">
        <main className="">{children}</main>
      </div>
    </div>
  )
}
