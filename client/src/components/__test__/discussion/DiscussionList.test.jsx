import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DiscussionList from "../../discussion/DiscussionList";

describe("DiscussionList", () => {
    const mockEventId = "123";
    const mockBaseURL = "http://mock-api.com";
    const mockDiscussion = {
        discussionId: "1",
        content: "Test Discussion",
        description: "This is a test discussion",
        createdAt: new Date(),
    };

    beforeAll(() => {
        import.meta.env.VITE_API_BASE_URL = mockBaseURL;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("Rendering", () => {
        it("should render the discussion list heading", () => {
            render(<DiscussionList eventId={mockEventId} />);
            expect(
                screen.getByRole("heading", { name: /discussion/i })
            ).toBeInTheDocument();
        });

        it("should render the 'New discussion' button", () => {
            render(<DiscussionList eventId={mockEventId} />);
            expect(
                screen.getByRole("button", { name: /new discussion/i })
            ).toBeInTheDocument();
        });

        it("should display 'No discussions available' when there are no discussions", () => {
            render(<DiscussionList eventId={mockEventId} />);
            expect(
                screen.getByText(/No discussions available/i)
            ).toBeInTheDocument();
        });
    });

    describe("Fetching Data", () => {
        it("should fetch and display discussions", async () => {
            const mockDiscussions = [
                {
                    discussionId: "1",
                    content: "Discussion 1",
                    description: "Description 1",
                },
                {
                    discussionId: "2",
                    content: "Discussion 2",
                    description: "Description 2",
                },
            ];
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => mockDiscussions,
            });

            render(<DiscussionList eventId={mockEventId} />);

            await waitFor(() => {
                expect(screen.getByText("Discussion 1")).toBeInTheDocument();
                expect(screen.getByText("Discussion 2")).toBeInTheDocument();
            });
        });

        it("should log an error when fetching discussions fails", async () => {
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: false,
            });

            render(<DiscussionList eventId={mockEventId} />);

            await waitFor(() =>
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    `Error fetching discussions for event ${mockEventId}:`,
                    expect.any(Error)
                )
            );
        });
    });

    describe("Form Submissions", () => {
        it("should submit a new discussion successfully", async () => {
            const mockNewDiscussion = {
                discussionId: "3",
                content: "New Discussion",
                description: "New Description",
            };
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => mockNewDiscussion,
            });

            render(<DiscussionList eventId={mockEventId} />);

            fireEvent.click(
                screen.getByRole("button", { name: /new discussion/i })
            );
            fireEvent.change(screen.getByLabelText(/Discussion Title/i), {
                target: { value: "New Discussion" },
            });
            fireEvent.change(screen.getByLabelText(/Discussion Description/i), {
                target: { value: "New Description" },
            });
            fireEvent.click(screen.getByRole("button", { name: /submit/i }));

            await waitFor(() => {
                expect(
                    screen.getByDisplayValue("New Discussion")
                ).toBeInTheDocument();
            });
        });

        it("should log an error when submitting a new discussion fails", async () => {
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            vi.spyOn(global, "fetch").mockImplementation((url, options) => {
                if (options?.method === "GET") {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve([]),
                    });
                }
                if (options?.method === "POST") {
                    return Promise.resolve({
                        ok: false,
                        status: 500,
                    });
                }
            });

            render(<DiscussionList eventId={mockEventId} />);

            fireEvent.click(
                screen.getByRole("button", { name: /new discussion/i })
            );
            fireEvent.change(screen.getByLabelText(/Discussion Title/i), {
                target: { value: "New Discussion" },
            });
            fireEvent.change(screen.getByLabelText(/Discussion Description/i), {
                target: { value: "New Description" },
            });
            fireEvent.click(screen.getByRole("button", { name: /submit/i }));

            await waitFor(() =>
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    "Error creating new discussion:",
                    expect.any(Error)
                )
            );
        });
    });

    describe("Interactions", () => {
        it("should toggle the new discussion form visibility", () => {
            render(<DiscussionList eventId={mockEventId} />);

            const newDiscussionButton = screen.getByRole("button", {
                name: /new discussion/i,
            });
            fireEvent.click(newDiscussionButton);

            expect(
                screen.getByText(/Post a new discussion topic/i)
            ).toBeInTheDocument();

            fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

            expect(
                screen.queryByText(/Post a new discussion topic/i)
            ).not.toBeInTheDocument();
        });

        it("should open the discussion details when a discussion is clicked", async () => {
            const mockDiscussions = [
                {
                    discussionId: "1",
                    content: "Discussion 1",
                    description: "Description 1",
                },
            ];
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => mockDiscussions,
            });

            render(<DiscussionList eventId={mockEventId} />);

            await waitFor(() => {
                fireEvent.click(screen.getByText("Discussion 1"));
            });
            // Check if the discussion details are displayed by checking for the
            // close button on the overlay
            expect(
                screen.getByRole("button", { name: /×/i })
            ).toBeInTheDocument();
        });

        it("should close the discussion details when the close button is clicked", async () => {
            const mockDiscussions = [
                {
                    discussionId: "1",
                    content: "Discussion 1",
                    description: "Description 1",
                },
            ];
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => mockDiscussions,
            });

            render(<DiscussionList eventId={mockEventId} />);

            await waitFor(() => {
                fireEvent.click(screen.getByText("Discussion 1"));
            });

            fireEvent.click(screen.getByRole("button", { name: /×/i }));

            // Query the overlay container if it has a class / role
            await waitFor(() => {
                expect(
                    screen.queryByTestId("discussion-details-overlay")
                ).not.toBeInTheDocument();
            });
        });
    });

    describe("Edge Cases", () => {
        it("should handle an empty discussions array", async () => {
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => [],
            });

            render(<DiscussionList eventId={mockEventId} />);

            await waitFor(() => {
                expect(
                    screen.getByText(/No discussions available/i)
                ).toBeInTheDocument();
            });
        });

        it("should handle an invalid API response", async () => {
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => null, // Invalid response
            });

            render(<DiscussionList eventId={mockEventId} />);

            await waitFor(() => {
                expect(
                    screen.getByText(/No discussions available/i)
                ).toBeInTheDocument();
            });
        });
    });
});
