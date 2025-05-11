import React, { useEffect, useState } from "react";

const Events = () => {
    const [events, setEvents] = useState([]);
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${baseURL}/admin/events`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch events");
                return res.json();
            })
            .then((data) => setEvents(data))
            .catch((err) => console.error("Fetch events failed:", err));
    }, []);

    return (
        <div className="admin-events">
            <button className="add-btn">Add New</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Theme</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Location</th>
                        <th>Public</th>
                        <th>Status</th>
                        <th>Organizer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event._id}>
                            <td>{index + 1}</td>
                            <td>{event.title}</td>
                            <td>{event.eventType || "-"}</td>
                            <td>{event.eventTheme || "-"}</td>
                            <td>{new Date(event.timeStart).toLocaleDateString()}</td>
                            <td>{new Date(event.timeEnd).toLocaleDateString()}</td>
                            <td>{event.location || "-"}</td>
                            <td>{event.isPublic ? "Yes" : "No"}</td>
                            <td>{event.isFinished ? "Finished" : "Ongoing"}</td>
                            <td>{event.organizer || "Unknown"}</td>
                            <td className="admin-btn-group">
                                <button>Edit</button>
                                <button>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Events;
