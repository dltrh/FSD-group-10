import accepted from "../../assets/status/accepted.png";
import declined from "../../assets/status/declined.png";
import "../../css/event/invitation-response-status.css";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

export default function InvitationResponseStatus() {
    const { status } = useParams(); // expects "accepted" or "declined"

    const isAccepted = status === "accepted";
    const statusIcon = isAccepted ? accepted : declined;
    const statusMessage = isAccepted
        ? "Invitation accepted successfully!"
        : "Invitation declined.";

    return (
        <div>
            <Header />
            <div className="invitation-response-status-page">
                <img
                    id="invitation-status-icon"
                    src={statusIcon}
                    alt={`${status} icon`}
                />
                <h3>{statusMessage}</h3>
                <Link to="/home">
                    <button className="home-btn">
                        <FaHome /> Home
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    );
}
