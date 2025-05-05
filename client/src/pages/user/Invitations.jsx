import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/event/invitations.css";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import dummyEvents from "../../components/event/Event.js";
import InviteList from "../../components/event/InviteList.jsx";

const Invitations = () => {

    return (
        <>
            <Header />
            <div className="invitations-section">
            <h2 className="invitations-heading">My invitations</h2>
                <InviteList  />
            </div>
            <Footer />
        </>
    );
};

export default Invitations;
