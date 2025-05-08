import { useSavedEvents } from "../../context/EventsContext.jsx";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import "../../css/event/event-card.css";
import placeholder from "../../assets/home/placeholder.jpg";
import {formatDate, calculateEventStatus} from "../../utils/timeUtils";
import {useNavigate} from "react-router-dom";

export default function EventCard({ event }) {
    const { toggleSaveEvent, isEventSaved } = useSavedEvents();
    const isSaved = isEventSaved(event.eventId);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/manage/details/${event.eventId}`);
    }
    return (
        <>
            <div className="event-card-container" onClick={handleCardClick}>
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
                        <p className="event-time">
                            🕒 Time Start: {formatDate(event.timeStart)} <br/>
                            🕒 Time End:  {formatDate(event.timeEnd)}  <br />
                            ☑️  Status: {calculateEventStatus(event)}
                        </p>
                        
                    </div>
                    <hr className="event-card-divider" />
                </div>
                <div className="event-image-container">
                    <img
                        src= { event.imageUrl ? `http://localhost:5000${event.imageUrl}` : placeholder }
                        alt={placeholder}
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
