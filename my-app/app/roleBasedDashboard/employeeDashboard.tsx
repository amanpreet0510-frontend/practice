"use client";

import { useEffect, useState } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useLeaveRequestStore } from "../../store/leaveRequest";
import { useUserStore } from "@/store/userStore";
import { Calendar } from "lucide-react";
import Calendar2 from "@/components/ui/Calendar2";
import Task from "@/components/ui/ReadTask";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import LoggedHoursCard from "@/components/ui/LoggedHoursCard";

const EmployeeLeaveDashboard = () => {
  const user = useUserStore((state) => state.user);
  const {
    leaves,
    totalRemaining,
    fetchLeaveBalance,
    loading: leaveLoading,
  } = useLeaveStore();
  const {
    requests,
    fetchMyLeaveRequests,
    applyLeave,
    loading: requestLoading,
  } = useLeaveRequestStore();

  console.log('leaves', leaves)
console.log('totalRemaining', totalRemaining);

  const [leaveType, setLeaveType] = useState("Paid Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalance(user.id);
      fetchMyLeaveRequests(user.id);
    }
  }, [user?.id, fetchLeaveBalance, fetchMyLeaveRequests]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    await applyLeave(
      { leave_type: leaveType, start_date: startDate, end_date: endDate, days },
      user.id
    );
    alert("Leave request submitted!");

    fetchMyLeaveRequests(user.id);

    setLeaveType("Paid Leave");
    setStartDate("");
    setEndDate("");
    setDays(0);
  };



  return (
    <>
      <Card className="bg-gray-50">
        <div className="flex justify-between ps-10 pe-10">
          <div>
            <h2 className="text-2xl font-bold ">Hello,{user?.name} </h2>
            <p className="text-xl ">Here's what's happening today</p>
          </div>
          <Image
            alt=""
            height={100}
            width={100}
            src={user?.image}
            className="rounded-[100%] border-2 border-white"
          />
        </div>
      </Card>
      <div className="p-4 space-y-6">
        <div className=" flex justify-between gap-10">
          <div className="border p-4 rounded shadow p-10 bg-red-50 rounded-2xl w-full max-h-[300px]">
            <h2 className="text-3xl font-bold mb-2">Leave Balances</h2>
            {leaveLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p>Total Remaining: {totalRemaining}</p>
                {leaves.map((l) => (
                  <div key={l.leave_type}>
                    {l.leave_type}: {l.remaining}
                  </div>
                ))}
              </>
            )}
          </div>
          <LoggedHoursCard />
          <div className="border p-4 rounded shadow w-full bg-blue-50 ">
            <h2 className="text-lg font-bold mb-2 p-2">Apply Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-y-3">
                <p className="font-bold">Leave Type</p>
                <select
                  value={leaveType}
                  className="bg-white border-gray-200 border-2 p-2 rounded-2xl w-full"
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="Paid Leave">Paid Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="LWP">Leave Without Pay</option>
                </select>
              </div>
              <div className="mt-10 flex justify-between gap-10 ">
                <div className="space-y-5 w-full">
                  <p>Start Date*</p>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-white border-gray-200 border-2 rounded-2xl p-2 w-full"
                    required
                  />
                </div>
                <div className="space-y-5 w-full">
                  <p>End Date*</p>
                  <input
                    type="date"
                    value={endDate}
                    className="bg-white border-gray-200 border-2 rounded-2xl p-2 w-full"
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-10 flex justify-between">
                <p className="text-xl font-semibold">Total Days:</p>
                <input
                  type="number"
                  value={days}
                  className=" bg-white border-2 border-gray-200 p-2 w-full max-w-[600px]"
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  placeholder="Number of days"
                  min={1}
                  required
                />
              </div>
              <div>
                <p className="font-semibold text-xl">Reason</p>
                <textarea className="mt-5 border-2 border-gray bg-white w-full min-h-[90px]"></textarea>
              </div>
              <button
                type="submit"
                disabled={requestLoading}
                className="bg-blue-950 text-white px-4 py-2 rounded w-full "
              >
                {requestLoading ? "Submitting..." : "Apply Leave"}
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-around">
          <div className="border p-4 rounded shadow w-max p-15">
            <h2 className="text-lg font-bold mb-2">My Leave Requests</h2>
            {requestLoading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {requests.map((r) => (
                  <li key={r.id}>
                    {r.leave_type}: {r.days} day(s) ({r.start_date} to{" "}
                    {r.end_date}) - {r.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Calendar2 />
        </div>
        <Task />
      </div>
    </>
  );
};

export default EmployeeLeaveDashboard;
