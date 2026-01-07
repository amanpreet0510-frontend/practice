import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { Key } from "lucide-react";
import { Priority } from "../../store/taskStore";

const AssignTask = () => {
  const { assignTaskToEmployee } = useTaskStore();
  const user = useUserStore((state) => state.user);
  const { users, fetchUser } = useUserStore();
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchUser(), fetchTasks();
  }, [fetchUser]);

  console.log("tasks123", tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [priority, setPriority] = useState<Priority | "">("");

  const handleSubmit = async () => {
    try {
      await assignTaskToEmployee({
        title,
        description,
        employeeId: selectedEmployee,
        priority: priority as Priority,
        dueDate,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setSelectedEmployee("");
    } catch (err) {
      console.error("Assign task failed", err);
    }
  };

  return (
    <>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={handleSubmit}>Assign</button>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option>select</option>
          {users.map((item, id) => (
            <React.Fragment key={id}>
              <option value={item.id} className="p-5">
                {item.name}
              </option>
            </React.Fragment>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </>
  );
};

export default AssignTask;
