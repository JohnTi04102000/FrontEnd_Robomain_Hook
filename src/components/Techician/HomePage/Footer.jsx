import React from "react";
import './Footer.scss';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-title">
                <h3>ROBOMAIN</h3>
                <h4>Hand-free maintenance</h4>
                <h4>ROBOMAIN INC.</h4>
                <p>000017 Kenaston Gdns, 716, North York, Ontario, Canada, M2K0B9</p>
                
                <b>Website: </b> <a href="https://robomain.ca/">www.robomain.ca</a>
                <h5>CEO: boris(at)robomain.ca, Tel. +84 86 8701756</h5>
            </div>
            <div className="footer-about">
                <h3>Cutomer service</h3>
                <ul>
                    <li>About RoboMain &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>Founders &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>Our Story &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>Company News &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>Partners &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                </ul>
            </div>
            <div className="footer-service">
                <h3>About us</h3>
                <ul>
                    <li>Cutomer service &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>AR for installation and guidance &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>AR for visual Inspection and remote monitoring &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>Predictive maintenance plan with software &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>AI for prediction and better plan &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                    <li>IoT for real time data from machine &nbsp; <i className="fa-solid fa-arrow-right"></i></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
