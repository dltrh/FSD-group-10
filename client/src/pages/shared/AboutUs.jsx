import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../css/AboutUs.css";
import Hanh from "../../assets/about/Hanh.jpg";
import Cally from "../../assets/about/Cally.jpg";
import Hung from "../../assets/about/Hung.jpg";

const teamMembers = [
    {
        name: "Do Le Trang Hanh",
        sID: "s3977994",
        description: "Full-stack developer with focus on authentic of UI/UX and modern frontend technologies.",
        image: Hanh,
    },
    {
        name: "Le Phuong Ngan",
        sID: "s3978567",
        description: "Full-stack developer experienced in building scalable backend APIs and databases.",
        image: Cally,
    },
    {
        name: "Quan Hung",
        sID: "s3980813",
        description: "Full-stack developer coordinating frontend-backend integration, structure, and version control.",
        image: Hung,
    },
];


export default function AboutUs() {
    return (
        <>
            <Header />
            <div className="about-us-container">
                <h1>About Our Team</h1>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div className="team-card" key={index}>
                            <img src={member.image} alt={member.name} className="team-image" />
                            <div className="team-name">{member.name}</div>
                            <div className="team-sid">{member.sID}</div>
                            <div className="team-description">{member.description}</div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
