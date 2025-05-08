import React, { useState,useEffect } from "react";
import "../../css/event/create-event.css";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
    const [liked, setLiked] = useState(false);
    const [budget, setBudget] = useState(50);
    const [eventType, setEventType] = useState('Indoor');
    const [isPublic, setPublic] = useState(true);
    const [title, setTitle] = useState('Create Event: Title');
    const [description, setDescription] = useState("");
    const [maxPpl, setMaxPpl] = useState(0);
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [eventTheme, setEventTheme] = useState("");
    const [location, setLocation] = useState("");
    const [gifts, setGifts] = useState("");
    const [canBring, setCanBring] = useState(true);
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleVisibilityChange = (e) => {
        setPublic(e.target.value === "Public");
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("maxPpl", maxPpl);
        formData.append("timeStart", timeStart);
        formData.append("timeEnd", timeEnd);
        formData.append("eventTheme", eventTheme);
        formData.append("budget", budget);
        formData.append("location", location);
        formData.append("gifts", gifts);
        formData.append("eventType", eventType);
        formData.append("canBring", canBring);
        formData.append("isPublic", isPublic);
        formData.append("notes", notes);
        if (image) {
            formData.append("image", image); // ✅ append image
        }

        try {
            const res = await fetch("http://localhost:5000/api/events/create", {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            const data = await res.json();
            alert("Event submitted!");
            console.log("Event created:", data);
            navigate("/manage"); // Redirect to manage events page after successful submission
        } catch (err) {
            alert("Error! Unsuccessful submission.");
            console.error("Error creating event:", err);
        }
    };


    // This useEffect helps to save data in local storage even when we switch tab
    useEffect(() => {
        const savedData = localStorage.getItem("createEventData");
        if (savedData) {
            const data = JSON.parse(savedData);
            setTitle(data.title || "");
            setDescription(data.description || "");
            setMaxPpl(data.maxPpl || 0);
            setTimeStart(data.timeStart || "");
            setTimeEnd(data.timeEnd || "");
            setEventTheme(data.eventTheme || "");
            setBudget(data.budget || 50);
            setLocation(data.location || "");
            setGifts(data.gifts || "");
            setEventType(data.eventType || "Indoor");
            setCanBring(data.canBring ?? true);
            setPublic(data.isPublic ?? true);
            setNotes(data.notes || "");
            setImage(data.image || null);
        }
    }, []);



    return (
        <>
            <Header />
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <div className="image-placeholder">
                        <label htmlFor="uploaded-image"> Upload your image to the event here</label>
                        <input
                            id="uploaded-image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Selected preview"
                                style={{ maxWidth: "200px", marginTop: "10px" }}
                            />
                        )}

                        <button >Upload</button>
                        <div
                            className="heart"
                            onClick={() => setLiked(!liked)}
                            style={{ cursor: "pointer" }}
                        >
                            {liked ? "♥" : "♡"}
                        </div>
                    </div>
                    <div className="event-details">
                        <h2>{title}</h2>
                        <div className="price-section">
                            {/* Tag display */}
                            {isPublic ? (
                                <span className="tag">
                                    Public
                                </span>
                            ) : (
                                <span className="tag">
                                    Private
                                </span>
                            )}
                            <span className="tag">{eventType}</span>
                            <h1>${budget}</h1>
                        </div>

                        <div className="form-section">
                            <div className="input-group">
                                <label htmlFor="title">Title of the Event</label>
                                <input
                                    id="title"
                                    type="text"
                                    onChange = {(e) => setTitle(e.target.value)}
                                    
                                />

                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    type="text"
                                    value = {description}
                                    onChange = {(e) => setDescription(e.target.value)}
                                />

                                <label htmlFor="maxPpl">Maximum capacity of participants</label>
                                <input
                                    id="maxPpl"
                                    type="number"
                                    value={maxPpl}
                                    onChange={(e) => setMaxPpl(e.target.value)}
                                />
                                <label htmlFor="timeStart">Time Start</label>
                                <input
                                    id="timeStart"
                                    type="datetime-local"
                                    value={timeStart}
                                    onChange={(e) => setTimeStart(e.target.value)}

                                />
                                <label htmlFor="timeEnd">Time End</label>
                                <input
                                    id="timeEnd"
                                    type="datetime-local"
                                    value={timeEnd}
                                    onChange={(e) => setTimeEnd(e.target.value)}

                                />


                                <label htmlFor="theme">Event Theme</label>
                                <input
                                    id="theme"
                                    value={eventTheme}
                                    type="text"
                                    onChange={(e) => setEventTheme(e.target.value)}
                                />
        
                                <label htmlFor="budget"> Budget (in USD)</label>
                                <input
                                    id="budget"
                                    type="number"
                                    placeholder="Value"
                                    value= {budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />

                                <label htmlFor="location"> Location</label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="Place"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <label htmlFor="gifts"> Gifts suggestion for an invitee </label>
                                <input
                                    id="gifts"
                                    type="text"
                                    placeholder="flowers, food, drinks, etc"
                                    value={gifts}
                                    onChange={(e) => setGifts(e.target.value)}
                                />

                                
                            </div>
                            <div className="dropdowns">
                                <div>
                                    <label htmlFor="event-type">
                                        Event Type
                                    </label>
                                    <select
                                        id="event-type"
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                    >
                                        <option value="Indoor">Indoor</option>
                                        <option value="Outdoor">Outdoor</option>
                                    </select>

                                </div>
                                <div>
                                    <label htmlFor="canBring">
                                        Allow invitees to bring guests?
                                    </label>
                                    <select id="canBring" onChange={(e) => setCanBring(e.target.value === "Yes")}>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>

                                </div>

                                <div>
                                    <label htmlFor="isPublic">
                                        Public or Private event? 
                                    </label>
                                    <select
                                        id="isPublic"
                                        value={isPublic ? "Public" : "Private"}
                                        onChange={handleVisibilityChange}
                                        className="border rounded p-2"
                                    >
                                        <option>Public</option>
                                        <option>Private</option>
                                    </select>
                                    <p>Private event means only the guests can have access to search and view events</p>
                                </div>
                                
                            </div>
                            <div className="notes">
                                <h4>Notes</h4>
                                <p>
                                    Feel free to ask us any questions here and leave
                                    us the note so we can tailor the event to your
                                    preference.
                                </p>
                                <div className="input-group">
                                    <label htmlFor="notes">Notes</label> <br />
                                    <input
                                        id="notes"
                                        type="text"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Send your notes to us"
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="request-btn" onClick = {handleSubmit}>
                            Request to host this event
                        </button>
                        
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
