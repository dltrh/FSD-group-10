import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import "../styles/EventDetailsModal.css";

const dummyEvents = {
    1: {
        name: "Event1",
        createdOn: "23/07/2025",
        finishedBy: "25/07/2025",
        details: [
            { label: "Event Theme", description: "Gatsby 1920s, Jazz Club" },
            { label: "Event Type", description: "Wedding, birthday, etc." },
            { label: "Gift for the Organizer", description: "It can be anything from cash or household appliances" },
            { label: "Number of people I can bring", description: "Max number of people an invitee can bring along" },
            { label: "Location", description: "New York City" },
            { label: "Time", description: "6PM – 11PM" },
        ],
    },
    // add more dummy data if needed
};

const AcceptEvent = () => {
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

    return (
        <div className="overlay">
            <div className="event-details-modal">
                <div className="event-heading">
                    <h1>{event.name}</h1>
                    <p className="event-dates">
                        Created on: {event.createdOn} <br />
                        Finished by: {event.finishedBy}
                    </p>
                    <button className="finish-button" >I don't want to go to this event anymore</button>
                    <button className="discuss-button">Go to Discussion Board for this event</button>


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
            </div>
        </div>
    );

};

export default AcceptEvent;
