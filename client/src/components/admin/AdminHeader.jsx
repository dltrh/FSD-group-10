import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import search from "../../assets/header/search.png";
import "../../css/admin/admin.css"

const AdminHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Search: ${searchQuery}`);
        setSearchQuery("");
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
