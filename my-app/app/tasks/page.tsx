"use client";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { useTaskStore } from "../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { TaskStatus } from "@/types/task.types";
import { TaskStatus as TaskStatusType } from "@/store/taskStore";

const TaskPage = () => {
  const TaskStatus = [
    "all",
    "pending",
    "in_progress",
    "completed",
    "cancelled",
  ] as const;

  const { user } = useUserStore();
  const { tasks, fetchTasks, updateTaskStatus, setStatusFilter } =
    useTaskStore();

  const statusFilter = useTaskStore((state) => state.statusFilter);
  console.log("tasks", tasks);

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


  return (
    <>
      <div>
        <div className="bg-[#F4FFC3] font-bold sticky top-0 z-50 border-b shadow-sm p-10 flex gap-5">
          {TaskStatus.map((item, id) => (
            <div
              key={id}
              onClick={() => setStatusFilter(item)}
              className=" m-5 cursor-pointer"
            >
              <Card className="p-5" key={id}>
                <h1>{item}</h1>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="w-full m-5 p-5">
          {filterTasks.map((item) => (
            <>
              <Card className="p-5 m-5 ">
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
          <Card className="m-5 w-80 max-w-auto h-130 right-0">
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex justify-around gap-15">
                <h1 className="text-2xl font-bold">Task</h1>
                <h1 className="text-2xl font-bold">Task status</h1>
              </div>
              {tasks.map((item) => (
                <div key={item.id} className="flex justify-around mt-20 gap-10 items-center text-xl ">
                  <div>{item.title}</div>
                  <div>
                  <select
                    value={item.task_status}
                    onChange={(e) => updateTaskStatus(item.id, e.target.value as TaskStatusType )}
                  className="border-1 border-gray-400 rounded-2xl appearance: base-select"
                  >
                    <option className="px-3 bg-orange-200 border-gray-400 border-2" value={"pending"}>
                      Pending
                    </option>
                    <option className="px-3 bg-green-100" value={"completed"}>  
                     Completed
                    </option>
                    <option className="px-3 bg-gray-100" value={"in_progress"}>
                      In Progress
                    </option>
                    <option className="px-3 bg-red-100" value={"cancelled"}>
                      Cancelled
                    </option>
                  </select>
                </div>
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

export default TaskPage;
