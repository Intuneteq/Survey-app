import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Surveys from "./pages/Surveys";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/surverys",
        element: <Surveys />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
