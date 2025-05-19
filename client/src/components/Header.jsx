import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationDropdown from "./notification/NotificationDropdown";
import logo from "../assets/logo.png";
import search from "../assets/header/search.png";
import { CgProfile } from "react-icons/cg";
import "../css/header.css";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const searchInputRef = useRef();
    const suggestionRef = useRef();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch(`${baseURL}/getCurrentUserId`, {
                    method: "GET",
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setLoggedInUserId(data.user);
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        if (!loggedInUserId) return;
        const fetchNotifications = async () => {
            setLoadingNotifications(true);
            try {
                const response = await fetch(`${baseURL}/notifications/${loggedInUserId}`, {
                    credentials: "include"
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoadingNotifications(false);
            }
        };
        fetchNotifications();
    }, [loggedInUserId]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setHighlightedIndex(-1);
        if (!value.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        try {
            const res = await fetch(`${baseURL}/events/search?q=${value}`, {
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                console.log("Suggestions:", data);
                setSuggestions(data);
                setShowSuggestions(true);
            }
        } catch (err) {
            console.error("Search fetch error:", err);
        }
    };

    const handleSuggestionClick = (eventId) => {
        setSearchQuery("");
        setSuggestions([]);
        setShowSuggestions(false);

        if (!eventId) {
            console.warn("Missing eventId for redirection.");
            return;
        }
        navigate(`/manage/details/${eventId}`);
    };

    const handleSearchKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
                console.log("Selected suggestion:", suggestions[highlightedIndex]);
                handleSuggestionClick(suggestions[highlightedIndex].eventId);
            }
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${baseURL}/logout`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                alert("Logout successful!");
                navigate("/");
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                suggestionRef.current &&
                !suggestionRef.current.contains(e.target) &&
                !searchInputRef.current.contains(e.target)
            ) {
                setShowSuggestions(false);
                console.log("ShowSuggestions:", showSuggestions);
                console.log("Suggestions:", suggestions);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="header-container">
            <Link to={user ? "/home" : "/"}>
                <img src={logo} alt="App logo" className="logo" />
            </Link>

            <div className="header-search-bar" ref={searchInputRef}>
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleSearchKeyDown}
                    />
                    <button type="button">
                        <img src={search} className="search-icon" alt="search" />
                    </button>

                    {showSuggestions && (
                        <ul className="suggestion-dropdown" ref={suggestionRef}>
                            {suggestions.length > 0 ? (
                                suggestions.map((item, index) => (
                                    <li
                                        key={item._id || index}
                                        className={index === highlightedIndex ? "highlighted" : ""}
                                        onClick={() => handleSuggestionClick(item.eventId)}
                                    >
                                        {item.title || "No title"}
                                    </li>
                                ))
                            ) : (
                                <li style={{ padding: "10px", color: "#888" }}>No suggestions</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/create">
                            <button id="btn-create-event">Create Event</button>
                        </Link>
                    </li>
                    <li className="notification-container">
                        <Link onClick={() => setNotificationOpen((prev) => !prev)}>
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
                        <div className="profile-icon">
                            <CgProfile />
                        </div>
                        <div className="profile-dropdown">
                            <Link to="/profile"><button>Account</button></Link>
                            <Link to="/saved-events"><button>Saved events</button></Link>
                            <Link to="/invitations"><button>My invitations</button></Link>
                            <Link to="/manage"><button>My events</button></Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
