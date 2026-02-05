"use client";

import { useEffect, useState } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useUserStore } from "@/store/userStore";
import Calendar2 from "@/components/ui/Calendar2";
import Task from "@/components/ui/ReadTask";
import LeaveDetailsCard from "@/components/ui/LeaveDetailsCard";
import TaskCard from "@/components/ui/TaskCard";
import LoggedHoursCard from "@/components/ui/LoggedHoursCard";


interface AttendanceSession {
  id: string;
  user_id: string;
  login_time: string;
  logout_time: string | null;
}


const EmployeeLeaveDashboard = () => {


  const [sessions, setSessions] = useState<AttendanceSession[]>([]);

  const user = useUserStore((s) => s.user);
  const { fetchLeaveBalance } = useLeaveStore();

  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalance(user.id);
    }
  }, [user?.id]);

  return (
    <>
      <div className="bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] shadow-white shadow-lg rounded-2xl p-5">
        <div className="pt-10 ps-8 gap-6 grid grid-cols-3 ">
          <TaskCard />
          <Task />
        </div>
        <div className="flex">
          {/* <LoggedHoursCard /> */}
          <LeaveDetailsCard />
          </div>
          <Calendar2 />
        </div>
    </>
  );
};

export default EmployeeLeaveDashboard;
