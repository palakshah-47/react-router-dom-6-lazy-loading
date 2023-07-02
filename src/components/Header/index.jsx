import React, { useContext } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import "./header.css";

// Exercise...
// Use the value from Auth Context
// if loggedIn, display home, posts, users, name, logout
// if not logged in, just display, home, login, register, posts and users

export default function Index() {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory;
  const { loggedIn, user } = auth;

  const { pathname } = useLocation();

  const handleLogout = () => {
    setAuth({
      loggedIn: false,
      user: null
    });

    history.push("/");
  };

  console.log(auth);

  return (
    <header>
      <nav className="header--nav">
        <NavLink to="/" isActive={() => pathname === "/"}>
          Home
        </NavLink>
        {!loggedIn && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/users">Users</NavLink>

        {loggedIn && (
          <>
            <a href="#" style={{ display: "flex", alignItems: "center" }}>
              <img
                src={user.avatar}
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginRight: 8
                }}
              />
              {user.first_name} {user.last_name}
            </a>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
