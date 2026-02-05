'use client';
import AdminSidebar from "@/components/layout/AdminSidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] shadow-white shadow-lg rounded-2xl p-5 ">
      <AdminSidebar />
      <div className="flex-1 ">
        <main className="">{children}</main>
        </div>
    </div>
  )
}
