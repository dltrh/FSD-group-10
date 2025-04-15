import logo from "../../assets/logo.png";
import "../../css/login-register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        alert(`Email: ${email}\nPassword: ${password}`);
        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setPhone("");
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
                    />
                    <input
                        id="last-name-input"
                        className="form-control"
                        type="text"
                        placeholder="Last name *"
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
