import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-background to-background/60 px-6 py-24">
      <div className="max-w-xl rounded-3xl border border-border bg-card/90 p-12 text-center shadow-xl">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Compass className="h-8 w-8" aria-hidden />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold text-foreground">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          The page you're looking for doesn't exist yet. Continue exploring the
          portfolio or get in touch to learn more about Clive's work.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Home
          </Link>
          <a
            href="/#contact"
            title="Open the contact section"
            className="inline-flex items-center gap-2 rounded-full border border-input px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5"
          >
            Connect with Clive
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
