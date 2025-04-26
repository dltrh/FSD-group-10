import logo from "../../assets/logo.png";
import "../../css/login-register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleInput = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password })
            });

            let data = {};
            try {
                data = await response.json();
            } catch (error) {
                console.error("Không parse được JSON:", error);
            }

            if (response.ok) {
                if (data.isAdmin) {
                    window.location.href = "/admin/dashboard";
                } else {
                    window.location.href = "/user/home";
                }
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong during login");
        }

        setEmail("");
        setPassword("");
    };


    return (
        <div className="login-page">
            <div className="login-header">
                <Link to="/">
                    <img src={logo} alt="App logo" className="logo" />
                </Link>
            </div>

            <h1>Admin Login</h1>

            <form className="login-field" onSubmit={handleInput}>
                <label htmlFor="email-input">Email *</label>
                <input
                    id="email-input"
                    className="form-control"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password-input">Passsword *</label>
                <input
                    id="password-input"
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link to="/forgot-password">Forgot password?</Link>
                <div className="buttons">
                    <Link to="/">
                        <button
                            id="btn-back-login-user"
                            className="btn-back"
                            type="button"
                        >
                            ← Back
                        </button>
                    </Link>
                    <button
                        type="submit"
                        id="btn-login-login-user"
                        className="btn-login"
                    >
                        Login →
                    </button>
                </div>
            </form>
        </div>
    );
}
