'use client';
import React from "react";
import Image from "next/image";
import { MenuItem } from "@/types/menu.types";
import Search from "../ui/Search";
import {Button} from '../ui/button'
 
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useLeaveStore } from "@/store/leaveStore";
import { useEffect } from "react";

import { useAppSelector } from '@/app/hooks'
import { LucideBell } from "lucide-react";




const Navbar = () => {

  //const user = useAppSelector(state => state.profile.data)
 
  const user = useUserStore((s) => s.user);
   const { fetchLeaveBalance } = useLeaveStore();
 
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
  return (
    <>
      <nav className="bg-gradient-to-r from-[#0D091E] to-[#54239B] sticky top-0 z-50 shadow-sm">
        <ul className="">
          {menu.map((item, id) => (
            <React.Fragment key={id}>
              <div className="flex justify-between">
                <div className="p-10">
                <li className="ps-5 text-4xl font-cursive font-bold text-white  rounded-[50px]">{item.label}</li>
                <p className="p-5 text-xl font-cursive  text-zinc-400  rounded-[50px]">Here's what's happening today</p>
                </div>
                <div className="flex justify-between">
                <LucideBell className="text-zinc-100 p-3 rounded-full mt-15 h-15 w-15"/>
                <Image
                    alt=""
                    height={10}
                    width={80}
                    src={user?.image ?? "/default-avatar.png"}
                    className="rounded-[100%]  mt-11 me-10 w-20 h-20"
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
