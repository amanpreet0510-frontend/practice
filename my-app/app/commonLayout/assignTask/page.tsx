"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { useTaskStore } from "../../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { LucideCircleCheck, LucideClock, LucideListTodo, LucideLoader, LucideX } from "lucide-react";
import AssignTask from "@/components/ui/AssignTask";


const TaskPage = () => {
  const TaskStatus = [
    "all",
    "pending",
    "in_progress",
    "completed",
    "cancelled",
  ] as const;


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
      <div className=" font-bold sticky top-0 z-20 shadow-sm ">
        <AssignTask />
        <div className="hidden lg:flex ms-15 me-15 lg:ms-15 lg:me-15 p font-bold  top-0 z-50 rounded-2xl  shadow-zinc-500 shadow-[5px_0px_15px_rgba(0,0,0,0.3)] p-1 md:p-10 gap-1 xl:gap-5 m-2 mt-10  ">
          {TaskStatus.map((item, id) => (
            <div
              key={id}
              onClick={() => setStatusFilter(item)}
              className=" m-5 cursor-pointer "
            >
              <Card className="border-purple-200 text-zinc-600 p-5 bg-zinc-200 shadow-zinc-400 shadow-[5px_0px_10px_rgba(0,0,0,0.3)]" key={id}>
                <h1>{item}</h1>
              </Card>
            </div>
          ))}
        </div>
        <div className="lg:grid lg:grid-cols-2  lg:me-20">
          <div className="hidden lg:block w-full m-5 p-5">
            {filterTasks.map((item) => (
              <>
                <Card className=" text-zinc-700 ms-15 me-15 p font-bold  top-0 z-50 rounded-2xl  shadow-zinc-500 shadow-[5px_0px_15px_rgba(0,0,0,0.3)] p-10 flex gap-5 m-5 mb-0 ">
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

          <Card className="w-auto  lg:w-full right-0 max-h-fit border-purple-200 text-zinc-700 m-5 md:ms-15  p font-bold  top-0 z-50 rounded-2xl  shadow-zinc-500 shadow-[5px_0px_15px_rgba(0,0,0,0.3)] p-1 md:p-10  gap-5  md:m-15 mt-10 md:mt-15 mb-0">
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex justify-around">
                <div className="flex justify-around">
                  <div className="text-zinc-700 text-sm md:text-2xl font-bold">Task</div>
                  <div className="text-zinc-700 ps-3 pt-1"><LucideListTodo /></div>
                </div>
                <div className="flex">
                  <div><h1 className="text-zinc-700 text-sm md:text-2xl font-bold">Task status</h1></div>
                  <div className="text-zinc-700 ps-2 pt-1"><LucideClock /></div>
                </div>
              </div>
              {tasks.map((item) => (
                <div
                  key={item.id}
                  className="relative border border-zinc-100 shadow-2xl m-1 md:m-5 rounded-2xl flex justify-between items-center text-sm md:text-xl p-0 md:p-2 "
                >
                  <div className="text-zinc-700 ps-3 break-all">{item.title}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenTaskId(openTaskId === item.id ? null : item.id)
                      }
                      className="p-2 md:px-3 md:py-1 rounded-lg hover:bg-zinc-100"
                    >
                      <button className="bg-zinc-100 p-2 rounded-2xl w-30"><p>{item.task_status}</p></button>
                    </button>
                    {openTaskId === item.id && (
                      <div className="absolute right-2 top-13 z-50 bg-zinc-100 rounded-xl shadow-lg shadow-black ">
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
