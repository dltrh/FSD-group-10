import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import DiscussionCard from "../../discussion/DiscussionCard";

// Test file for Discussion card - All test passed
describe("DiscussionCard - fetchUsername", () => {
    const mockDiscussion = {
        userId: "123",
        discussionId: "456",
        content: "Test Discussion",
        description: "This is a test discussion",
        createdAt: new Date().toISOString(),
    };

    const baseURL = "http://mock-api.com";

    beforeAll(() => {
        import.meta.env.VITE_API_BASE_URL = baseURL;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should fetch and display the username on successful API call", async () => {
        const mockResponse = { fullname: "John Doe" };
        vi.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        render(<DiscussionCard discussion={mockDiscussion} />);

        await waitFor(() =>
            expect(screen.getByText(/Posted by: John Doe/i)).toBeInTheDocument()
        );
    });

    it("should log an error when the API call fails", async () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: false,
        });

        render(<DiscussionCard discussion={mockDiscussion} />);

        await waitFor(() =>
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Error fetching user data:",
                expect.any(Error)
            )
        );
    });
});