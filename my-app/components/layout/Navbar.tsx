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
      <nav className="sticky top-0 z-100 shadow-sm bg-[#0F0E23] md:bg-zinc-200   w-full">
        <ul className="">
          {menu.map((item, id) => (
            <React.Fragment key={id}>
              <div className="flex justify-between md:justify-between">
                <div className="p-5 lg:p-10">
                  <div className="flex xl:justify-center xl:items-center p-4 ps-0 gap-1 md:hidden">
                    <Image alt="logo" height={40} width={80} src={logo} className="h-6 w-8  xl:h-15 xl:w-20" />
                    <h1 className="text-2xl xl:text-5xl font-extrabold text-white">WorkFlow</h1>
                  </div>
                  <li className="ps-5 mt-5 text-md md:text-2xl lg:text-4xl font-cursive font-bold text-zinc-600  rounded-[50px] hidden md:block">{item.label}</li>
                  <p className="p-5 pt-1 lg:w-max lg:pt-3 pb-0 text-sm lg:text-xl font-cursive  text-zinc-500  rounded-[50px] hidden md:block ">Here's what's happening today</p>
                </div>
                <div className="flex justify-between gap-1 lg:p-10">
                  <LucideBell className="text-zinc-700 p-4 lg:p-3 rounded-full mt-5 lg:me-4 h-18 w-15 hidden md:block" />
                  <LucideMenu className="text-white block me-10 md:hidden mt-10" onClick={() => setOpen(!open)} />
                  {open && <div className="bg-zinc-200 text-white absolute right-0 top-25 ps-5 pe-5  w-full  ">
                    <ul className="w-full h-max list-none   pb-10 border-b border-zinc-400 pt-1">
                      {mobileMenu.map((item, id) => {
                        const Icon = item.icon;
                        return (
                          <Link className="list" href={item.href} key={id}>
                            <li className="flex gap-3  list-none mt-5 text-sm text-zinc-500">
                              {Icon && <Icon className="w-3 h-5" />}
                              <span>{item.label}</span>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>}
                  <Image
                    alt=""
                    height={10}
                    width={80}
                    src={user?.image ?? "/default-avatar.png"}
                    className="rounded-[100%]  mt-5 me-15   w-20 h-20 hidden md:block"
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
