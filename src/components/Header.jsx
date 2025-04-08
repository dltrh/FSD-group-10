import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import search from "../assets/search.png";
import profile from "../assets/profile.png";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Search: ${searchQuery}`);
        setSearchQuery("");
    };
    return (
        <div className="header-container">
            <Link to="/"><img src={logo} alt="App logo" className="logo"/></Link>
            <form className="search-bar" onSubmit={handleSearch}>
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
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/cerate-event"><button id="btn-create-event">Create Event</button></Link>
                    </li>
                    <li>
                        <Link to="/notification">Notification</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className="profile-container">
                        <img
                            src={profile}
                            alt="Profile picture"
                            className="profile-icon"
                        />
                        <div className="profile-dropdown">
                            <button>Account</button>
                            <button>Saved</button>
                            <button>My events</button>
                            <button>Logout</button>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
