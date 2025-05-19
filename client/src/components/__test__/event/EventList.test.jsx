import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---
vi.mock("../../event/EventCard", () => ({
    __esModule: true,
    default: ({ event }) => <div data-testid="event-card">{event.title}</div>,
}));
vi.mock("../../../utils/timeUtils", () => ({
    parseDateString: vi.fn((date) => date),
    calculateEventStatus: vi.fn(() => "Upcoming"),
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockEvents = [
    {
        _id: "1",
        title: "Event 1",
        description: "Desc 1",
        budget: 100,
        location: "Melbourne",
        eventTheme: "Birthday",
        isFinished: false,
        timeStart: "2024-06-01T10:00:00Z",
        timeEnd: "2024-06-01T12:00:00Z",
    },
    {
        _id: "2",
        title: "Event 2",
        description: "Desc 2",
        budget: 200,
        location: "Sydney",
        eventTheme: "Wedding",
        isFinished: false,
        timeStart: "2024-07-01T10:00:00Z",
        timeEnd: "2024-07-01T12:00:00Z",
    },
    {
        _id: "3",
        title: "Event 3",
        description: "Desc 3",
        budget: 300,
        location: "Melbourne",
        eventTheme: "Conference",
        isFinished: true,
        timeStart: "2024-08-01T10:00:00Z",
        timeEnd: "2024-08-01T12:00:00Z",
    },
];

import EventList from "../../event/EventList";

describe("EventList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockFetch.mockResolvedValue({
            json: async () => mockEvents,
        });
    });

    it("renders events after fetch", async () => {
        render(<EventList type="all" />);
        expect(await screen.findByText("Event 1")).toBeInTheDocument();
        expect(screen.getByText("Event 2")).toBeInTheDocument();
        // Event 3 isFinished:true, should not be rendered
        expect(screen.queryByText("Event 3")).not.toBeInTheDocument();
    });

    it("shows 'No events found.' if no events match filters", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
            target: { value: "notfound" },
        });
        expect(await screen.findByText("No events found.")).toBeInTheDocument();
    });

    it("shows 'You haven't hosted any event.' if type is manage and no events", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => [],
        });
        render(<EventList type="manage" />);
        expect(await screen.findByText("You haven't hosted any event.")).toBeInTheDocument();
    });

    it("filters by theme", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        fireEvent.click(screen.getByText("Birthday"));
        expect(screen.getByText("Event 1")).toBeInTheDocument();
        expect(screen.queryByText("Event 2")).not.toBeInTheDocument();
    });

    it("filters by status", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        fireEvent.click(screen.getByLabelText("Upcoming"));
        expect(screen.getByText("Event 1")).toBeInTheDocument();
        expect(screen.getByText("Event 2")).toBeInTheDocument();
    });

    it("filters by location", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        fireEvent.click(screen.getByLabelText("Melbourne"));
        expect(screen.getByText("Event 1")).toBeInTheDocument();
        expect(screen.queryByText("Event 2")).not.toBeInTheDocument();
    });

    it("filters by budget", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        // Move slider to 150 and apply
        fireEvent.change(screen.getByRole("slider"), { target: { value: 150 } });
        fireEvent.click(screen.getByText("Apply"));
        expect(screen.getByText("Event 1")).toBeInTheDocument();
        expect(screen.queryByText("Event 2")).not.toBeInTheDocument();
    });

    it("sorts by price high to low", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        fireEvent.click(screen.getByText("Price: High to Low"));
        const cards = screen.getAllByTestId("event-card");
        expect(cards[0]).toHaveTextContent("Event 2");
        expect(cards[1]).toHaveTextContent("Event 1");
    });

    it("sorts by price low to high", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        fireEvent.click(screen.getByText("Price: Low to High"));
        const cards = screen.getAllByTestId("event-card");
        expect(cards[0]).toHaveTextContent("Event 1");
        expect(cards[1]).toHaveTextContent("Event 2");
    });

    it("sorts by newest", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        fireEvent.click(screen.getByText("Newest"));
        const cards = screen.getAllByTestId("event-card");
        expect(cards[0]).toHaveTextContent("Event 2");
        expect(cards[1]).toHaveTextContent("Event 1");
    });

    it("sorts by oldest", async () => {
        render(<EventList type="all" />);
        await screen.findByText("Event 1");
        fireEvent.click(screen.getByText("Oldest"));
        const cards = screen.getAllByTestId("event-card");
        expect(cards[0]).toHaveTextContent("Event 1");
        expect(cards[1]).toHaveTextContent("Event 2");
    });
});