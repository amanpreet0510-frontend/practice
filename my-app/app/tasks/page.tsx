"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { useTaskStore } from "../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { TaskStatus } from "@/types/task.types";
import { TaskStatus as TaskStatusType } from "@/store/taskStore";
import { Clock, LucideCheck, LucideCircleCheck, LucideClock, LucideCross, LucideListTodo, LucideLoader, LucideNotebook, LucideX } from "lucide-react";
import Image from "next/image";


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
      <div className="bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] font-bold sticky top-0 z-50 shadow-sm p-10">
        <div className="bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] font-bold sticky top-0 z-50 rounded-2xl  shadow-zinc-500 shadow-[5px_0px_15px_rgba(0,0,0,0.3)] p-10 flex gap-5">
          {TaskStatus.map((item, id) => (
            <div
              key={id}
              onClick={() => setStatusFilter(item)}
              className=" m-5 cursor-pointer"
            >
              <Card className="p-5 bg-zinc-300 shadow-zinc-400 shadow-[5px_0px_10px_rgba(0,0,0,0.3)]" key={id}>
                <h1>{item}</h1>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="w-full m-5 p-5">
            {filterTasks.map((item) => (
              <>
                <Card className="bg-zinc-300 p-5 m-5 text-zinc-700">
                  <div key={item.id} className="text-2xl font-bold">
                    <h1>Task : {item.title}</h1>
                  </div>
                  <div>
                    <h1>Description :{item.description}</h1>
                    <h1>Task Priority :{item.priority}</h1>
                  </div>
                </Card>
              </>
            ))}
          </div>
          <div className="flex justify-between">
            <Card className="bg-zinc-300 m-5 w-80 max-w-auto right-0 max-h-fit">
              <div className="flex flex-col gap-2 mt-5">
                <div className="flex justify-around gap-15">
                  <div className="flex justify-around">
                    <div className="text-zinc-700 text-2xl font-bold">Task</div>
                    <div className="text-zinc-700 ps-3 pt-1"><LucideListTodo /></div>
                  </div>
                  <div className="flex">
                    <div><h1 className="text-zinc-700 text-2xl font-bold">Task status</h1></div>
                    <div className="text-zinc-700 ps-2 pt-1"><LucideClock /></div>
                  </div>
                </div>
                {tasks.map((item) => (
                  <div
                    key={item.id}
                    className="relative border border-zinc-100 shadow-2xl m-5 rounded-2xl flex justify-between items-center text-xl p-2"
                  >
                    <div className="text-zinc-700 ps-3">{item.title}</div>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenTaskId(openTaskId === item.id ? null : item.id)
                        }
                        className="px-3 py-1 rounded-lg hover:bg-zinc-100"
                      >
                        <button className="bg-zinc-100 p-2 rounded-2xl w-30"><p>{item.task_status}</p></button>
                      </button>
                      {openTaskId === item.id && (
                        <div className="absolute right-2 top-8 z-50 bg-zinc-300 rounded-xl shadow-lg shadow-black ">
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
                      )}</div>
                  </div>
                ))}

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
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 w-full p-2 rounded hover:bg-zinc-100"
      >
        {children}
        <span>{label}</span>
      </button>
    </li>
  );
}


export default TaskPage;
