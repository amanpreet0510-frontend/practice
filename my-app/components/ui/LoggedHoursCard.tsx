"use client";

import { useState, useEffect } from "react";
import { usetimeLogStore } from "../../store/timelogStore";
import { Card } from "./card";

export default function LoggedHoursCard() {
  const [hours, setHours] = useState<number>(0);
  const { logHours, totalHours, fetchLoggedHours } = usetimeLogStore();

  useEffect(() => {
 
    fetchLoggedHours();
  }, [fetchLoggedHours]);

  return (
    <>
    <Card className="w-full p-10 bg-blue-50 max-h-[300px]">
    <div className="flex justify-around gap-5 ">
      <input
        type="number"
        className="bg-gray-300 rounded-2xl p-1 "
        value={hours}
        min={0}
        onChange={(e) => {
          const value = Number(e.target.value);
          setHours(value);
        }}
      />
      <button
      className="bg-blue-100 rounded-2xl p-2 text-sm font-bold"
        onClick={async () => {
          await logHours(hours);
          setHours(0);
          fetchLoggedHours();
        }}
      >
        Log Hours
      </button>
      </div>
     <p className="text-2xl font-bold p-2">Total Logged Hours: {totalHours ? totalHours : 0}</p>
    </Card>
    </>
  );
}
