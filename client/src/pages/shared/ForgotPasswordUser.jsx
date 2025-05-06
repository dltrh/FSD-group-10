import logo from "../../assets/logo.png";
import "../../css/login-register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPasswordUser() {
    const [email, setEmail] = useState("");
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const handleInput = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseURL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
            } else {
                // Show token link
                alert(`Reset link: ${data.resetLink}`);
                //automatic redirect
                // navigate(`/reset-password-user?token=${data.token}`); 
            }
        } catch (err) {
            alert("System error!!!");
        }
    };
    return (
        <div className="forgot-password-page">
            <div className="login-header">
                <Link to="/">
                    <img src={logo} alt="App logo" className="logo" />
                </Link>
            </div>
            <div className="forgot-password-field">
                <h3>Enter your username (your registered email) to get your password reset link</h3>
                <form className="forgot-password-form" onSubmit={handleInput}>
                    <input
                        id="forgot-password-email-input"
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <Link to="/reset-password-user">Reset password</Link>
            </div>
        </div>
    );
}
