import { Navigate, createBrowserRouter } from "react-router-dom";

import GuestLayout from "./components/templates/GuestLayout";
import DefaultLayout from "./components/templates/DefaultLayout";

import Dashboard from "./pages/dashboard/Dashboard";

import Surveys from "./pages/surveys/Surveys";
import CreateSurvey from './pages/surveys/CreateSurvey'

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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
            {
                path: "/surveys/create",
                element: <CreateSurvey />,
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
