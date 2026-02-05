"use client";

import { useState } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useLeaveRequestStore } from "@/store/leaveRequest";
import { useUserStore } from "@/store/userStore";

export default function ApplyLeaveCard() {
  const user = useUserStore((s) => s.user);
  const { leaves, fetchLeaveBalance } = useLeaveStore();
  const { applyLeave, loading } = useLeaveRequestStore();

  const [leaveType, setLeaveType] = useState("Paid Leave");
  const [days, setDays] = useState(1);

  const selectedLeave = leaves.find(l => l.leave_type === leaveType);

  const handleApply = async () => {
    if (!user?.id) return;

    if (!selectedLeave || selectedLeave.remaining < days) {
      alert("Insufficient leave balance");
      return;
    }

    await applyLeave(
      {
        leave_type: leaveType,
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date().toISOString().slice(0, 10),
        days,
      },
      user.id
    );

    await fetchLeaveBalance(user.id);
    alert("Leave applied successfully");
  };

  return (
    <div className="p-6 text-black bg-zinc-400 w-full backdrop-blur-xl
  rounded-3xl
  border
  border-zinc-100/30
    focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-white shadow-md ">
      <h2 className="text-2xl font-bold mb-4 text-zinc-700">Apply Leave</h2>

      <label className="font-semibold text-zinc-700">Leave Type</label>
      <select
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
        className="border p-2 mt-5 w-full mb-4 bg-zinc-200 rounded-2xl text-gray-500"
      >
        <option>Paid Leave</option>
        <option>Sick Leave</option>
        <option>Casual Leave</option>
      </select>

      <label className="font-semibold text-zinc-700">Leave Duration</label>
      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="border mt-5 p-2 w-full mb-4 bg-zinc-200 rounded-2xl text-gray-500"
      >
        <option value={1}>Full Day</option>
        <option value={0.5}>Half Day</option>
        <option value={0.25}>Short Leave</option>
      </select>

      <button
        onClick={handleApply}
        disabled={loading}
        className=" bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] text-white font-bold p-5 py-4 rounded-lg mt-5"
      >
        {loading ? "Applying..." : "Apply Leave"}
      </button>
    </div>
  );
}
