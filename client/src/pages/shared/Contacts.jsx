import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../css/contacts.css";

export default function Contacts() {
    return (
        <>
            <Header />
            <div className="contacts-body">
                <div className="contact-container">
                    <h2>Contact Us</h2>
                    <p>We'd love to hear from you! Fill out the form below or reach out directly.</p>
                    <form className="contact-form">
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                    <div className="contact-info">
                        <h3>Our Contact Details</h3>
                        <p><strong>Email:</strong> support@planny.com.vn</p>
                        <p><strong>Phone:</strong> +1 234 567 890</p>
                        <p><strong>Location:</strong> 702 Đ. Nguyễn Văn Linh, Tân Hưng, Quận 7, Hồ Chí Minh</p>
                        <p><strong>Postcode:</strong> 700000</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
