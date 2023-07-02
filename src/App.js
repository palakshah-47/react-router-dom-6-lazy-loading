// Alias -> different name, aka -> also known as...
import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import "./App.css";
import Api from "./components/Api";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Post from "./components/Post";
import Home from "./components/Home";
import ScrollRestoration from "./components/ScrollRestoration";
import UsersTable from "./components/UsersTable/UsersTable";
import { AuthProvider } from "./components/AuthProvider";

const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

// import Header from "./components/Header";

function App() {
  return (
    // All the children inside of authprovider can acess the
    // values... provided by the <AuthProvider> component.
    <AuthProvider>
      <Header />
      <ScrollRestoration />
      <Content>
        <Routes>
          {/* <Switch> */}
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <React.Suspense fallback={<>...</>}>
                <Register />
              </React.Suspense>
            }
          ></Route>
          <Route path="/users" element={<UsersTable />}></Route>
          {/* Nested Route */}
          <Route path="/posts/:id" element={<Post />}></Route>
          <Route path="/posts" element={<Api />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          {/* </Switch> */}
        </Routes>
      </Content>
      <Footer />
    </AuthProvider>
  );
}
export default App;
