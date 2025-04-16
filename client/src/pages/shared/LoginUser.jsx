import logo from "../../assets/logo.png";
import "../../css/login-register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        alert(`Email: ${email}\nPassword: ${password}`);
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

            <h1>Login</h1>

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
                <Link to="/forgot-password-user">Forgot password?</Link>
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
                <p>
                    Haven't had an account yet?{" "}
                    <Link to="/register">Create account</Link>
                </p>
            </form>
        </div>
    );
}
