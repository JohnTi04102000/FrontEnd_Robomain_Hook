import "./App.scss";
import React, {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from '../components/Techician/HomePage/Home';
import Admin from '../components/ADMIN/Dashboard'
import Technician from '../components/Techician/Dashboard'
import Login from '../components/Techician/Login/Login';
import Logout from '../components/Techician/Login/Logout'

function App() {
  const navigate = useNavigate();
  const checkLogin = localStorage.getItem("role")

  useEffect(() => {
    if (checkLogin) {
      if(checkLogin === "Maintenance manager")
      {
        navigate("/admin");
      }
      else{
        navigate("/");
      }
    }else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/technician" element={<Technician />}></Route>
        {/* <Route path="/technician" element={<Login />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
