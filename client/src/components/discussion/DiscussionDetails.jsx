import React, { useEffect, useState } from "react";
import "../../css/discussion/discussion.css";
import "bootstrap/dist/css/bootstrap.css";
import { getRelativeTime } from "../../utils/timeUtils";
import { IoIosAdd } from "react-icons/io";
import { GoReply } from "react-icons/go";
import { IoSend } from "react-icons/io5";

const DiscussionDetails = ({ discussion, onClose }) => {
    const [questions, setQuestions] = useState([]);
    const [repliesMap, setRepliesMap] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility
    const [isReplyFormVisible, setIsReplyFormVisible] = useState(false); // State to toggle reply form visibility
    const [selectedQuestion, setSelectedQuestion] = useState(null); // State to track the selected question for replies
    const [newQuestion, setNewQuestion] = useState({
        content: "",
    });
    const [newReply, setNewReply] = useState({
        content: "",
    });
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/questions/${discussion.discussionId}`, {
                        method: "GET",
                        credentials: "include", // Include session cookies
                    }
                );
                const data = await response.json();
                data.forEach((q) => fetchReplies(q.questionId));
                setQuestions(data);
                
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, [discussion.discussionId]);

    const fetchReplies = async (questionId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/replies/${questionId}`, {
                    method: "GET",
                    credentials: "include", // Include session cookies
                }
            );
            const data = await response.json();
            setRepliesMap((prev) => ({ ...prev, [questionId]: data }));
            
        } catch (error) {
            console.error("Error fetching replies:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5000/api/questions/${discussion.discussionId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: newQuestion.content,
                    }),
                    credentials: "include",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to create new question");
            }
            const data = await response.json();
            setQuestions((prevQuestions) => [...prevQuestions, data]);
            setIsFormVisible(false); // Hide the form after successful creation
            setNewQuestion({ content: "" }); // Reset the form
        } catch (error) {
            console.error("Error creating new question:", error);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(
                `http://localhost:5000/api/replies/${selectedQuestion.questionId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: newReply.content,
                    }),
                    credentials: "include",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to create new reply");
            }
            const data = await response.json();
            
            setRepliesMap((prev) => ({
                ...prev,
                [selectedQuestion.questionId]: [
                    ...(prev[selectedQuestion.questionId] || []),
                    data,
                ],
            }));
            setIsReplyFormVisible(false); // Hide the form after successful creation
            setNewReply({ content: "" }); // Reset the form
        } catch (error) {
            console.error("Error sending new reply:", error);
        }
    };

    const relativeTime = getRelativeTime(discussion.createdAt);

    return (
        <div className="discussion-details-overlay">
            <div className="discussion-details">
                <div className="discussion-details-close">
                    <button onClick={onClose}>&times;</button>
                </div>
                <h2 className="text-3xl font-bold text-[#ae312f] mb-2">
                    {discussion.content}
                </h2>
                <p className="text-sm text-gray-500">🕒 {relativeTime}</p>
                <hr className="my-4" />
                <p className="mb-4">{discussion.description}</p>
                <hr className="my-4" />
                <div className="question-heading">
                    <h3 className="font-semibold text-xl mb-2">Questions</h3>
                    <button
                        className="btn-add-question"
                        onClick={() => setIsFormVisible(!isFormVisible)}
                    >
                        <IoIosAdd />
                    </button>
                </div>
                {isFormVisible && (
                    <div className="question-form-container">
                        <form className="question-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={newQuestion.content}
                                onChange={(e) =>
                                    setNewQuestion({
                                        ...newQuestion,
                                        content: e.target.value,
                                    })
                                }
                                placeholder="Ask a question..."
                            />
                            <button type="submit"><IoSend /></button>
                        </form>
                    </div>
                )}
                <ul className="question-list">
                    {Array.isArray(questions) && questions.length === 0 ? (
                        <div>No questions found.</div>
                    ) : (
                        questions.map((question, index) => (
                            <li key={index} className="question-content">
                                <div
                                    className="question-item"
                                    onClick={() => {
                                        setSelectedQuestion(question);
                                        setIsReplyFormVisible(
                                            !isReplyFormVisible
                                        );
                                    }}
                                >
                                    {question.content}
                                </div>
                                {selectedQuestion?.questionId === question.questionId && isReplyFormVisible &&  (
                                    <div className="reply-form-container">
                                        <form
                                            className="reply-form"
                                            onSubmit={handleReplySubmit}
                                        >
                                            <GoReply style={{ transform: "rotate(180deg)", fontSize:"25px" }}/>
                                            <input
                                                type="text"
                                                value={newReply.content}
                                                onChange={(e) =>
                                                    setNewReply({
                                                        ...newReply,
                                                        content: e.target.value,
                                                    })
                                                }
                                                placeholder="Reply..."
                                            />
                                            <button type="submit"><IoSend /></button>
                                        </form>
                                    </div>
                                )}

                                <ul className="nested-reply-list">
                                    {(Array.isArray(
                                        repliesMap[question.questionId]
                                    )
                                        ? repliesMap[question.questionId]
                                        : []
                                    ).map((reply, rIndex) => (
                                        <li
                                            key={rIndex}
                                            className="nested-reply-item"
                                        >
                                            {reply.content}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DiscussionDetails;
