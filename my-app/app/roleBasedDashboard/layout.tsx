'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { fetchProfile } from '@/slices/profileSlice'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  //const { user } = useUserStore();
  const user = useUserStore((state) => state.user);


  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

console.log('user?.first_time', user?.first_time)

useEffect(() => {
  if (!user) return;

  if (user.first_time) {
    router.replace("/createProfile");
  } else {
    router.replace("/roleBasedDashboard");
  }
}, [user, router]);


  return (
    <div className="flex ">
      {user?.role==="admin"?<AdminSidebar/>:<Sidebar/>}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
