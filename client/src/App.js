import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/MainPage.jsx"
import Setup from "./routes/Setup.jsx";
import GmailQuickstart from './routes/GmailPage.jsx';

const AppRouter = createBrowserRouter([
  {
    path: "/main_window", //usually '/', but we are using electron-forge
    element: <MainPage />,
  },
  {
    path: "/setup",
    element: <Setup />,
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
