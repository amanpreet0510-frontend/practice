// "use client";
// import React from "react";

// export default function ThrottleExample() {
//   function throttle(fn, delay) {
//     let last = 0;

//     return (...args) => {
//       const now = Date.now();

//       if (now - last >= delay) {
//         last = now;
//         fn(...args);
//       }
//     };
//   }

//   const handleClick = () => {
//     console.log("Button clicked:", new Date().toLocaleTimeString());
//   };

//   const throttledClick = throttle(handleClick, 1000); // 1 second

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Throttle Example in React</h2>
//       <button onClick={throttledClick}>
//         Click Fast — It will run once every 1 sec
//       </button>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";

function throttle(fn, delay) {
  let last = 0;

  return (...args) => {
    const now = Date.now();

    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
}

export default function ThrottleSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

 
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("https://fakestoreapi.com/users");
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

 
  const searchAPI = (value) => {
    const result = users.filter((u) =>
      u.username.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
    console.log("API SEARCH triggered with:", value) ;
  };

 
  const throttledSearch = throttle(searchAPI, 1000);

  useEffect(() => {
    if (query.trim() !== "") {
      throttledSearch(query);
    } else {
      setFiltered([]);
    }
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Throttle Search Example</h2>

      <input
        type="text"
        placeholder="Search users…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2"
      />

      <ul style={{ marginTop: "15px" }}>
        {filtered.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}


