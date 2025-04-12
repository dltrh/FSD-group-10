import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();

    return (
        
        <div className="home-container">
            <h1 className="home-title">
                Event Planning and<br />Management System
            </h1>
            <p className="home-subtitle">
                The modern approach to host an event
            </p>

            <div className="home-button-group">
                <button onClick={() => navigate('/create')} className="home-btn">
                    Create an Event
                </button>
                <button onClick={() => navigate('/manage')} className="home-btn dark">
                    Manage an already existing event
                </button>
                <button onClick={() => navigate('/respond')} className="home-btn red">
                    Respond to an event
                </button>
            </div>

            <div className="home-benefits">
                <h3 className="benefits-title">Why you should choose us?</h3>
                <div className="benefits-list">
                    <div className="benefit-item">
                        <p><strong> Fast</strong></p>
                        <p>Fast service</p>
                    </div>
                    <div className="benefit-item">
                        <p><strong>Low cost</strong></p>
                        <p>Reasonable price for high quality service</p>
                    </div>
                    <div className="benefit-item">
                        <p><strong> Reliable</strong></p>
                        <p>We keep our words and do according to plan.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
