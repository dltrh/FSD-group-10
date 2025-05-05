import { useEffect, useState } from "react";
import "../../css/event/invite-card.css";
import placeholder from "../../assets/home/placeholder.jpg";
import { formatDate, calculateEventStatus } from "../../utils/timeUtils";

export default function InviteCard({ invitation }) {
    const [event, setEvent] = useState(null);
    const [user, setUser] = useState(null);
    const [updatedInvitation, setUpdatedInvitation] = useState(invitation);

    const Status = {
        ACCEPTED: "Accepted",
        DECLINED: "Declined",
        PENDING: "Pending",
    };

    const statusOptions = Object.values(Status); // This conversion is for mapping later

    const handleInvitationResponse = async (status) => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/invitations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        invitationId: updatedInvitation.invitationId,   
                        eventId: updatedInvitation.eventId,
                        status, // 'accepted' or 'declined'
                        message: ""
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit your reponse!");
            }

            const data = await response.json();
            // alert(
            //     `You have successfully ${
            //         status === Status.ACCEPTED
            //             ? Status.ACCEPTED
            //             : Status.DECLINED
            //     } the event.`
            // );
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        const fetchEventInfo = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/events/${updatedInvitation.eventId}`
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

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/users/${updatedInvitation.organizerId}`
                );
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.error(
                    "Error fetching user: ",
                    err
                );
            }
        };
        if (updatedInvitation?.organizerId) {
            fetchUserInfo();
        }
    }, [updatedInvitation]);

    useEffect(() => {
        const fetchInvitationInfo = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/invitations/${updatedInvitation.invitationId}`
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

    return (
        <>
            <div className="invitation-card-container">
                {event ? (
                    <>
                        <div className="invitation-card-header">
                            <div className="invitation-header">
                                <p>
                                    {user
                                        ? `Sent by ${user.userId}`
                                        : "Loading user..."}
                                </p>
                                <div className="status-dropdown-container">
                                    <div
                                        className={`invitation-card-status ${updatedInvitation.status}`}
                                    >
                                        {updatedInvitation.status.charAt(0).toUpperCase() + updatedInvitation.status.slice(1)}{" "}
                                    </div>
                                    <div className="status-dropdown">
                                        {statusOptions.map((status) => (
                                            <button key={status}
                                                onClick={() =>
                                                    handleInvitationResponse(
                                                        status.toLowerCase()
                                                    )
                                                }
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
                                src={placeholder}
                                alt="placeholder image"
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
                    <p>Loading event details...</p>
                )}
            </div>
        </>
    );
}
