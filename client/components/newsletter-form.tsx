import { useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  variant?: "default" | "minimal";
  className?: string;
}

export function NewsletterForm({ variant = "default", className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage("Thanks for subscribing! Check your inbox.");
        setEmail("");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(result.error || "Failed to subscribe");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", className)}>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading"}
            className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Subscribe to newsletter"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </div>
        {message && (
          <p
            className={cn(
              "text-sm",
              status === "success" ? "text-green-600 dark:text-green-400" : "text-destructive"
            )}
            role="alert"
          >
            {message}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border bg-card p-8 shadow-lg", className)}>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Stay Updated</h3>
          <p className="text-sm text-muted-foreground">
            Get the latest insights on technology and entrepreneurship
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            disabled={status === "loading"}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe to Newsletter"}
        </button>
        {message && (
          <p
            className={cn(
              "text-sm text-center",
              status === "success" ? "text-green-600 dark:text-green-400" : "text-destructive"
            )}
            role="alert"
          >
            {message}
          </p>
        )}
        <p className="text-xs text-center text-muted-foreground">
          Join the community. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
