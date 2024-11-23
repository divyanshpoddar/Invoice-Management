import React from "react";
import ReactDOM from "react-dom";
import App from "./App";  // Import the main App component
import "./index.css";  // Import any styles you need

ReactDOM.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById("root")
);
