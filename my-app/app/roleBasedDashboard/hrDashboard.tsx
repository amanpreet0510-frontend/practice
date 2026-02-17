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
    <div className=''>
      <HrDashboard/>
    <div className="p-0 2xl:p-6  text-zinc-100 pt-10 ps-0 w-full lg:w-full">
      <div>
        <h2 className="text-xl md:text-3xl font-bold text-zinc-600">
          Pending Leave Requests
        </h2>
        <p className="text-[12px] md:text-md text-zinc-500 mt-1">
          Review and approve employee leave requests
        </p>
      </div>

      <div className="flex justify-between md:block bg-white rounded-2xl shadow-md overflow-hidden mt-10 2xl:ms-0  2xl:m-20">

          <div>
          <thead>
            <tr className="flex flex-col md:block  bg-gray-50 text-left text-sm text-gray-600">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Leave Type</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">From</th>
              <th className="px-6 py-4">To</th>
              <th className="px-6 py-4">Days</th>
              <th className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>
          </div>
          <div>
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
                  className="flex flex-col md:block  border-t hover:bg-gray-50 transition text-zinc-600 md:font-medium"
                >
                  <td className="px-6 py-2">
                    {(() => {
                      const person = users.find((u) => u.id === leave.user_id);
                      return (
                        <span className="text-sm text-zinc-700">
                          {person?.name ?? 'Unknown'} · {person?.role ?? '—'}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-6">
                    {leave.leave_type}
                  </td>
                  <td className="px-4 py-6 ">
                    {leave.reason}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {leave.start_date}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {leave.end_date}
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                      {leave.days} days
                    </span>
                  </td>

                  <td className="p-5 md:px-6 md:py-4">
                    <div className="flex justify-center gap-1 md:gap-3">
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
          </div>
      
      </div>
    </div>
    </div>
    </>
  );
};

export default HRDashboard;
