import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // or a spinner
    }

    if (user === null) {
        // Not logged in
        return <Navigate to="/" replace />;
    }

    // Logged in
    return children;
}

export default ProtectedRoute;
