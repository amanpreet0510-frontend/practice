"use client";

import React from "react";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user.types";
import { LucideCalendar, LucideCircleAlert, LucideUser, LucideUserRoundX, LucideUsers } from "lucide-react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks";
import { RootState } from "@/store";
import { fetchUsersOnLeave } from "@/slices/showLeaveRequest";

export default function HrDashboard() {

  const dispatch = useAppDispatch();

  const { onLeave, pendingCount, error } = useSelector(
    (state: RootState) => state.leaves
  );
  
  const onLeaveCount=onLeave.length;

//console.log('leaves', onLeave);


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

    const typedUsers = (users ?? []) as User[];
    const total = typedUsers.length;
    const admins = typedUsers.filter((u: User) => u.role === "admin").length;
    const hr = typedUsers.filter((u: User) => u.role === "hr").length;
    const employees = typedUsers.filter((u: User) => u.role === "employee").length;
    const activeUsers = typedUsers.filter((u: User) => u.is_active === true).length;
    const inactiveUsers = typedUsers.filter((u: User) => u.is_active === false).length;


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
            <div className="flex m-10 gap-3">
          <div className="text-4xl"><p>{pendingCount}</p></div>
          <div className=""><LucideUsers className="w-10 h-10"/></div>
          </div>
          </div>
        </Card>
      </div>
      </div>
      <div className="mt-15 2xl:me-25 grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-10">
     
        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader >
            <div className="flex justify-between">
              <div><CardTitle>Total Users</CardTitle></div>
              <div><LucideUsers className=" w-10 h-10" /></div>
            </div>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.totalUsers}
          </CardContent>
        </Card>

        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <div className="flex justify-between">
              <div><CardTitle>Active Users</CardTitle></div>
              <div> <LucideUser className=" w-10 h-10" /></div>
            </div>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.activeUsers}
          </CardContent>
        </Card>

        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <div className="flex justify-between">
              <div><CardTitle>Inactive Users</CardTitle></div>
              <div><LucideUserRoundX className=" w-10 h-10" /></div>
            </div>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.inactiveUsers}
          </CardContent>
        </Card>
      


     
        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <CardTitle>Admins</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.admins}</CardContent>
        </Card>

        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <CardTitle>HR</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.hr}</CardContent>
        </Card>

        <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl w-full lg:w-full">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.employees}
          </CardContent>
        </Card>
      
      

      
    </div>
    <Card className="bg-zinc-300 border-zinc-300 shadow-zinc-500 shadow-xl  mt-15 me-0 2xl:me-25 lg:mb-10 w-full lg:w-full">
        <CardHeader>
          <CardTitle className="text-zinc-600 md:text-2xl">Recently Invited Users</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <ul className="space-y-3">
            {recentInvites.map((u:any) => (
              <li
                key={u.id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>

                <span className="text-xs px-2 py-1 rounded bg-gray-200">
                  {u.role}
                </span>
              </li>
            ))}
          </ul> */}

        </CardContent>
      </Card>
    </div>
    </>
  );
}
