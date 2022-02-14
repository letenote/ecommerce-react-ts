import React from "react";
import "../public/styles/main.css";
import ReactDOM from "react-dom";
import App from "./App";
import { disableReactDevTools } from "./config/disableReactDevTools";

process.env.NODE_ENV === "production" && disableReactDevTools();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
