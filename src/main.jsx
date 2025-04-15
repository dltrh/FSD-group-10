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
import LoginAdmin from "./pages/LoginAdmin.jsx";
import Register from "./pages/Register.jsx";
import DiscussionCard from "./components/DiscussionCard.jsx";
import DiscussionDetails from "./components/DiscussionDetails.jsx";
import Home from "./pages/Home.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import ManageEvent from "./pages/ManageEvent.jsx";
import EventDetailsModal from "./pages/EventDetailsModal.jsx";
import DiscussionList from "./components/DiscussionList.jsx";

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
    {
        path: "/login-admin",
        element: <LoginAdmin />,
        errorElement: <Placeholder />,
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <Placeholder />,
    },
    {
        path: "/discussion-card",
        element: <DiscussionCard />,
        errorElement: <Placeholder />
    },
    {
        path: "/discussion-details",
        element: <DiscussionDetails />,
        errorElement: <Placeholder />
    },
    {
        path: "/discussion-list",
        element: <DiscussionList />,
        errorElement: <Placeholder />
    },
    {
        path: "/home",
        element: <Home />,
        errorElement: <Placeholder />
    },
    {
        path: "/create",
        element: <CreateEvent />,
        errorElement: <Placeholder />
    },
    {
        path: "/manage",
        element: <ManageEvent />,
        errorElement: <Placeholder />
    },
    {
        path: "/manage/details/:id",
        element: <EventDetailsModal />,
        errorElement: <Placeholder />
    },
    
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={routers} />
    </React.StrictMode>
);
