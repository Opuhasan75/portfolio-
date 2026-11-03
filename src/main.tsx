import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { config } from "./config";
import "./index.css";

const root = document.documentElement;
root.style.setProperty("--accentColor", config.site.theme.accentColor);
root.style.setProperty("--highlightColor", config.site.theme.highlightColor);
root.style.setProperty("--backgroundColor", config.site.theme.backgroundColor);
document.title = config.site.title;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
