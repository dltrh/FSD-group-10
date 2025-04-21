import Placeholder from "../pages/shared/Placeholder";
import LoginUser from "../pages/shared/LoginUser";
import LoginAdmin from "../pages/shared/LoginAdmin";
import Register from "../pages/shared/Register";
import Welcome from "../pages/shared/Welcome";
import ForgotPasswordUser from "../pages/shared/ForgotPasswordUser";
import ResetPasswordUser from "../pages/shared/ResetPasswordUser";

export const SharedRoutes = [
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
        path: "/forgot-password-user",
        element: <ForgotPasswordUser />,
        errorElement: <Placeholder />,
    },
    {
        path: "/reset-password-user",
        element: <ResetPasswordUser />,
        errorElement: <Placeholder />,
    },
];
