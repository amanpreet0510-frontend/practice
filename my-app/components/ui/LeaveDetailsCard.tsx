"use client";

import { useLeaveStore } from "@/store/leaveStore";

export default function LeaveDetailsCard() {
  const { leaves, totalRemaining, loading } = useLeaveStore();

  const yearlyTotal = leaves.reduce((sum, l) => sum + l.total, 0);
  const yearlyUsed = leaves.reduce((sum, l) => sum + l.used, 0);

  return (
    <div className="border rounded-2xl p-6 bg-white w-120 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Leave Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4 space-y-1">
            <p><b>Yearly Total:</b> {yearlyTotal}</p>
            <p><b>Yearly Used:</b> {yearlyUsed}</p>
            <p><b>Yearly Remaining:</b> {totalRemaining}</p>
            <p className="text-sm text-gray-600">
              Monthly Credit: 3 leaves (1 per type)
            </p>
          </div>

          <div className="space-y-2">
            {leaves.map((l) => (
              <div
                key={l.leave_type}
                className="flex justify-between border-b pb-1"
              >
                <span>{l.leave_type}</span>
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
