"use client";
import React, { ReactElement, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState<
    { id: number; input: string; completed: boolean }[]
  >([]);

  const [input, setInput] = useState<string>("");
  const [edit, setEdit] = useState<number | null>(null);

  const addTodo = (e:React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return;

   if(edit!== null){
      setTodos(
        todos.map((item) =>
          item.id === edit ? { ...item, input: input } : item
        )
      );
      setEdit(null);
      setInput("");
      return;
    }
    
    const newTodo = {
      id: Date.now(),
      input: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput(" ");
  }



  const deleteTodo = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEdit(id);
    setInput(text);
  };
  
  return (
    <div className="justify-center m-auto mt-20 bg-green-100 p-10 w-300">
      <div className="gap-5 pt-5 flex justify-around">
        <input
          className="bg-blue-100 w-200 p-5 rounded-2xl"
          placeholder="Add todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="p-5 bg-green-700 rounded-2xl w-50" onClick={addTodo}>
          {edit !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="mt-10 flex flex-col gap-3 w-full items-center">
        {todos.map((item) => (
          <div
            key={item.id}
            className="bg-white w-250 p-6 rounded-2xl flex justify-between items-center"
          >
            <p
              className={item.completed ? "line-through text-gray-500" : ""}
            >
              {item.input}
            </p>

            <div className="flex gap-4">
              <div onClick={() => startEdit(item.id, item.input)}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-13 13A1 1 0 0 1 8 21H4a1 1 0 01-1-1v-4a1 1 0 01.293-.707l10-10 3-3z"
                    fill="#000"
                  />
                </svg>
              </div>

              <div onClick={() => deleteTodo(item.id)}>
                <svg width="30" height="30" viewBox="0 0 1024 1024">
                  <path
                    fill="#000"
                    d="M160 256H96a32 32 0 010-64h256V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64h-64v672a32 32 0 01-32 32H192a32 32 0 01-32-32V256zm448-64v-64H416v64h192z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;

