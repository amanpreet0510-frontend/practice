"use client";
import React, { useState } from "react";
import AdminDashboard from "./adminDashboard";
import HrDashboard from "./hrDashboard";
import { useUserStore } from "@/store/userStore";
import EmployeeDashboard from "./employeeDashboard";

const RolebasedDashboard = () => {
  const user = useUserStore((state) => state.user);
 
if (!user) {
    return <div>Loading...</div>; 
  }

      if(user.role==='admin') return <AdminDashboard />
      if(user.role==="hr") return <HrDashboard />
      if(user.role==="employee") return <EmployeeDashboard />
  return (
    <>
    <div>
    no dashboard
      </div>
    </>
  );
};

export default RolebasedDashboard;
