"use client";

import { useLeaveStore } from "@/store/leaveStore";

export default function LeaveDetailsCard() {
  const { leaves, totalRemaining, loading } = useLeaveStore();

  const yearlyTotal = leaves.reduce((sum, l) => sum + l.total, 0);
  const yearlyUsed = leaves.reduce((sum, l) => sum + l.used, 0);

  return (
    <div className=" border-zinc-300 ps-10 pe-10 pt-8 pb-8 shadow-md shadow-zinc-500 z-20 rounded-2xl w-full">
      <h2 className="text-xl font-semibold mb-8 ms-2 mt-2 text-zinc-700">Leave Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="space-y-4 text-xl text-zinc-700">
            <p className="text-[#0F0E23] border rounded-xl border-zinc-300 p-2 bg-zinc-300 text-lg"><b>Yearly Total:</b> {yearlyTotal}</p>
            <p className="text-[#0F0E23] border-2 rounded-xl border-zinc-300 p-2  bg-zinc-300 text-lg"><b>Yearly Used:</b> {yearlyUsed}</p>
            <p className="text-[#0F0E23] border-2 rounded-xl border-zinc-300 p-2 bg-zinc-300 text-lg"><b>Yearly Remaining:</b> {totalRemaining}</p>
            <p className="text-sm text-zinc-500">
              Monthly Credit: 3 leaves (1 per type)
            </p>
          </div>

          <div className="space-y-10 text-xl">
            {leaves.map((l) => (
              <div
                key={l.leave_type}
                className="border-zinc-300 text-zinc-500 text-lg flex m-8 justify-between gap-2 border rounded-2xl p-2 pe-5 ps-5 bg-zinc-200 shadow-2xl"
              >
                <span className="pe-5 ">{l.leave_type}</span>
                <span>
                  {l.remaining} / {l.total}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    
    </div>
  );
}
