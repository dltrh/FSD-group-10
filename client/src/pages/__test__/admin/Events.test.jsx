import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as ReactRouterDom from "react-router-dom";

// Mock useOutletContext to provide searchQuery
vi.mock("react-router-dom", () => ({
    useOutletContext: () => ({ searchQuery: "" }),
}));

const useOutletContextMock = vi.spyOn(ReactRouterDom, "useOutletContext");

// Mock fetch
global.fetch = vi.fn();

const mockEvents = [
    {
        _id: "1",
        eventId: "EVT1",
        title: "Birthday Bash",
        description: "Fun party",
        timeStart: "2024-06-01T10:00:00Z",
        timeEnd: "2024-06-01T12:00:00Z",
        eventType: "Private",
        eventTheme: "Birthday",
        budget: 100,
        location: "Melbourne",
        maxPpl: 10,
        canBring: true,
        isPublic: false,
        isFinished: false,
        gifts: "Cake",
        notes: "Bring gifts",
        imageUrl: "/img1.jpg",
        organizer: "Alice",
        organizerId: "Alice",
    },
    {
        _id: "2",
        eventId: "EVT2",
        title: "Wedding Gala",
        description: "Celebrate love",
        timeStart: "2024-07-01T10:00:00Z",
        timeEnd: "2024-07-01T12:00:00Z",
        eventType: "Public",
        eventTheme: "Wedding",
        budget: 200,
        location: "Sydney",
        maxPpl: 100,
        canBring: false,
        isPublic: true,
        isFinished: true,
        gifts: "",
        notes: "",
        imageUrl: "",
        organizer: "Bob",
        organizerId: "Bob",
    },
];

import Events from "../../admin/Events";

describe("Admin Events Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockEvents,
        });
    });

    it("fetches and displays events in table", async () => {
        render(<Events />);
        expect(await screen.findByText("Birthday Bash")).toBeInTheDocument();
        expect(screen.getByText("Wedding Gala")).toBeInTheDocument();
        expect(screen.getByText("Fun party")).toBeInTheDocument();
        expect(screen.getByText("Celebrate love")).toBeInTheDocument();
        expect(screen.getAllByRole("row")).toHaveLength(mockEvents.length + 1); // +1 for header
    });

    it("shows editable fields when Edit is clicked", async () => {
        render(<Events />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getAllByText("Edit")[0]);
        expect(screen.getByDisplayValue("Birthday Bash")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Fun party")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Save" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Cancel" })
        ).toBeInTheDocument();
    });

    it("cancels editing when Cancel is clicked", async () => {
        render(<Events />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getAllByText("Edit")[0]);
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
        expect(screen.getByText("Birthday Bash")).toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: "Save" })
        ).not.toBeInTheDocument();
    });

    it("saves edited event when Save is clicked", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockEvents,
        });
        render(<Events />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getAllByText("Edit")[0]);
        const titleInput = screen.getByDisplayValue("Birthday Bash");
        fireEvent.change(titleInput, {
            target: { value: "Birthday Bash Edited" },
        });
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
        fireEvent.click(screen.getByRole("button", { name: "Save" }));
        await waitFor(() => {
            expect(
                screen.getByText("Birthday Bash Edited")
            ).toBeInTheDocument();
        });
    });

    it("deletes event when Delete is confirmed", async () => {
        window.confirm = vi.fn(() => true);
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockEvents,
        });
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
        render(<Events />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getAllByText("Delete")[0]);
        await waitFor(() => {
            expect(screen.queryByText("Birthday Bash")).not.toBeInTheDocument();
        });
    });

    it("does not delete event if confirm is cancelled", async () => {
        window.confirm = vi.fn(() => false);
        render(<Events />);
        await screen.findByText("Birthday Bash");
        fireEvent.click(screen.getAllByText("Delete")[0]);
        expect(screen.getByText("Birthday Bash")).toBeInTheDocument();
    });

    it("renders '-' for missing optional fields", async () => {
        render(<Events />);
        expect(await screen.findByText("Wedding Gala")).toBeInTheDocument();
        expect(screen.getAllByText("-").length).toBeGreaterThan(0);
    });

    it("renders image if imageUrl is present", async () => {
        render(<Events />);
        expect(await screen.findByAltText("event")).toBeInTheDocument();
    });

    it("renders 'Unknown' for missing organizerId", async () => {
        const eventsWithNoOrganizer = [
            { ...mockEvents[0], organizerId: undefined },
        ];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => eventsWithNoOrganizer,
        });
        render(<Events />);
        expect(await screen.findByText("Unknown")).toBeInTheDocument();
    });

    it("filters events by searchQuery", async () => {
        useOutletContextMock.mockReturnValue({ searchQuery: "wedding" });
        render(<Events />);
        expect(await screen.findByText("Wedding Gala")).toBeInTheDocument();
        expect(screen.queryByText("Birthday Bash")).not.toBeInTheDocument();
    });
});
