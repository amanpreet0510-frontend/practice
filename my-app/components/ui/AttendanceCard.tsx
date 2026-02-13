"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "./button";
import { Calendar, Clock } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { fetchAttendanceSummary } from "@/slices/attendanceHours";
import { useAppSelector,useAppDispatch } from "@/app/hooks";
import { fetchAttendanceSessions, loginAttendance, logoutAttendance } from "@/slices/attendanceSessions";

interface AttendanceSession {
  id: string;
  user_id: string;
  login_time: string;
  logout_time: string | null;
}

export const AttenadanceCard = () => {

  const dispatch = useAppDispatch();
  
  const user = useUserStore((s) => s.user);
  

  useEffect(() => {
    if (!user?.id) return;
  
    dispatch(fetchAttendanceSummary(user.id));
    dispatch(fetchAttendanceSessions(user.id));
  
  }, [dispatch, user?.id]);
  
  
  const { summary } = useAppSelector(
    (state) => state.summary
  );

  const { sessions, currentSession, loading } = useAppSelector(
    (state) => state.attendanceSessions
  );
  


  const getMonday = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay(); 
  
    const diff = day === 0 ? -6 : 1 - day; 
    d.setDate(d.getDate() + diff);
  
    d.setHours(0, 0, 0, 0);
    return d;
  };
  
  const currentWeekStart = getMonday(new Date());

  const currentWeek = summary.find((s) => {
    const weekStart = new Date(s.week_start_date);
    weekStart.setHours(0, 0, 0, 0);
  
    return weekStart.getTime() === currentWeekStart.getTime();
  });
  

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const handleLogin = async () => {
    if (!user?.id) {
      alert("Error: Unable to get user information");
      return;
    }
    if (currentSession) {
      alert("You are already logged in!");
      return;
    }
    await dispatch(loginAttendance(user.id));
  };

  const handleLogout = async () => {
    if (!currentSession) {
      alert("No active session to logout from");
      return;
    }
    await dispatch(logoutAttendance(currentSession.id));
  };

  

  return (
    <>
    <div className="ps-15 pe-15 pt-0 rounded-2xl">
      <Card className="p-5 mt-10 mb-3 rounded-2xl bg-zinc-100 border-zinc-300 text-zinc-600">
        <div className="flex justify-between">
          <div>
            <CardHeader className="text-2xl font-semibold">
              Today&apos;s Status
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formattedDate}</p>
            </CardContent>
            {currentSession ? (
              <div className="p-6">
                <p className="text-xl font-semibold text-green-600">
                  Checked in at:{" "}
                  {new Date(currentSession.login_time).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Status: Currently Working
                </p>
              </div>
            ) : (
              <p className="text-xl font-semibold p-6">
                You haven&apos;t checked in yet today.
              </p>
            )}
          </div>
          <div>
            {currentSession ? (
              <Button
                onClick={handleLogout}
                disabled={loading}
                className="bg-zinc-700 text-zinc-300 text-xl hover:bg-red-600 m-10 h-15 w-100"
              >
                {loading ? "Logging out..." : "Logout"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-out w-5 h-5 ml-2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" x2="9" y1="12" y2="12"></line>
                </svg>
              </Button>
            ) : (
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="text-zinc-300 font-bold text-xl bg-gradient-to-r from-[#0D091E] to-[#54239B] hover:bg-[#4E2190] m-10 h-15 w-100"
              >
                {loading ? "Logging in..." : "Login"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-in w-5 h-5 ml-2"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" x2="3" y1="12" y2="12"></line>
                </svg>
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-10">
      
        <Card className="mt-8 bg-zinc-200 text-zinc-800 text-lg font-manrope  border-zinc-300">
          <div>
          <div className="flex justify-between gap-10 p-10 m-5">
            <h1>Days This Week</h1>
            <span>
              <Calendar className="rounded-2xl p-1 h-10 w-10" />
            </span>
            </div>
            <span className="flex ms-15 mb-5 -mt-10">{currentWeek?.total_days}</span>
          </div>
        </Card>
        <Card className="mt-8 bg-zinc-200 text-zinc-800 text-lg font-manrope  border-zinc-300">
          <div>
          <div className="flex justify-between gap-10 p-10 m-5">
            <h1>Hours This Week</h1>
            <span>
              <Clock className="rounded-2xl p-1 h-10 w-10" />
            </span>
          </div>
          <span className="flex ms-15 mb-5 -mt-10">{currentWeek?.total_hours}</span>
          </div>
        </Card>
        <Card className="mt-8 bg-zinc-200 text-zinc-800 text-lg font-manrope  border-zinc-300">
          <div>
          <div className="flex justify-between gap-10 p-10 m-5">
            <h1>Average Hours/Day</h1>
            <span>
              <Clock className="rounded-2xl p-1 h-10 w-10" />
            </span>
            </div>
            <span className="flex ms-15 mb-5 -mt-10">{currentWeek?.avg_hours_per_day}</span>
          </div>
        </Card>
      </div>
      <div className="mt-13 mb-15">
        <Card className='bg-zinc-200 border-zinc-300' >
          <h1 className="text-2xl font-semibold ps-10 pt-5 text-zinc-600">Attendance History</h1>
          <Card className="ms-5 me-5 border-zinc-300 border-2">
            <div className="flex justify-around text-xl text-zinc-500 font-bold">
              <h2>Date</h2>
              <h2>Check In</h2>
              <h2>Check Out</h2>
              <h2>Duration</h2>
            </div>
          </Card>
          {sessions.length > 0 ? (
            <div className="p-5">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex justify-around text-sm p-3  hover:bg-gray-50"
                >
                  <span>
                    {new Date(session.login_time).toLocaleDateString()}
                  </span>
                  <span>
                    {new Date(session.login_time).toLocaleTimeString()}
                  </span>
                  <span>
                    {session.logout_time
                      ? new Date(session.logout_time).toLocaleTimeString()
                      : "Still Working"}
                  </span>
                  <span>
                    {session.logout_time
                      ? (() => {
                          const d =
                            Date.parse(session.logout_time) -
                            Date.parse(session.login_time);
                          return `${Math.floor(d / 3600000)}h ${Math.floor(
                            (d % 3600000) / 60000
                          )}m ${Math.floor((d % 60000) / 1000)}s`;
                        })()
                      : "In Progress"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No attendance records yet</p>
            </div>
          )}
        </Card>
      </div>
      </div>
    </>
  );
};

export default AttenadanceCard;
