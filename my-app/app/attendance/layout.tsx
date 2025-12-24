'use client';
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 ">
        {/* <Navbar /> */}
        <div className="bg-[#F4FFC3] sticky top-0 z-50  border-b shadow-sm  p-10 ">
        <h1 className="text-2xl text-[#BBC863] font-bold">Attendance</h1>
        <p className="text-[#BBC863] text-lg">Track your work hours</p>
        </div>
        <main className="">{children}</main>
        </div>
    </div>
  )
}
