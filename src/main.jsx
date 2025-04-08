import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import "./index.css";
import Welcome from "./pages/Welcome.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import LoginUser from "./pages/LoginUser.jsx";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
        errorElement: <Placeholder />,
    },
    {
        path: "/login-user",
        element: <LoginUser />,
        errorElement: <Placeholder />,
    },
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={routers} />
    </React.StrictMode>
);
