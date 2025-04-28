import { useSavedEvents } from "../../context/EventsContext.jsx";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import "../../css/event/event-card.css";
import placeholder from "../../assets/home/placeholder.jpg";

export default function EventCard({ event }) {
    const { toggleSaveEvent, isEventSaved } = useSavedEvents();
    const isSaved = isEventSaved(event.eventId);
    return (
        <>
            <div className="event-card-container">
                <div className="event-card-header">
                    <div className="event-header-top">
                        <h3 className="event-title">{event.title}</h3>
                        <button
                            className={`save-button ${isSaved ? "active" : ""}`}
                            onClick={() => toggleSaveEvent(event)}
                        >   
                            {isSaved ? (
                                <FaHeart color="ae312f" size={25} />
                            ) : (
                                <FiHeart color="black" size={25} />
                            )} 
                            
                        </button>
        
                    </div>
                    <div>
                        <p className="event-time">🕒 {new Date(event.timeStart).toLocaleString()}</p>
                    </div>
                    <hr className="event-card-divider" />
                </div>
                <div className="event-image-container">
                    <img
                        src={placeholder}
                        alt="placeholder image"
                        className="event-image"
                    />
                </div>
                <div className="event-card-body">
                    <p className="event-description">{event.description}</p>
                    <p className="event-description">
                        Budget: ${event.budget}
                    </p>
                    <p className="event-description">
                        Location: {event.location}
                    </p>
                </div>
            </div>
        </>
    );
}
