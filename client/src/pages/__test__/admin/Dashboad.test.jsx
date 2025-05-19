import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Dashboard from "../../admin/Dashboard";

// Mock fetch
global.fetch = vi.fn();

describe("Admin Dashboard Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders initial stats as 0", () => {
        // Mock fetch to never resolve (simulate loading)
        fetch.mockReturnValue(new Promise(() => {}));
        render(<Dashboard />);
        expect(screen.getByText("Total users")).toBeInTheDocument();
        expect(screen.getByText("Total events")).toBeInTheDocument();
        expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(2);
    });

    it("fetches and displays stats from API", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ totalUsers: 42, totalEvents: 17 }),
        });
        render(<Dashboard />);
        await waitFor(() => {
            expect(screen.getByText("42")).toBeInTheDocument();
            expect(screen.getByText("17")).toBeInTheDocument();
        });
    });

    it("shows 0 if API returns missing fields", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });
        render(<Dashboard />);
        await waitFor(() => {
            // Should fallback to 0 for missing fields
            expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(2);
        });
    });

    it("handles fetch failure gracefully", async () => {
        const errorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        fetch.mockRejectedValueOnce(new Error("Network error"));
        render(<Dashboard />);
        await waitFor(() => {
            expect(errorSpy).toHaveBeenCalledWith(
                "Failed to fetch stats",
                expect.any(Error)
            );
            // Should still show initial 0s
            expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(2);
        });
        errorSpy.mockRestore();
    });

    it("handles non-OK API response gracefully", async () => {
        const errorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });
        render(<Dashboard />);
        // The .then(res => res.json()) will still resolve, but you may want to check for error logging
        await waitFor(() => {
            expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(2);
        });
        errorSpy.mockRestore();
    });
});
