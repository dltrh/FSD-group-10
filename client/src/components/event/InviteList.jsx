import React, { useState, useEffect } from "react";
import InviteCard from "./InviteCard";
import "../../css/event/invite-list.css";
import { parseDateString, calculateEventStatus } from "../../utils/timeUtils";

export default function InviteList() {
    const [invitations, setInvitations] = useState([]);
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredInvitations, setFilteredInvitations] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [sortOption, setSortOption] = useState("Newest");

    // Dynamic filter options
    const [availableLocations, setAvailableLocations] = useState([]);
    const [availableThemes, setAvailableThemes] = useState([]);

    // Define status options - these will be calculated dynamically
    const statuses = ["Accepted", "Pending", "Declined"];

    // Budget-related filters
    const [budget, setBudget] = useState(500);
    const [appliedBudget, setAppliedBudget] = useState(0);
    const [maxBudget, setMaxBudget] = useState(500); // default is 500 if nothing happens

    const baseURL = import.meta.env.VITE_API_BASE_URL

    // Extract unique filter options
    const extractFilterOptions = (eventsData) => {
        const locationSet = new Set();
        const themeSet = new Set();

        eventsData.forEach((event) => {
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

    // Fetch event details by ID
    const fetchEventById = async (eventId) => {
        try {
            const response = await fetch(
                `${baseURL}/events/${eventId}`, {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(
                "Error fetching invitation's event information: ",
                err
            );
        }
    };

    // Fetch and align events with invitations
    useEffect(() => {
        const fetchEventsInInvitations = async () => {
            try {
                const eventsData = await Promise.all(
                    invitations.map(async (invitation) => {
                        const response = await fetch(
                            `${baseURL}/events/${invitation.eventId}`, {
                                method: "GET",
                                credentials: "include",
                            }
                        );
                        const event = await response.json();
                        return {
                            ...event,
                            status: calculateEventStatus(event),
                        };
                    })
                );

                extractFilterOptions(eventsData);
                setEvents(eventsData);

                // Find max budget
                const budgets = eventsData
                    .map((event) => event.budget)
                    .filter(
                        (budget) => typeof budget === "number" && !isNaN(budget)
                    );

                const max = budgets.length > 0 ? Math.max(...budgets) : 0;
                setMaxBudget(max);
                setBudget(max);
            } catch (error) {
                console.error("Error fetching events in invitations:", error);
            }
        };

        if (invitations.length > 0) {
            fetchEventsInInvitations();
        }
    }, [invitations]);

    // Filter invitations based on search, sort, and other criteria
    useEffect(() => {
        const filterAndFetchFromInvitations = async () => {
            const enrichedInvitations = await Promise.all(
                invitations.map(async (invitation) => {
                    const event = await fetchEventById(invitation.eventId);
                    return event ? { ...invitation, event } : null;
                })
            );

            let filtered = enrichedInvitations.filter(
                (invite) => invite && invite.event
            );

            if (search) {
                const query = search.toLowerCase();
                filtered = filtered.filter(
                    ({ event }) =>
                        event.title?.toLowerCase().includes(query) ||
                        event.location?.toLowerCase().includes(query) ||
                        event.description?.toLowerCase().includes(query)
                );
            }

            if (sortOption === "Newest") {
                filtered.sort(
                    (a, b) =>
                        new Date(b.event.timeStart) -
                        new Date(a.event.timeStart)
                );
            } else if (sortOption === "Oldest") {
                filtered.sort(
                    (a, b) =>
                        new Date(a.event.timeStart) -
                        new Date(b.event.timeStart)
                );
            } else if (sortOption === "Price: Low to High") {
                filtered.sort(
                    (a, b) => (a.event.budget || 0) - (b.event.budget || 0)
                );
            } else if (sortOption === "Price: High to Low") {
                filtered.sort(
                    (a, b) => (b.event.budget || 0) - (a.event.budget || 0)
                );
            }

            if (selectedTheme) {
                filtered = filtered.filter(
                    ({ event }) => event.eventTheme === selectedTheme
                );
            }

            if (selectedStatuses.length > 0) {
                filtered = filtered.filter((invitation) =>
                    selectedStatuses.includes(invitation.status)
                );
            }

            filtered = filtered.filter(({ event }) => event.budget <= budget);

            if (selectedLocations.length > 0) {
                filtered = filtered.filter(({ event }) =>
                    selectedLocations.includes(event.location)
                );
            }

            setFilteredInvitations(filtered);
        };

        filterAndFetchFromInvitations();
    }, [
        invitations,
        search,
        sortOption,
        selectedTheme,
        selectedStatuses,
        selectedLocations,
        budget,
    ]);

    // Fetch all user's invitations
    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await fetch(
                    `${baseURL}/invitations/`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();

                if (Array.isArray(data)) {
                    const invitations = data.map((invite) => ({
                        ...invite,
                    }));
                    setInvitations(invitations);
                }
                
            } catch (error) {
                console.error("Error fetching invitations:", error);
            }
        };

        fetchInvitations();
    }, []);

    // Handle search input changes
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Handle status option changes
    const toggleStatus = (status) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        );
    };

    // Handle location option changes
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
        <div className="invitation-list-overlay">
            <div className="filters">
                <h4>Event Theme</h4>
                {selectedTheme && (
                    <button
                        className="sort-button reset-button"
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
                    <button
                        className="apply-btn"
                        onClick={() => setAppliedBudget(budget)}
                    >
                        Apply
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
                        <button className="search-button"> Search</button>
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
                <div className="invitation-list-container">
                    {filteredInvitations.map((invitation) => (
                        <div key={invitation._id}>
                            <InviteCard invitation={invitation} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
