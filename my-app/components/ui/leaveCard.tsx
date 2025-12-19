"use client";

import { useEffect } from "react";
import { useLeaveStore } from "@/store/leaveStore";
import { useUserStore } from "@/store/userStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const LeaveCard = () => {
  const { leaves, totalRemaining, loading, fetchLeaveBalance } =
    useLeaveStore();
  const user = useUserStore((state) => state.user);
  console.log('user', user)
console.log('leaves', leaves);


  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalance(user.id);
    }
  }, [user?.id, fetchLeaveBalance]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardTitle>
            <h2 className="p-5">Leave Card</h2>
          </CardTitle>
          <CardContent>
            <h2>Total Remaining: {totalRemaining}</h2>
            {leaves.map((leave) => (
              <div key={leave.leave_type}>
                {leave.leave_type}: {leave.remaining}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LeaveCard;
