'use client';
import React, { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types/menu.types";
import Search from "../ui/Search";
import { Button } from '../ui/button'
import logo from '@/public/logo w 2.jpg'
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useLeaveStore } from "@/store/leaveStore";
import { useEffect } from "react";

import { useAppSelector } from '@/app/hooks'
import { LucideBell, LucideHam, LucideHamburger, LucideMenu } from "lucide-react";
import { Home, ListTodo, Settings, CalendarClock, Notebook } from "lucide-react";
import Link from "next/link";


const Navbar = () => {

  //const user = useAppSelector(state => state.profile.data)

  const user = useUserStore((s) => s.user);
  const { fetchLeaveBalance } = useLeaveStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalance(user.id);
    }
  }, [user?.id]);



  const menu: MenuItem[] = [
    {
      label: `Hello,${user?.name} `,
      href: "/",
      image: "https://cdn-icons-png.flaticon.com/128/4945/4945989.png",
    },
  ];

  const mobileMenu: MenuItem[] = [
    { label: "Dashboard", href: "/roleBasedDashboard", icon: Home },
    { label: "Employee Directory", href: "/userManagement", icon: Home },
    { label: "Attendance", href: "/attendance", icon: CalendarClock },
    { label: "Leave Request", href: "/leaveRequest", icon: Notebook },
    { label: "Tasks", href: "/assignTask", icon: ListTodo },
    { label: "Documents", href: "/documents", icon: ListTodo },
    { label: "Leave History", href: "/leavehistory", icon: ListTodo },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 shadow-sm bg-[#0F0E23] md:bg-zinc-200 w-full min-w-0">
        <ul className="">
          {menu.map((item, id) => (
            <React.Fragment key={id}>
              <div className="flex justify-between items-start sm:items-center">
                <div className="p-3 sm:p-4 md:p-5 lg:p-10 min-w-0">
                  <div className="flex xl:justify-center xl:items-center p-2 sm:p-4 ps-0 gap-1 md:hidden">
                    <Image alt="logo" height={40} width={80} src={logo} className="h-6 w-8 sm:h-8 sm:w-12 xl:h-12 xl:w-16 shrink-0" />
                    <h1 className="text-xl sm:text-2xl xl:text-4xl font-extrabold text-white truncate">WorkFlow</h1>
                  </div>
                  <li className="ps-3 sm:ps-5 mt-3 sm:mt-5 text-sm sm:text-md md:text-2xl lg:text-3xl xl:text-4xl font-cursive font-bold text-zinc-600 rounded-[50px] hidden md:block truncate">{item.label}</li>
                  <p className="p-3 sm:p-5 pt-1 lg:w-max lg:pt-3 pb-0 text-xs sm:text-sm lg:text-lg xl:text-xl font-cursive text-zinc-500 rounded-[50px] hidden md:block truncate">Here&apos;s what&apos;s happening today</p>
                </div>
                <div className="flex justify-end items-center gap-1 sm:gap-2 p-3 sm:p-4 lg:p-10 shrink-0">
                  <LucideBell className="text-zinc-700 p-2 sm:p-4 lg:p-3 rounded-full mt-2 sm:mt-5 lg:me-4 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 hidden md:block shrink-0" />
                  <LucideMenu className="text-white block me-4 sm:me-10 mt-2 sm:mt-10 w-6 h-6 shrink-0 md:hidden cursor-pointer" onClick={() => setOpen(!open)} aria-label="Toggle menu" />
                  {open && (
                    <>
                      <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
                      <div className="fixed inset-0 top-16 md:top-20 right-0 left-0 md:left-auto md:w-80 bg-zinc-200 z-50 md:rounded-bl-xl overflow-y-auto shadow-xl">
                      <ul className="w-full h-max list-none p-4 sm:p-5 pb-10 border-b border-zinc-400 pt-1">
                        {mobileMenu.map((item, id) => {
                          const Icon = item.icon;
                          return (
                            <Link className="list" href={item.href} key={id} onClick={() => setOpen(false)}>
                              <li className="flex gap-3 list-none mt-4 sm:mt-5 text-sm sm:text-base text-zinc-600 hover:text-zinc-900 py-2">
                                {Icon && <Icon className="w-5 h-5 shrink-0" />}
                                <span>{item.label}</span>
                              </li>
                            </Link>
                          );
                        })}
                      </ul>
                    </div>
                    </>
                  )}
                  <Image
                    alt=""
                    height={40}
                    width={40}
                    src={user?.image ?? "/default-avatar.png"}
                    className="rounded-full mt-2 sm:mt-5 me-2 sm:me-4 lg:me-15 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 hidden md:block shrink-0 object-cover"
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
