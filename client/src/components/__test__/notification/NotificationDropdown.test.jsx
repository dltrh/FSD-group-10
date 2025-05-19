import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock NotificationDetailsModal to just show a marker
vi.mock("../../notification/NotificationDetailsModal", () => ({
    __esModule: true,
    default: ({ notification, onClose }) => (
        <div data-testid="notification-modal">
            {notification?.message}
            <button onClick={onClose}>Close</button>
        </div>
    ),
}));

import NotificationDropdown from "../../notification/NotificationDropdown";

const notifications = [
    {
        notificationId: "1",
        message: "First notification",
        sentAt: "2024-05-18T10:00:00Z",
    },
    {
        notificationId: "2",
        message: "Second notification",
        sentAt: "2024-05-18T11:00:00Z",
    },
];

describe("NotificationDropdown", () => {
    it("renders nothing if isOpen is false", () => {
        const { container } = render(
            <NotificationDropdown notifications={notifications} isOpen={false} loading={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    it("renders loading state if loading is true", () => {
        render(
            <NotificationDropdown notifications={notifications} isOpen={true} loading={true} />
        );
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders 'No notifications' if notifications is empty", () => {
        render(
            <NotificationDropdown notifications={[]} isOpen={true} loading={false} />
        );
        expect(screen.getByText("No notifications")).toBeInTheDocument();
    });

    it("renders all notifications when open", () => {
        render(
            <NotificationDropdown notifications={notifications} isOpen={true} loading={false} />
        );
        expect(screen.getByText("First notification")).toBeInTheDocument();
        expect(screen.getByText("Second notification")).toBeInTheDocument();
        expect(screen.getAllByClassName?.("notification-item") || document.querySelectorAll(".notification-item")).toHaveLength(2);
    });

    it("shows modal when a notification is clicked", () => {
        render(
            <NotificationDropdown notifications={notifications} isOpen={true} loading={false} />
        );
        fireEvent.click(screen.getByText("First notification"));
        expect(screen.getByTestId("notification-modal")).toHaveTextContent("First notification");
    });

    it("closes modal when onClose is called", () => {
        render(
            <NotificationDropdown notifications={notifications} isOpen={true} loading={false} />
        );
        fireEvent.click(screen.getByText("First notification"));
        expect(screen.getByTestId("notification-modal")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Close"));
        expect(screen.queryByTestId("notification-modal")).not.toBeInTheDocument();
    });

    it("shows correct sentAt date", () => {
        render(
            <NotificationDropdown notifications={notifications} isOpen={true} loading={false} />
        );
        // Check that the formatted date is rendered for each notification
        notifications.forEach((notif) => {
            expect(screen.getByText(new Date(notif.sentAt).toLocaleString())).toBeInTheDocument();
        });
    });
});