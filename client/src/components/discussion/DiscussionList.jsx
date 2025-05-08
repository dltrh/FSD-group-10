import React, { useState, useEffect } from "react";
import DiscussionDetails from "./DiscussionDetails";
import DiscussionCard from "./DiscussionCard";
import "../../css/discussion/discussion-list.css";

const DiscussionList = ({ eventId }) => {
    const [discussions, setDiscussions] = useState([]);
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility
    const [newDiscussion, setNewDiscussion] = useState({
        content: "",
        description: "",
        createdAt: new Date(),
    });

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/discussions/${eventId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch discussions for event ${eventId}`
                    );
                }
                const data = await response.json();
                console.log("Fetched discussions:", data);
                setDiscussions(data);
            } catch (error) {
                console.error(
                    `Error fetching discussions for event ${eventId}:`,
                    error
                );
            }
        };
        fetchDiscussions();
    }, [eventId]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5000/api/discussions/${eventId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newDiscussion),
                    credentials: "include",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to create new discussion");
            }
            const data = await response.json();
            console.log("New discussion created:", data);
            setDiscussions((prevDiscussions) => [...prevDiscussions, data]);
            setIsFormVisible(false); // Hide the form after successful creation
            setNewDiscussion({ content: "", description: "" }); // Reset the form
        } catch (error) {
            console.error("Error creating new discussion:", error);
        }
    };

    return (
        <>
            <h2 className="discussion-heading">Discussion</h2>
            <button
                className="btn-add-discussion"
                onClick={() => setIsFormVisible(true)} // Show the form on click
            >
                New discussion
            </button>

            {/* Form to create a new discussion */}
            {isFormVisible && (
                <div className="discussion-form-container">
                    <form
                        className="new-discussion-form"
                        onSubmit={handleFormSubmit}
                    >
                        <h2>Post a new discussion topic</h2>
                        <label htmlFor="content">Discussion Title *</label>
                        <input
                            type="text"
                            id="content"
                            value={newDiscussion.content}
                            onChange={(e) =>
                                setNewDiscussion({
                                    ...newDiscussion,
                                    content: e.target.value,
                                })
                            }
                            required
                        />
                        <label htmlFor="discussion-topic-description">
                            Discussion Description *
                        </label>
                        <textarea
                            id="discussion-topic-description"
                            value={newDiscussion.description}
                            onChange={(e) =>
                                setNewDiscussion({
                                    ...newDiscussion,
                                    description: e.target.value,
                                })
                            }
                            required
                        />
                        <div className="new-discussion-form-buttons">
                            <button
                                type="button"
                                onClick={() => setIsFormVisible(false)} // Close form
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-submit-new-discussion"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="discussion-list-container">
                {Array.isArray(discussions) && discussions.length === 0 ? (
                    <div className="no-discussions-message">
                        No discussions available.
                    </div>
                ) : (
                    discussions.map((discussion) => (
                        <div
                            key={discussion.id}
                            onClick={() => setSelectedDiscussion(discussion)}
                        >
                            <DiscussionCard discussion={discussion} />
                        </div>
                    ))
                )}
            </div>

            {selectedDiscussion && (
                <DiscussionDetails
                    discussion={selectedDiscussion}
                    onClose={() => setSelectedDiscussion(null)}
                />
            )}
        </>
    );
};

export default DiscussionList;
