import React, { useState, useMemo } from 'react';
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

]);

export default AppRouter;
