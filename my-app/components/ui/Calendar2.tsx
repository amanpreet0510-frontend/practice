"use client";

import { usecalenderStore } from "@/store/calenderStore";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CalendarPage() {
  const { fetchEvents, CalendarEvent, loading, error } = usecalenderStore();

  useEffect(() => {
    fetchEvents("any-user-id");
  }, [fetchEvents]);

  return (
    <div className="">
      <Card className="w-full min-w-[800px]">
        <CardHeader>
          <CardTitle>Public Holidays & Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-gray-500">Loading events...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && CalendarEvent.length === 0 && (
            <p className="text-gray-400">No events found.</p>
          )}

          {CalendarEvent.length > 0 && (
            <ScrollArea className="h-96">
              <ul className="space-y-4">
                {CalendarEvent.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 border rounded-md hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">{item.title}</p>
                      <span className="text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    )}
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded ${
                        item.type === "holiday"
                          ? "bg-green-100 text-green-800"
                          : item.type === "event"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.type.toUpperCase()}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
