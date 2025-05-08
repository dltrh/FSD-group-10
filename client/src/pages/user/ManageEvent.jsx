import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/event/manage-event.css";
import EventList from "../../components/event/EventList.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";


const ManageEvent = () => {

    return (
        <>
            <Header />
            <h2 className="my-events-heading">Manage my events</h2>
            <div className="manage-event-section">
                <EventList type="manage"/>
            </div>
            <Footer />
        </>
    );
};

export default ManageEvent;
