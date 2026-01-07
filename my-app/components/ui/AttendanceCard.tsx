"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./button";
import { Calendar, Clock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { supabase } from "@/lib/supabaseClient";
import { getLoginHourWithUser } from "@/supabaseApi/supabaseApi";
import { loginTime, logoutTime } from "@/lib/attendanceSlice";

interface AttendanceSession {
  id: string;
  user_id: string;
  login_time: string;
  logout_time: string | null;
}

export const AttenadanceCard = () => {
  const dispatch = useDispatch();
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

  console.log("Attendance state:", loginTimehour);

  const [sessions, setSessions] = useState<AttendanceSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSession, setCurrentSession] =
    useState<AttendanceSession | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: profile, error: err1 } = await supabase.auth.getUser();
    if (err1 || !profile?.user?.id) {
      console.error("Error getting user:", err1);
      setLoading(false);
      return;
    }

    console.log("User ID:", profile?.user?.id);

    const response = await getLoginHourWithUser(profile.user.id);

    console.log("Full response:", response);
    console.log("Response data:", response?.data);
    console.log("Response error:", response?.error);

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
    setLoading(true);
    try {
      const { data: profile, error: err1 } = await supabase.auth.getUser();
      if (err1 || !profile?.user?.id) {
        console.error("Error getting user:", err1);
        alert("Error: Unable to get user information");
        setLoading(false);
        return;
      }

      // Check if user already has an active session
      if (currentSession) {
        alert("You are already logged in!");
        setLoading(false);
        return;
      }

      // Create new attendance record
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

  console.log("sessions", sessions);

  return (
    <>
      <Card className="p-5 m-5">
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
                className="bg-red-500 hover:bg-red-600 m-10 h-15 w-100"
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
                className="bg-[#BBC863] hover:bg-[#A8B550] m-10 h-15 w-100"
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
          {sessions.length > 0 ? (
            <div className="p-5">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex justify-around text-sm p-3 border-b hover:bg-gray-50"
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
    </>
  );
};

export default AttenadanceCard;
