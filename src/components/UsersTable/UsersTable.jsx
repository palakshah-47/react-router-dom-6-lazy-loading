// Exercise:
// https://reqres.in/api/users

// Create a component UsersTable.jsx
// Render this in a table below.

import axios from "axios";
import { useEffect, useState } from "react";
import "./usersTable.css";

function UsersTable() {
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // We have users now...
  const usersTableRows =
    users &&
    users.data.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>
          <div className="user--container">
            <img src={user.avatar} alt="UserAvatar" />
            <span>
              {user.first_name} {user.last_name}
            </span>
          </div>
        </td>
      </tr>
    ));

  // For Pagination
  // Render the buttons equal to the total_pages
  // On each button press, set page state -> 1 press -> 1 2 / 2

  const handlePageClick = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  const paginationJsx =
    users &&
    Array(users.total_pages)
      .fill()
      .map((_, index) => (
        <button key={index + 1} onClick={() => handlePageClick(index + 1)}>
          {index + 1}
        </button>
      ));

  const handlePrev = () => {
    let currPage = page;
    if (currPage === 1) return;
    setPage(currPage - 1);
  };

  const handleNext = () => {
    let currPage = page;
    if (currPage === users.total_pages) return;
    setPage(currPage + 1);
  };

  return (
    <>
      {loading && "Loading...Please wait."}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>{usersTableRows}</tbody>
      </table>
      <button onClick={() => handlePrev()}>prev</button>
      {paginationJsx}
      <button onClick={() => handleNext()}>next</button>
    </>
  );
}

export default UsersTable;
