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
import InvitationResponseStatus from "../pages/user/InvitationResponseStatus";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../pages/user/Profile";

const baseRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/create", element: <CreateEvent /> },
    { path: "/discussion-list", element: <DiscussionList /> },
    { path: "/discussion-card", element: <DiscussionCard /> },
    { path: "/discussion-details", element: <DiscussionDetails /> },
    { path: "/manage", element: <ManageEvent /> },
    { path: "/manage/details/:eventId", element: <EventDetailsModal /> },
    { path: "/response", element: <EventResponse /> },
    { path: "/response/:status", element: <InvitationResponseStatus /> },
    { path: "/attend/:id", element: <AcceptEvent /> },
    { path: "/:user-id/my-events", element: <MyEvents /> },
    { path: "/:user-id/saved-events", element: <SavedEvents /> },
    { path: "/:user-id/invitations", element: <Invitations /> },
    { path: "/:user-id/profile", element: <Profile /> },
];

export const UserRoutes = baseRoutes.map((route) => ({
    ...route,
    element: <ProtectedRoutes>{route.element}</ProtectedRoutes>,
    errorElement: <Placeholder />,
}));