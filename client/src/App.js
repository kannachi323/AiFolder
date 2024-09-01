import React, { useState, useMemo } from 'react';
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/MainPage.jsx"
import Setup from "./routes/Setup.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/main_window", //usually '/', but we are using electron-forge
    element: <MainPage />,
  },
  {
      path: "/setup",
      element: <Setup />,
  },
]);

export default AppRouter;
