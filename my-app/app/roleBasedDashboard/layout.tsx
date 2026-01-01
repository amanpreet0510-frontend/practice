'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { fetchProfile } from '@/slices/profileSlice'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
