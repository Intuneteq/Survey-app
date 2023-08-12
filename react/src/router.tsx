import { Navigate, createBrowserRouter } from "react-router-dom";

import GuestLayout from "./components/templates/GuestLayout";
import DefaultLayout from "./components/templates/DefaultLayout";

import Dashboard from "./pages/dashboard/Dashboard";

import Surveys from "./pages/surveys/Surveys";
import CreateSurvey from "./pages/surveys/CreateSurvey";
import EditSurvey from "./pages/surveys/EditSurvey";
import Redirect from "./pages/auth/Redirect";
import Profile from "./pages/Profile";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Error from "./pages/Error";
import PublicSurvey from "./pages/surveys/PublicSurvey";
import SurveyView from "./pages/surveys/SurveyView";

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
            path: "/dashboard/profile",
            element: <Profile />,
         },
         {
            path: "/dashboard/:provider",
            element: <Redirect />,
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
            path: "/surveys/:id",
            element: <SurveyView />,
            // loader: async () => {},
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
         {
            /**
             * Provider is expected to be appended in oauth redirect link of the provider
             */
            path: "/redirect/:provider",
            element: <Redirect />,
         },
      ],
   },
   {
      path: "/surveys/public/:slug",
      element: <PublicSurvey />,
   },
   {
      path: "/*",
      element: <Error />,
   },
]);

export default router;
