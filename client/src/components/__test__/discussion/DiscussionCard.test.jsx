import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import DiscussionCard from "../../discussion/DiscussionCard";

describe("DiscussionCard", () => {
    const mockDiscussion = {
        userId: "123",
        discussionId: "456",
        content: "Test Discussion",
        description: "This is a test discussion",
        createdAt: new Date(),
    };

    const baseURL = "http://mock-api.com";

    beforeAll(() => {
        import.meta.env.VITE_API_BASE_URL = baseURL;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("fetchUsername", () => {
        it("should fetch and display the username on successful API call", async () => {
            const mockResponse = { fullname: "John Doe" };
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            render(<DiscussionCard discussion={mockDiscussion} />);

            await waitFor(() =>
                expect(
                    screen.getByText(/Posted by: John Doe/i)
                ).toBeInTheDocument()
            );
        });

        it("should log an error when the API call to fetch username fails", async () => {
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
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

    describe("fetchQuestions", () => {
        it("should fetch and display the number of questions on successful API call", async () => {
            const mockQuestions = [
                { questionId: "1", content: "Question 1", discussionId: "456" },
                { questionId: "2", content: "Question 2", discussionId: "456" },
            ];
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => mockQuestions,
            });

            render(<DiscussionCard discussion={mockDiscussion} />);

            await waitFor(() =>
                expect(
                    screen.getByText((content) =>
                        content.includes("questions asked in this topic")
                    )
                ).toBeInTheDocument()
            );
        });

        it("should log an error when the API call to fetch questions fails", async () => {
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            vi.spyOn(global, "fetch") // Mock fetch for fetchUsername to succeed
                .mockResolvedValueOnce({ 
                    ok: true,
                    json: async () => ({ fullname: "John Doe" }), 
                }) // Mock fetch for fetchQuestions to fail
                .mockResolvedValueOnce({
                    ok: false,
                });

            render(<DiscussionCard discussion={mockDiscussion} />);

            await waitFor(() =>
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    "Error fetching questions:",
                    expect.any(Error)
                )
            );
        });
    });
});
