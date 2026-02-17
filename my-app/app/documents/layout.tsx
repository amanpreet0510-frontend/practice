'use client';
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import HrSidebar from "@/components/layout/HrSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <div className="hidden md:block shrink-0">
        <HrSidebar />
      </div>
      <div className="flex-1 min-w-0 w-full flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1 min-w-0 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
