import { SavedEventsProvider } from "./EventsContext";
import { AuthProvider } from "./AuthContext";

export default function AppProviders({ children }) {
    return (
        <AuthProvider>
            <SavedEventsProvider>{children}</SavedEventsProvider>
        </AuthProvider>
    );
}
