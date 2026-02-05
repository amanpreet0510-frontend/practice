'use client';
import AdminSidebar from "@/components/layout/AdminSidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-b w-full from-[#0D091E] to-[#54239B]">
        <main className="">{children}</main>
        </div>
    </div>
  )
}
