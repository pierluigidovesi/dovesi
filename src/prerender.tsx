import { renderToString } from "react-dom/server";
import Index from "./pages/Index";

export const renderPage = () => renderToString(<Index />);
