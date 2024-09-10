import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { createHashRouter } from "react-router-dom";
import MainPage from "./routes/MainPage.jsx"
import { SetupPage, RegisterPage, LoginPage } from "./routes/SetupPage.jsx";
import ProfilePage from "./routes/ProfilePage.jsx";
import GmailQuickstart from './routes/GmailPage.jsx';

const AppRouter = createHashRouter([
  {
    path: "/main_window", //usually '/', but we are using electron-forge
    element: <MainPage />,
  },
  {
    path: "/user",
    element: <SetupPage />,
    children: [
      {
        path: "register", // Relative path (do not include "/user/")
        element: <RegisterPage />,
      },
      {
        path: "login", // Relative path (do not include "/user/")
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />
      }
    ]
  },
  {
    path: "/profile",
    element: <MainPage />,
  },
  {
    path: "/gmail",
    element: <GmailQuickstart />
  },
  {
    path: "*",
    element: <Navigate to="/main_window" />
  }
]);

export default AppRouter;
