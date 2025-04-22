import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import search from "../../assets/header/search.png";

const AdminHeader = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
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
                    <img
                        className="search-icon"
                        src={search}
                        alt="Search icon"
                    />
                </button>
            </form>
            <div className="profile-icon">👤</div>
        </div>
    );
};

export default AdminHeader;
