"use client";
import React from "react";
import Card from "../../components/ui/Card";
import { useSearchStore } from "../../store/searchStore";


const Dashboard = () =>  {

  const { search } = useSearchStore();

  const users = [
    {
      id: 1,
      name: "Anjali",
      role: "Admin",
      img: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
    },
    {
      id: 2,
      name: "Simran",
      role: "HR",
      img: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
    },
    {
      id: 3,
      name: "Raman",
      role: "Manager",
      img: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
    },
    {
      id: 4,
      name: "Priya",
      role: "Employee",
      img: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
    },
    {
      id: 5,
      name: "Rachel",
      role: "Manager",
      img: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
    },
    {
      id: 6,
      name: "Prajakta",
      role: "Employee",
      img: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
    },
  ];

  const filtered = users.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <div className="justify-center grid grid-cols-3 gap-15 ">
          {filtered.map((i) => (
            <>
              <Card
                title={i.name}
                value={i.id}
                image={i.img}
                mainTitle={i.role}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;



