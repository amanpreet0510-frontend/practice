import React, { useEffect } from 'react'
import { useUserStore } from "@/store/userStore";
import { supabase } from "../../lib/supabaseClient";
import { User } from "../../types/user.types";
import  Card  from '@/components/ui/Card1';
import { useLeaveApprovalStore } from '@/store/leaveApproval';


const HRDashboard = () => {

  const {requests,fetchPendingLeaves,updateLeaveStatus}=useLeaveApprovalStore();

useEffect(()=>{
  fetchPendingLeaves()
},[fetchPendingLeaves])

  return (
    <>
     <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Pending Leave Requests
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((leave) => (
            <tr key={leave.id} className="border-t">
              <td>{leave.leave_type}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.days}</td>
              <td className="flex gap-2">
                <button
                  onClick={() =>
                    updateLeaveStatus(leave.id, "approved")
                  }
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateLeaveStatus(leave.id, "rejected")
                  }
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default HRDashboard;