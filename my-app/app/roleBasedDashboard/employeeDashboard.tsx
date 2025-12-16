"use client";

import { useEffect, useState } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useLeaveRequestStore } from "../../store/leaveRequest";
import { useUserStore } from "@/store/userStore";
import { Calendar } from "lucide-react";
import Calendar2 from "@/components/ui/Calendar2";
import Task from "@/components/ui/Task";

const EmployeeLeaveDashboard = () => {
  const user = useUserStore((state) => state.user);
  const { leaves, totalRemaining, fetchLeaveBalance, loading: leaveLoading } = useLeaveStore();
  const { requests, fetchMyLeaveRequests, applyLeave, loading: requestLoading } = useLeaveRequestStore();

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

    await applyLeave({ leave_type: leaveType, start_date: startDate, end_date: endDate, days }, user.id);
    alert("Leave request submitted!");

    // Refresh requests
    fetchMyLeaveRequests(user.id);

    // Reset form
    setLeaveType("Paid Leave");
    setStartDate("");
    setEndDate("");
    setDays(0);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="ms-5 flex justify-between ">
      <div className="border p-4 rounded shadow w-auto min-w-[500px] p-20">
        <h2 className="text-lg font-bold mb-2">Leave Balances</h2>
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

      <div className="border p-4 rounded shadow min-w-[900px] w-auto">
        <h2 className="text-lg font-bold mb-2">Apply Leave</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            <option value="Paid Leave">Paid Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="LWP">Leave Without Pay</option>
          </select>

          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          <input type="number" value={days} onChange={(e) => setDays(parseInt(e.target.value))} placeholder="Number of days" min={1} required />

          <button type="submit" disabled={requestLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
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
                {r.leave_type}: {r.days} day(s) ({r.start_date} to {r.end_date}) - {r.status}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Calendar2/>
    </div>
    <Task/>
    </div>
  );
};

export default EmployeeLeaveDashboard;
