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
      <Card className="p-1 md:p-auto w-auto md:w-fit ms-5 me-5 md:ms-15 md:me-15 mt-10 font-bold  top-0 z-50 rounded-2xl  shadow-zinc-500 shadow-[5px_0px_15px_rgba(0,0,0,0.3)]  border border-zinc-300 ">
        <div className="md:m-10 md:mb-4">
          <Table>
            <div className="flex justify-between md:block">
              <div className="flex justify-between">
            <TableHeader>
              <TableRow className='flex flex-col gap-3 md:flex-row md:justify-between text-[15px] md:text-lg  text-zinc-400 mt-15  md:m-5 md:ps-2'>
                <TableHead >Task title</TableHead>
                <TableHead >Description</TableHead>
                <TableHead  >Select date</TableHead>
                <TableHead >Task assigned to</TableHead>
                <TableHead >Task Priority</TableHead>
              </TableRow>
            </TableHeader>
            </div>
            <div>
            <TableBody>
              <TableRow className="flex flex-col md:flex-row gap-6 md:justify-between mt-12 md:mt-0">
                <TableCell>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="border border-zinc-300 w-25 lg:w-full p-1 md:p-2 lg:p-5 ms-0"
                  />
                </TableCell>
                <TableCell>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border border-zinc-300 w-25 lg:w-55 p-0  lg:p-2  md:ms-0"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border border-zinc-300 w-25 lg:w-55  md:p-4  md:ms-0"
                  />
                </TableCell>
                <TableCell>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="border border-zinc-300 w-25 lg:w-55  md:p-4 md:ms-0"
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
                    className="border border-zinc-300 w-25 lg:w-55 m-0 ms-0 text-zinc-500 p-1 md:p-4"
                  >
                    <option value="">Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </TableCell>
              </TableRow>
            </TableBody>
            </div>
            </div>
          </Table>
          <div className="flex justify-center m-auto">
        <button className="w-50 text-center p-0 md:p-4 border border-zinc-300 ms-5 bg-[#0F0E23] text-zinc-200 text-sm md:text-md rounded-2xl mt-10 mb-8 md:mt-5 md:mb-0 h-10  md:h-full md:w-full " onClick={handleSubmit}>Assign task</button>
        </div>
         </div>
      </Card>
    </>
  );
};

export default AssignTask;
