"use client";
import React, { useState } from "react";
import AdminDashboard from "../roleBasedDashboard/adminDashboard";
import HrDashboard from "../roleBasedDashboard/hrDashboard";
import { useUserStore } from "@/store/userStore";
import EmployeeDashboard from "../roleBasedDashboard/employeeDashboard";

const RolebasedDashboard = () => {
  const user = useUserStore((state) => state.user);
  
if (!user) {
    return <div>Loading...</div>; // or redirect to login
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
