import { vi } from "vitest";
import "@testing-library/jest-dom"; 
vi.spyOn(console, "error").mockImplementation(() => {});