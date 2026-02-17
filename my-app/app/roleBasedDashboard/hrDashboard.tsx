'use client';
import React, { useEffect } from 'react';
import { useLeaveApprovalStore } from '@/store/leaveApproval';
import HrDashboard from '@/components/ui/HrDashboard';
import { useUserStore } from '@/store/userStore';
import AssignTask from '@/components/ui/AssignTask';


const HRDashboard = () => {
  const {
    requests,
    fetchPendingLeaves,
    updateLeaveStatus,
  } = useLeaveApprovalStore();
  const { users, fetchUser } = useUserStore();

  useEffect(() => {
    fetchPendingLeaves();
    fetchUser();
  }, [fetchPendingLeaves, fetchUser]);


  return (
    <>
    <div className='w-full min-w-0 overflow-x-hidden'>
      <HrDashboard/>
    <div className="p-4 sm:p-6 md:p-8 2xl:p-6 text-zinc-100 pt-6 sm:pt-8 md:pt-10 ps-0 w-full">
      <div>
        <h2 className="text-xl md:text-3xl font-bold text-zinc-600">
          Pending Leave Requests
        </h2>
        <p className="text-[12px] md:text-md text-zinc-500 mt-1">
          Review and approve employee leave requests
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-x-auto mt-6 sm:mt-8 md:mt-10 2xl:m-6">
        <div className="min-w-[500px]">
          <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-xs sm:text-sm text-gray-600">
              <th className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">User</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">Leave Type</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">Reason</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4">From</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4">To</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4">Days</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No pending leave requests   
                </td>
              </tr>
            ) : (
              requests.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-t hover:bg-gray-50 transition text-zinc-600 font-medium"
                >
                  <td className="px-3 sm:px-6 py-2 text-xs sm:text-sm">
                    {(() => {
                      const person = users.find((u) => u.id === leave.user_id);
                      return (
                        <span className="text-sm text-zinc-700">
                          {person?.name ?? 'Unknown'} · {person?.role ?? '—'}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-6 text-xs sm:text-sm">
                    {leave.leave_type}
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-6 text-xs sm:text-sm max-w-[120px] sm:max-w-none truncate sm:whitespace-normal">
                    {leave.reason}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm">
                    {leave.start_date}
                  </td>

                  <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">
                    {leave.end_date}
                  </td>

                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm">
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                      {leave.days} days
                    </span>
                  </td>

                  <td className="p-3 sm:p-5 md:px-6 md:py-4">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                      <button
                        onClick={() =>
                          updateLeaveStatus(
                            leave.id,
                            'approved'
                          )
                        }
                        className="p-1 md:px-4 md:py-1.5 rounded-lg bg-green-600 text-white text-[12px] md:text-sm hover:bg-green-700 transition"
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
                        className="p-1 md:px-4 md:py-1.5 rounded-lg bg-red-600 text-white text-[12px] md:text-sm hover:bg-red-700 transition"
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
    </div>
    </div>
    </>
  );
};

export default HRDashboard;
