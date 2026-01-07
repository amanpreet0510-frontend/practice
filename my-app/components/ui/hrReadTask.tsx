"use client";
import React, { useEffect } from "react";
import { useHrTaskStore } from "@/store/hrTaskStore";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HrReadTask = () => {
  const { tasks, fetchTasks } = useHrTaskStore();

  console.log("tasks", tasks[0]);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Card className="p-9 m-5">
        <Table>
          <TableHeader>
            <TableRow className="text-xl">
              <TableHead className="w-[100px]">Task</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Employee-name</TableHead>
              <TableHead>Task-status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((item,id) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.assigned_to}</TableCell>
                <TableCell>{item.task_status}</TableCell>
                <TableCell>{item.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
      </Card>
    </>
  );
};

export default HrReadTask;
