    import { createBrowserRouter, RouterProvider } from "react-router-dom";
    import { SharedRoutes } from "./SharedRoutes";
    import { UserRoutes } from "./UserRoutes";
    import { AdminRoutes } from "./AdminRoutes";

    const allRoutes = [...SharedRoutes, ...UserRoutes, ...AdminRoutes];

    const router = createBrowserRouter(allRoutes);

    const AppRouter = () => <RouterProvider router={router} />;

    export default AppRouter;
