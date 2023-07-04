import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Button from "./Button";
import Input from "./Input";

export default function Login() {
  const navigate = useNavigate();
  const [, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [loginError, setLoginError] = useState(null);

  // On Login Press
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate user data before submission
    if (!email)
      setErrors((prevState) => {
        return { ...prevState, email: "Email field is required!" };
      });
    if (!password)
      setErrors((prevState) => {
        return { ...prevState, password: "Password field is required!" };
      });

    // If data is validated, send data for submission
    if (email && password) {
      login(email, password);
    }
  };

  const login = async (email, password) => {
    setLoginError("");
    setLoading(true);
    // Error prone...
    try {
      await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      const { data } = await axios.get("https://reqres.in/api/users/2");

      // After login, set the user....
      setAuth({
        loggedIn: true,
        user: data.data,
      });

      navigate("/");
    } catch (e) {
      setLoginError("An error was occurred. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Input
          onChange={(e) => {
            // Set Email and remove errors if any
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
          placeHolderKeyword="email"
          type="email"
          label="Your Email"
        />
        {/* If any errors in email display them */}
        <p style={{ color: "red", marginBottom: 20 }}>
          {errors.email && errors.email}
        </p>

        <Input
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({ ...errors, password: "" });
          }}
          placeHolderKeyword="password"
          type="password"
          label="Password"
        />
        {/* If any errors in password display them */}
        <p style={{ color: "red", marginBottom: 20 }}>
          {errors.password && errors.password}
        </p>

        {/* Submit button */}
        <Button text="Login" color="white" type="submit" />

        {loading && <p style={{ color: "teal" }}>Logging in...</p>}
        <p style={{ color: "red" }}>{loginError}</p>
      </form>
    </div>
  );
}
