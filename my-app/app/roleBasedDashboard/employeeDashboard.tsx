"use client";

import { useEffect, useState } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useLeaveRequestStore } from "../../store/leaveRequest";
import { useUserStore } from "@/store/userStore";
import { Calendar } from "lucide-react";
import Calendar2 from "@/components/ui/Calendar2";
import Task from "@/components/ui/ReadTask";
import { Card } from "../../components/ui/Card";
import Image from "next/image";
import LoggedHoursCard from "@/components/ui/LoggedHoursCard";
import ApplyLeaveCard from "@/components/ui/ApplyleaveCard";
import LeaveDetailsCard from "@/components/ui/LeaveDetailsCard";

const EmployeeLeaveDashboard = () => {
 const user = useUserStore((s) => s.user);
  const { fetchLeaveBalance } = useLeaveStore();

  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalance(user.id);
    }
  }, [user?.id]);


  return (
    <>
        <div className="bg-[#F4FFC3]">
     
    <div className="ps-6 pe-6 flex flex-col md:flex-row gap-6 justify-center items-center">
          <LoggedHoursCard />
         <Task />
         <LeaveDetailsCard />
         </div>
         <Calendar2 />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
           
      <ApplyLeaveCard />
      
    </div>
         
        
       
      </div>
    </>
  );
};

export default EmployeeLeaveDashboard;
