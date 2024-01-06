import React from "react";
import Home_Header from "./Home_Header";
import Home_Body from "./Home_Body";
import "./Home.scss";
const Home = () => {
  return (
    <>
      <Home_Header />
      <div className="app-container">
        <Home_Body/>
      </div>
    </>
  );
};

export default Home;
