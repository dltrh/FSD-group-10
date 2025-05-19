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
        const event = events[index];
        setEditedEvent({ ...event });
        console.log(editedEvent)
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditedEvent({});
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setEditedEvent((prev) => ({ ...prev, [name]: val }));
    };

    const handleSave = async () => {
        try {
            // Transform input into the right format
            const cleanedEvent = {
                ...editedEvent,
                canBring: editedEvent.canBring === "true" || editedEvent.canBring === true,
                isPublic: editedEvent.isPublic === "true" || editedEvent.isPublic === true,
                isFinished: editedEvent.isFinished === "true" || editedEvent.isFinished === true,
                maxPpl: Number(editedEvent.maxPpl),
                budget: Number(editedEvent.budget),
            };

            const response = await fetch(`${baseURL}/admin/events/${cleanedEvent._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(cleanedEvent),
            });

            if (!response.ok) throw new Error("Failed to update event");

            const updated = [...events];
            updated[editIndex] = cleanedEvent;
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
            <div className="table-scroll-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Event ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Type</th>
                            <th>Theme</th>
                            <th>Budget</th>
                            <th>Location</th>
                            <th>Max People</th>
                            <th>Can Bring</th>
                            <th>Public</th>
                            <th>Finished</th>
                            <th>Gifts</th>
                            <th>Notes</th>
                            <th>Image</th>
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
                                        <td>{event.eventId}</td>
                                        <td><input name="title" value={editedEvent.title} onChange={handleChange} /></td>
                                        <td><input name="description" value={editedEvent.description || ""} onChange={handleChange} /></td>
                                        <td>{new Date(event.timeStart).toLocaleString()}</td>
                                        <td>{new Date(event.timeEnd).toLocaleString()}</td>
                                        <td><input name="eventType" value={editedEvent.eventType || ""} onChange={handleChange} /></td>
                                        <td><input name="eventTheme" value={editedEvent.eventTheme || ""} onChange={handleChange} /></td>
                                        <td><input name="budget" value={editedEvent.budget || 0} onChange={handleChange} /></td>
                                        <td><input name="location" value={editedEvent.location || ""} onChange={handleChange} /></td>
                                        <td><input name="maxPpl" value={editedEvent.maxPpl || 0} onChange={handleChange} /></td>
                                        <td><input
                                            type="checkbox"
                                            name="canBring"
                                            checked={editedEvent.canBring}
                                            onChange={(e) =>
                                                setEditedEvent((prev) => ({
                                                    ...prev,
                                                    canBring: e.target.checked
                                                }))
                                            }
                                        /></td>
                                        <td><input type="checkbox" name="isPublic" checked={editedEvent.isPublic || false} onChange={handleChange} /></td>
                                        <td><input type="checkbox" name="isFinished" checked={editedEvent.isFinished || false} onChange={handleChange} /></td>
                                        <td><input name="gifts" value={editedEvent.gifts || ""} onChange={handleChange} /></td>
                                        <td><input name="notes" value={editedEvent.notes || ""} onChange={handleChange} /></td>
                                        <td>{event.imageUrl ? <img src={event.imageUrl} alt="event" style={{ height: "50px" }} /> : "-"}</td>
                                        <td>{event.organizer || "Unknown"}</td>
                                        <td className="admin-btn-group">
                                            <button onClick={handleSave}>Save</button>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{event.eventId}</td>
                                        <td>{event.title}</td>
                                        <td>{event.description || "-"}</td>
                                        <td>{new Date(event.timeStart).toLocaleString()}</td>
                                        <td>{new Date(event.timeEnd).toLocaleString()}</td>
                                        <td>{event.eventType || "-"}</td>
                                        <td>{event.eventTheme || "-"}</td>
                                        <td>{event.budget}</td>
                                        <td>{event.location}</td>
                                        <td>{event.maxPpl}</td>
                                        <td>{event.canBring ? "Yes" : "No"}</td>
                                        <td>{event.isPublic ? "Yes" : "No"}</td>
                                        <td>{event.isFinished ? "Yes" : "No"}</td>
                                        <td>{event.gifts || "-"}</td>
                                        <td>{event.notes || "-"}</td>
                                        <td>{event.imageUrl ? <img src={`http://localhost:5000${event.imageUrl}`} alt="event" style={{ height: "50px" }} /> : "-"}</td>
                                        <td>{event.organizerId || "Unknown"}</td>
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
        </div>
    );
};

export default Events;