import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../css/event/event-response.css";
import { Link, useNavigate } from "react-router-dom";

export default function EventResponseForm() {
    const [eventId, setEventId] = useState("");
    const [invitationId, setInvitationId] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const Status = {
        ACCEPTED: "Accepted",
        DECLINED: "Declined",
        PENDING: "Pending",
    };

    const handleEventResponse = async (status) => {
        if (!eventId.trim() || !invitationId.trim()) {
            alert("Please fill in both Event ID and Invitation ID.");
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:5000/api/invitations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        invitationId,
                        eventId,
                        status, // 'accepted' or 'declined'
                        message,
                    }),
                    credentials: "include", // Include session cookies
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit your reponse!");
            }

            const data = await response.json();
            alert(
                `You have successfully ${
                    status === Status.ACCEPTED
                        ? Status.ACCEPTED
                        : Status.DECLINED
                } the event.`
            );
            // Navigate ONLY if successful
            navigate(`/response/${status.toLowerCase()}`);
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleAttend = () => handleEventResponse(Status.ACCEPTED);
    const handleDecline = () => handleEventResponse(Status.DECLINED);

    return (
        <div>
            <Header />
            <div className="event-response-container">
                <h1 className="event-response-title">
                    Want to respond to an event?
                </h1>
                <p className="event-response-subtitle">
                    Please enter the details of an event that you are invited.
                </p>
                <div className="event-response-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Event ID"
                            value={eventId}
                            onChange={(e) => setEventId(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Your invite ID"
                            value={invitationId}
                            onChange={(e) => setInvitationId(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Message to your organizer"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-textarea"
                        ></textarea>
                    </div>
                    <div className="form-buttons">
                        <button className="btn-attend" onClick={handleAttend}>
                            I want to attend the event
                        </button>
                        <button className="btn-decline" onClick={handleDecline}>
                            I want to decline the event
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
