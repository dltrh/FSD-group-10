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
    const baseURL = import.meta.env.VITE_API_BASE_URL;

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
        if (event) {
            setFormData({
                maxPpl: event.maxPpl || "",
                timeStart: event.timeStart || "",
                location: event.location || "",
            });
        }
    }, [event]);

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
    }, [eventId]);

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
        {
            label: "Can I bring other people?",
            description: event.canBring ? "Yes" : "No",
        },
        { label: "Gifts I can bring to the event", description: event.gifts },
    ];

    const handleChangeClick = () => {
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
            const response = await fetch(`${baseURL}/events/${eventId}`, {
                method: "PUT",
                credentials: "include", // Include session cookies
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFields),
            });

            if (response.ok) {
                alert("✅ Event updated successfully!");
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`❌ Failed to update event: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ An unexpected error occurred.");
        }
    };

    // Function to handle finishing the event early
    const handleFinishEvent = async () => {
        try {
            console.log("Sending request with:", { isFinished: true }); // Log this
            const response = await fetch(
                `http://localhost:5000/api/events/finish/${eventId}`,
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

                    {/* If user is not the organizer, show only the discussion button */}
                    {loggedInUserId !== event.organizerId && (
                        <div className="event-buttons">
                            <button
                                className="discuss-button"
                                onClick={handleScrollToDiscussion}
                            >
                                Go to Discussion Board for this event
                            </button>
                        </div>
                    )}
                </div>

                {/* If user is the organizer, show change form */}
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
                <section className="details-grid">
                    {detailEvents.map((event, index) => (
                        <div key={index} className="detail-box">
                            <div className="image-placeholder"></div>
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
