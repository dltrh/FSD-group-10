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
        message: "",
    });
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
            const response = await fetch('http://localhost:5000/events');
            if (!response.ok) throw new Error("Event not found");

            const data = await response.json();
            console.log("Fetched events:", data);  // Log the fetched data

            const foundEvent = data.find((e) => e.eventId === eventId);
            console.log("Found Event:", foundEvent);  // Log the found event or undefined

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
    
    if (loading) return <p>Loading event...</p>;
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
        { label: "Can I bring other people?", description: event.canBring ? "Yes" : "No" },
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
        if (formData.maxPpl !== event.maxPpl) updatedFields.maxPpl = formData.maxPpl;
        if (formData.timeStart !== event.timeStart) updatedFields.timeStart = formData.timeStart;
        if (formData.location !== event.location) updatedFields.location = formData.location;

        if (Object.keys(updatedFields).length === 0) {
            alert("⚠️ No changes detected.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            if (response.ok) {
                alert('✅ Event updated successfully!');
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`❌ Failed to update event: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ An unexpected error occurred.');
        }
    };

    // New function to handle finishing the event early
    const handleFinishEvent = async () => {
        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isFinished: true }),  // Update isFinished to true
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                setEvent(updatedEvent); // Update the local state with the updated event
                alert('✅ Event finished successfully!');
                navigate('/manage'); // Redirect to the manage page
            } else {
                const errorData = await response.json();
                alert(`❌ Failed to finish event: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ An unexpected error occurred.');
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

                    <div className="event-buttons">
                        <button className="finish-button" onClick={handleFinishEvent}>
                            Finish the event early
                        </button>
                        <button
                            className="discuss-button"
                            onClick={handleScrollToDiscussion}
                        >
                            Go to Discussion Board for this event
                        </button>
                    </div>
                </div>

                <div className="change-section">
                    <div className="info-icon">ℹ️</div>
                    <div>
                        <strong>Want to change the details of the event?</strong>
                        <p>You can only change Maximum Capacity, Location and Time Start after payment.</p>
                        <button
                            className="change-button"
                            onClick={handleChangeClick}
                        >
                            Yes, I want to change
                        </button>
                    </div>

                    {showForm && (
                        <div ref={formRef} className="change-form-section">
                            <form className="change-form" onSubmit={handleSubmit}>
                                <label>
                                    Maximum Capacity of Attendees
                                    <input type="text"
                                        name="maxPpl"
                                        value={formData.maxPpl}
                                        onChange={(e) => setFormData({ ...formData, maxPpl: e.target.value })} />
                                </label>
                                <label>
                                    Start Time:
                                    <input
                                        type="datetime-local"
                                        name="timeStart"
                                        value={formData.timeStart}
                                        onChange={(e) => setFormData({ ...formData, timeStart: e.target.value })}
                                    />

                                </label>
                                <label>
                                    Location
                                    <input type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
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
                    <DiscussionList />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventDetailsModal;
