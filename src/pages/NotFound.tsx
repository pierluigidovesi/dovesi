import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Helmet>
        <title>404 — Page Not Found | Pier Luigi Dovesi</title>
        <meta name="description" content="The page you're looking for doesn't exist on dovesi.dev. Return to the homepage to browse research, talks, and writing." />
        <link rel="canonical" href={`https://dovesi.dev${location.pathname}`} />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="404 — Page Not Found" />
        <meta property="og:description" content="This page doesn't exist on dovesi.dev." />
        <meta property="og:url" content={`https://dovesi.dev${location.pathname}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
