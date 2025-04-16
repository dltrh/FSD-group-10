import React from 'react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            {/* <h1>Planny</h1> */}
            <img src={logo} alt="logo" className="admin-logo"/>
            <nav className="nav-links">
                <Link to="dashboard" className="nav-item">
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                </Link>
                <Link to="users" className="nav-item">
                    <FaUsers className="nav-icon" />
                    Users
                </Link>
                <Link to="events" className="nav-item">
                    <FaCalendarAlt className="nav-icon" />
                    Events
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;