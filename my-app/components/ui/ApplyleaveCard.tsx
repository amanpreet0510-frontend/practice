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
    <div className="border rounded-2xl p-6 bg-white w-full ">
      <h2 className="text-2xl font-bold mb-4">Apply Leave</h2>

      <label className="font-semibold">Leave Type</label>
      <select
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      >
        <option>Paid Leave</option>
        <option>Sick Leave</option>
        <option>Casual Leave</option>
      </select>

      <label className="font-semibold">Leave Duration</label>
      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="border p-2 w-full rounded mb-4"
      >
        <option value={1}>Full Day</option>
        <option value={0.5}>Half Day</option>
        <option value={0.25}>Short Leave</option>
      </select>

      <button
        onClick={handleApply}
        disabled={loading}
        className="bg-[#BBC863] text-white font-bold w-full py-2 rounded-lg"
      >
        {loading ? "Applying..." : "Apply Leave"}
      </button>
    </div>
  );
}
