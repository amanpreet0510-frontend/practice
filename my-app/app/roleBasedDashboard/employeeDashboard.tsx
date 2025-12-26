"use client";

import { useEffect, useState } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useLeaveRequestStore } from "../../store/leaveRequest";
import { useUserStore } from "@/store/userStore";
import { Calendar } from "lucide-react";
import Calendar2 from "@/components/ui/Calendar2";
import Task from "@/components/ui/ReadTask";
import Image from "next/image";
import LoggedHoursCard from "@/components/ui/LoggedHoursCard";
import ApplyLeaveCard from "@/components/ui/ApplyleaveCard";
import LeaveDetailsCard from "@/components/ui/LeaveDetailsCard";
import TaskCard from "@/components/ui/TaskCard";

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
        <div className="pt-10 ps-8 flex gap-6">
          <TaskCard />
          <LeaveDetailsCard />
        </div>
        <div className="flex">
          <LoggedHoursCard />
          <Task />
          </div>
          <Calendar2 />
        </div>
    </>
  );
};

export default EmployeeLeaveDashboard;
