"use client";

import { useLeaveStore } from "@/store/leaveStore";

export default function LeaveDetailsCard() {
  const { leaves, totalRemaining, loading } = useLeaveStore();

  const yearlyTotal = leaves.reduce((sum, l) => sum + l.total, 0);
  const yearlyUsed = leaves.reduce((sum, l) => sum + l.used, 0);

  return (
    <div className="p-6 text-black bg-zinc-400 backdrop-blur-xl
  rounded-3xl
  border
  border-zinc-100/30
    focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-white shadow-md  h-180 w-140 ">
      <h2 className="text-3xl font-bold m-10 text-zinc-700">Leave Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="m-10  space-y-5 text-xl text-zinc-700">
            <p className="text-zinc-400 border-2 rounded-2xl border-zin-900 p-5 bg-gradient-to-r from-[#0D091E] to-[#54239B]"><b>Yearly Total:</b> {yearlyTotal}</p>
            <p className="text-zinc-400 border-2 rounded-2xl border-zin-900 p-5  bg-gradient-to-r from-[#0D091E] to-[#54239B]"><b>Yearly Used:</b> {yearlyUsed}</p>
            <p className="text-zinc-400 border-2 rounded-2xl border-zin-900 p-5  bg-gradient-to-r from-[#0D091E] to-[#54239B]"><b>Yearly Remaining:</b> {totalRemaining}</p>
            <p className="text-md text-zinc-900">
              Monthly Credit: 3 leaves (1 per type)
            </p>
          </div>

          <div className="space-y-10 text-xl  ">
            {leaves.map((l) => (
              <div
                key={l.leave_type}
                className="border-purple-950 flex m-8 justify-between gap-2 border rounded-2xl p-2 pe-5 ps-5 bg-zinc-200 shadow-2xl"
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
