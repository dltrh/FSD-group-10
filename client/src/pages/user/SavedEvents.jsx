import { useSavedEvents } from "../../context/EventsContext";
import "../../css/event/saved-events.css"
import EventList from "../../components/event/EventList";
import Header from "../../components/Header";

export default function SavedEvents() {
    const { savedEvents } = useSavedEvents();
    
    return (
        <div>
            <Header />
            <div className="saved-events-section">
                <h2 className="saved-events-heading">Your Saved Events</h2>
                <div className="saved-events-list">
                    {savedEvents.length === 0 ? (
                        <p>No saved events yet!</p>
                    ) : (
                        <EventList events={savedEvents} />
                    )}
                </div>
            </div>
        </div>
    );
}
