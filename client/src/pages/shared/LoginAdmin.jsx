import logo from "../../assets/logo.png";
import "../../css/login-register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleInput = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseURL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const contentType = response.headers.get("content-type");
            let data = null;

            // if received JSON file, then parse
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }

            //check response
            if (!response.ok) {
                const errorMsg = (data && data.message) || "Login failed";
                alert(errorMsg);
                return;
            }

            // if response ok and data existing
            if (data) {
                // Lưu user vào localStorage
                localStorage.setItem("user", JSON.stringify({
                    email: data.email,
                    isAdmin: data.isAdmin
                }));

                // Direct to authorized page based on the isAdmin attribute
                if (data.isAdmin) {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/home");
                }
            } else {
                alert("Unexpected server response");
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
