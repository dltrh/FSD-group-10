import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import lowCost from "../assets/welcome-page/low-cost.png";
import userFriendly from "../assets/welcome-page/user-friendly.png";
import reliable from "../assets/welcome-page/reliable.png";
import "../css/welcome.css";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx"

export default function Welcome() {
    return (
        <>
        <Header></Header>
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
                <h2 className="why-us-header">WHY US?</h2>
                <hr />
                <div className="why-us-container">
                    <div className="why-us-content">
                        <h3>
                            <img
                                className="icon"
                                src={lowCost}
                                alt="Low cost icon"
                            />
                            Low cost
                        </h3>
                        <p>
                            At Planny, we believe planning and hosting great
                            events shouldn't break the bank. That's why we offer
                            a budget-friendly platform that gives you all the
                            tools you need without hidden fees or surprise
                            charges. Whether you're organizing a cozy meetup or
                            a full-scale festival, our pricing stays low so your
                            creativity can soar high. From free events to
                            ticketed ones, we provide flexible, affordable
                            options tailored to your needs — because we think
                            spending less on software means you can spend more
                            on snacks, decorations, and maybe a little extra
                            glitter.
                        </p>
                    </div>
                    <div className="why-us-content">
                        <h3>
                            <img
                                className="icon"
                                src={userFriendly}
                                alt="User friendly icon"
                            />
                            User-friendly
                        </h3>
                        <p>
                            We built Planny for real people — not tech wizards.
                            With our intuitive design, creating an event page is
                            as easy as sending a text (but way more exciting).
                            From setting up ticketing to managing RSVPs, our
                            drag-and-drop tools and clean interface mean you
                            won’t need a manual — or a developer. Whether you're
                            planning your first event or your fiftieth, Planny
                            keeps things simple, streamlined, and headache-free.
                            No fluff. No chaos. Just you, your ideas, and an
                            easy way to bring them to life. Planning events
                            should be fun — we make sure it actually is.
                        </p>
                    </div>
                    <div className="why-us-content">
                        <h3>
                            <img
                                className="icon"
                                src={reliable}
                                alt="Reliable icon"
                            />
                            Reliable
                        </h3>
                        <p>
                            When it comes to events, reliability isn't optional
                            — it's everything. That's why Planny is built to be
                            rock solid, no matter the size or scope of your
                            gathering. Our platform stays online, your pages
                            load fast, and your guest lists stay safe and
                            organized. Whether you're announcing a sold-out
                            concert or a last-minute dinner party, you can count
                            on Planny to keep your plans running smoothly behind
                            the scenes. Think of us as the friend who never
                            flakes, always shows up on time, and makes sure the
                            mic is working before the speech starts.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
