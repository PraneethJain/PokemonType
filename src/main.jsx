import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";

document.getElementById("bg").volume = 0.1; // temporary, only play bg after logging in

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </React.StrictMode>
);
