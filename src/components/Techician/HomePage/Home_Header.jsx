import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Home_Header.scss";
import logo from "../../../assets/image/logo.png";
import Notification from "../HomePage/Notification";

const Home_Header = () => {
  const isLogin = localStorage.getItem("id");
  
  return (
    <>
      <div className="home-header">
        <Navbar bg="light" expand="xl">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto logo">
                <NavLink to="/" className="nav-link ">
                  <img src={logo} alt="Logo" className="logo-image" />
                  <b>Robomain</b>
                </NavLink>
                {isLogin ? (
                  <>
                    <NavLink to="/technician" className="nav-link">
                      Technician-dashboard
                    </NavLink>
                    <div className="notifications">
                      <Notification />
                    </div>
                    <div className="authentication">
                      <i className="fa-solid fa-right-from-bracket fa-rotate-180"></i>
                      <NavLink to="/logout" className="nav-link ">
                        <b>Logout</b>
                      </NavLink>
                    </div>
                  </>
                ) : (
                  <>              
                    <div className="authentication">
                      <i className="fa-solid fa-right-to-bracket"></i>
                      <NavLink to="/login" className="nav-link ">
                        <b>Login</b>
                      </NavLink>
                    </div>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Home_Header;
