import React, { useState } from "react";
import EventCard from "./EventCard";
import "../../css/event/event-list.css";

const themes = ["Wedding", "Birthday", "Corporate", "Festival"];
const statuses = ["Upcoming", "Completed", "Cancelled"];
const locations = ["Ha Noi", "Ho Chi Minh", "Da Nang", "Hue"];

export default function EventList( {events} ) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [budget, setBudget] = useState(50);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [sortOption, setSortOption] = useState("Newest");

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
    const handleSearch = () => {
        const query = search.toLowerCase();

        const results = events.filter(
            (event) =>
                event.title.toLowerCase().includes(query) ||
                event.host.toLowerCase().includes(query) ||
                event.venue.toLowerCase().includes(query)
        );

        setFilteredEvents(results);
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
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="search-button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    <div className="sort-options">
                        {[
                            "Newest",
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
                    {events.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                        >
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
