import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Welcome from "./pages/Welcome.jsx";
import Placeholder from "./pages/Placeholder.jsx";

const routers = createBrowserRouter([
    { path: "/", element: <Welcome />, errorElement: <Placeholder /> }
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={routers} />
    </React.StrictMode>
);
