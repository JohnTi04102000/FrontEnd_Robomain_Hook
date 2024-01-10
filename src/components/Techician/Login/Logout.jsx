import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import localStorage from "localStorage";
import Home from "../HomePage/Home";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/login");
    toast.success("Logout successful");
  };

  return <div></div>;
};

export default Logout;
