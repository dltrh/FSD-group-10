import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock InviteCard to just show the event title for easy querying
vi.mock("../../event/InviteCard", () => ({
    __esModule: true,
    default: ({ invitation }) => (
        <div data-testid="invite-card">
            {invitation.event?.title || "No Event"}
        </div>
    ),
}));

vi.mock("../../../utils/timeUtils", () => ({
    parseDateString: vi.fn((date) => date),
    calculateEventStatus: vi.fn(() => "Pending"),
}));

// Mock fetch
global.fetch = vi.fn();

const baseURL = "http://localhost:5000";
const invitationsData = [
    {
        _id: "inv1",
        eventId: "event1",
        status: "Pending",
    },
    {
        _id: "inv2",
        eventId: "event2",
        status: "Accepted",
    },
    {
        _id: "inv3",
        eventId: "event3",
        status: "Declined",
    },
];

const eventsData = [
    {
        eventId: "event1",
        title: "Birthday Bash",
        description: "Fun party",
        budget: 100,
        location: "Melbourne",
        eventTheme: "Birthday",
        timeStart: "2024-06-01T10:00:00Z",
        timeEnd: "2024-06-01T12:00:00Z",
    },
    {
        eventId: "event2",
        title: "Wedding Gala",
        description: "Celebrate love",
        budget: 200,
        location: "Sydney",
        eventTheme: "Wedding",
        timeStart: "2024-07-01T10:00:00Z",
        timeEnd: "2024-07-01T12:00:00Z",
    },
    {
        eventId: "event3",
        title: "Tech Conference",
        description: "Learn and network",
        budget: 300,
        location: "Melbourne",
        eventTheme: "Conference",
        timeStart: "2024-08-01T10:00:00Z",
        timeEnd: "2024-08-01T12:00:00Z",
    },
];

import InviteList from "../../event/InviteList";

beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockImplementation((url) => {
        if (url.includes("/invitations")) {
            return Promise.resolve({
                ok: true,
                json: async () => invitationsData,
            });
        }
        if (url.includes("/events/event1")) {
            return Promise.resolve({
                ok: true,
                json: async () => eventsData[0],
            });
        }
        if (url.includes("/events/event2")) {
            return Promise.resolve({
                ok: true,
                json: async () => eventsData[1],
            });
        }
        if (url.includes("/events/event3")) {
            return Promise.resolve({
                ok: true,
                json: async () => eventsData[2],
            });
        }
        return Promise.resolve({
            ok: false,
            json: async () => ({}),
        });
    });
});

describe("InviteList", () => {
    it("renders all invitations after fetch", async () => {
        render(<InviteList />);
        expect(await screen.findByText("Birthday Bash")).toBeInTheDocument();
        expect(screen.getByText("Wedding Gala")).toBeInTheDocument();
        expect(screen.getByText("Tech Conference")).toBeInTheDocument();
    });

    it("filters by search", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
            target: { value: "wedding" },
        });
        await waitFor(() => {
            expect(screen.getByText("Wedding Gala")).toBeInTheDocument();
            expect(screen.queryByText("Birthday Bash")).not.toBeInTheDocument();
        });
    });

    it("filters by theme", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getByText("Birthday"));
        await waitFor(() => {
            expect(screen.getByText("Birthday Bash")).toBeInTheDocument();
            expect(screen.queryByText("Wedding Gala")).not.toBeInTheDocument();
        });
    });

    it("filters by status", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getByLabelText("Accepted"));
        await waitFor(() => {
            expect(screen.getByText("Wedding Gala")).toBeInTheDocument();
            expect(screen.queryByText("Birthday Bash")).not.toBeInTheDocument();
        });
    });

    it("filters by location", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getByLabelText("Sydney"));
        await waitFor(() => {
            expect(screen.getByText("Wedding Gala")).toBeInTheDocument();
            expect(screen.queryByText("Birthday Bash")).not.toBeInTheDocument();
        });
    });

    it("filters by budget", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.change(screen.getByRole("slider"), {
            target: { value: 150 },
        });
        fireEvent.click(screen.getByText("Apply"));
        await waitFor(() => {
            expect(screen.getByText("Birthday Bash")).toBeInTheDocument();
            expect(screen.queryByText("Wedding Gala")).not.toBeInTheDocument();
            expect(
                screen.queryByText("Tech Conference")
            ).not.toBeInTheDocument();
        });
    });

    it("sorts by price high to low", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getByText("Price: High to Low"));
        await waitFor(() => {
            const cards = screen.getAllByTestId("invite-card");
            expect(cards[0]).toHaveTextContent("Tech Conference");
            expect(cards[1]).toHaveTextContent("Wedding Gala");
            expect(cards[2]).toHaveTextContent("Birthday Bash");
        });
    });

    it("sorts by price low to high", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getByText("Price: Low to High"));
        await waitFor(() => {
            const cards = screen.getAllByTestId("invite-card");
            expect(cards[0]).toHaveTextContent("Birthday Bash");
            expect(cards[1]).toHaveTextContent("Wedding Gala");
            expect(cards[2]).toHaveTextContent("Tech Conference");
        });
    });

    it("sorts by newest", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getByText("Newest"));
        const cards = screen.getAllByTestId("invite-card");
        expect(cards[0]).toHaveTextContent("Tech Conference");
        expect(cards[1]).toHaveTextContent("Wedding Gala");
        expect(cards[2]).toHaveTextContent("Birthday Bash");
    });

    it("sorts by oldest", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getByText("Oldest"));
        await waitFor(() => {
            const cards = screen.getAllByTestId("invite-card");
            expect(cards[0]).toHaveTextContent("Birthday Bash");
            expect(cards[1]).toHaveTextContent("Wedding Gala");
            expect(cards[2]).toHaveTextContent("Tech Conference");
        });
    });

    it("resets theme filter", async () => {
        render(<InviteList />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getByText("Birthday"));
        expect(screen.getByText("Birthday Bash")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Reset"));
        await waitFor(() => {
            expect(screen.getByText("Wedding Gala")).toBeInTheDocument();
            expect(screen.getByText("Tech Conference")).toBeInTheDocument();
        });
    });
});
