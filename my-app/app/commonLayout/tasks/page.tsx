"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { useTaskStore } from "../../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { TaskStatus } from "@/types/task.types";
import { TaskStatus as TaskStatusType } from "@/store/taskStore";
import { Clock, LucideCheck, LucideCircleCheck, LucideClock, LucideCross, LucideListTodo, LucideLoader, LucideNotebook, LucideX } from "lucide-react";
import Image from "next/image";
import AssignTask from "@/components/ui/AssignTask";


const TaskPage = () => {
  const TaskStatus = [
    "all",
    "pending",
    "in_progress",
    "completed",
    "cancelled",
  ] as const;


  const [open, setOpen] = useState(false);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUserStore();
  const { tasks, fetchTasks, updateTaskStatus, setStatusFilter } =
    useTaskStore();

  console.log('tasks', tasks)

  const statusFilter = useTaskStore((state) => state.statusFilter);


  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user?.id, fetchTasks]);

  const filterTasks = tasks.filter(
    (task) => {
      if (statusFilter === "all") {
        return true;
      } else {
        return task.task_status === statusFilter;
      }
    },
    [tasks, statusFilter]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenTaskId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <>
      <div className="w-full min-w-0 overflow-x-hidden p-2 sm:p-4 md:p-6 -mt-2 sm:mt-0">
        <div className="rounded-2xl shadow-zinc-500 shadow-[5px_0px_15px_rgba(0,0,0,0.3)] bg-zinc-200/30 p-3 sm:p-4 md:p-6 overflow-hidden">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-1 scrollbar-thin">
            {TaskStatus.map((item, id) => (
              <button
                key={id}
                type="button"
                onClick={() => setStatusFilter(item)}
                className="shrink-0"
              >
                <Card className="border-purple-200 text-zinc-700 px-4 py-2 sm:px-5 sm:py-3 bg-zinc-300 shadow-zinc-400 shadow-[5px_0px_10px_rgba(0,0,0,0.3)]">
                  <h1 className="text-xs sm:text-sm md:text-base capitalize">{item}</h1>
                </Card>
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-4">
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {filterTasks.map((item) => (
                  <Card key={item.id} className="bg-zinc-300 border-purple-200 p-4 sm:p-5 text-zinc-700 min-w-0">
                    <h1 className="font-bold text-sm sm:text-base md:text-lg truncate">
                      Task: {item.title}
                    </h1>
                    <p className="text-zinc-600 text-xs sm:text-sm mt-2 break-words">
                      Description: {item.description}
                    </p>
                    <p
                      className={`text-xs sm:text-sm mt-2 font-medium ${
                        item.priority === "high"
                          ? "text-red-600"
                          : item.priority === "medium"
                            ? "text-blue-500"
                            : "text-green-800"
                      }`}
                    >
                      Priority: {item.priority}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-zinc-300 border-purple-200 w-full lg:w-80 shrink-0">
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="text-zinc-600 text-base sm:text-lg font-bold">Task</div>
                    <LucideListTodo className="text-zinc-700 w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-zinc-600 text-base sm:text-lg font-bold">Status</h1>
                    <LucideClock className="text-zinc-700 w-5 h-5" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  {tasks.map((item) => (
                    <div
                      key={item.id}
                      className="relative border border-zinc-100 shadow-2xl rounded-2xl flex justify-between items-center text-sm sm:text-base p-3"
                    >
                      <div className="text-zinc-700 min-w-0 truncate">{item.title}</div>
                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenTaskId(openTaskId === item.id ? null : item.id)
                          }
                          className="rounded-xl hover:bg-zinc-100 p-1"
                        >
                          <span className="bg-zinc-100 px-3 py-1 rounded-2xl inline-block text-xs sm:text-sm">
                            {item.task_status}
                          </span>
                        </button>
                        {openTaskId === item.id && (
                          <div className="absolute right-0 sm:right-2 top-10 sm:top-12 z-50 bg-zinc-300 rounded-xl shadow-lg shadow-black min-w-[140px]">
                            <ul className="p-2 text-sm font-medium">
                              <MenuItem
                                label="Pending"
                                onClick={() => {
                                  updateTaskStatus(item.id, "pending");
                                  setOpenTaskId(null);
                                }}
                              >
                                <LucideClock />
                              </MenuItem>

                              <MenuItem
                                label="Completed"
                                onClick={() => {
                                  updateTaskStatus(item.id, "completed");
                                  setOpenTaskId(null);
                                }}
                              >
                                <LucideCircleCheck />
                              </MenuItem>

                              <MenuItem
                                label="In progress"
                                onClick={() => {
                                  updateTaskStatus(item.id, "in_progress");
                                  setOpenTaskId(null);
                                }}
                              >
                                <LucideLoader />
                              </MenuItem>

                              <MenuItem
                                label="Cancelled"
                                onClick={() => {
                                  updateTaskStatus(item.id, "cancelled");
                                  setOpenTaskId(null);
                                }}
                              >
                                <LucideX />
                              </MenuItem>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

type MenuItemProps = {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
};

function MenuItem({ label, children, onClick }: MenuItemProps) {
  
  return (
    <>
      <li>
        <button
          type="button"
          onClick={onClick}
          className={`flex items-center gap-2 w-full p-2 rounded hover:bg-zinc-100 `}
        >
          {children}
          <span>{label}</span>
        </button>
      </li>
    </>
  );
}


export default TaskPage;
