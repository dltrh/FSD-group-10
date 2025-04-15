import React, { useState } from 'react';
import Footer from '../../components/Footer';
import '../../css/eventResponse.css';

export default function EventResponseForm() {
    const [eventId, setEventId] = useState('');
    const [inviteId, setInviteId] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleAttend = () => {
        // handle attend logic
        console.log('Attending:', { eventId, inviteId, email, message });
    };

    const handleDecline = () => {
        // handle decline logic
        console.log('Declining:', { eventId, inviteId, email, message });
    };

    return (
        <div className="event-response-container">
            <h1 className="event-response-title">Want to respond to an event?</h1>
            <p className="event-response-subtitle">
                Please enter the details of an event that you are invited.
            </p>

            <div className="event-response-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Event ID"
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Your invite ID"
                        value={inviteId}
                        onChange={(e) => setInviteId(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Message to your organizer"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-textarea"
                    ></textarea>
                </div>
                <div className="form-buttons">
                    <button className="btn-attend" onClick={handleAttend}>
                        I want to attend the event
                    </button>
                    <button className="btn-decline" onClick={handleDecline}>
                        I want to decline the event
                    </button>
                </div>
            </div>
            <Footer />
        </div>

    );
}