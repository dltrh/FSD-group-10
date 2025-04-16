import Placeholder from "../pages/shared/Placeholder";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import Users from "../pages/admin/Users";
import Events from "../pages/admin/Events";

export const AdminRoutes = [
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <Placeholder />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "users", element: <Users /> },
            { path: "events", element: <Events /> },
        ],
    }
];
