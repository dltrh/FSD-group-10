import React from "react";
import "../../css/notification/notification-details-modal.css";

export default function NotificationDetailsModal({ notification, onClose }) {
    if (!notification) { 
        console.log("Notification is null")
        return null;} // <-- prevent null errors


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
                    <strong>Type:</strong> {notification.type}
                </p>
                <p>
                    <strong>Message:</strong> {notification.message}
                </p>
                <p>
                    <strong>Sent At:</strong>{" "}
                    {new Date(notification.sentAt).toLocaleString()}
                </p>
                {notification.eventId && (
                    <p>
                        <strong>Event ID:</strong> {notification.eventId}
                    </p>
                )}
                <p>
                    <strong>Sender ID:</strong> {notification.senderId}
                </p>
                <p>
                    <strong>Recipient ID:</strong> {notification.recipientId}
                </p>
            </div>
        </div>
    );
}
