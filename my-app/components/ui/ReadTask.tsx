"use client";
import React, { useEffect } from "react";
import { useTaskStore } from "../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { Card, CardHeader } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import {ArrowRight} from 'lucide-react';


const Task = () => {
  const user = useUserStore((state) => state.user);
  const { tasks, fetchTasks, updateTaskStatus } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <Card className="p-10 mt-5 bg-white  overflow-y-auto w-120 max-w-md ">
        <div className="flex justify-between">
        <CardHeader className="text-2xl font-bold">Recent Tasks</CardHeader>
        <div className="flex gap-2">
          <span><Link href={"/tasks"} className="font-bold">View All</Link></span>
          <ArrowRight/>
          </div>
        </div>
        <div className=" text-xl font-bold flex justify-between border-b pb-1">
          <h1>Task name</h1>
          <p>Task description</p>
        </div>
        {tasks.length > 0 ? (
          tasks.map((item, id) => (
            <React.Fragment key={id}>
              <div className=" text-2xl font-2xl flex justify-between border-b pb-1">
                <h1 className="">{item.title}</h1>
                <p>{item.description}</p>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div>No Task assign yet.</div>
        )}
      </Card>
    </>
  );
};

export default Task;
