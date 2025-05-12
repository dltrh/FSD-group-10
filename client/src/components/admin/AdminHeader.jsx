import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import search from "../../assets/header/search.png";
import { FaUserCircle } from "react-icons/fa";
import "../../css/admin/admin.css"

const AdminHeader = ({ searchQuery, setSearchQuery }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const q = searchQuery.toLowerCase().trim();

        // Identify keyword of the input
        const isUserKeyword =
            q.includes("@") ||                    // Email
            q.includes("user") ||                 // User
            q.match(/\d{6,}/) ||                  // Phone or ID 
            q.split(" ").length >= 2;             // Fullname like "john doe"

        const isEventKeyword =
            q.includes("event") ||
            q.includes("party") ||
            q.includes("meeting") ||
            q.includes("title") ||
            q.includes("rmit") ||                 // a sample location of event
            q.includes("cat");

        // For debugging
        console.log("Search:", q);
        console.log("→ User match?", isUserKeyword);
        console.log("→ Event match?", isEventKeyword);

        // Redirect based on the keyword from the input
        if (isUserKeyword && location.pathname !== "/admin/users") {
            navigate("/admin/users");
        } else if (isEventKeyword && location.pathname !== "/admin/events") {
            navigate("/admin/events");
        } else {
            // fallback → go to users if it unidentified
            if (location.pathname !== "/admin/users") {
                navigate("/admin/users");
            }
        }
    };


    const getTitle = () => {
        switch (location.pathname) {
            case "/admin":
                return "Dashboard";
            case "/admin/users":
                return "Users";
            case "/admin/events":
                return "Events";
            case "/admin/settings":
                return "Settings";
            default:
                return "Dashboard";
        }
    };

    const handleLogout = () => {
        navigate("/login-admin");
    };

    return (
        <div className="header">
            <h1>{getTitle()}</h1>
            <form className="header-search-bar" onSubmit={handleSearch}>
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        <img className="search-icon" src={search} alt="Search icon" />
                    </button>
                </div>
            </form>

            <div className="profile-section" ref={dropdownRef}>
                <FaUserCircle className="profile-icon" onClick={() => setDropdownOpen(!dropdownOpen)} />

                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <div onClick={() => navigate("/profile")}>Profile</div>
                        <div onClick={() => navigate("/admin/settings")}>Settings</div>
                        <div onClick={handleLogout}>Logout</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHeader;
