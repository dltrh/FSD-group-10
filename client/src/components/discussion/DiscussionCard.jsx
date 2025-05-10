import React, { useEffect, useState } from "react";
import "../../css/discussion/discussion.css";
import "bootstrap/dist/css/bootstrap.css";
import { getRelativeTime } from "../../utils/timeUtils";

export default function DiscussionCard({ discussion }) {
    const [username, setUsername] = useState("");

    const relativeTime = getRelativeTime(discussion.createdAt);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/users/${discussion.userId}`,
                    { method: "GET", credentials: "include" }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUsername(data.fullname);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUsername();
    }, [discussion.userId]);
    return (
        <>
            <div className="discussion-card-container">
                <div className="discussion-card-header">
                    <h3 className="discussion-topic">{discussion.content}</h3>
                    <div>
                        <p className="discussion-time">🕒 {relativeTime}</p>
                        <p className="discussion-owner">
                            Posted by: {username}
                        </p>
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
                        💬 {discussion.replies?.length ?? 0} replies
                    </p>
                </div>
            </div>
        </>
    );
}
