import React from "react";
import "../../css/notification/notification-dropdown.css";
import { useState } from "react";
import NotificationDetailsModal from "./NotificationDetailsModal";

export default function NotificationDropdown({ notifications, isOpen,loading }) {
    const [selectedNotif, setSelectedNotif] = useState(null);

    if (!isOpen) return null;
    if (loading) {
        return <div className="notification-dropdown">Loading...</div>;
    }
    console.log(notifications);



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
                            key={notif.notificationId}
                            onClick={() => setSelectedNotif(notif)}
                        >
                            <p>{notif.message}</p>
                            <span>{new Date(notif.sentAt).toLocaleString()}</span>
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
