"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

import { Card,CardHeader,CardTitle,CardContent } from "@/components/ui/Card";
import { useUserStore } from "@/store/userStore";
import { LucideUser, LucideUserRoundX, LucideUsers } from "lucide-react";

export default function AdminDashboard() {
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
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      
      <div className="grid md:grid-cols-3 gap-6 text-zinc-600 text-2xl">
        <Card className="bg-zinc-300">
          <CardHeader >
            <div className="flex justify-between">
              <div><CardTitle>Total Users</CardTitle></div>
              <div><LucideUsers className=" w-10 h-10"/></div>
              </div>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.totalUsers}
          </CardContent>
        </Card>

        <Card className="bg-zinc-300">
          <CardHeader>
          <div className="flex justify-between">
            <div><CardTitle>Active Users</CardTitle></div>
           <div> <LucideUser className=" w-10 h-10"/></div>
            </div>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.activeUsers}
          </CardContent>
        </Card>

        <Card className="bg-zinc-300">
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
      </div>

      
      <div className="grid md:grid-cols-3 gap-6 text-zinc-600 text-2xl">
        <Card className="bg-zinc-300">
          <CardHeader>
            <CardTitle>Admins</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.admins}</CardContent>
        </Card>

        <Card className="bg-zinc-300">
          <CardHeader>
            <CardTitle>HR</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.hr}</CardContent>
        </Card>

        <Card className="bg-zinc-300">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.employees}
          </CardContent>
        </Card>
      </div>

      
      <Card className="border-zinc-400 bg-zinc-300 ">
        <CardHeader>
          <CardTitle className="text-zinc-600 text-2xl">Recently Invited Users</CardTitle>
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
  );
}
