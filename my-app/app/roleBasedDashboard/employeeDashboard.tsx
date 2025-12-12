import React from "react";
import { useUserStore } from "@/store/userStore";
import { supabase } from "../../lib/supabaseClient";
import { User } from "../../types/user.types";
import Card1 from "@/components/ui/Card1";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

const EmployeeDashboard = () => {
  const user = useUserStore((state) => state.user);
  console.log("user", user);

  return (
    <>
      <div className="flex justify-between bg-blue-300 p-8">
        <h1 className="text-2xl font-bold "> Welcome:{user?.name}</h1>
        <h1 className="text-2xl font-bold ">Role: {user?.role}</h1>
        <Image
          alt="user"
          height={50}
          width={50}
          src={user?.image ?? ""}
          className="rounded-2xl p-5 bg-white"
        />
      </div>
       <Card className="mt-5">
          
        </Card>
      {/* <div className=" ">
        <div>
          <h1 className="text-2xl font-bold bg-blue-300 p-10 flex justify-center">Welcome {user?.name}</h1>
         </div>
        <Card className="mt-5">
          <div className="items-center"> 
          <CardTitle className="text-2xl p-20 font-black">{user?.name}</CardTitle>
          <Image alt="user" height={50} width={50} src={user?.image ?? ""}/>
          <CardContent className="text-2xl p-20 font-black" >{user?.role}</CardContent>
          </div>
        </Card>
      </div> */}
    </>
  );
};

export default EmployeeDashboard;
