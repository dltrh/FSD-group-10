import React from "react";
import "../css/notification/notification-details-modal.css";

export default function NotificationDetailsModal({ notification, onClose }) {
    return (
        <div className="notification-modal-overlay" onClick={onClose}>
            <div
                className="notification-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="notification-modal-close" onClick={onClose}>
                    &times;
                </button>
                <h4>Notification Detail</h4>
                <p>
                    <strong>Message:</strong> {notification.message}
                </p>
                <p>
                    <strong>Sent At:</strong> {notification.sent_at}
                </p>
                <p>
                    <strong>Event ID:</strong> {notification.event_id}
                </p>
                <p>
                    <strong>User ID:</strong> {notification.user_ud}
                </p>
            </div>
        </div>
    );
}
