import React, { useEffect } from "react";
import { usetaskStore } from "../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { Card, CardHeader } from "./card";

const Task = () => {
  const user = useUserStore((state) => state.user);
  const { tasks, fetchTasks } = usetaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <Card className="">
        <CardHeader className="text-2xl font-bold">Recent Tasks</CardHeader>
        {tasks.map((item, id) => (
          <React.Fragment key={id}>
            <div key={id} className="p-15 text-2xl font-2xl fon">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </React.Fragment>
        ))}
      </Card>
    </>
  );
};

export default Task;
