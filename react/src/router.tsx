import { Navigate, createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Surveys from "./pages/Surveys";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestLayout from "./components/templates/GuestLayout";
import DefaultLayout from "./components/templates/DefaultLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/surveys",
                element: <Surveys />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
