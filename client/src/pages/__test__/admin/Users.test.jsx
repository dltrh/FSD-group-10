import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock useOutletContext to control searchQuery
import * as ReactRouterDom from "react-router-dom";
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useOutletContext: vi.fn(() => ({ searchQuery: "" })),
    };
});
const useOutletContextMock = vi.spyOn(ReactRouterDom, "useOutletContext");

// Mock fetch
global.fetch = vi.fn();

const mockUsers = [
    {
        _id: "1",
        fullname: "Alice Smith",
        email: "alice@example.com",
        phone: "123456789",
    },
    {
        _id: "2",
        fullname: "Bob Johnson",
        email: "bob@example.com",
        phone: "987654321",
    },
    {
        _id: "3",
        fullname: "Charlie Brown",
        email: "charlie@example.com",
        phone: "",
    },
];

import Users from "../../admin/Users";

describe("Admin Users Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockUsers,
        });
        useOutletContextMock.mockReturnValue({ searchQuery: "" });
    });

    it("fetches and displays users in table", async () => {
        render(<Users />);
        expect(await screen.findByText("Alice Smith")).toBeInTheDocument();
        expect(screen.getByText("bob@example.com")).toBeInTheDocument();
        expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
        expect(screen.getAllByRole("row")).toHaveLength(mockUsers.length + 1); // header + users
    });

    it("filters users by searchQuery", async () => {
        useOutletContextMock.mockReturnValue({ searchQuery: "bob" });
        render(<Users />);
        expect(await screen.findByText("Bob Johnson")).toBeInTheDocument();
        expect(screen.queryByText("Alice Smith")).not.toBeInTheDocument();
        expect(screen.queryByText("Charlie Brown")).not.toBeInTheDocument();
    });

    it("shows editable fields when Edit is clicked", async () => {
        render(<Users />);
        await screen.findByText("Alice Smith");
        fireEvent.click(screen.getAllByText("Edit")[0]);
        expect(screen.getByDisplayValue("Alice Smith")).toBeInTheDocument();
        expect(
            screen.getByDisplayValue("alice@example.com")
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue("123456789")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Save" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Cancel" })
        ).toBeInTheDocument();
    });

    it("cancels editing when Cancel is clicked", async () => {
        render(<Users />);
        await screen.findByText("Alice Smith");
        fireEvent.click(screen.getAllByText("Edit")[0]);
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
        expect(screen.getByText("Alice Smith")).toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: "Save" })
        ).not.toBeInTheDocument();
    });

    it("saves edited user when Save is clicked", async () => {
        render(<Users />);
        await screen.findByText("Alice Smith");
        fireEvent.click(screen.getAllByText("Edit")[0]);
        const nameInput = screen.getByDisplayValue("Alice Smith");
        fireEvent.change(nameInput, { target: { value: "Alice Cooper" } });
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
        fireEvent.click(screen.getByRole("button", { name: "Save" }));
        await waitFor(() => {
            expect(screen.getByText("Alice Cooper")).toBeInTheDocument();
        });
    });

    it("deletes user when Delete is confirmed", async () => {
        window.confirm = vi.fn(() => true);
        // First fetch: initial user list
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockUsers });
        // Second fetch: after delete, return remaining users
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUsers.slice(1),
        });
        render(<Users />);
        await screen.findByText("Alice Smith");
        fireEvent.click(screen.getAllByText("Delete")[0]);
        await waitFor(() => {
            expect(screen.queryByText("Alice Smith")).not.toBeInTheDocument();
        });
    });

    it("does not delete user if confirm is cancelled", async () => {
        window.confirm = vi.fn(() => false);
        render(<Users />);
        await screen.findByText("Alice Smith");
        fireEvent.click(screen.getAllByText("Delete")[0]);
        expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    });

    it("renders '-' for missing phone", async () => {
        render(<Users />);
        expect(await screen.findByText("Charlie Brown")).toBeInTheDocument();
        expect(screen.getAllByText("-").length).toBeGreaterThan(0);
    });
});
