import React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import MainPage from "./routes/MainPage.jsx"
import Setup from "./routes/Setup.jsx";
import "./index.css";

import AppRouter from './App.js';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={AppRouter} />
    </React.StrictMode>
);