import React, { useState } from "react";
import "../../css/admin/admin-settings.css";

const AdminSettings = () => {
    const [maxEvents, setMaxEvents] = useState(5);
    const [maxInvites, setMaxInvites] = useState(100);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        // You can integrate this with backend API
        console.log("Settings saved:", { maxEvents, maxInvites });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="admin-settings">
            <h2>Admin Settings</h2>

            <div className="setting-item">
                <label htmlFor="maxEvents">Max Active Events per User:</label>
                <input
                    id="maxEvents"
                    type="number"
                    value={maxEvents}
                    onChange={(e) => setMaxEvents(Number(e.target.value))}
                />
            </div>

            <div className="setting-item">
                <label htmlFor="maxInvites">Max Invitations per Event:</label>
                <input
                    id="maxInvites"
                    type="number"
                    value={maxInvites}
                    onChange={(e) => setMaxInvites(Number(e.target.value))}
                />
            </div>

            <button onClick={handleSave}>Save Settings</button>
            {saved && <p className="saved-message">Settings saved!</p>}
        </div>
    );
};

export default AdminSettings;
