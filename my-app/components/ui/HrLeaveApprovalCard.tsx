"use client";

import { useEffect } from "react";
import { useHRLeaveStore } from "@/store/hrLeaveStore";

 function HRLeaveApprovalCard() {
  const {
    requests,
    fetchPendingLeaves,
    approveLeave,
    rejectLeave,
    loading,
  } = useHRLeaveStore();

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Pending Leave Requests</h1>

      {requests.length === 0 && <p>No pending requests</p>}

      {requests.map((r) => (
        <div
          key={r.id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{r.leave_type}</p>
            <p className="text-sm">
              {r.start_date} → {r.end_date} ({r.days} day)
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={async () => {
                await approveLeave(r.id);
                fetchPendingLeaves();
              }}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={async () => {
                await rejectLeave(r.id);
                fetchPendingLeaves();
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default HRLeaveApprovalCard;