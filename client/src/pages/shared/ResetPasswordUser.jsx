import logo from "../../assets/logo.png";
import "../../css/login-register.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPasswordUser() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // const userId = searchParams.get("userId");
    const [userId, setUserId] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            return alert("Error: All fields are required");
        }

        if (newPassword !== confirmPassword) {
            return alert("Error: Passwords do not match");
        }

        try {
            const response = await fetch(`${baseURL}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    newPassword,
                    confirmPassword,
                }),
                credentials: "include", // Include session cookies
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // Redirect to login page
                navigate("/login-user");
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error("Reset password failed:", err);
            alert("Error: Something went wrong");
        }
    };

    return (
        <div className="reset-password-page">
            <div className="login-header">
                <Link to="/">
                    <img src={logo} alt="App logo" className="logo" />
                </Link>
            </div>
            <div className="reset-password-field">
                <h3>Reset password</h3>
                <form className="reset-password-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    <input
                        id="new-password"
                        className="form-control"
                        type="password"
                        placeholder="New password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        id="confirm-password"
                        className="form-control"
                        type="password"
                        placeholder="Re-enter new password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
