import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/event/invitations.css";
import EventList from "../../components/event/EventList.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import dummyEvents from "../../components/event/Event.js";

const Invitations = () => {

    return (
        <>
            <Header />
            <h2 className="invitations-heading">My invitations</h2>
            <div className="invitations-section">
                <EventList events={dummyEvents} />
            </div>
            <Footer />
        </>
    );
};

export default Invitations;
