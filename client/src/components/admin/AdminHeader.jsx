import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import search from "../../assets/header/search.png";
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
            default:
                return "Dashboard";
        }
    };

    const handleLogout = () => {
        navigate("/login-admin");
    };

    // Close Dropdown box when cursor is out 
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (
    //             dropdownRef.current &&
    //             !dropdownRef.current.contains(event.target)
    //         ) {
    //             setDropdownOpen(false);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    return (
        <div className="header">
            <h1>{getTitle()}</h1>
            <form className="header-search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                    <img className="search-icon" src={search} alt="Search icon" />
                </button>
            </form>

            <div className="profile-section" ref={dropdownRef}>
                <div className="profile-icon" onClick={() => {
                    console.log("Icon clicked");
                    setDropdownOpen(!dropdownOpen)
                }}>👤</div>

                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <div onClick={() => navigate("/admin/profile")}>Profile</div>
                        <div onClick={() => navigate("/admin/settings")}>Settings</div>
                        <div onClick={handleLogout}>Logout</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHeader;
