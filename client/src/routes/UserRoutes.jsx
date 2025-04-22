import Home from "../pages/user/Home";
import CreateEvent from "../pages/user/CreateEvent";
import DiscussionList from "../components/discussion/DiscussionList";
import DiscussionCard from "../components/discussion/DiscussionCard";
import DiscussionDetails from "../components/discussion/DiscussionDetails";
import Placeholder from "../pages/shared/Placeholder";
import ManageEvent from "../pages/user/ManageEvent";
import EventDetailsModal from "../pages/user/EventDetailsModal";
import EventResponse from "../pages/user/EventResponse";
import AcceptEvent from "../pages/user/AcceptEvent";

export const UserRoutes = [
    {
        path: "/home",
        element: <Home />,
        errorElement: <Placeholder />,
    },
    {
        path: "/create",
        element: <CreateEvent />,
        errorElement: <Placeholder />,
    },
    {
        path: "/discussion-list",
        element: <DiscussionList />,
        errorElement: <Placeholder />,
    },
    {
        path: "/discussion-card",
        element: <DiscussionCard />,
        errorElement: <Placeholder />,
    },
    {
        path: "/discussion-details",
        element: <DiscussionDetails />,
        errorElement: <Placeholder />,
    },
    {
        path: "/manage",
        element: <ManageEvent />,
        errorElement: <Placeholder />,
    },
    {
        path: "/manage/details/:id",
        element: <EventDetailsModal />,
        errorElement: <Placeholder />,
    },
    {
        path: "/response",
        element: <EventResponse />,
        errorElement: <Placeholder />,
    },
    {
        path: "/attend/:id",
        element: <AcceptEvent />,
        errorElement: <Placeholder />,
    },
];
