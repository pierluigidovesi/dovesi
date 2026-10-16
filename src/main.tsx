import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

const root = document.getElementById("root")!;
// The host can serve the homepage HTML for an unknown SPA route. Render the
// 404 normally instead of trying to hydrate it against the homepage markup.
if (location.pathname === "/" && root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
