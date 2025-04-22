import { getRelativeTime } from "../../utils/timeUtils";
import "../../css/event/event-card.css";
import placeholder from "../../assets/home/placeholder.jpg";

export default function EventCard({ event }) {
    // const relativeTime = getRelativeTime(event.time);
    return (
        <>
            <div className="event-card-container">
                <div className="event-card-header">
                    <h3 className="event-title">{event.title}</h3>
                    <div>
                        <p className="event-time">🕒 {event.timeStart}</p>
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
                </div>
            </div>
        </>
    );
}
