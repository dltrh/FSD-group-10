import React from "react";
import EventList from "../../components/event/EventList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../css/event/my-events.css"
import dummyEvents from "../../components/event/Event";

export default function MyEvents() {
    return (
        <>
            <Header />
            <h2 className="my-events-heading">My events</h2>
            <div className="my-events-section">
                <EventList events={dummyEvents} />
            </div>
            <Footer />
        </>
    );
}
