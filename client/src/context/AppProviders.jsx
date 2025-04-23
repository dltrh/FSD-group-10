import { SavedEventsProvider } from "./EventsContext";

export default function AppProviders({ children }) {
    return (
        <SavedEventsProvider>
            {children}
        </SavedEventsProvider>
    );
}