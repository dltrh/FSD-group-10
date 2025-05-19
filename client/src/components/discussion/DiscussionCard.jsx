import React, { useEffect, useState } from "react";
import "../../css/discussion/discussion.css";
import "bootstrap/dist/css/bootstrap.css";
import { getRelativeTime } from "../../utils/timeUtils";
import { FaRegComment } from "react-icons/fa6";

export default function DiscussionCard({ discussion }) {
    const [username, setUsername] = useState("");
    const [questions, setQuestions] = useState([]);
    const [questionLength, setQuestionLength] = useState(0);
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const relativeTime = getRelativeTime(discussion.createdAt);

    // Fetch the username of the discussion owner
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch(
                    `${baseURL}/users/${discussion.userId}`,
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

    // Fetch the questions related to the discussion
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(
                    `${baseURL}/questions/${discussion.discussionId}`,
                    { method: "GET", credentials: "include" }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch questions");
                }
                const data = await response.json();
                setQuestions(data);
                setQuestionLength(data.length);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
        // Poll every 3 seconds
        const interval = setInterval(fetchQuestions, 3000);

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [discussion.discussionId]);
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
                        <FaRegComment /> {questionLength ?? 0}{" "}
                        {questionLength === 1 ? "question" : "questions"} asked
                        in this topic
                    </p>
                </div>
            </div>
        </>
    );
}
