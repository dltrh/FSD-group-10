import { createContext, useContext, useState, useEffect } from "react";

const SavedEventsContext = createContext();

export function SavedEventsProvider({ children }) {
    const [savedEvents, setSavedEvents] = useState([]);

    useEffect(() => {
        const storedSavedEvents = localStorage.getItem("savedEvents");

        if (storedSavedEvents) setSavedEvents(JSON.parse(storedSavedEvents));
    }, []);

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    const toggleSaveEvent = (event) => {
        setSavedEvents((prev) =>
            prev.find((e) => e.id === event.id)
                ? prev.filter((e) => e.id !== event.id)
                : [...prev, event]
        );
    };

    const isEventSaved = (eventId) =>
        savedEvents.some((event) => event.id === eventId);

    const value = { savedEvents, toggleSaveEvent, isEventSaved };

    return (
        <SavedEventsContext.Provider value={value}>
            {children}
        </SavedEventsContext.Provider>
    );
}

export function useSavedEvents() {
    return useContext(SavedEventsContext);
}
