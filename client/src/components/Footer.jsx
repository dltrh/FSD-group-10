import React from "react";
import logo from "../assets/logo.png";
import x from "../assets/footer/x.png";
import facebook from "../assets/footer/facebook.png";
import instagram from "../assets/footer/instagram.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/footer.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Footer() {
    return (
        <div className="footer-container">
            <img className="logo" src={logo} alt="Logo" />
            <div className="footer-nav">
                <div className="info">
                    <h3>Stay connected</h3>
                    <ul>
                        <li>
                            <img className="platform-icon" src={facebook} alt="Facebook logo" />
                            <label><p>Facebook</p></label>
                        </li>
                        <li>
                            <img className="platform-icon" src={x} alt="X logo" />
                            <label><p>X</p></label>
                        </li>
                        <li>
                            <img className="platform-icon" src={instagram} alt="Instagram logo" />
                            <label><p>Instagram</p></label>
                        </li>
                    </ul>
                </div>
                <div className="about">
                    <h3>About us</h3>
                    <ul>
                        <li>
                            <Link to="/about">About us</Link>
                        </li>
                        <li>
                            <Link>FAQ</Link>
                        </li>
                        <li>
                            <Link>Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="policy">
                    <h3>Policy</h3>
                    <ul>
                        <li>
                            <Link>Terms and Conditions</Link>
                        </li>
                        <li>
                            <Link>Security and Privacy policy</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
