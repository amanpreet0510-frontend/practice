'use client';
import React,{useEffect, useState} from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "./button";
import { Calendar, Clock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { loginTime, logoutTime } from "@/lib/attendanceSlice";
import { supabase } from "@/lib/supabaseClient";

 export const AttenadanceCard =  () => {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log('user', user)
     };

    fetchUser();
    
  }, []);

useEffect(()=>{ 
  const fetchData=async()=>{
  const { data, error } =await supabase
  .from("attendance")
  .insert({
    user_id: ' ',
    login_time: new Date().toISOString(),
  })
  .select()
  ;
  console.log('data', data);
  console.log('error', error);

if (error) console.error(error);
else console.log("New session:", data);}
fetchData() 
},[])
 
  
  const attendance = useSelector(
    (state: RootState) => state.attendance.activeSessionId
  );
  const dispatch = useDispatch();

  const handleLogin = () => {
  
    dispatch(
      loginTime({
        sessionId:data.id,
        loginId: data.loginId,
      })
    );
  };

  useEffect(() => {
    console.log("Attendance state:", attendance);
  }, [attendance]);

  return (
    <>
      <button >login</button>
      <Card className="p-5 m-5">
        <div className="flex justify-between">
          <div>
            <CardHeader className="text-2xl font-semibold">
              Today's Status
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formattedDate}</p>
            </CardContent>
            <p className="text-xl font-semibold p-6">
              You haven't checked in yet today.
            </p>
          </div>
          <div>
            <Button className="bg-[#BBC863] m-10 h-15 w-100">
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-log-in w-5 h-5"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" x2="3" y1="12" y2="12"></line>
              </svg>
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-around">
        <Card className="mt-15">
          <div className="flex justify-between gap-10 p-10 m-5">
            <h1>Days This Week</h1>
            <span>
              <Calendar className="bg-blue-200 rounded-2xl p-1 h-10 w-10" />
            </span>
          </div>
        </Card>
        <Card className="mt-15">
          <div className="flex justify-between gap-10 p-10 m-5">
            <h1>Hours This Week</h1>
            <span>
              <Clock className="bg-yellow-200 rounded-2xl p-1 h-10 w-10" />
            </span>
          </div>
        </Card>
        <Card className="mt-15">
          <div className="flex justify-between gap-10 p-10 m-5">
            <h1>Average Hours/Day</h1>
            <span>
              <Clock className="bg-green-200 rounded-2xl p-1 h-10 w-10" />
            </span>
          </div>
        </Card>
      </div>
      {/* attendance history     */}
      <div className="m-10">
        <Card>
          <h1 className="text-2xl ps-10 pt-5">Attendance History</h1>
          <Card className="ms-5 me-5">
            <div className="flex justify-around text-xl font-bold">
              <h2>Date</h2>
              <h2>Check In</h2>
              <h2>Check Out</h2>
              <h2>Duration</h2>
            </div>
          </Card>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No attendance records yet</p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AttenadanceCard;
