import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "../../assets/header/Avatar.png"
import "../../css/profile.css"

export default function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const isAdminRoute = location.pathname.startsWith("/admin");
        const endpoint = isAdminRoute
            ? `${baseURL}/admin/profile`
            : `${baseURL}/profile`;

        fetch(endpoint, {
            credentials: "include",
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || "Unauthorized");
                }
                return res.json();
            })
            .then((data) => {
                setUser(data.user);
            })
            .catch((err) => {
                console.error("Profile fetch error:", err);
                setError("You are not logged in");
                navigate(isAdminRoute ? "/login-admin" : "/login-user");
            });
    }, [navigate, location.pathname]);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <h2>Profile Summary</h2>
            <div className="profile-info">
                <img src={Avatar} alt="Avatar" className="profile-avatar" />
                <p><strong>Role:</strong> {user.isAdmin ? "Admin" : "User"}</p>
                <p><strong>Fullname:</strong> {user.fullname || "N/A"}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p><strong>UserID:</strong> {user.userId}</p>
            </div>
            {/* back button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginTop: "1.5rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#444",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                ← Back
            </button>
        </div>
    );
}
