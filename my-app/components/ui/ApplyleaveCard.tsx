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
      toast("Please select a leave type", {
        position: "top-center", action: {
          label: <X />,
          onClick: () => console.log("Undo"),
        },
      }

      );
      return;
    }

    if (!startDate || !endDate) {
      toast("Please select start and end dates", {
        position: "top-center", action: {
          label: <X />,
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast("End date cannot be before start date", {
        position: "top-center", action: {
          label: <X />,
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    if (!reason.trim()) {
      toast("Please provide a reason for your leave", {
        position: "top-center", action: {
          label: <X />,
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    if (!selectedLeave || selectedLeave.remaining < days) {
      toast("Insufficient leave balance", {
        position: "top-center", action: {
          label: <X />,
          onClick: () => console.log("Undo"),
        },
      });
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
    toast("Leave applied successfully", {
      position: "top-center", action: {
        label: <X />,
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <>
      {/* <Toaster position="top-center" /> */}
      <form onSubmit={handleApply} className="text-black bg-zinc-100 h-fit backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-purple-600 p-4 sm:p-6 md:p-8 lg:p-10 border-zinc-300 shadow-md shadow-zinc-500 z-20 rounded-2xl w-full">
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-zinc-700">Apply Leave</h2>
        <p className="text-zinc-500">Fill out the form to submit a leave request</p>
        <div className="mt-5">
          <label className="font-semibold  text-zinc-700 text-md">Leave Type</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="border p-1 mt-3 w-full mb-4 bg-zinc-200 rounded-2xl text-gray-500  border-zinc-400 px-4 py-3"
          >
            <option value="">Select Leave Type</option>
            <option>Paid Leave</option>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
          </select>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 mb-5 mt-2 text-base sm:text-lg font-semibold text-zinc-700">
            <div className="w-full sm:w-auto">
              <div className="pb-2 sm:pb-3">Start Date</div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-zinc-400 rounded-2xl px-4 py-3 w-full sm:min-w-[140px] text-zinc-500"
              />
            </div>
            <div className="w-full sm:w-auto">
              <div className="pb-2 sm:pb-3">End Date</div>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-zinc-400 rounded-2xl px-4 py-3 w-full sm:min-w-[140px] text-zinc-500"
              />
            </div>
          </div>

          <label className="font-semibold text-zinc-700 text-lg ">Leave Duration</label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="border mt-2 mb-1 p-2 w-full  bg-zinc-200 rounded-2xl text-gray-500  border-zinc-400  px-4 py-3"
          >
            <option value={1}>Full Day</option>
            <option value={0.5}>Half Day</option>
            <option value={0.25}>Short Leave</option>
          </select>
          <div className="mt-2 mb-2 text-lg text-zinc-700 font-semibold">Reason</div>
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
            className=" bg-gradient-to-b w-full from-[#0D091E] to-[#0D091E] text-white font-bold p-5 py-4 rounded-lg mt-10 mb-2"
          >
            {loading ? "Applying..." : "Apply Leave"}
          </button>
        </div>
      </form>
    </>
  );
}
