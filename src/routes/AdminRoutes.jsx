import Placeholder from "../pages/shared/Placeholder";
import Dashboard from "../pages/admin/Dashboard";
import AdminPages from "../pages/admin/Admin";

export const AdminRoutes = [
    {
        path: "/admin",
        element: <AdminPages />,
        errorElement: <Placeholder />,
    },
];
