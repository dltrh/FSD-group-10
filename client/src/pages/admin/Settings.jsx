import React, { useState, useEffect } from "react";
import "../../css/admin/admin-settings.css";

const AdminSettings = () => {
    const [defaultEventType, setDefaultEventType] = useState("Indoor");
    const [defaultEventTheme, setDefaultEventTheme] = useState("General");
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome back, Admin!");
    const [saved, setSaved] = useState(false);

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${baseURL}/admin/settings`, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setDefaultEventType(data.defaultEventType || "Indoor");
                setDefaultEventTheme(data.defaultEventTheme || "General");
                setWelcomeMessage(data.welcomeMessage || "");
            })
            .catch(err => console.error("Failed to fetch settings:", err));
    }, []);

    const handleSave = () => {
        const settings = {
            defaultEventType,
            defaultEventTheme,
            welcomeMessage,
        };

        fetch(`${baseURL}/admin/settings`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings),
        })
            .then(res => res.json())
            .then(() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            })
            .catch(err => console.error("Save failed:", err));
    };

    return (
        <div className="admin-settings">
            <h2>Admin Settings</h2>

            <div className="setting-item">
                <label>Default Event Type:</label>
                <select value={defaultEventType} onChange={(e) => setDefaultEventType(e.target.value)}>
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                </select>
            </div>

            <div className="setting-item">
                <label>Default Event Theme:</label>
                <select value={defaultEventTheme} onChange={(e) => setDefaultEventTheme(e.target.value)}>
                    <option value="General">General</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Party">Party</option>
                    <option value="Study Group">Study Group</option>
                    <option value="Beach">Beach</option>
                    <option value="Conference">Conference</option>
                    <option value="Prom">Prom</option>
                </select>
            </div>

            <div className="setting-item">
                <label>Welcome Message:</label>
                <textarea value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} />
            </div>

            <button onClick={handleSave}>Save Settings</button>
            {saved && <p className="saved-message">Settings saved!</p>}
        </div>
    );
};

export default AdminSettings;
