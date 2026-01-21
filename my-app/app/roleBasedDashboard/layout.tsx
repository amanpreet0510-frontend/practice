'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { fetchProfile } from '@/slices/profileSlice'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useUserStore } from "@/store/userStore";


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()
  const { user } = useUserStore();


  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

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
