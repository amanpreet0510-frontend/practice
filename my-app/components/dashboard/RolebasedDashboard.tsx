"use client";
import React from "react";
import AdminDashboard from "./AdminDashboard";
import HrDashboard from "./HrDashboard";
import { useUserStore } from "@/store/userStore";



const RolebasedDashboard = () => {

  const user  = useUserStore((state)=>state.user);


 
    return (
      <>
       <AdminDashboard />
       <HrDashboard />;
      </>
  

  
)}
  


export default RolebasedDashboard;
