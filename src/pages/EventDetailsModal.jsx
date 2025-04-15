import React from "react";
import { useState, useRef } from "react";

import { useParams } from "react-router-dom";
import "../css/event-details-modal.css";
import DiscussionList from "../components/DiscussionList";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const dummyEvents = {
    1: {
        name: "Event1",
        createdOn: "23/07/2025",
        finishedBy: "25/07/2025",
        details: [
            { label: "Event Theme", description: "Gatsby 1920s, Jazz Club" },
            { label: "Event Type", description: "Wedding, birthday, etc." },
            { label: "Budget", description: "$5000 max" },
            { label: "Maximum Capacity", description: "Max number of people" },
            { label: "Location", description: "New York City" },
            { label: "Time", description: "6PM – 11PM" },
        ],
    },
    // add more dummy data if needed
};

const EventDetailsModal = () => {
    const { id } = useParams();
    const event = dummyEvents[id];
    const formRef = useRef(null);
    const [showForm, setShowForm] = useState(false);

    if (!event) return <p>Event not found</p>;
    const handleChangeClick = () => {
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); // Give time to render the form before scrolling
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const discussionRef = useRef(null);
    
    const handleScrollToDiscussion = () => {
        const element = document.getElementById("discussion-grid");
        const yOffset = -148; // Adjust based on your sticky header height
        const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        discussionRef.current?.scrollIntoView({ behavior: "smooth" , box: "start"});
    };

    return (
        <div className="overlay">
            <Header></Header>
            <div className="event-details-modal">
                <div className="event-heading">
                    <h1>{event.name}</h1>
                    <p className="event-dates">
                        Created on: {event.createdOn} <br />
                        Finished by: {event.finishedBy}
                    </p>
                    <div className="event-buttons">
                        <button className="finish-button">
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
                        <strong>
                            Want to change the details of the event?
                        </strong>
                        <p>
                            You can only change Maximum Capacity, Location and
                            Time of the event after payment.
                        </p>
                        <button
                            className="change-button"
                            onClick={handleChangeClick}
                        >
                            Yes, I want to change
                        </button>
                    </div>
                    {/* Conditionally Render Form */}
                    {showForm && (
                        <div ref={formRef} className="change-form-section">
                            <form className="change-form">
                                <label>
                                    Maximum Capacity of Attendees
                                    <input type="text" placeholder="Value" />
                                </label>
                                <label>
                                    Time
                                    <input type="text" placeholder="Value" />
                                </label>
                                <label>
                                    Location
                                    <input type="text" placeholder="Value" />
                                </label>
                                <label>
                                    Message
                                    <textarea placeholder="Value"></textarea>
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
                    {event.details.map((item, index) => (
                        <div key={index} className="detail-box">
                            <div className="image-placeholder"></div>
                            <div>
                                <strong>{item.label}</strong>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="discussion-grid" id="discussion-grid" ref={discussionRef}>
                    <DiscussionList />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventDetailsModal;
