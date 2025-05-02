import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NavigationApp } from "./navigation/NavigationApp";
import { BrowserRouter } from "react-router-dom";

// Ensure the navigation-root has the proper class for styling
const navigationRoot = document.getElementById("navigation-root");

createRoot(navigationRoot!).render(
  <BrowserRouter>
    <NavigationApp />
  </BrowserRouter>
);
