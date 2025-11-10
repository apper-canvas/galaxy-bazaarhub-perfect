import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "@/App";
import { store } from "@/store";
import "@/index.css";

// React.StrictMode should never be present in main.jsx file
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);