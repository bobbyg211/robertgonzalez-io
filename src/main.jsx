import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.scss";

if (import.meta.env.PROD) {
  console.log(
    "%c  ┌─────────────────────────────┐\n  │  you opened the console      │\n  │  so you're probably the one  │\n  │  who'd maintain this.        │\n  │  hello@robertgonzalez.io     │\n  └─────────────────────────────┘",
    "font-family: ui-monospace, monospace; color: #0b7d5d; line-height: 1.5"
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Vite fills BASE_URL from the base option above. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
