import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/discussion.css";
import "bootstrap/dist/css/bootstrap.css";

const DiscussionDetails = ({ discussion, onClose }) => {
    return (
        <div className="discussion-details-overlay">
            <div className="discussion-details">
                <div className="discussion-details-close">
                    <button onClick={onClose}>&times;</button>
                </div>
                <h2 className="text-3xl font-bold text-[#ae312f] mb-2">
                    {discussion.topic}
                </h2>
                <p className="text-sm text-gray-500">{discussion.time}</p>
                <hr className="my-4" />
                <p className="mb-4">{discussion.description}</p>
                <hr className="my-4" />
                <h3 className="font-semibold text-xl mb-2">Replies</h3>
                <ul className="reply-list">
                    {discussion.replies.map((reply, index) => (
                        <li key={index} className="reply-item">{reply}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DiscussionDetails;
