import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case "/":
                return "Dashboard";
            case "/users":
                return "Users";
            case "/events":
                return "Events";
            default:
                return "Dashboard";
        }
    };

    return (
        <div className="header">
            <h1>{getTitle()}</h1>
            <input type="text" placeholder="Search..." />
            <div className="profile-icon">👤</div>
        </div>
    );
};

export default Header;