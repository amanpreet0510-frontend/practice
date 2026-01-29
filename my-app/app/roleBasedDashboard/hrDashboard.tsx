'use client';
import React, { useEffect } from 'react';
import { useLeaveApprovalStore } from '@/store/leaveApproval';

const HRDashboard = () => {
  const {
    requests,
    fetchPendingLeaves,
    updateLeaveStatus,
  } = useLeaveApprovalStore();

  useEffect(() => {
    fetchPendingLeaves();
  }, [fetchPendingLeaves]);

  return (
    <div className="p-6 space-y-6">
      <h1 className='text-4xl font-bold'>HR Dashboard</h1>
      <h2 className='text-2xl font-semibold'>Employee management and HR operations</h2>
      <div>
        <h2 className="text-2xl font-bold">
          Pending Leave Requests
        </h2>
        <p className="text-gray-500 mt-1">
          Review and approve employee leave requests
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-600">
              <th className="px-6 py-4">Leave Type</th>
              <th className="px-6 py-4">From</th>
              <th className="px-6 py-4">To</th>
              <th className="px-6 py-4">Days</th>
              <th className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No pending leave requests 🎉
                </td>
              </tr>
            ) : (
              requests.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {leave.leave_type}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {leave.start_date}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {leave.end_date}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                      {leave.days} days
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          updateLeaveStatus(
                            leave.id,
                            'approved'
                          )
                        }
                        className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateLeaveStatus(
                            leave.id,
                            'rejected'
                          )
                        }
                        className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRDashboard;
