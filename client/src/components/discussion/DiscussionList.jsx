import React, { useState } from "react";
import DiscussionDetails from "./DiscussionDetails";
import DiscussionCard from "./DiscussionCard";
import "../../css/discussion/discussion-list.css";

const discussions = [
    {
        id: 1,
        topic: "Ideas for the School Annual Day ",
        time: "2025-04-14 09:00 AM",
        description:
            "Share your ideas and suggestions for School Annual Day",
        replies: [
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
            "Can we include a student award segment?",
            "How about a talent show?",
            "A retro theme would be fun!",
        ],
    },
    {
        id: 2,
        topic: "Volunteering for the Science Fair",
        time: "2025-04-13 02:30 PM",
        description:
            "We need student volunteers for organizing and guiding visitors during the science fair.",
        replies: [
            "I'm in!",
            "Count me in for logistics.",
            "I can help with registrations.",
        ],
    },
    {
        id: 3,
        topic: "Class Trip Suggestions",
        time: "2025-04-12 11:00 AM",
        description:
            "Let's brainstorm fun and educational places we can visit for our annual class trip.",
        replies: [
            "How about a museum visit?",
            "A nature camp would be exciting!",
            "Let's go to a tech park.",
        ],
    },
    {
        id: 4,
        topic: "Cultural Fest Performance Planning",
        time: "2025-04-11 01:00 PM",
        description:
            "Anyone interested in singing, dancing, or drama? Let's plan our participation!",
        replies: [
            "I'd love to do a group dance!",
            "I'm good with skits!",
            "Let's collaborate on a musical act.",
        ],
    },
    {
        id: 5,
        topic: "Fundraising Ideas for Sports Equipment",
        time: "2025-04-10 10:30 AM",
        description:
            "We need to raise funds for new sports gear. Share your creative fundraising ideas!",
        replies: [
            "Bake sale?",
            "How about a charity football match?",
            "We can design and sell school merch!",
        ],
    },
    {
        id: 6,
        topic: "Poster Design for Environment Week",
        time: "2025-04-10 03:00 PM",
        description:
            "Calling all artists! We need poster designs for Environment Awareness Week.",
        replies: [
            "Let’s make them digitally too!",
            "We could add quotes from famous environmentalists.",
        ],
    },
    {
        id: 7,
        topic: "Open Mic Night Preparation",
        time: "2025-04-5 05:00 PM",
        description:
            "Planning an open mic night! Singers, poets, comedians—this is your stage!",
        replies: [
            "Can I perform a solo song?",
            "I’ve got a stand-up routine ready!",
            "Let’s do a duet!",
        ],
    },
];

const DiscussionList = () => {
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);

    return (
        <>
            <h2 className="discussion-heading">Discussion</h2>
            <div className="discussion-list-container">
                {discussions.map((discussion) => (
                    <div
                        key={discussion.id}
                        onClick={() => setSelectedDiscussion(discussion)}
                    >
                        <DiscussionCard
                            discussion={discussion}
                        />
                    </div>
                ))}
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
