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





const Navbar = () => {
 
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
      <nav className="bg-[#F4FFC3] sticky top-0 z-50  border-b shadow-sm">
        <ul className="">
          {menu.map((item, id) => (
            <React.Fragment key={id}>
              <div className="flex justify-between">
                <div className="p-10">
                <li className="ps-5 text-3xl font-cursive font-bold text-[#BBC863]  rounded-[50px]">{item.label}</li>
                <p className="p-5 text-xl font-cursive font-semibold text-[#BBC863]  rounded-[50px]">Here's what's happening today</p>
                </div>
                
                <div className="flex justify-between">
                <Image
                    alt=""
                    height={10}
                    width={80}
                    src={user?.image}
                    className="rounded-[100%] border-2 border-white"
                  />
                 
                 <p className="bg-[#F4FFC3] rounded-[100%]  text-xl font-bold h-10 mt-10"><Image alt="prop" height={30} width={40} src='/notification.png'/></p>
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
