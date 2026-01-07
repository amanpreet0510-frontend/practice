"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card,CardHeader,CardTitle,CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";

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

    // 1️⃣ Get all users from "profiles" table
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

    // 2️⃣ Calculate stats
    const total = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const hr = users.filter((u) => u.role === "hr").length;
    const employees = users.filter((u) => u.role === "employee").length;

    const activeUsers = users.filter((u) => u.is_active === true).length;
    const inactiveUsers = users.filter((u) => u.is_active === false).length;

    // 3️⃣ Save stats in state
    setStats({
      totalUsers: total,
      admins,
      hr,
      employees,
      activeUsers,
      inactiveUsers,
    });

    // 4️⃣ Save last 5 invited users
    //setRecentInvites(users.slice(0, 5));

    setLoading(false);
  };

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* ---- Stats Cards ---- */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.totalUsers}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.activeUsers}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inactive Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.inactiveUsers}
          </CardContent>
        </Card>
      </div>

      {/* ---- Roles Stats ---- */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Admins</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.admins}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HR</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.hr}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {stats.employees}
          </CardContent>
        </Card>
      </div>

      {/* ---- Recent Invited Users ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Invited Users</CardTitle>
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
