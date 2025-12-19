import React, { useEffect, useState } from "react";
import { usetaskStore } from "../../store/taskStore";
import { useUserStore } from "@/store/userStore";
import { Key } from "lucide-react";



const AssignTask = () => {
  const { assignTaskToEmployee } = usetaskStore();
  const user = useUserStore((state) => state.user);
  const { users,fetchUser } = useUserStore();


useEffect(()=>{
  fetchUser()
},[fetchUser])

console.log('users',users)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");



  const handleSubmit = async () => {
    try {
      await assignTaskToEmployee({
        title, 
        description,
        employeeId:selectedEmployee, 
        dueDate});
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
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button onClick={handleSubmit}>Assign</button>
      <select value={selectedEmployee} onChange={(e)=> setSelectedEmployee(e.target.value)}><option>select</option>
        {users.map((item,id)=><React.Fragment key={id} >
          <option value={item.id} className="p-5">{item.name}</option>
        </React.Fragment>
        )}
     </select>
    </div>
    </>
  );
};

export default AssignTask;