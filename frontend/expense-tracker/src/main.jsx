import { StrictMode } from "react";
import "@fontsource/poppins";
import "./index.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import UserProvider from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);