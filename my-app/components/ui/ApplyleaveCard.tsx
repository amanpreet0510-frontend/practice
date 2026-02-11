"use client";

import { useState } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useLeaveRequestStore } from "@/store/leaveRequest";
import { useUserStore } from "@/store/userStore";
import { toast, Toaster } from "sonner";
import { X } from "lucide-react";

export default function ApplyLeaveCard() {

  const user = useUserStore((s) => s.user);
  const { leaves, fetchLeaveBalance } = useLeaveStore();

 
  const { applyLeave, loading } = useLeaveRequestStore();

  const [leaveType, setLeaveType] = useState("");
  const [days, setDays] = useState(1);

  const selectedLeave = leaves.find(l => l.leave_type === leaveType);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) {
      toast("You must be logged in to apply leave",
        );
      
      return;
    }

    if (!leaveType) {
      toast("Please select a leave type",{position:"top-center", action: {
        label: <X/>,
        onClick: () => console.log("Undo"),
    },}
        
      );
      return;
    }

    if (!startDate || !endDate) {
      toast("Please select start and end dates",{position:"top-center", action: {
        label: <X/>,
        onClick: () => console.log("Undo"),
    },});
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast("End date cannot be before start date",{position:"top-center", action: {
        label: <X/>,
        onClick: () => console.log("Undo"),
    },});
      return;
    }

    if (!reason.trim()) {
      toast("Please provide a reason for your leave",{position:"top-center", action: {
        label: <X/>,
        onClick: () => console.log("Undo"),
    },});
      return;
    }

    if (!selectedLeave || selectedLeave.remaining < days) {
      toast("Insufficient leave balance",{position:"top-center", action: {
        label: <X/>,
        onClick: () => console.log("Undo"),
    },});
      return;
    }

    await applyLeave(
      {
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        days,
        reason,
      },
      user.id
    );

    setLeaveType(''),
    setStartDate(''),
    setEndDate(''),
    setReason('')


    await fetchLeaveBalance(user.id);
    toast("Leave applied successfully",{position:"top-center", action: {
      label: <X/>,
      onClick: () => console.log("Undo"),
  },});
  };

  return (
    <>
    {/* <Toaster position="top-center" /> */}
    <form onSubmit={handleApply} className=" text-black bg-zinc-200  h-210 backdrop-blur-xl
  rounded-3xl
  border
  border-zinc-100/30
    focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-white shadow-md p-10">
     
      <h2 className="text-3xl font-bold mb-4 text-zinc-700">Apply Leave</h2>
      <p className="text-zinc-500">Fill out the form to submit a leave request</p>
      <div className="mt-10 gap-10">
        <label className="font-semibold  text-zinc-700 text-lg">Leave Type</label>
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          className="border p-2 mt-5 w-full mb-4 bg-zinc-200 rounded-2xl text-gray-500  border-zinc-400 px-4 py-4"
        >
          <option value="">Select Leave Type</option>
          <option>Paid Leave</option>
          <option>Sick Leave</option>
          <option>Casual Leave</option>
        </select>
        <div className="flex justify-between mb-10 mt-5">
          <div>
            <div className="pb-5">Start Date</div>
            <span> <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-zinc-400 rounded-2xl px-4 py-4 w-160 text-zinc-500"
            /></span>
          </div>
          <div>
            <div className="pb-5">End Date</div>
            <span><input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-zinc-400 rounded-2xl px-4 py-4 w-160 text-zinc-500"
            />
            </span>
          </div>
        </div>

        <label className="font-semibold text-zinc-700 text-lg ">Leave Duration</label>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border mt-5 p-2 w-full mb-4 bg-zinc-200 rounded-2xl text-gray-500  border-zinc-400  px-4 py-4 "
        >
          <option value={1}>Full Day</option>
          <option value={0.5}>Half Day</option>
          <option value={0.25}>Short Leave</option>
        </select>
        <div className="mt-2 mb-5">Reason</div>
        <textarea
          className="w-full placeholder:p-5 border border-zinc-400 rounded-2xl px-4 py-4"
          placeholder="Provide a reason for your leave request..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <button
          //onClick={handleApply}
          type="submit"
          disabled={loading}
          className=" bg-gradient-to-b w-full from-[#0D091E] to-[#0D091E] text-white font-bold p-5 py-4 rounded-lg mt-10"
        >
          {loading ? "Applying..." : "Apply Leave"}
        </button>
      </div>
    </form>
    </>
  );
}
