import { Navigate, createBrowserRouter } from "react-router-dom";

import GuestLayout from "./components/templates/GuestLayout";
import DefaultLayout from "./components/templates/DefaultLayout";

import Dashboard from "./pages/dashboard/Dashboard";

import Surveys from "./pages/surveys/Surveys";
import CreateSurvey from './pages/surveys/CreateSurvey'
import EditSurvey from "./pages/surveys/EditSurvey";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Error from "./pages/Error";

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
            {
                path: "/surveys/:id/edit",
                element: <EditSurvey />,
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
    {
        path: "/*",
        element: <Error />
    }
]);

export default router;
