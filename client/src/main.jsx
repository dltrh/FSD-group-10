import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter.jsx";
import AppProviders from "./context/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProviders>
            <AppRouter />
        </AppProviders>
    </React.StrictMode>
);
