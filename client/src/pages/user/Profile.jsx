import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../../css/profile.css"; // optional: bạn có thể tự thêm css

export default function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${baseURL}/profile`, {
            credentials: "include", // necessary to send to session cookie
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
                setError("You have not loggin in");
                navigate("/login-user");
            });
    }, [navigate]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <h2>Profile summary:</h2>
            <div className="profile-info">
                <p><strong>Fullname:</strong> {user.fullname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>UserID:</strong> {user.userId}</p>
            </div>
        </div>
    );
}