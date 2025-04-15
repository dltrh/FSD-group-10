import React, { useState } from 'react';
import '../css/create-event.css';
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"


const CreateEvent = () => {
    const [liked, setLiked] = useState(false);
    return (
        <>
            <Header />
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <div className="image-placeholder">
                        <div
                            className="heart"
                            onClick={() => setLiked(!liked)}
                            style={{ cursor: 'pointer' }}
                        >
                            {liked ? '♥' : '♡'}
                        </div>
                    </div>
                    <div className="event-details">
                        <h2>Request: Create a new event event</h2>
                        <div className="price-section">
                            <span className="tag">Tag</span>
                            <h1>$50</h1>
                        </div>
                        <div className="form-section">
                            <div className="input-group">
                                <label htmlFor="people">Number of people</label>
                                <input id="people" type="text" placeholder="Value" />
                            </div>
                            <div className="dropdowns">
                                <div>
                                    <label htmlFor="event-type">Event Type</label>
                                    <select id="event-type">
                                        <option>Value</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="budget">Budget</label>
                                    <select id="budget">
                                        <option>Value</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button className="request-btn">Request to host this event</button>
                        <div className="notes">
                            <h4>Notes</h4>
                            <p>
                                Feel free to ask us any questions here and leave us the note so we can tailor the event to your preference.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="reviews-section">
                    <h3>Latest reviews</h3>
                    <div className="reviews">
                        {[1, 2, 3].map((_, index) => (
                            <div className="review-card" key={index}>
                                <div className="stars">☆ ☆ ☆ ☆ ☆</div>
                                <h4>Review title</h4>
                                <p>Review body</p>
                                <div className="reviewer">
                                    <div>
                                        <strong>Reviewer name</strong>
                                        <p>Date</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="subscribe-section">
                    <h3>Subscribe to learn more about event planning</h3>
                    <p>With our daily newsletter</p>
                    <div className="subscribe-form">
                        <input type="email" placeholder="you@example.com" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreateEvent;
