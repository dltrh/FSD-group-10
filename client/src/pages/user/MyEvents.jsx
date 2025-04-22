import React from "react";
import EventList from "../../components/event/EventList";
import Header from "../../components/Header";
import "../../css/event/my-events.css"

export default function MyEvents() {
    return (
        <>
            <Header />
            <h2 className="my-events-heading">My events</h2>
            <div className="my-events-section">
                <EventList />
            </div>
        </>
    );
}
