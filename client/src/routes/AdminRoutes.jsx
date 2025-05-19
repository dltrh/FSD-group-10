import Placeholder from "../pages/shared/Placeholder";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import Users from "../pages/admin/Users";
import Events from "../pages/admin/Events";
import AdminSettings from "../pages/admin/Settings";
import Profile from "../pages/user/Profile";
import ProtectedRoute from "./ProtectedRoutes";

export const AdminRoutes = [
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <Placeholder />,
        children: [
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute requireAdmin>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute requireAdmin>
                        <Users />
                    </ProtectedRoute>
                ),
            },
            {
                path: "events",
                element: (
                    <ProtectedRoute requireAdmin>
                        <Events />
                    </ProtectedRoute>
                ),
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute requireAdmin>
                        <AdminSettings />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute requireAdmin>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
        ],
    },
];
