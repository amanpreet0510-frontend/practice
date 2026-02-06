'use client';
import AdminSidebar from "@/components/layout/AdminSidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  shadow-white shadow-lg rounded-2xl">
      <AdminSidebar />
      <div className="flex-1 ">
        <main className="">{children}</main>
        </div>
    </div>
  )
}
