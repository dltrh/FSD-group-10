import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NotificationDetailsModal from "../../notification/NotificationDetailsModal";

describe("NotificationDetailsModal", () => {
    const baseNotification = {
        type: "info",
        message: "This is a test notification.",
        sentAt: "2024-05-18T12:34:56.000Z",
        eventId: "event123",
        senderId: "userA",
        recipientId: "userB",
    };

    it("renders nothing if notification is null", () => {
        const { container } = render(
            <NotificationDetailsModal notification={null} onClose={vi.fn()} />
        );
        expect(container.firstChild).toBeNull();
    });

    it("renders notification details when notification is provided", () => {
        render(
            <NotificationDetailsModal
                notification={baseNotification}
                onClose={vi.fn()}
            />
        );
        expect(screen.getByText("Notification Detail")).toBeInTheDocument();

        expect(screen.getByText("Type:").parentElement).toHaveTextContent(
            "Type: info"
        );
        expect(screen.getByText("Message:").parentElement).toHaveTextContent(
            "Message: This is a test notification."
        );
        expect(screen.getByText("Sent At:").parentElement).toHaveTextContent(
            "Sent At: 5/18/2024"
        ); // or use part of the date
        expect(screen.getByText("Event ID:").parentElement).toHaveTextContent(
            "Event ID: event123"
        );
        expect(screen.getByText("Sender ID:").parentElement).toHaveTextContent(
            "Sender ID: userA"
        );
        expect(
            screen.getByText("Recipient ID:").parentElement
        ).toHaveTextContent("Recipient ID: userB");
    });

    it("does not render Event ID if notification.eventId is missing", () => {
        const notification = { ...baseNotification, eventId: undefined };
        render(
            <NotificationDetailsModal
                notification={notification}
                onClose={vi.fn()}
            />
        );
        expect(screen.queryByText(/Event ID:/)).not.toBeInTheDocument();
    });

    it("calls onClose when overlay is clicked", () => {
        const onClose = vi.fn();
        render(
            <NotificationDetailsModal
                notification={baseNotification}
                onClose={onClose}
            />
        );
        fireEvent.click(document.querySelector(".notification-modal-overlay"));
        expect(onClose).toHaveBeenCalled();
    });

    it("calls onClose when close button is clicked", () => {
        const onClose = vi.fn();
        render(
            <NotificationDetailsModal
                notification={baseNotification}
                onClose={onClose}
            />
        );
        fireEvent.click(screen.getByRole("button"));
        expect(onClose).toHaveBeenCalled();
    });

    it("does not call onClose when modal content is clicked", () => {
        const onClose = vi.fn();
        render(
            <NotificationDetailsModal
                notification={baseNotification}
                onClose={onClose}
            />
        );
        fireEvent.click(screen.getByText("Notification Detail"));
        expect(onClose).not.toHaveBeenCalled();
    });
});
