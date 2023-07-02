import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function LearnToday() {
  const [auth] = useContext(AuthContext);
  return (
    // Use React Framgment or <></> to enclose multiple parents.
    <>
      {auth.loggedIn &&
        `Welcome back ${auth.user.first_name} ${auth.user.last_name}`}
      <h1>It is a Home Page</h1>
      <h2>It is about implementing Context API</h2>
    </>
  );
}
