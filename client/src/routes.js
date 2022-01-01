import { useRoutes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Auth from "./screens/Auth";
import Dashboard from "./screens/Dashboard";
import ForgotPassword from "./screens/forgot-password/ForgotPassword";
import NotFound from "./screens/NotFound";
import ResetPassword from "./screens/reset-password/ResetPassword";

const Routes = () => {
    return useRoutes([
        {
            path: "/dashboard",
            element: (
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            ),
            children: [
                // { path: "app", element: <DashboardApp /> },
                // { path: "user", element: <User /> },
                // { path: "products", element: <Products /> },
                // { path: "blog", element: <Blog /> },
            ],
        },
        {
            path: "/login",
            element: <Auth />,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />,
        },
        {
            path: "/reset-password/:token",
            element: <ResetPassword />,
        },
        { path: "*", element: <NotFound /> },
    ]);
};

export default Routes;
