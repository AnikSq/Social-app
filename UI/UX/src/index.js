import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      {/* We are sharing all the value inside authcontext provider with App*/}
      {/* With this we can reach the logged in user anywhere in the whole application*/}
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
