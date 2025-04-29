import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "../../css/event/event-list.css";
import { parseDateString, calculateEventStatus } from "../../utils/timeUtils";


export default function EventList(  ) {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [sortOption, setSortOption] = useState("Newest");
   

    // Dynamic filter options
    const [availableLocations, setAvailableLocations] = useState([]);
    const [availableThemes, setAvailableThemes] = useState([]);
    // Define status options - these will be calculated dynamically
    const statuses = ["Upcoming", "In Progress", "Completed"];

    // Budget-related filters
    const [budget, setBudget] = useState(500);
    const [appliedBudget, setAppliedBudget] = useState(0); 
    const [maxBudget, setMaxBudget] = useState(500); // default is 500 if nothing happens



    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/events');
                const data = await response.json();


                // Process events to add status
                const processedEvents = data.map(event => ({
                    ...event,
                    status: calculateEventStatus(event)
                }));

                // Extract unique locations and themes
                extractFilterOptions(processedEvents);
                setEvents(processedEvents);

                // Find max budget
                if (processedEvents.length > 0) {
                    const budgets = processedEvents
                        .map(event => event.budget)
                        .filter(budget => typeof budget === 'number' && !isNaN(budget));

                    const max = budgets.length > 0 ? Math.max(...budgets) : 0;
                    setMaxBudget(max);
                    setBudget(max); // Optional: Set slider to max when loaded
                }
                

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

   

    // Extract unique filter options
    const extractFilterOptions = (eventsData) => {
        const locationSet = new Set();
        const themeSet = new Set();

        eventsData.forEach(event => {
            if (event.location) {
                locationSet.add(event.location);
            }

            if (event.eventTheme) {
                themeSet.add(event.eventTheme);
            }
        });

        setAvailableLocations(Array.from(locationSet).sort());
        setAvailableThemes(Array.from(themeSet).sort());
    };

    useEffect(() => {
        let result = [...events];

        if (search) {
            const query = search.toLowerCase();
            result = result.filter(
                (event) =>
                    (event.title && event.title.toLowerCase().includes(query)) ||
                    (event.location && event.location.toLowerCase().includes(query)) ||
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

        if (selectedTheme){
            result = result.filter(event =>
                event.eventTheme && event.eventTheme === selectedTheme
            );
        }
        // Apply status filters - now using our calculated status
        if (selectedStatuses.length > 0) {
            result = result.filter(event =>
                event.status && selectedStatuses.includes(event.status)
            );
        }

        // Apply budget filter
        result = result.filter(event =>
            event.budget && event.budget <= budget
        );

        // Apply location filters
        if (selectedLocations.length > 0) {
            result = result.filter(event =>
                event.location && selectedLocations.includes(event.location)
            );
        }

        setFilteredEvents(result);
    }, [search, events, appliedBudget, sortOption, selectedTheme, selectedStatuses, selectedLocations]);


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

    // Reset the theme filter
    const resetThemeFilter = () => {
        setSelectedTheme("");
    };

   

    return (
        <div className="event-list-overlay">
            <div className="filters">
                <h4>Event Theme</h4>
                {selectedTheme && (
                    <button
                        className="sort-button"
                        onClick={resetThemeFilter}
                    >
                        Reset
                    </button>
                )}
                <div className="theme-tags">
                    {availableThemes.map((theme) => (
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
                        max={maxBudget}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                    <span>${budget}</span>
                    <button onClick={() => setAppliedBudget(budget)}>
                        Apply Budget Filter
                    </button>
                </div>

                <h4>Location</h4>
                <div className="locations">
                    {availableLocations.map((loc) => (
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
                            placeholder="Search by name, description, location"
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
