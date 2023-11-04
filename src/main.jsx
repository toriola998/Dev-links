import React from "react";
import ReactDOM from "react-dom/client";

import Login from "./routes/login";
import Signup from "./routes/signup";
import CustomizeLinks from "./routes/customize-links";
import ProfileDetails from "./routes/profile-details";
import Preview from "./routes/preview";
import UserPage from './routes/user';
import ErrorPage from "./routes/error-page";
import "./assets/css/index.css";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Login />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/signup",
      element: <Signup />,
   },
   {
      path: "/customize-links",
      element: <CustomizeLinks />,
   },
   {
      path: "/profile-details",
      element: <ProfileDetails />,
   },
   {
      path: "/preview",
      element: <Preview />,
   },
   {
      path: "/:id",
      element: <UserPage />,
   },
   {
      path: "*",
      element: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
);
