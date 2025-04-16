import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomeCover from "../../components/HomeCover";
import WhyUs from "../../components/WhyUs";

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
                    Create an Event
                </button>
                <button
                    onClick={() => navigate("/manage")}
                    className="home-btn dark"
                >
                    Manage an already existing event
                </button>
                <button
                    onClick={() => navigate("/response")}
                    className="home-btn red"
                >
                    Respond to an event
                </button>
            </div>
            <WhyUs />
            <Footer />
        </div>
    );
};

export default Home;
