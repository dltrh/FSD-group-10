import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies
vi.mock("../../../utils/timeUtils", () => ({
    formatDate: vi.fn((date) => `formatted-${date}`),
    calculateEventStatus: vi.fn(() => "Upcoming"),
}));
vi.mock("../../assets/home/placeholder.jpg", () => "placeholder.jpg");
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

// Mock fetch
global.fetch = vi.fn();

const baseURL = "http://localhost:5000";
const invitation = {
    invitationId: "inv1",
    eventId: "event1",
    organizerId: "user1",
    status: "pending",
};

const eventData = {
    eventId: "event1",
    title: "Test Event",
    description: "Event description",
    budget: 123,
    location: "Melbourne",
    imageUrl: "/img.jpg",
    timeStart: "2024-06-01T10:00:00Z",
    timeEnd: "2024-06-01T12:00:00Z",
};

const userData = {
    fullname: "Alice Smith",
};

const invitationData = {
    ...invitation,
    status: "pending",
};

function setupFetchSequence() {
    // 1. Event fetch
    fetch
        .mockResolvedValueOnce({
            json: async () => eventData,
            ok: true,
        })
        // 2. User fetch
        .mockResolvedValueOnce({
            json: async () => userData,
            ok: true,
        })
        // 3. Invitation fetch
        .mockResolvedValueOnce({
            json: async () => invitationData,
            ok: true,
        });
}

describe("InviteCard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading state initially", () => {
        setupFetchSequence();
        render(
            <>
                (<InviteCard invitation={invitation} />)
            </>
        );
        expect(screen.getByText(/loading event details/i)).toBeInTheDocument();
    });

    it("renders event and user info after fetch", async () => {
        setupFetchSequence();
        render(<InviteCard invitation={invitation} />);
        expect(await screen.findByText(/Test Event/)).toBeInTheDocument();
        expect(screen.getByText(/Sent by Alice Smith/)).toBeInTheDocument();
        expect(screen.getByText(/Event description/)).toBeInTheDocument();
        expect(screen.getByText(/Budget: \$123/)).toBeInTheDocument();
        expect(screen.getByText(/Location: Melbourne/)).toBeInTheDocument();
        expect(screen.getByText(/Status: Upcoming/)).toBeInTheDocument();
        expect(
            screen.getByText(/Time Start: formatted-2024-06-01T10:00:00Z/)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Time End: formatted-2024-06-01T12:00:00Z/)
        ).toBeInTheDocument();
    });

    it("renders event image if present", async () => {
        setupFetchSequence();
        render(<InviteCard invitation={invitation} />);
        const img = await screen.findByRole("img");
        expect(img).toHaveAttribute("src", "http://localhost:5000/img.jpg");
    });

    it("renders placeholder image if event image is missing", async () => {
        
        fetch
            .mockResolvedValueOnce({
                json: async () => ({ ...eventData, imageUrl: null }),
                ok: true,
            })
            .mockResolvedValueOnce({
                json: async () => userData,
                ok: true,
            })
            .mockResolvedValueOnce({
                json: async () => invitationData,
                ok: true,
            });

        render(<InviteCard invitation={invitation} />);
        const img = await screen.findByRole("img");
        expect(img.getAttribute("src")).toContain("placeholder.jpg");
    });

    it("shows Accept and Decline buttons", async () => {
        setupFetchSequence();
        render(<InviteCard invitation={invitation} />);
        expect(await screen.findByText("Accepted")).toBeInTheDocument();
        expect(screen.getByText("Declined")).toBeInTheDocument();
    });

    it("calls fetch with correct params when Accept/Decline is clicked", async () => {
        setupFetchSequence();
        render(<InviteCard invitation={invitation} />);
        await screen.findByText("Accepted");
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

        fireEvent.click(screen.getByText("Accepted"));
        await waitFor(() =>
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/invitations"),
                expect.objectContaining({
                    method: "POST",
                    body: expect.stringContaining('"status":"accepted"'),
                })
            )
        );
    });

    it("navigates to event details on card click", async () => {
        setupFetchSequence();
        render(<InviteCard invitation={invitation} />);
        await screen.findByText("Test Event");
        fireEvent.click(
            screen.getByRole("img").closest(".invitation-card-container")
        );
        expect(mockNavigate).toHaveBeenCalledWith("/manage/details/event1");
    });
});

import InviteCard from "../../event/InviteCard";
