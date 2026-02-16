"use client";

import React, { useEffect, useState } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useUserStore } from "@/store/userStore";
import Calendar2 from "@/components/ui/Calendar2";
import Task from "@/components/ui/ReadTask";
import LeaveDetailsCard from "@/components/ui/LeaveDetailsCard";
import TaskCard from "@/components/ui/TaskCard";
import LoggedHoursCard from "@/components/ui/LoggedHoursCard";
import { Card } from "@/components/ui/Card";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchAttendanceSessions, loginAttendance, logoutAttendance, fetchTodayLogin } from "@/slices/attendanceSessions";
import { fetchUsersOnLeave } from "@/slices/showLeaveRequest";
import QuickActions from "@/components/ui/QuickActions";


interface AttendanceSession {
  id: string;
  user_id: string;
  login_time: string;
  logout_time: string | null;
}


const EmployeeLeaveDashboard = () => {

  const dispatch = useAppDispatch();

  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user?.id) return;
    dispatch(fetchAttendanceSessions(user.id));
    dispatch(loginAttendance(user.id));
    dispatch(fetchTodayLogin(user?.id));

  }, [dispatch, user?.id]);

  const { sessions, currentSession, loading, login_time } = useAppSelector(
    (state) => state.attendanceSessions
  );
  
  const { fetchLeaveBalance } = useLeaveStore();

  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalance(user.id);
    }
  }, [user?.id]);

  return (
    <>
      <div className=" rounded-2xl z-20 ">
        <div className="pt-5 gap-6 grid grid-cols-4 ">
          <Card className="hover:bg-zinc-300 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20">
            <h3 className="text-purple-900 font-bold font-playfair text-xl">Attendance Today</h3>
            <h2 className={`font-bold text-3xl ${login_time ? 'text-green-700':'text-red-700'}`}>{login_time?'Present':'Absent'}</h2>
            <p className="text-zinc-500 text-sm">Clocked in at {login_time
              ? new Date(login_time).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              : "Not Marked"}
            </p>
          </Card>
          <Card className="hover:bg-zinc-300 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20">
          <h3 className="text-purple-900 font-bold font-playfair text-xl">Annual leave</h3>
          <h2 className=''></h2>
          <div className=" bg-blue-500 transition-all h-1" ></div>
          </Card>
          <TaskCard/>
        </div>
        <QuickActions/>
        <Calendar2 />
      </div>
    </>
  );
};

export default EmployeeLeaveDashboard;
