import React, { useEffect, useState, useRef } from "react";
import UserCard from "./components/UserCard";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const isFetching = useRef(false); 

  const fetchUsers = async (page) => {
    if (isFetching.current) return; 

    isFetching.current = true; 

    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data.data]);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    } finally {
      isFetching.current = false; 
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const loadMoreUsers = () => {
    if (!isFetching.current) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <button onClick={loadMoreUsers} disabled={isFetching.current}>
        {isFetching.current ? "Loading..." : "Load More Users"}
      </button>
    </div>
  );
};

export default App;

