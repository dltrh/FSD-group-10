import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomeCover from "../../components/HomeCover";
import WhyUs from "../../components/WhyUs";
import EventList from "../../components/event/EventList";
import dummyEvents from "../../components/event/Event.js";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <HomeCover />
            <div className="home-button-group">
                <button
                    onClick={() => navigate("/create")}
                    className="home-btn"
                >
                    Create event
                </button>
                <button
                    onClick={() => navigate("/manage")}
                    className="home-btn dark"
                >
                    Manage an existing event
                </button>
                <button
                    onClick={() => navigate("/response")}
                    className="home-btn red"
                >
                    Respond to an event
                </button>
            </div>
            <div className="event-list-section">
                <h2 className="event-heading">Latest public events</h2>
                <EventList type="public"/>
            </div>
            <WhyUs />
            <Footer />
        </div>
    );
};

export default Home;
