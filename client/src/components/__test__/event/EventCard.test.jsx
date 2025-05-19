// --- Mock functions ---
const mockToggleSaveEvent = vi.fn();
const mockIsEventSaved = vi.fn();
const mockNavigate = vi.fn();

// --- Mocks ---
vi.mock("../../../context/EventsContext.jsx", () => ({
    useSavedEvents: () => ({
        toggleSaveEvent: mockToggleSaveEvent,
        isEventSaved: mockIsEventSaved,
    }),
}));
vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));
vi.mock("../../assets/home/placeholder.jpg", () => "placeholder.jpg");

import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EventCard from "../../event/EventCard";

const sampleEvent = {
    eventId: "123",
    title: "Sample Event",
    description: "This is a test event.",
    budget: 1000,
    location: "Test Location",
    imageUrl: "/images/test.jpg",
    timeStart: "2024-06-01T10:00:00Z",
    timeEnd: "2024-06-01T12:00:00Z",
};

beforeEach(() => {
    mockToggleSaveEvent.mockClear();
    mockIsEventSaved.mockClear();
    mockNavigate.mockClear();
    mockIsEventSaved.mockReturnValue(false);
});

describe("EventCard", () => {
    it("renders event details", () => {
        render(<EventCard event={sampleEvent} />);
        expect(screen.getByText("Sample Event")).toBeInTheDocument();
        expect(screen.getByText("This is a test event.")).toBeInTheDocument();
        expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
        expect(screen.getByText("Location: Test Location")).toBeInTheDocument();
    });

    it("shows outline heart icon if not saved", () => {
        mockIsEventSaved.mockReturnValue(false);
        render(<EventCard event={sampleEvent} />);
        expect(screen.getByRole("button")).toContainHTML("svg");
    });

    it("shows filled heart icon if saved", () => {
        mockIsEventSaved.mockReturnValue(true);
        render(<EventCard event={sampleEvent} />);
        expect(screen.getByRole("button")).toContainHTML("svg");
    });

    it("calls toggleSaveEvent when save button is clicked", () => {
        render(<EventCard event={sampleEvent} />);
        fireEvent.click(screen.getByRole("button"));
        expect(mockToggleSaveEvent).toHaveBeenCalledWith(sampleEvent);
    });

    it("navigates to event details when card is clicked", () => {
        render(<EventCard event={sampleEvent} />);
        fireEvent.click(
            screen.getByText("Sample Event").closest(".event-card-container")
        );
        expect(mockNavigate).toHaveBeenCalledWith("/manage/details/123");
    });

    it("renders placeholder image if imageUrl is missing", () => {
        const eventNoImage = { ...sampleEvent, imageUrl: null };
        render(<EventCard event={eventNoImage} />);
        const img = screen.getByRole("img");
        expect(img.getAttribute("src")).toContain("placeholder.jpg");
    });

    it("renders event image if imageUrl is present", () => {
        render(<EventCard event={sampleEvent} />);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute(
            "src",
            "http://localhost:5000/images/test.jpg"
        );
    });
});
