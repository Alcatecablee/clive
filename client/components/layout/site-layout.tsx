import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Mail, Monitor, Phone, ExternalLink, Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";

const navItems = [
  { href: "/#about", label: "About", title: "Go to About section" },
  {
    href: "/#experience",
    label: "Experience",
    title: "Explore business experience",
  },
  { href: "/#contact", label: "Contact", title: "Reach the contact section" },
];

const footerLinks = [
  { href: "https://superk53.co.za", label: "SuperK53" },
  { href: "https://taxfy.co.za", label: "Taxfy" },
  { href: "https://burbgigz.com", label: "BurbGigz" },
];

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Monitor className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                Just Clive
              </p>
              <p className="text-xs text-muted-foreground">
                Entrepreneur &amp; Technology Leader
              </p>
            </div>
          </Link>
          <nav
            className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                title={item.title}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/#contact"
              title="Open the contact section"
              className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 md:inline-flex"
            >
              Let's Connect
            </a>
            <MobileNav />
          </div>
        </div>
      </header>
      <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
      <footer className="border-t border-border bg-background/80 py-12 sm:py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                <Monitor className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg font-semibold tracking-tight">
                  Clive "Just_Clive" Makazhu
                </p>
                <p className="text-xs text-muted-foreground">
                  Founder of SuperK53, Taxfy &amp; BurbGigz IT Services
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Entrepreneur &amp; technology leader building innovative digital
              solutions for South African consumers and businesses from
              Johannesburg.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href="https://wa.me/27670494876"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Clive on WhatsApp"
                className="inline-flex min-h-[44px] items-center gap-2 py-1 transition-colors hover:text-primary"
                aria-label="Chat with Clive on WhatsApp"
              >
                <Phone className="h-4 w-4" aria-hidden />
                +27 67 049 4876
              </a>
              <a
                href="mailto:info@burbgigz.com"
                title="Email Clive Makazhu"
                className="inline-flex items-center gap-2 transition hover:text-primary"
              >
                <Mail className="h-4 w-4" aria-hidden />
                info@burbgigz.com
              </a>
              <a
                href="https://x.com/just_clive_sa"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Clive on X"
                className="inline-flex items-center gap-2 transition hover:text-primary"
                aria-label="Follow Clive on X"
              >
                <Twitter className="h-4 w-4" aria-hidden />
                @just_clive_sa
              </a>
            </div>
          </div>
          <div className="grid gap-6 text-sm text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">Platforms</p>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${link.label}`}
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex w-full max-w-6xl items-center justify-between px-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Clive "Just_Clive" Makazhu. All rights reserved.
          </p>
          <a
            href="https://www.macaly.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Discover Macaly"
            className="rounded-full border border-border bg-background px-4 py-2 transition hover:border-primary/40 hover:text-primary"
          >
            Built with Macaly
          </a>
        </div>
      </footer>
    </div>
  );
}
