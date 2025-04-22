import React from "react";
import "../css/notification/notification-dropdown.css";
import { useState } from "react";
import NotificationDetailsModal from "./NotificationDetailsModal";

export default function NotificationDropdown({ notifications, isOpen }) {
    const [selectedNotif, setSelectedNotif] = useState(null);

    if (!isOpen) return null;

    return (
        <div className="notification-dropdown">
            <div className="notification-scroll">
                {notifications.length === 0 ? (
                    <div className="notification-item" id="no-notification">
                        No notifications
                    </div>
                ) : (
                    notifications.map((notif) => (
                        <div
                            className="notification-item"
                            key={notif.id}
                            onClick={() => setSelectedNotif(notif)}
                        >
                            <p>{notif.message}</p>
                            <span>{notif.sent_at}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Modal to show selected notification */}
            {selectedNotif && (
                <NotificationDetailsModal
                    notification={selectedNotif}
                    onClose={() => setSelectedNotif(null)}
                />
            )}
        </div>
    );
}
