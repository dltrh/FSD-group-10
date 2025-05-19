import { useEffect, useState } from "react";
import "../../css/event/invite-card.css";
import placeholder from "../../assets/home/placeholder.jpg";
import { formatDate, calculateEventStatus } from "../../utils/timeUtils";
import { useNavigate } from "react-router-dom";

// Card for displaying an invitation and its event details
export default function InviteCard({ invitation }) {
    // State for event, organizer user, and invitation info
    const [event, setEvent] = useState(null);
    const [user, setUser] = useState(null);
    const [updatedInvitation, setUpdatedInvitation] = useState(invitation);
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // Invitation status options
    const Status = {
        ACCEPTED: "Accepted",
        DECLINED: "Declined",
        PENDING: "Pending",
    };

    // Only allow user to select Accepted or Declined
    const statusOptions = Object.values(Status).filter(status => status !== Status.PENDING);
    
    // Handle Accept/Decline invitation
    const handleInvitationResponse = async (status) => {
        try {
            const response = await fetch(`${baseURL}/invitations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    invitationId: updatedInvitation.invitationId,
                    eventId: updatedInvitation.eventId,
                    status, // 'accepted' or 'declined'
                    message: "",
                }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to submit your reponse!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Fetch event info when invitation changes
    useEffect(() => {
        const fetchEventInfo = async () => {
            try {
                const response = await fetch(
                    `${baseURL}/events/${updatedInvitation.eventId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setEvent(data);
            } catch (err) {
                console.error(
                    "Error fetching invitation's event information: ",
                    err
                );
            }
        };

        if (updatedInvitation?.eventId) {
            fetchEventInfo();
        }
    }, [updatedInvitation]);

    // Fetch organizer user info when invitation changes
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(
                    `${baseURL}/users/${updatedInvitation.organizerId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.error("Error fetching user: ", err);
            }
        };
        if (updatedInvitation?.organizerId) {
            fetchUserInfo();
        }
    }, [updatedInvitation]);

    // Fetch latest invitation info when invitation changes
    useEffect(() => {
        const fetchInvitationInfo = async () => {
            try {
                const response = await fetch(
                    `${baseURL}/invitations/${updatedInvitation.invitationId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setUpdatedInvitation(data);
            } catch (err) {
                console.error(
                    "Error fetching invitation's user information: ",
                    err
                );
            }
        };
        if (updatedInvitation?.invitationId) {
            fetchInvitationInfo();
        }
    }, [updatedInvitation]);

    // Navigate to event details page on card click
    const handleCardClick = () => {
        navigate(`/manage/details/${event.eventId}`);
    };

    return (
        <>
            <div
                className="invitation-card-container"
                onClick={handleCardClick}
            >
                {event ? (
                    <>
                        <div className="invitation-card-header">
                            <div className="invitation-header">
                                <p>
                                    {user
                                        ? `Sent by ${user.fullname}`
                                        : "Loading user..."}
                                </p>
                                <div className="status-dropdown-container">
                                    <div
                                        className={`invitation-card-status ${updatedInvitation.status}`}
                                    >
                                        {/* Show current invitation status */}
                                        {updatedInvitation.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            updatedInvitation.status.slice(
                                                1
                                            )}{" "}
                                    </div>
                                    <div className="status-dropdown">
                                        {/* Accept/Decline buttons */}
                                        {statusOptions.map((status) => (
                                            <button
                                                key={status}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Don't trigger card click
                                                    handleInvitationResponse(
                                                        status.toLowerCase()
                                                    );
                                                }}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="event-header-top">
                                <h3 className="event-title">{event.title}</h3>
                            </div>
                            <div>
                                <p className="event-time">
                                    {/* Show event times and status */}
                                    🕒 Time Start: {formatDate(event.timeStart)}{" "}
                                    <br />
                                    🕒 Time End: {formatDate(
                                        event.timeEnd
                                    )}{" "}
                                    <br />
                                    ☑️ Status: {calculateEventStatus(event)}
                                </p>
                            </div>
                            <hr className="event-card-divider" />
                        </div>
                        <div className="event-image-container">
                            <img
                                src={
                                    event.imageUrl
                                        ? `http://localhost:5000${event.imageUrl}`
                                        : placeholder
                                }
                                alt={placeholder}
                                className="event-image"
                            />
                        </div>
                        <div className="event-card-body">
                            <p className="event-description">
                                {event.description}
                            </p>
                            <p className="event-description">
                                Budget: ${event.budget}
                            </p>
                            <p className="event-description">
                                Location: {event.location}
                            </p>
                        </div>
                    </>
                ) : (
                    // Show loading if event data is not ready
                    <p>Loading event details...</p>
                )}
            </div>
        </>
    );
}