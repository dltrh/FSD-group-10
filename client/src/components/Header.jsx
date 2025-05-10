import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import search from "../assets/header/search.png";
import profile from "../assets/header/profile.png";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.css";
import NotificationDropdown from "./notification/NotificationDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Header() {
    // Search bar
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(false);

    const [loggedInUserId, setLoggedInUserId] = useState(null);
    
        useEffect(() => {
            const fetchUserId = async () => {
                try {
                    const response = await fetch("http://localhost:5000/api/getCurrentUserId", {
                        method: "GET",
                        credentials: "include", // Include session cookies
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setLoggedInUserId(data.user); // Set the logged-in user's ID
                    } else {
                        console.error("Failed to fetch user ID");
                    }
                } catch (error) {
                    console.error("Error fetching user ID:", error);
                }
            };
    
            fetchUserId();
        }, []);
    // Fetch notifications for the user when the component mounts or when user.id changes
    useEffect(() => {
        if (!loggedInUserId) return; // ✅ ensure consistent dependency array
        const fetchNotifications = async () => {
            setLoadingNotifications(true);
            try {
                const response = await fetch(`http://localhost:5000/api/notifications/${loggedInUserId}`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                } else {
                    console.error("Failed to fetch notifications");
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoadingNotifications(false);
            }
        };
        fetchNotifications();
    }, [loggedInUserId]); // ✅ consistent dependency

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Search: ${searchQuery}`);
        setSearchQuery("");
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Error: ${data.message}`);
            } else {
                alert("Logout successful!");
                // Redirect to login page or home page
                navigate("/");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred during logout.");
        }
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
            <Link to={user ? "/home" : "/"}> 
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
                            loading={loadingNotifications}
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
                            <Link to="/profile">
                                <button>Account</button>
                            </Link>
                            <Link to="/saved-events">
                                <button>Saved events</button>
                            </Link>
                            <Link to="/invitations">
                                <button>My invitations</button>
                            </Link>
                            <Link to="/manage">
                                <button>My events</button>
                            </Link>

                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
