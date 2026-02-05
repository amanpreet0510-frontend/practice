'use client';
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] ">
        {/* <Navbar /> */}
        
        <main className="">{children}</main>
        </div>
    </div>
  )
}
