import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import DiscussionDetails from "../../discussion/DiscussionDetails";

describe("DiscussionDetails", () => {
    const mockDiscussion = {
        discussionId: "123",
        content: "Test Discussion",
        description: "This is a test discussion",
        createdAt: new Date(),
    };

    const mockOnClose = vi.fn();

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("Rendering", () => {
        it("should render the discussion details", () => {
            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            expect(
                screen.getByText(mockDiscussion.content)
            ).toBeInTheDocument();
            expect(
                screen.getByText(mockDiscussion.description)
            ).toBeInTheDocument();
            expect(
                screen.getByRole("heading", { name: /questions/i })
            ).toBeInTheDocument();
        });

        it("should display 'No questions found' when there are no questions", () => {
            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            expect(screen.getByText(/No questions found/i)).toBeInTheDocument();
        });
    });

    describe("Fetching Data", () => {
        it("should fetch and display questions", async () => {
            const mockQuestions = [
                { questionId: "1", content: "Question 1" },
                { questionId: "2", content: "Question 2" },
            ];
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => mockQuestions,
            });

            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            await waitFor(() => {
                expect(screen.getByText("Question 1")).toBeInTheDocument();
                expect(screen.getByText("Question 2")).toBeInTheDocument();
            });
        });

        it("should log an error when fetching questions fails", async () => {
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: false,
            });

            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            await waitFor(() =>
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    "Error fetching questions:",
                    expect.any(Error)
                )
            );
        });

        it("should fetch and display replies for a question", async () => {
            const mockReplies = [
                { replyId: "1", content: "Reply 1" },
                { replyId: "2", content: "Reply 2" },
            ];
            vi.spyOn(global, "fetch")
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => [
                        { questionId: "1", content: "Question 1" },
                    ],
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => mockReplies,
                });

            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            await waitFor(() => {
                expect(screen.getByText("Reply 1")).toBeInTheDocument();
                expect(screen.getByText("Reply 2")).toBeInTheDocument();
            });
        });

        it("should log an error when fetching replies fails", async () => {
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            vi.spyOn(global, "fetch")
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => [
                        { questionId: "1", content: "Question 1" },
                    ],
                })
                .mockResolvedValueOnce({
                    ok: false,
                });

            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            await waitFor(() =>
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    "Error fetching replies:",
                    expect.any(Error)
                )
            );
        });
    });

    describe("Form Submissions", () => {
        it("should submit a new question", async () => {
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    questionId: "3",
                    content: "New Question",
                }),
            });

            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            fireEvent.click(
                screen.getByRole("button", { name: /add question/i })
            );
            fireEvent.change(screen.getByPlaceholderText(/ask a question/i), {
                target: { value: "New Question" },
            });
            fireEvent.click(screen.getByRole("button", { name: /send/i }));

            await waitFor(() => {
                expect(screen.getByText("New Question")).toBeInTheDocument();
            });
        });

        it("should log an error when submitting a new question fails", async () => {
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            vi.spyOn(global, "fetch")
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => [],
                })
                // 2️⃣ POST /questions – fail
                .mockResolvedValueOnce({
                    ok: false,
                    status: 500,
                });
            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            fireEvent.click(
                screen.getByRole("button", { name: /add question/i })
            );
            fireEvent.change(screen.getByPlaceholderText(/ask a question/i), {
                target: { value: "New Question" },
            });
            fireEvent.click(screen.getByRole("button", { name: /send/i }));

            await waitFor(() =>
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    "Error creating new question:",
                    expect.any(Error)
                )
            );
        });

        it("should log an error when submitting a new reply fails", async () => {
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            vi.spyOn(global, "fetch")
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => [
                        { questionId: "1", content: "Question 1" },
                    ],
                })
                // 2️⃣ fetch replies for question 1 → succeed (empty list is fine)
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => [],
                })
                // 3️⃣ POST /replies – fail
                .mockResolvedValueOnce({
                    ok: false,
                    status: 500,
                });

            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            await waitFor(() =>
                expect(
                    screen.getByText((content) =>
                        content.includes("Question 1")
                    )
                ).toBeInTheDocument()
            );

            fireEvent.click(
                screen.getByText((content) => content.includes("Question 1"))
            );
            fireEvent.change(screen.getByPlaceholderText(/reply/i), {
                target: { value: "New Reply" },
            });
            fireEvent.click(screen.getByRole("button", { name: /send/i }));

            await waitFor(() =>
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    "Error sending new reply:",
                    expect.any(Error)
                )
            );
        });
    });

    describe("Interactions", () => {
        it("should toggle the question form visibility", () => {
            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            const addButton = screen.getByRole("button", {
                name: /add question/i,
            });
            fireEvent.click(addButton);

            expect(
                screen.getByPlaceholderText(/ask a question/i)
            ).toBeInTheDocument();

            fireEvent.click(addButton);

            expect(
                screen.queryByPlaceholderText(/ask a question/i)
            ).not.toBeInTheDocument();
        });

        it("should toggle the reply form visibility for a question", async () => {
            vi.spyOn(global, "fetch").mockResolvedValueOnce({
                ok: true,
                json: async () => [{ questionId: "1", content: "Question 1" }],
            });

            render(
                <DiscussionDetails
                    discussion={mockDiscussion}
                    onClose={mockOnClose}
                />
            );

            await waitFor(() => {
                fireEvent.click(screen.getByText("Question 1"));
                expect(
                    screen.getByPlaceholderText(/reply/i)
                ).toBeInTheDocument();
            });
        });
    });
});
