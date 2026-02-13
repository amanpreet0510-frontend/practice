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
      <Card className="hover:bg-zinc-300 border-zinc-300 ps-15 pe-10 pt-8 shadow-md shadow-zinc-500 z-20">
        <div className="flex text-zinc-600 justify-between">
         <h3 className="text-xl  font-bold">Recent Tasks</h3>
        <div className="flex gap-2">
          <span><Link href={"/tasks"} className="font-bold">View All</Link></span>
          <ArrowRight/>
          </div>
        </div>
        <div className=" text-xl font-bold flex justify-between border-b pb-1 mt-10 text-zinc-600">
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
          <div className="text-zinc-600">No Task assign yet.</div>
        )}
      </Card>
    </>
  );
};

export default Task;
