import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import search from "../assets/header/search.png";
import profile from "../assets/header/profile.png";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.css";
import NotificationDropdown from "./notification/NotificationDropdown";

const notifications = [
    {
        id: 1,
        event_id: 1,
        user_ud: 1,
        sent_at: "22/07/2025",
        message: "Alice liked your post.",
    },
    {
        id: 2,
        event_id: 1,
        user_ud: 1,
        sent_at: "22/07/2025",
        message: "Bob liked your post.",
    },
    {
        id: 3,
        event_id: 2,
        user_ud: 2,
        sent_at: "23/07/2025",
        message: "You have a new RSVP from Charlie.",
    },
    {
        id: 4,
        event_id: 3,
        user_ud: 1,
        sent_at: "23/07/2025",
        message: "Your event has been updated.",
    },
    {
        id: 5,
        event_id: 4,
        user_ud: 3,
        sent_at: "24/07/2025",
        message: "Dana commented on your discussion post.",
    },
    {
        id: 6,
        event_id: 1,
        user_ud: 1,
        sent_at: "24/07/2025",
        message: "Eve joined your event.",
    },
    {
        id: 7,
        event_id: 2,
        user_ud: 2,
        sent_at: "25/07/2025",
        message: "Your RSVP has been confirmed.",
    },
];

export default function Header() {
    // Search bar
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Search: ${searchQuery}`);
        setSearchQuery("");
    };

    // Notification drop-down list
    const [notificationOpen, setNotificationOpen] = useState(false);
    const notificationDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                notificationDropdownRef.current &&
                !notificationDropdownRef.current.contains(e.target)
            ) {
                setNotificationOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="header-container">
            <Link to="/">
                <img src={logo} alt="App logo" className="logo" />
            </Link>
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
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/create">
                            <button id="btn-create-event">Create Event</button>
                        </Link>
                    </li>
                    <li
                        ref={notificationDropdownRef}
                        className="notification-container"
                    >
                        <Link
                            onClick={() =>
                                setNotificationOpen(!notificationOpen)
                            }
                        >
                            Notifications
                        </Link>

                        <NotificationDropdown
                            notifications={notifications}
                            isOpen={notificationOpen}
                        />
                    </li>
                    <li>
                        <Link to="/contacts">Contacts</Link>
                    </li>
                    <li className="profile-container">
                        <img
                            src={profile}
                            alt="Profile picture"
                            className="profile-icon"
                        />
                        <div className="profile-dropdown">
                            <Link to="/:user-id/profile">
                                <button>Account</button>
                            </Link>
                            <Link to="/:user-id/saved-events">
                                <button>Saved events</button>
                            </Link>
                            <Link to="/:user-id/invitations">
                                <button>My invitations</button>
                            </Link>
                            <Link to="/:user-id/my-events">
                                <button>My events</button>
                            </Link>
                            <Link to="/">
                                <button>Logout</button>
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
