import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedEvent, setEditedEvent] = useState({});
    const { searchQuery } = useOutletContext();
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

    const filteredEvents = events.filter((event) => {
        const q = searchQuery.toLowerCase();
        return (
            event.title.toLowerCase().includes(q) ||
            event.eventType?.toLowerCase().includes(q) ||
            event.eventTheme?.toLowerCase().includes(q) ||
            event.location?.toLowerCase().includes(q) ||
            event.organizer?.toLowerCase().includes(q)
        );
    });

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedEvent({ ...events[index] });
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditedEvent({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${baseURL}/admin/events/${editedEvent._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(editedEvent),
            });

            if (!response.ok) throw new Error("Failed to update event");

            const updated = [...events];
            updated[editIndex] = editedEvent;
            setEvents(updated);
            setEditIndex(null);
        } catch (error) {
            console.error("Update event failed:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            const response = await fetch(`${baseURL}/admin/events/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to delete event");

            setEvents(events.filter((event) => event._id !== id));
        } catch (error) {
            console.error("Delete event failed:", error);
        }
    };

    return (
        <div className="admin-events">
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
                        <th>Max People</th>
                        <th>Public</th>
                        <th>Status</th>
                        <th>Organizer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.map((event, index) => (
                        <tr key={event._id}>
                            <td>{index + 1}</td>
                            {editIndex === index ? (
                                <>
                                    <td><input name="title" value={editedEvent.title} onChange={handleChange} /></td>
                                    <td><input name="eventType" value={editedEvent.eventType || ""} onChange={handleChange} /></td>
                                    <td><input name="eventTheme" value={editedEvent.eventTheme || ""} onChange={handleChange} /></td>
                                    <td>{new Date(event.timeStart).toLocaleDateString()}</td>
                                    <td>{new Date(event.timeEnd).toLocaleDateString()}</td>
                                    <td><input name="location" value={editedEvent.location || ""} onChange={handleChange} /></td>
                                    <td><input name="maxPpl" value={editedEvent.maxPpl || ""} onChange={handleChange} /></td>
                                    <td>{event.isPublic ? "Yes" : "No"}</td>
                                    <td>{event.isFinished ? "Finished" : "Ongoing"}</td>
                                    <td>{event.organizer || "Unknown"}</td>
                                    <td className="admin-btn-group">
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{event.title}</td>
                                    <td>{event.eventType || "-"}</td>
                                    <td>{event.eventTheme || "-"}</td>
                                    <td>{new Date(event.timeStart).toLocaleDateString()}</td>
                                    <td>{new Date(event.timeEnd).toLocaleDateString()}</td>
                                    <td>{event.location || "-"}</td>
                                    <td>{event.maxPpl || "-"}</td>
                                    <td>{event.isPublic ? "Yes" : "No"}</td>
                                    <td>{event.isFinished ? "Finished" : "Ongoing"}</td>
                                    <td>{event.organizer || "Unknown"}</td>
                                    <td className="admin-btn-group">
                                        <button onClick={() => handleEdit(index)}>Edit</button>
                                        <button onClick={() => handleDelete(event._id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Events;
