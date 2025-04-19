import React, { useState } from "react";
import EventCard from "./EventCard";
import "../css/event/event-list.css";

const events = [
    {
        id: 1,
        title: "We love Horses",
        timeStart: "23/07/2025",
        timeEnd: "25/07/2025",
        description:
            "This is an event for horse lovers.  We love Horses We love Horses We love Horses We love Horses  We love Horses We love Horses We love Horses We love Horses  We love Horses We love Horses We love Horses We love Horses  We love Horses We love Horses We love Horses We love Horses ",
        budget: 300,
        maxPpl: 20,
        canBring: ["laptop", "phone"],
        eventTheme: "zoo",
        eventType: "office gathering",
        gifts: ["plastic horses", "pens"],
        attendeeList: ["Karen", "David", "Adam"],
    },
    {
        id: 2,
        title: "Tech Talk: The Future of AI",
        timeStart: "15/08/2025",
        timeEnd: "17/08/2025",
        description:
            "A conference to discuss advancements in AI and machine learning.",
        budget: 500,
        maxPpl: 100,
        canBring: ["laptop", "notebook", "smartwatch"],
        eventTheme: "technology",
        eventType: "conference",
        gifts: ["USB drives", "AI-related books"],
        attendeeList: ["Sophia", "Liam", "Oliver", "Emma", "Mason"],
    },
    {
        id: 3,
        title: "Beach Party Bash",
        timeStart: "12/09/2025",
        timeEnd: "12/09/2025",
        description:
            "Join us for a fun beach party with music, drinks, and volleyball.",
        budget: 800,
        maxPpl: 50,
        canBring: ["beach towel", "sunglasses", "hat"],
        eventTheme: "beach",
        eventType: "party",
        gifts: ["sunscreen", "beach balls"],
        attendeeList: ["James", "Olivia", "Ethan", "Ava"],
    },
    {
        id: 4,
        title: "Cooking Class with Chef John",
        timeStart: "05/10/2025",
        timeEnd: "05/10/2025",
        description:
            "Learn how to cook gourmet dishes with Chef John in this hands-on cooking class.",
        budget: 250,
        maxPpl: 15,
        canBring: ["apron", "notebook"],
        eventTheme: "cooking",
        eventType: "workshop",
        gifts: ["recipe book", "spices"],
        attendeeList: ["Isabella", "Lucas", "Amelia", "Mia", "Jack"],
    },
];

export default function EventList() {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <>
            <div className="event-list-container">
                {events.map((event) => (
                    <div key={event.id} onClick={() => setSelectedEvent(event)}>
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </>
    );
}
