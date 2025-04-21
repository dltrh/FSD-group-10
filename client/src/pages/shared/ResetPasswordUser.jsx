import logo from "../../assets/logo.png";
import "../../css/login-register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ResetPasswordUser() {

    return (
        <div className="reset-password-page">
            <div className="login-header">
                <Link to="/">
                    <img src={logo} alt="App logo" className="logo" />
                </Link>
            </div>
            <div className="reset-password-field">
                <h3>Reset password</h3>
                <form className="reset-password-form">
                    <input
                        id="default-password"
                        className="form-control"
                        type="password"
                        placeholder="Default password"
                        required
                    />
                    <input
                        id="new-password"
                        className="form-control"
                        type="password"
                        placeholder="New password"
                        required
                    />

                    <input
                        id="re-entered-new-password"
                        className="form-control"
                        type="password"
                        placeholder="Re-enter new password"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
