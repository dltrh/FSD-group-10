import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, requiredAdmin = false }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        alert("You must log in first.");
        return <Navigate to="/" replace />;
    }

    if (requiredAdmin && !user.isAdmin) {
        alert("You are not authorized to access this page.");
        return <Navigate to="/home" replace />;
    }

    return children;
}


export default ProtectedRoute;
