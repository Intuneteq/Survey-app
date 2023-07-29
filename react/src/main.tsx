import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

import router from "./router";
import "./index.css";
import { SurveyProvider } from "./contexts/SurveyContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <AppProvider>
         <SurveyProvider>
            <RouterProvider router={router} />
         </SurveyProvider>
      </AppProvider>
   </React.StrictMode>
);
