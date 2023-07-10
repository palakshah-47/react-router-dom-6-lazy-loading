import axios from "axios";
import { useState, useEffect } from "react";

export const User = ({ id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async (id) => {
      let { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUser(data);
    };
    fetchUser(id);
  }, [id]);
  if (!user) return <p>No User available</p>;
  return <p>By: {user.name}</p>;
};
