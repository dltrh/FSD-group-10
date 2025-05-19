import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/event/event-details-modal.css";
import DiscussionList from "../../components/discussion/DiscussionList.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { formatDate } from "../../utils/timeUtils";

const EventDetailsModal = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const formRef = useRef(null);
    const discussionRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        maxPpl: event?.maxPpl || "",
        timeStart: event?.timeStart || "",
        location: event?.location || "",
    });
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [invitationFormOpen, setInvitationFormOpen] = useState(false);
    const [receiverEmail, setReceiverEmail] = useState("");
    const [message, setMessage] = useState("");
    const [reminderTime, setReminderTime] = useState("");
    const [joined, setJoined] = useState(false);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [invitations, setInvitations] = useState([]);
    const [attendeeNames, setAttendeeNames] = useState({});

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const res = await fetch(
                    `${baseURL}/invitations/events/${eventId}`
                );
                const data = await res.json();
                if (Array.isArray(data)) {
                    setInvitations(data);
                } else if (data && typeof data === "object") {
                    setInvitations([data]); // wrap single object in an array
                } else {
                    setInvitations([]); // fallback
                }
            } catch (error) {
                console.error("Error fetching invitations:", error);
            }
        };

        if (eventId) fetchInvitations();

        const interval = setInterval(() => {
            fetchInvitations();
        }, 3000); // Fetch every 5 seconds
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [eventId]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch(`${baseURL}/getCurrentUserId`, {
                    method: "GET",
                    credentials: "include", // Include session cookies
                });
                if (response.ok) {
                    const data = await response.json();
                    setLoggedInUserId(data.user); // Set the logged-in user's ID
                } else {
                    console.error("Failed to fetch user ID");
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, []);


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${baseURL}/events/publicEvents`);
                if (!response.ok) throw new Error("Event not found");

                const data = await response.json();

                const foundEvent = data.find((e) => e.eventId === eventId);

                setEvent(foundEvent);
            } catch (error) {
                console.error(error);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();

        const interval = setInterval(() => {
            fetchEvent();
        }, 5000); // Fetch every 5 seconds
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [eventId]);

    useEffect(() => {
        const checkCurrentUserJoined = async () => {
            try {
                const response = await fetch(
                    `${baseURL}/events/findAttendee/${eventId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.status === 200) {
                    const data = await response.json();
                    setJoined(data.found);
                } else if (response.status === 404) {
                    const data = await response.json();
                    setJoined(false);
                } else {
                    console.warn("Unexpected response:", response.status);
                }
            } catch (err) {
                // Only log actual fetch/network errors
                console.error("Network/server error:", err);
            }
        };
        checkCurrentUserJoined();

        const interval = setInterval(() => {
            checkCurrentUserJoined();
        }, 2000); // Fetch every 5 seconds
        return () => clearInterval(interval);
    }, [eventId]);

    useEffect(() => {
        const fetchAllNames = async () => {
            if (!event?.attendeesList) return;
            const names = {};
            await Promise.all(
                event.attendeesList.map(async (attendeeId) => {
                    try {
                        const response = await fetch(
                            `${baseURL}/users/${attendeeId}`
                        );
                        if (response.ok) {
                            const data = await response.json();
                            names[attendeeId] =
                                data.fullname || data.name || attendeeId;
                        } else {
                            names[attendeeId] = attendeeId;
                        }
                    } catch {
                        names[attendeeId] = attendeeId;
                    }
                })
            );
            setAttendeeNames(names);
        };
        fetchAllNames();
    }, [event?.attendeesList]);

    if (loading || loggedInUserId === null) return <p>Loading...</p>;
    if (!event) return <p>Event not found.</p>;
    const detailEvents = [
        { label: "Description", description: event.description },
        { label: "Theme", description: event.eventTheme },
        { label: "Type", description: event.eventType },
        { label: "Start Time", description: formatDate(event.timeStart) },
        { label: "End Time", description: formatDate(event.timeEnd) },
        { label: "Budget", description: `$${event.budget}` },
        { label: "Location", description: event.location },
        { label: "Max People", description: event.maxPpl },
        { label: "Notes from the host", description: event.notes },
        {
            label: "Can I bring other people?",
            description: event.canBring ? "Yes" : "No",
        },
        { label: "Gifts I can bring to the event", description: event.gifts },
    ];

    const handleChangeClick = () => {
        if (event) {
            setFormData({
                maxPpl: event.maxPpl || "",
                timeStart: event.timeStart || "",
                location: event.location || "",
            });
        }
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };


    const handleCancel = () => {
        setShowForm(false);
    };

    const handleScrollToDiscussion = () => {
        const element = document.getElementById("discussion-grid");
        const yOffset = -148;
        const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        discussionRef.current?.scrollIntoView({
            behavior: "smooth",
            box: "start",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Only include fields the user actually changed
        const updatedFields = {};
        if (formData.maxPpl !== event.maxPpl)
            updatedFields.maxPpl = formData.maxPpl;
        if (formData.timeStart !== event.timeStart)
            updatedFields.timeStart = formData.timeStart;
        if (formData.location !== event.location)
            updatedFields.location = formData.location;

        if (Object.keys(updatedFields).length === 0) {
            alert("⚠️ No changes detected.");
            return;
        }

        try {
            // 1. Update the event
            const response = await fetch(`${baseURL}/events/${eventId}`, {
                method: "PUT",
                credentials: "include", // Include session cookies
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFields),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`❌ Failed to update event: ${errorData.error}`);
                return;
            }

            // 2. Notify attendees
            const notifyResponse = await fetch(
                `http://localhost:5000/api/events/${eventId}/notifyAttendees`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!notifyResponse.ok) {
                const notifyError = await notifyResponse.json();
                console.warn(
                    "⚠️ Event updated, but failed to notify attendees:",
                    notifyError.error
                );
                alert("⚠️ Event updated, but notifying attendees failed.");
            } else {
                alert("✅ Event updated and attendees notified!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ An unexpected error occurred.");
        }
    };

    // Function to handle finishing the event early
    const handleFinishEvent = async () => {
        try {
            const response = await fetch(
                `${baseURL}/events/finish/${eventId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isFinished: true }),
                    credentials: "include", // Include session cookies
                }
            );

            const updatedEvent = await response.json();
            if (response.ok) {
                alert("✅ Event finished successfully!");
                // navigate("/manage/details/:evetnId");
            } else {
                alert("❌ Failed to finish event");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ An unexpected error occurred.");
        }
    };

    const handleSendEventInvitation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${baseURL}/invitations/create/${eventId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ receiverEmail, message }),
                    credentials: "include", // Include session cookies
                }
            );

            if (response.ok) {
                alert("✅ Invitation sent successfully!");
                setInvitationFormOpen(false);

                navigate("/manage");
            } else if (response.status === 409) {
                // 🔁 Duplicate invitation
                const data = await response.json();
                alert(`⚠️ ${data.error || "User has already been invited."}`);
            } else {
                const data = await response.json();
                alert(
                    `❌ Failed to send invitation: ${
                        data.error || "Unknown error"
                    }`
                );
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ An unexpected error occurred.");
        }
    };

    const handleJoinEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseURL}/events/${eventId}/join`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                alert("✅ Joined successfully!");
                setJoined(true);
            } else {
                const data = await response.json();
                alert(
                    `❌ Failed to join this event: ${
                        data.error || "Unknown error"
                    }`
                );
            }
        } catch (err) {
            console.error("Error message:", err);
        }
    };

    const handleUnjoinEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${baseURL}/events/${eventId}/unjoin`,
                {
                    method: "PUT",
                    credentials: "include",
                }
            );

            if (response.ok) {
                alert("✅ Unjoined successfully.");
            } else {
                const error = await response.json();
                alert(`❌ Failed to remove: ${error.message}`);
            }
        } catch (err) {
            console.error("Error removing attendee:", err);
            alert("❌ Unexpected error occurred.");
        }
    };

    return (
        <div className="overlay">
            <Header />
            <div className="event-details-modal">
                <div className="event-heading">
                    <h1>{event.title}</h1>
                    <p className="event-dates">
                        Created on: {formatDate(event.timeStart)} <br />
                        Finished by: {formatDate(event.timeEnd)}
                    </p>
                    {loggedInUserId === event.organizerId && (
                        <>
                            <div className="reminder-section">
                                <h3>Schedule Reminder Notification</h3>
                                <p>
                                    As an organizer, you can set a time to
                                    remind attendees before the event starts. Be
                                    aware that you cannot send out notifications
                                    if your invitee list is empty.
                                </p>
                                <label>
                                    Reminder Date and Time:
                                    <input
                                        type="datetime-local"
                                        value={reminderTime}
                                        onChange={(e) =>
                                            setReminderTime(e.target.value)
                                        }
                                    />
                                </label>
                                <button
                                    className="submit-button"
                                    onClick={async () => {
                                        try {
                                            const res = await fetch(
                                                `${baseURL}/notifications/schedule`,
                                                {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        eventId: event.eventId,
                                                        reminderTime,
                                                        organizerId:
                                                            loggedInUserId,
                                                    }),
                                                }
                                            );
                                            if (res.ok) {
                                                alert("✅ Reminder scheduled!");
                                            } else {
                                                const err = await res.json();
                                                alert(
                                                    `❌ Failed to schedule reminder: ${err.message}`
                                                );
                                            }
                                        } catch (err) {
                                            console.error(
                                                "Error scheduling reminder:",
                                                err
                                            );
                                            alert(
                                                "❌ An unexpected error occurred."
                                            );
                                        }
                                    }}
                                >
                                    Schedule Reminder
                                </button>
                            </div>
                            <div className="event-buttons">
                                <button
                                    className="finish-button"
                                    onClick={handleFinishEvent}
                                >
                                    Finish the event early
                                </button>
                                <button
                                    className="send-invitation-button"
                                    onClick={() => setInvitationFormOpen(true)}
                                >
                                    Send invitation
                                </button>
                                <button
                                    className="discuss-button"
                                    onClick={handleScrollToDiscussion}
                                >
                                    Go to Discussion Board for this event
                                </button>
                            </div>
                        </>
                    )}

                    {invitationFormOpen && (
                        <div className="invitation-form-container">
                            <form
                                onSubmit={handleSendEventInvitation}
                                className="invitation-form"
                            >
                                <h2>Send Invitation</h2>
                                <input
                                    type="text"
                                    placeholder="Receiver's email"
                                    value={receiverEmail}
                                    onChange={(e) =>
                                        setReceiverEmail(e.target.value)
                                    }
                                />
                                <textarea
                                    type="text"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />

                                <div className="invitation-form-buttons">
                                    <button
                                        onClick={() =>
                                            setInvitationFormOpen(false)
                                        }
                                        className="invitation-close-btn"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="invitation-submit-btn"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {loggedInUserId === event.organizerId && (
                    <div className="attendees-section">
                        <h3>Confirmed Attendees</h3>

                        <div className="attendees-container">
                            <div className="attendees-buttons">
                                <p>
                                    PLease note that after you click 'Save
                                    Attendees List', it is saved already. <br />{" "}
                                    No need to refresh the page!
                                </p>
                                <button
                                    className="submit-button"
                                    onClick={async () => {
                                        try {
                                            const res = await fetch(
                                                `${baseURL}/events/${event.eventId}/attendees/save`,
                                                {
                                                    method: "PUT",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        attendeesList:
                                                            event.attendeesList,
                                                    }),
                                                }
                                            );

                                            if (res.ok) {
                                                alert(
                                                    "✅ Attendees list saved successfully."
                                                );
                                            } else {
                                                const error = await res.json();
                                                alert(
                                                    `❌ Failed to save list: ${error.message}`
                                                );
                                            }
                                        } catch (err) {
                                            console.error(
                                                "Error saving attendees list:",
                                                err
                                            );
                                            alert(
                                                "❌ Unexpected error occurred."
                                            );
                                        }
                                    }}
                                >
                                    Save Attendees List
                                </button>

                                <button
                                    className="change-button"
                                    onClick={async () => {
                                        const attendeeId = prompt(
                                            "Enter attendee's ID:"
                                        );
                                        if (attendeeId) {
                                            try {
                                                const res = await fetch(
                                                    `${baseURL}/events/${event.eventId}/attendees/add`,
                                                    {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            userId: attendeeId,
                                                        }),
                                                    }
                                                );

                                                if (res.ok) {
                                                    const updatedEvent = {
                                                        ...event,
                                                    };
                                                    updatedEvent.attendeesList =
                                                        [
                                                            ...updatedEvent.attendeesList,
                                                            attendeeId,
                                                        ];
                                                    setEvent(updatedEvent); // Update the state
                                                    alert("✅ Attendee added.");
                                                } else {
                                                    const error =
                                                        await res.json();
                                                    alert(
                                                        `❌ Failed to add attendee: ${error.message}`
                                                    );
                                                }
                                            } catch (err) {
                                                console.error(
                                                    "Error adding attendee:",
                                                    err
                                                );
                                                alert(
                                                    "❌ Error adding attendee."
                                                );
                                            }
                                        }
                                    }}
                                >
                                    + Add Attendee
                                </button>
                            </div>

                            <div className="attendees-list">
                                {event.attendeesList &&
                                event.attendeesList.length > 0 ? (
                                    event.attendeesList.map(
                                        (attendeeId, index) => {
                                            const invite = invitations.find(
                                                (inv) =>
                                                    inv.receiverId ===
                                                        attendeeId &&
                                                    inv.eventId ===
                                                        event.eventId
                                            );
                                            // Check if the invite exists and get its status
                                            // If the invite doesn't exist, set status to "Pending"
                                            const status = invite
                                                ? invite.status
                                                : "pending";
                                            return (
                                                <div
                                                    key={index}
                                                    className="attendee-card"
                                                >
                                                    👤{" "}
                                                    {attendeeNames[attendeeId] ||
                                                        attendeeId} 
                                                    <span
                                                        className={`status ${status.toLowerCase()}`}
                                                    >
                                                        Status: {status}
                                                    </span>
                                                    <button
                                                        className="change-button"
                                                        onClick={async () => {
                                                            const confirm =
                                                                window.confirm(
                                                                    `Remove ${attendeeId} from attendees?`
                                                                );
                                                            if (!confirm)
                                                                return;
                                                            try {
                                                                const res =
                                                                    await fetch(
                                                                        `http://localhost:5000/api/events/${event.eventId}/attendees/remove`,
                                                                        {
                                                                            method: "PUT",
                                                                            headers:
                                                                                {
                                                                                    "Content-Type":
                                                                                        "application/json",
                                                                                },
                                                                            body: JSON.stringify(
                                                                                {
                                                                                    userId: attendeeId,
                                                                                }
                                                                            ),
                                                                        }
                                                                    );
                                                                if (res.ok) {
                                                                    alert(
                                                                        "✅ Attendee removed."
                                                                    );
                                                                    const updated =
                                                                        {
                                                                            ...event,
                                                                        };
                                                                    updated.attendeesList =
                                                                        updated.attendeesList.filter(
                                                                            (
                                                                                id
                                                                            ) =>
                                                                                id !==
                                                                                attendeeId
                                                                        );
                                                                    setEvent(
                                                                        updated
                                                                    );
                                                                } else {
                                                                    const error =
                                                                        await res.json();
                                                                    alert(
                                                                        `❌ Failed to remove: ${error.message}`
                                                                    );
                                                                }
                                                            } catch (err) {
                                                                console.error(
                                                                    "Error removing attendee:",
                                                                    err
                                                                );
                                                                alert(
                                                                    "❌ Unexpected error occurred."
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        ❌ Remove
                                                    </button>
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <p className="empty-attendees-msg">
                                        No invitee in the list.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {loggedInUserId === event.organizerId && (
                    <div className="change-section">
                        <div className="info-icon">ℹ️</div>
                        <div>
                            <strong>
                                Want to change the details of the event?
                            </strong>
                            <p>
                                You can only change Maximum Capacity, Location
                                and Time Start after payment.
                            </p>
                            <button
                                className="change-button"
                                onClick={handleChangeClick}
                            >
                                Yes, I want to change
                            </button>
                        </div>

                        {showForm && (
                            <div ref={formRef} className="change-form-section">
                                <form
                                    className="change-form"
                                    onSubmit={handleSubmit}
                                >
                                    <label>
                                        Maximum Capacity of Attendees
                                        <input
                                            type="text"
                                            name="maxPpl"
                                            value={formData.maxPpl}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    maxPpl: e.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label>
                                        Start Time:
                                        <input
                                            type="datetime-local"
                                            name="timeStart"
                                            value={formData.timeStart}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    timeStart: e.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label>
                                        Location
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: e.target.value,
                                                })
                                            }
                                        />
                                    </label>

                                    <div className="form-buttons">
                                        <button
                                            type="submit"
                                            className="submit-button"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="cancel-button"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {loggedInUserId !== event.organizerId && (
                    <div className="event-buttons">
                        {joined ? (
                            <button
                                className="join-button"
                                onClick={handleUnjoinEvent}
                            >
                                Joined
                            </button>
                        ) : (
                            <button
                                className="join-button"
                                onClick={handleJoinEvent}
                            >
                                Join
                            </button>
                        )}

                        <button
                            className="discuss-button"
                            onClick={handleScrollToDiscussion}
                        >
                            Go to Discussion Board for this event
                        </button>
                    </div>
                )}

                <section className="details-grid">
                    {detailEvents.map((event, index) => (
                        <div key={index} className="detail-box">
                            {/* <div className="image-placeholder"></div> */}
                            <div>
                                <strong>{event.label}</strong>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <div
                    className="discussion-grid"
                    id="discussion-grid"
                    ref={discussionRef}
                >
                    <DiscussionList eventId={eventId} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventDetailsModal;
