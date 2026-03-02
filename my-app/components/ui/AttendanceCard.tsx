"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "./button";
import { Calendar, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { getSupabaseClient } from "@/lib/supabaseClient";

import { getLoginHourWithUser } from "@/supabaseApi/supabaseApi";
import { loginTime, logoutTime } from "@/lib/attendanceSlice";
import { useUserStore } from "@/store/userStore";
import { fetchAttendanceSummary } from "@/slices/attendanceHours";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
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

  }, [dispatch, user?.id]);
  const { summary } = useAppSelector(
    (state) => state.summary
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

  const loginTimehour = useSelector(
    (state: RootState) => state.attendance.loginTime
  );



  const [sessions, setSessions] = useState<AttendanceSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSession, setCurrentSession] =
    useState<AttendanceSession | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabaseClient();
    const { data: profile, error: err1 } = await supabase.auth.getUser();
    if (err1 || !profile?.user?.id) {
      console.error("Error getting user:", err1);
      setLoading(false);
      return;
    }



    const response = await getLoginHourWithUser(profile.user.id);



    const LoginhourData = response?.data;
    const err2 = response?.error;

    if (err2) {
      console.error("Error fetching login hours:", err2);
      setSessions([]);
      setCurrentSession(null);
    } else if (LoginhourData && Array.isArray(LoginhourData)) {
      setSessions(LoginhourData);
      // Check if there's an active session (no logout_time)
      const activeSession = LoginhourData.find(
        (session) => !session.logout_time
      );
      if (activeSession) {
        setCurrentSession(activeSession);
        dispatch(
          loginTime({
            sessionId: activeSession.id,
            loginId: new Date(activeSession.login_time).getTime(),
          } as { sessionId: string; loginId: number })
        );
      } else {
        setCurrentSession(null);
      }
      console.log("Sessions set successfully:", LoginhourData);
    } else {
      console.log("No attendance data found or data is empty");
      setSessions([]);
      setCurrentSession(null);
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogin = async () => {
    const supabase = getSupabaseClient();
    setLoading(true);
    try {
      const { data: profile, error: err1 } = await supabase.auth.getUser();
      if (err1 || !profile?.user?.id) {
        console.error("Error getting user:", err1);
        alert("Error: Unable to get user information");
        setLoading(false);
        return;
      }

      if (currentSession) {
        alert("You are already logged in!");
        setLoading(false);
        return;
      }


      const { data: newSession, error: err2 } = await supabase
        .from("attendance")
        .insert([
          {
            user_id: profile.user.id,
            login_time: new Date().toISOString(),
            logout_time: null,
          },
        ])
        .select()
        .single();

      console.log('profile.user.id', profile.user.id)


      if (err2) {
        console.error("Error creating attendance record:", err2);
        alert("Error: " + err2.message);
      } else {
        console.log("Login successful:", newSession);
        dispatch(
          loginTime({
            sessionId: newSession.id,
            loginId: Date.now(),
          })
        );
        // Refresh data
        await fetchData();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    if (!currentSession) {
      alert("No active session to logout from");
      return;
    }

    setLoading(true);
    try {
      const { error: err } = await supabase
        .from("attendance")
        .update({ logout_time: new Date().toISOString() })
        .eq("id", currentSession.id);

      if (err) {
        console.error("Error updating logout time:", err);
        alert("Error: " + err.message);
      } else {
        console.log("Logout successful");
        dispatch(
          logoutTime({
            sessionId: currentSession.id,
            loginId: Date.now(),
          })
        );

        await fetchData();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="m-3 sm:m-4 md:m-5 lg:p-0 xl:p-0 pt-0 rounded-2xl  min-w-0 overflow-x-hidden">
        <Card className="p-4 sm:p-5 md:p-6 md:mt-0 lg:mt-0 md:mb-5 rounded-2xl bg-zinc-100 border-zinc-300 text-zinc-600">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6">
            <div>
              <CardHeader className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                Today&apos;s Status
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl font-bold break-words">{formattedDate}</p>
              </CardContent>
              {currentSession ? (
                <div className="p-6">
                  <p className="text-sm md:text-xl font-semibold text-green-600">
                    Checked in at:{" "}
                    {new Date(currentSession.login_time).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Status: Currently Working
                  </p>
                </div>
              ) : (
                <p className="text-[12px] lg:text-xl font-semibold p-6">
                  You haven't checked in yet today.
                </p>
              )}
            </div>
            <div>
              {currentSession ? (
                <Button
                  onClick={handleLogout}
                  disabled={loading}
                  className="bg-zinc-700 text-zinc-300 text-sm sm:text-base md:text-lg xl:text-xl hover:bg-red-600 m-3 sm:m-5 md:m-10 w-full sm:w-auto min-w-[120px] sm:min-w-[140px] md:h-12 md:min-w-[160px]"
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
                  className="text-zinc-200 font-bold text-sm sm:text-base md:text-lg xl:text-xl bg-gradient-to-r from-[#0D091E] to-[#54239B] hover:bg-[#4E2190] m-1 sm:ms-5 md:m-10 w-full sm:w-auto min-w-[120px] sm:min-w-[140px] md:h-12 md:min-w-[160px]"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-10">

          <Card className="mt-4 sm:mt-5 md:mt-8 bg-zinc-200 text-zinc-800 text-base sm:text-lg font-manrope border-zinc-300 min-h-[100px] sm:min-h-[120px]">
            <div>
              <div className="flex justify-between gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6 m-3 sm:m-5">
                <h1 className="text-sm sm:text-base">Days This Week</h1>
                <span>
                  <Calendar className="rounded-2xl p-1 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0" />
                </span>
              </div>
              <span className="flex ms-8 sm:ms-12 md:ms-15 mb-3 sm:mb-5 -mt-6 sm:-mt-8 md:-mt-10 text-lg sm:text-xl md:text-2xl font-semibold">{currentWeek?.total_days}</span>
            </div>
          </Card>
          <Card className="mt-4 sm:mt-5 md:mt-8 bg-zinc-200 text-zinc-800 text-base sm:text-lg font-manrope border-zinc-300 min-h-[100px] sm:min-h-[120px]">
            <div>
              <div className="flex justify-between gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6 m-3 sm:m-5">
                <h1 className="text-sm sm:text-base">Hours This Week</h1>
                <span>
                  <Clock className="rounded-2xl p-1 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0" />
                </span>
              </div>
              <span className="flex ms-8 sm:ms-12 md:ms-15 mb-3 sm:mb-5 -mt-6 sm:-mt-8 md:-mt-10 text-lg sm:text-xl md:text-2xl font-semibold">{currentWeek?.total_hours}</span>
            </div>
          </Card>
          <Card className="mt-4 sm:mt-5 md:mt-8 bg-zinc-200 text-zinc-800 text-base sm:text-lg font-manrope border-zinc-300 min-h-[100px] sm:min-h-[120px] sm:col-span-2 md:col-span-1">
            <div>
              <div className="flex justify-between gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6 m-3 sm:m-5">
                <h1 className="text-sm sm:text-base">Average Hours/Day</h1>
                <span>
                  <Clock className="rounded-2xl p-1 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0" />
                </span>
              </div>
              <span className="flex ms-8 sm:ms-12 md:ms-15 mb-3 sm:mb-5 -mt-6 sm:-mt-8 md:-mt-10 text-lg sm:text-xl md:text-2xl font-semibold">{currentWeek?.avg_hours_per_day}</span>
            </div>
          </Card>
        </div>
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-13 mb-10 sm:mb-15 overflow-x-hidden">
          <Card className='bg-zinc-200 border-zinc-300 min-h-[200px] sm:min-h-[250px]' >
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold ps-4 sm:ps-6 md:ps-10 pt-4 sm:pt-5 text-zinc-600">Attendance History</h1>
            <div className="overflow-x-auto">
              <div>
            <div className="ps-0 ms-3 sm:ms-5 me-3 sm:me-5 border-zinc-300 border-2  sm:min-w-0">
              <div className="flex  ms-2 sm:ms-5 md:ms-0 gap-2 sm:gap-4 lg:gap-6 justify-around text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-xl text-zinc-500 font-bold">
                <h2>Date</h2>
                <h2>Check In</h2>
                <h2>Check Out</h2>
                <h2>Duration</h2>
              </div>
            </div>
            </div>
            <div>
            {sessions.length > 0 ? (
              <div className="p-3 sm:p-5 overflow-x-auto">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex flex-wrap sm:flex-nowrap justify-between  sm:gap-4 text-xs sm:text-sm p-2 sm:p-3 hover:bg-gray-50  sm:min-w-0"
                  >
                    <span className="text-[10px] sm:text-xs">
                      {new Date(session.login_time).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] sm:text-xs">
                      {new Date(session.login_time).toLocaleTimeString()}
                    </span>
                    <span className="text-[10px] sm:text-xs">
                      {session.logout_time
                        ? new Date(session.logout_time).toLocaleTimeString()
                        : "Still Working"}
                    </span>
                    <span className="text-[10px] sm:text-xs">
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
                <Calendar className="w-12 h-12 mx-auto text-sm md:text-xl mb-3 opacity-50" />
                <p>No attendance records yet</p>
              </div>
            )}
            </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AttenadanceCard;
