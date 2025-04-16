import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import "../../css/welcome.css";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx"
import HomeCover from "../../components/HomeCover.jsx";
import WhyUs from "../../components/WhyUs.jsx";

export default function Welcome() {
    return (
        <>
            <div className="welcome-page">
                <div className="welcome-header">
                    <Link to="/">
                        <img src={logo} alt="App logo" className="logo" />
                    </Link>
                    <Link id="link-to-login-admin" to="/login-admin">
                        <button className="btn-login-admin">
                            Login as Admin
                        </button>
                    </Link>
                </div>
                <div className="upper">
                    <div className="welcome-text">
                        <h1>WELCOME TO</h1>
                        <h1 id="web-app-name">planny</h1>
                        <br />
                        <p className="slogan">
                            Where your event gets its moment{" "}
                        </p>
                        <p className="slogan">— and its own page.</p>
                    </div>
                </div>
                <div className="button-container">
                    <Link to="/login-user">
                        <button className="btn-login">LOGIN</button>
                    </Link>
                    <p>Haven't joined our community?</p>
                    <Link className="register" to="/register">
                        Create an account
                    </Link>
                </div>
                <WhyUs />
            </div>
            <Footer />
        </>
    );
}
