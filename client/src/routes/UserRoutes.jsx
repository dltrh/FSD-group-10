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
import MyEvents from "../pages/user/MyEvents";
import SavedEvents from "../pages/user/SavedEvents";
import Invitations from "../pages/user/Invitations";
import InvitationResponseStatus from "../pages/user/InvitationResponseStatus"
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../pages/user/Profile";

export const UserRoutes = [
    {
        path: "/home",
        element: <ProtectedRoutes>
            <Home />
        </ProtectedRoutes>,
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
        path: "/manage/details/:eventId",
        element: <EventDetailsModal />,
        errorElement: <Placeholder />,
    },
    {
        path: "/response",
        element: <EventResponse />,
        errorElement: <Placeholder />,
    },
    {
        path: "/response/:status",
        element: <InvitationResponseStatus />,
        errorElement: <Placeholder />,
    },
    {
        path: "/attend/:id",
        element: <AcceptEvent />,
        errorElement: <Placeholder />,
    },
    {
        path: "/:user-id/my-events",
        element: <MyEvents />,
        errorElement: <Placeholder />,
    },
    {
        path: "/:user-id/saved-events",
        element: <SavedEvents />,
        errorElement: <Placeholder />,
    },
    {
        path: "/:user-id/invitations",
        element: <Invitations />,
        errorElement: <Placeholder />,
    },
    {
        path: "/:user-id/profile",
        element: <Profile />,
        errorElement: <Placeholder />,
    },
];
