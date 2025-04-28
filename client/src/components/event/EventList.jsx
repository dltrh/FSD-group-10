import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "../../css/event/event-list.css";

const themes = ["Wedding", "Birthday", "Corporate", "Festival"];
const statuses = ["Upcoming", "Completed", "Cancelled"];
const locations = ["Ha Noi", "Ho Chi Minh", "Da Nang", "Hue"];

export default function EventList(  ) {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [budget, setBudget] = useState(50);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [sortOption, setSortOption] = useState("Newest");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/events');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        let result = [...events];

        if (search) {
            const query = search.toLowerCase();
            result = result.filter(
                (event) =>
                    (event.title && event.title.toLowerCase().includes(query)) ||
                    (event.description && event.description.toLowerCase().includes(query))
            );
        }

        // Apply sorting
        if (sortOption === "Newest") {
            result.sort((a, b) => new Date(b.timeStart) - new Date(a.timeStart));
        } else if (sortOption === "Oldest") {
            result.sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart));
        } else if (sortOption === "Price: Low to High") {
            result.sort((a, b) => (a.budget || 0) - (b.budget || 0));
        } else if (sortOption === "Price: High to Low") {
            result.sort((a, b) => (b.budget || 0) - (a.budget || 0));
        }

        setFilteredEvents(result);
    }, [search, events, budget, sortOption]);


    // Handle search input changes
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const toggleStatus = (status) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        );
    };

    const toggleLocation = (location) => {
        setSelectedLocations((prev) =>
            prev.includes(location)
                ? prev.filter((l) => l !== location)
                : [...prev, location]
        );
    };
   

    return (
        <div className="event-list-overlay">
            <div className="filters">
                <h4>Event Theme</h4>
                <div className="theme-tags">
                    {themes.map((theme) => (
                        <button
                            key={theme}
                            className={`theme-tag ${
                                selectedTheme === theme ? "selected" : ""
                            }`}
                            onClick={() => setSelectedTheme(theme)}
                        >
                            {theme}
                        </button>
                    ))}
                </div>
                <h4>Status</h4>
                <div className="checkbox-group">
                    {statuses.map((status) => (
                        <label key={status}>
                            <input
                                type="checkbox"
                                checked={selectedStatuses.includes(status)}
                                onChange={() => toggleStatus(status)}
                            />{" "}
                            {status}
                        </label>
                    ))}
                </div>
                <h4>Budget Range</h4>
                <div className="range-slider">
                    <span>$0</span>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                    <span>${budget}</span>
                </div>
                <h4>Location</h4>
                <div className="locations">
                    {locations.map((loc) => (
                        <label key={loc}>
                            <input
                                type="checkbox"
                                checked={selectedLocations.includes(loc)}
                                onChange={() => toggleLocation(loc)}
                            />{" "}
                            {loc}
                        </label>
                    ))}
                </div>
            </div>
            <div className="border-start border-2 border-gray-400"></div>
            <div className="main-content">
                <div className="top-controls">
                    <div className="search-bar">

                        <input
                            type="text"
                            placeholder="Search by name, host, venue..."
                            value={search}
                            onChange={handleSearchChange}
                            
                        />
                        <button className = "search-button"> Search</button>
             
                    </div>
                    <div className="sort-options">
                        {[
                            "Newest",
                            "Oldest",
                            "Price: Low to High",
                            "Price: High to Low",
                        ].map((opt) => (
                            <button
                                key={opt}
                                className={`sort-button ${
                                    sortOption === opt ? "active" : ""
                                }`}
                                onClick={() => setSortOption(opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="event-list-container">
                    {filteredEvents.map((event) => (
                        <div key={event._id}>
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
