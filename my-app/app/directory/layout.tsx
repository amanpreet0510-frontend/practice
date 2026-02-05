'use client';
import AdminSidebar from "@/components/layout/AdminSidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <AdminSidebar />
      <div className="flex-1 ">
        <main className="">{children}</main>
        </div>
    </div>
  )
}
