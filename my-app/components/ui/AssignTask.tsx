import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { Key } from "lucide-react";
import { Priority } from "../../store/taskStore";
import { Card } from "./Card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { getSupabaseClient } from "@/lib/supabaseClient";


const AssignTask = () => {
  
  const user = useUserStore((state) => state.user);
  const assignTaskToEmployee = useTaskStore(
    (state) => state.assignTaskToEmployee
  );
  
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
      console.log("Type:", typeof assignTaskToEmployee);

      await assignTaskToEmployee({
        userId: user?.id || "",
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
      <Card className="ms-15 me-15 mt-10 font-bold  top-0 z-50 rounded-2xl  shadow-zinc-500 shadow-[5px_0px_15px_rgba(0,0,0,0.3)]  border border-zinc-300 ">
        <div className="m-10 mb-4">
          <Table>
            <TableHeader>
              <TableRow className='text-zinc-400 mt-15  m-5 ps-2'>
                <TableHead className='text-xl'>Task title</TableHead>
                <TableHead className='text-xl'>Description</TableHead>
                <TableHead className='text-xl'>Select date</TableHead>
                <TableHead className='text-xl'>Task assigned to</TableHead>
                <TableHead className='text-xl'>Task Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="border border-zinc-300 p-5 ms-0"
                  />
                </TableCell>
                <TableCell>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border border-zinc-300 w-55 p-2 m-5 ms-0"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border border-zinc-300 w-55 p-2 m-5 ms-0 text-zinc-500 p-4"
                  />
                </TableCell>
                <TableCell>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="border border-zinc-300 w-55 m-5 ms-0 text-zinc-500 p-4"
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
                </TableCell>
                <TableCell>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="border border-zinc-300 w-55 m-5 ms-0 text-zinc-500 p-4"
                  >
                    <option value="">Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-center m-auto">
        <button className="p-5 border border-zinc-300 ms-5 bg-[#0F0E23] text-zinc-200 rounded-2xl mt-5 mb-0" onClick={handleSubmit}>Assign task</button>
        </div>
         </div>
      </Card>
    </>
  );
};

export default AssignTask;
