"use client";

import React from "react";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useUserStore } from "@/store/userStore";
import { LucideAArrowUp, LucideArrowBigUp, LucideArrowUpRight, LucideCalendar, LucideCircleAlert, LucideUser, LucideUserRoundX, LucideUsers } from "lucide-react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks";
import { RootState } from "@/store";
import { fetchUsersOnLeave } from "@/slices/showLeaveRequest";
import Link from "next/link";

export default function HrDashboard() {

  const dispatch = useAppDispatch();

  const { onLeave, pendingCount, error } = useSelector(
    (state: RootState) => state.leaves
  );
  
  const onLeaveCount=onLeave.length;

  useEffect(() => {
    dispatch(fetchUsersOnLeave());
  }, [dispatch]);

  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    hr: 0,
    employees: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });

  const [recentInvites, setRecentInvites] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const fetchDashboardData = async () => {
    setLoading(true);


    const supabase = getSupabaseClient();
    const { data: users, error } = await supabase
      .from("profiles")
      .select("*")
      .not("email", "is", null)
      .neq("email", "")
      .order("created_at", { ascending: false });


    if (error) {
      console.error("Error fetching users:", error);
      return;
    }

    const total = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const hr = users.filter((u) => u.role === "hr").length;
    const employees = users.filter((u) => u.role === "employee").length;
    const activeUsers = users.filter((u) => u.is_active === true).length;
    const inactiveUsers = users.filter((u) => u.is_active === false).length;


    setStats({
      totalUsers: total,
      admins,
      hr,
      employees,
      activeUsers,
      inactiveUsers,
    });



    setLoading(false);
  };

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <>
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-4 gap-5 md:gap-20 xl:gap-10 2xl:gap-1  md:pt-2 md:p-10 2xl:pe-15 ">
      <div className="text-zinc-400">
        <Card className="h-50 w-full xl:h-50 xl:w-50 2xl:h-50 2xl:w-70 bg-zinc-300 border border-zinc-300 shadow-zinc-500 shadow-xl p-5 pt-10 md:p-10 2xl:p-10">
          <div className="">
            <div className="flex justify-between text-md 2xl:text-xl ">
              <div className="text-blue-600 w-20 md:w-full">On leave Today</div>
              <div className="text-blue-600"><LucideCalendar/></div>
            </div>
            <div className="flex m-5 md:m-10 gap-3">
          <div className="md:text-2xl 2xl:text-4xl text-zinc-600"><p>{onLeaveCount}</p></div>
          <div className="text-zinc-600"><LucideUsers className="md:w-8 md:h-8 2xl:w-10 2xl:h-10"/></div>
          </div>
          </div>
        </Card>
      </div>

      <div className="text-zinc-300 ">
        <Card className="h-50 w-full xl:h-50 xl:w-50 2xl:h-50 2xl:w-70 bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl">
          <div className=" text-zinc-600">
            <div className="text-red-700 flex justify-between text-md  2xl:text-xl px-5 py-2 2xl:px-5 2xl:py-5">
              <div className="w-5 2xl:w-full">Pending Requests</div>
              <div><LucideCircleAlert className="w-8 h-8 2xl:w-10 2xl:h-10"/></div>
            </div>
            <div className="flex m-10 mt-5 gap-3">
          <div className="md:text-4xl"><p>{pendingCount}</p></div>
          <div className=""><LucideUsers className="md:w-8 md:h-8 2xl:w-10 2xl:h-10"/></div>
          </div>  
          </div>
        </Card>
      </div>
      <div className="text-zinc-300">
        <Card className="h-50 w-full xl:h-50 xl:w-50 2xl:h-50 2xl:w-70 bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl">
          <div className=" text-zinc-600">
            <div className="flex justify-between text-sm p-5 md:w-35 ps-5 2xl:p-5 2xl:pb-0  2xl:w-full 2xl:text-xl text-[#312d77]">
              <div><p>Team Directory</p>
              <span className="text-[10px] w-full md:text-sm">Browse team members</span></div>
              
              <div><LucideUsers/></div>
              </div>
            </div>
            <div className="flex justify-center m-auto text-zinc-600">
          <div className="flex justify-around gap-1 border border-zinc-500 p-1 2xl:p-3 text-center rounded-2xl">
            <div><button className="rounded-xl "><Link href="/userManagement" className=" text-sm 2xl:text-md text-blue-900">View Directory</Link></button></div>
            <div><LucideArrowUpRight/></div>
            </div>
          </div>
          
        </Card>
      </div>
      <div className="text-zinc-300">
        <Card className="h-50 w-full xl:h-50 xl:w-50 2xl:h-50 2xl:w-70 bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl">
          <div className=" ">
            <div className="flex justify-between text-sm p-5 md:w-35 ps-5 2xl:p-5 2xl:pb-0  2xl:w-full 2xl:text-xl text-[#312d77]">
              <div><p>Documents</p>
              <span className="text-[10px] w-full md:text-sm">View company documents</span></div>
              <div><LucideUsers className="text-black"/></div>
              </div>
            </div>
            <div className="flex justify-center m-auto">
          <div className="flex justify-around gap-1 border border-zinc-500 p-1 2xl:p-3 text-center rounded-2xl">
            <div><button className="rounded-2xl"><Link href="/documents" className="text-sm 2xl:text-md text-blue-900">View Documents</Link></button></div>
            <div><LucideArrowUpRight/></div>
            </div>
          </div>
        </Card>
      </div>
      </div>
      <div className="mt-15 2xl:me-25 grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-10">
     
        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader >
            <div className="flex justify-between text-lg xl:text-2xl">
              <div><CardTitle>Total Users</CardTitle></div>
              <div><LucideUsers className="w-7 h-7 2xl:w-10 2xl:h-10" /></div>
            </div>
          </CardHeader>
          <CardContent className="text-xl xl:text-3xl font-bold">
            {stats.totalUsers}
          </CardContent>
        </Card>

        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <div className="flex justify-between text-lg xl:text-2xl">
              <div><CardTitle>Active Users</CardTitle></div>
              <div> <LucideUser className="w-7 h-7 2xl:w-10 2xl:h-10" /></div>
            </div>
          </CardHeader>
          <CardContent className="text-xl xl:text-3xl font-bold">
            {stats.activeUsers}
          </CardContent>
        </Card>

        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <div className="flex justify-between text-lg xl:text-2xl">
              <div><CardTitle>Inactive Users</CardTitle></div>
              <div><LucideUserRoundX className="w-7 h-7 2xl:w-10 2xl:h-10" /></div>
            </div>
          </CardHeader>
          <CardContent className="text-xl xl:text-3xl font-bold">
            {stats.inactiveUsers}
          </CardContent>
        </Card>
      


     
        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <CardTitle className="text-lg 2xl:text-2xl ">Admins</CardTitle>
          </CardHeader>
          <CardContent className="text-xl xl:text-3xl font-bold">{stats.admins}</CardContent>
        </Card>

        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <CardTitle className="text-lg 2xl:text-2xl ">HR</CardTitle>
          </CardHeader>
          <CardContent className="text-xl xl:text-3xl font-bold">{stats.hr}</CardContent>
        </Card>

        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <CardTitle className="text-lg 2xl:text-2xl ">Employees</CardTitle>
          </CardHeader>
          <CardContent className="text-xl xl:text-3xl font-bold">
            {stats.employees}
          </CardContent>
        </Card>
      
      

      
    </div>
    <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl  mt-15 me-0 2xl:me-25 lg:mb-10 w-full lg:w-full">
        <CardHeader>
          <CardTitle className="text-zinc-600 md:text-2xl">Recently Invited Users</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
