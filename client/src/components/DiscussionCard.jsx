import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/discussion.css";
import "bootstrap/dist/css/bootstrap.css";
import { getRelativeTime } from "../utils/timeUtils";

export default function DiscussionCard({ discussion }) {
    const relativeTime = getRelativeTime(discussion.time);
    return (
        <>
            <div className="discussion-card-container">
                <div className="discussion-card-header">
                    <h3 className="discussion-topic">{discussion.topic}</h3>
                    <div>
                        <p className="discussion-time">🕒 {relativeTime}</p>
                    </div>
                </div>
                <hr className="discussion-card-divider" />
                <div className="discussion-card-body">
                    <p className="discussion-description">
                        {discussion.description}
                    </p>
                </div>
                <div className="discussion-footer">
                    <p className="discussion-replies">
                        {" "}
                        💬 {discussion.replies.length} replies
                    </p>
                </div>
            </div>
        </>
    );
}
