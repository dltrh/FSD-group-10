import logo from "../../assets/logo.png";
import "../../css/login-register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleInput = async (e) => {
        e.preventDefault();

        const fullname = `${firstname} ${lastname}`;
        const userId = `user_${Date.now()}`;

        const payload = {
            email,
            password,
            phone,
            fullname,
            userId
        };

        try {
            const response = await fetch(`${baseURL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                credentials: "include" // Include session cookies
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Error: ${data.message}`);
            } else {
                alert("Registration successful!");
                // Reset fields
                setEmail("");
                setPassword("");
                setFirstname("");
                setLastname("");
                setPhone("");

                //Redirect to login page if registering success
                navigate("/login-user")
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-header">
                <Link to="/">
                    <img src={logo} alt="App logo" className="logo" />
                </Link>
            </div>

            <h1>Create account</h1>

            <form className="register-field" onSubmit={handleInput}>
                <div className="name-input">
                    <input
                        id="first-name-input"
                        className="form-control"
                        type="text"
                        placeholder="First name *"
                        required
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                        id="last-name-input"
                        className="form-control"
                        type="text"
                        placeholder="Last name *"
                        required
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <input
                    id="email-input"
                    className="form-control"
                    type="text"
                    placeholder="Email *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    id="password-input"
                    className="form-control"
                    type="password"
                    placeholder="Password * "
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="tel"
                    id="formPhoneNumber"
                    className="form-control"
                    placeholder="Phone number *"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <div className="buttons">
                    <Link to="/">
                        <button
                            id="btn-back-register"
                            className="btn-back"
                            type="button"
                        >
                            ← Back
                        </button>
                    </Link>
                    <button
                        type="submit"
                        id="btn-register"
                        className="btn-register"
                    >
                        Register →
                    </button>
                </div>
                <p>
                    Already had an account? <Link to="/login-user">Login</Link>
                </p>
            </form>
        </div>
    );
}
