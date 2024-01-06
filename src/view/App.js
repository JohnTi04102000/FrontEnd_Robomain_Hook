import logo from "./logo.svg";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from '../components/Techician/HomePage/Home';
import Admin from '../components/ADMIN/Dashboard'
import Login from '../components/Techician/Login/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/technician" element={<Login />}></Route>
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
