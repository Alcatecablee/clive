import { FormEvent, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Headset,
  Layers,
  LineChart,
  Loader2,
  MapPin,
  MessageCircle,
  Monitor,
  Network,
  ShieldCheck,
  Sparkles,
  Twitter,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

type StatCard = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type PortfolioItem = {
  company: string;
  role: string;
  timeframe: string;
  description: string;
  highlights: string[];
  link?: {
    href: string;
    label: string;
  };
  badge?: string;
  location?: string;
};

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

type PlatformSolution = {
  title: string;
  badge: string;
  description: string;
  details: string;
  bullets: string[];
  link: {
    href: string;
    label: string;
  };
};

type ServicePackage = {
  title: string;
  price: string;
  description: string;
  items: string[];
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type ContactChannel = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FAQItem = {
  question: string;
  answer: string;
};

const stats: StatCard[] = [
  {
    value: "50K+",
    label: "Users Served",
    description: "Individuals supported across digital platforms",
    icon: Users,
  },
  {
    value: "3",
    label: "Businesses Founded",
    description: "South African ventures launched and led",
    icon: Building2,
  },
  {
    value: "15+",
    label: "Years Experience",
    description: "Continuous technology and IT support expertise",
    icon: Sparkles,
  },
  {
    value: "24/7",
    label: "Support Available",
    description: "Professional assistance with rapid response times",
    icon: Headset,
  },
];

const portfolioItems: PortfolioItem[] = [
  {
    company: "SuperK53",
    role: "Founder & CEO",
    timeframe: "2020 — Present",
    description:
      "South Africa's official Department of Transport certified K53 learner's license assessment platform with real-time scoring and analytics.",
    highlights: [
      "Department of Transport Certified",
      "Digital Assessment Platform",
      "Real-time Analytics",
      "DLTC Directory",
    ],
    link: {
      href: "https://superk53.co.za",
      label: "superk53.co.za",
    },
    badge: "Official Platform",
    location: "Johannesburg, South Africa",
  },
  {
    company: "Taxfy",
    role: "Founder & CEO",
    timeframe: "2022 — Present",
    description:
      "South Africa's trusted SARS-compliant tax calculator delivering instant IRP5 analysis, medical aid optimization, and secure refund insights.",
    highlights: [
      "50,000+ Users",
      "SARS Compliant",
      "POPIA Compliant",
      "30-Second Processing",
    ],
    link: {
      href: "https://taxfy.co.za",
      label: "taxfy.co.za",
    },
    badge: "SARS Compliant",
    location: "Nationwide, Remote",
  },
  {
    company: "BurbGigz IT Services",
    role: "Owner & Founder",
    timeframe: "2010 — Present",
    description:
      "Professional remote-first IT support services providing diagnostics, optimization, networking, and hardware solutions across Johannesburg.",
    highlights: [
      "Remote-First Support",
      "CompTIA A+ Certified",
      "Network+ Certified",
      "30-Day Warranty",
    ],
    link: {
      href: "https://burbgigz.com",
      label: "burbgigz.com",
    },
    badge: "IT Support",
    location: "Johannesburg, South Africa",
  },
  {
    company: "GAAP Point-of-Sale",
    role: "Help Desk Technician",
    timeframe: "Jan 2016 — Present",
    description:
      "Providing remote IT support for point-of-sale systems, ensuring network reliability and uninterrupted retail operations across South Africa.",
    highlights: [
      "Computer Networking",
      "POS Systems",
      "Remote Support",
      "Enterprise Helpdesk",
    ],
    location: "Midrand (Remote)",
  },
];

const skillCategories: SkillCategory[] = [
  {
    title: "Digital Platform Development",
    icon: Monitor,
    items: [
      "Web Application Development",
      "User Experience Design",
      "Database Architecture",
      "API Integration",
    ],
  },
  {
    title: "Business Development",
    icon: Users,
    items: [
      "Startup Founding",
      "Product Strategy",
      "Market Analysis",
      "Customer Acquisition",
    ],
  },
  {
    title: "Compliance & Security",
    icon: ShieldCheck,
    items: [
      "SARS Compliance",
      "POPIA Compliance",
      "Department of Transport Certification",
      "Data Security",
    ],
  },
  {
    title: "Remote IT Support",
    icon: Headset,
    items: [
      "Remote Diagnostics",
      "Software Installation",
      "System Updates",
      "Real-time Support",
    ],
  },
  {
    title: "Network & Hardware",
    icon: Network,
    items: [
      "Wi-Fi Configuration",
      "Network Troubleshooting",
      "SSD Installation",
      "RAM Upgrades",
    ],
  },
  {
    title: "Professional Certifications",
    icon: BadgeCheck,
    items: [
      "CompTIA A+",
      "CompTIA Network+",
      "Professional Helpdesk",
      "POS Systems Expert",
    ],
  },
];

const platformSolutions: PlatformSolution[] = [
  {
    title: "SuperK53",
    badge: "Official Platform",
    description:
      "South Africa's official K53 learner's license assessment platform.",
    details:
      "Department of Transport certified digital examinations with comprehensive preparation, real-time scoring, and verified DLTC directory access.",
    bullets: [
      "Official DoT Certification",
      "64-Question Official Assessments",
      "Performance Analytics",
      "DLTC Testing Centre Directory",
    ],
    link: {
      href: "https://superk53.co.za",
      label: "Visit SuperK53",
    },
  },
  {
    title: "Taxfy",
    badge: "50,000+ Users",
    description:
      "SARS-compliant tax calculator trusted by South Africans nationwide.",
    details:
      "Instant IRP5 analysis and refund calculations with bank-level security, delivering optimised results in under 30 seconds.",
    bullets: [
      "SARS & POPIA Compliant",
      "30-Second Processing",
      "Medical Aid Credit Optimisation",
      "Local Data Processing",
    ],
    link: {
      href: "https://taxfy.co.za",
      label: "Visit Taxfy",
    },
  },
];

const servicePackages: ServicePackage[] = [
  {
    title: "Remote IT Support",
    price: "From R150",
    description:
      "Professional remote diagnostics and resolution for urgent issues.",
    items: ["Remote Diagnostics", "Software Installation", "System Updates"],
  },
  {
    title: "Virus & Malware Removal",
    price: "From R200",
    description:
      "Deep system scans and malware removal with secure antivirus setup.",
    items: ["Deep System Scan", "Malware Removal", "Antivirus Setup"],
  },
  {
    title: "Network & Connectivity",
    price: "From R150",
    description:
      "Reliable connectivity for homes and SMEs with expert configuration.",
    items: ["Wi-Fi Configuration", "Network Troubleshooting", "Printer Setup"],
  },
  {
    title: "Windows Reload & Setup",
    price: "From R120",
    description:
      "Clean OS installs, driver setup, and seamless data migration.",
    items: ["Full OS Installation", "Driver Setup", "Data Migration"],
  },
  {
    title: "On-Site Hardware Service",
    price: "R400 callout",
    description:
      "Hardware upgrades and replacements with 30-day workmanship warranty.",
    items: ["SSD Installation", "RAM Upgrades", "Component Replacement"],
  },
  {
    title: "Professional Certifications",
    price: "Credentialed",
    description:
      "Certified expertise recognised across enterprise IT environments.",
    items: [
      "CompTIA A+",
      "CompTIA Network+",
      "Professional Helpdesk",
      "POS Systems Expert",
    ],
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "SuperK53 helped me pass my learner's test on the first try. The practice questions mirrored the real exam perfectly!",
    name: "T. Mthembu",
    role: "SuperK53 Learner",
  },
  {
    quote:
      "Taxfy identified an extra R3,200 refund I had missed. The medical aid calculations were incredibly precise and fast.",
    name: "P. van der Merwe",
    role: "Taxfy User",
  },
  {
    quote:
      "BurbGigz resolved my network outage in under 20 minutes. Professional service with honest pricing and follow-up support.",
    name: "S. Naidoo",
    role: "BurbGigz Client",
  },
];

const contactChannels: ContactChannel[] = [
  {
    title: "IT Support & Consulting",
    description:
      "Remote sessions start immediately with enterprise-grade diagnostics.",
    icon: Headset,
  },
  {
    title: "Digital Platform Development",
    description:
      "Design, build, and launch platforms tailored to South African users.",
    icon: Layers,
  },
  {
    title: "Business Partnerships",
    description:
      "Collaborate on growth strategies and scalable technology solutions.",
    icon: LineChart,
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What IT support services do you offer?",
    answer:
      "BurbGigz IT Services provides comprehensive remote and on-site IT support including virus removal, network setup, hardware upgrades (SSD/RAM), Windows installation, and professional diagnostics. All services come with competitive pricing and a 30-day workmanship warranty.",
  },
  {
    question: "How does SuperK53 help with learner's license preparation?",
    answer:
      "SuperK53 is South Africa's official Department of Transport certified K53 assessment platform. It offers 64-question practice tests that mirror real exams, real-time scoring, performance analytics, and access to a verified DLTC testing centre directory.",
  },
  {
    question: "Is Taxfy SARS compliant and secure?",
    answer:
      "Yes, Taxfy is fully SARS and POPIA compliant. We process all calculations locally in South Africa with bank-level security. Over 50,000 South Africans trust Taxfy for instant IRP5 analysis and refund calculations, delivered in under 30 seconds.",
  },
  {
    question: "What are your IT support rates?",
    answer:
      "Remote IT support starts from R150, virus/malware removal from R200, network setup from R150, Windows reload from R120, and on-site hardware service has a R400 callout fee. All prices include professional diagnostics and expert consultation.",
  },
  {
    question: "Do you offer remote IT support?",
    answer:
      "Yes! BurbGigz specializes in remote-first IT support. I can diagnose and resolve most issues remotely, saving you time and money. Remote sessions start immediately with real-time support and professional-grade diagnostics tools.",
  },
  {
    question: "What certifications do you hold?",
    answer:
      "I hold CompTIA A+ and CompTIA Network+ certifications, along with professional helpdesk credentials and POS systems expertise. With 15+ years of hands-on experience, I bring enterprise-level expertise to every project.",
  },
];

function SectionWrapper({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

function SectionHeading({
  title,
  description,
  eyebrow,
  align = "center",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

function HighlightBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
      {children}
    </span>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl sm:p-8" tabIndex={0}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {item.badge ? <HighlightBadge>{item.badge}</HighlightBadge> : null}
          <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
            {item.company}
          </h3>
          <p className="mt-2 text-base font-medium text-muted-foreground">
            {item.role}
          </p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <CalendarDays className="h-4 w-4" aria-hidden />
            <span>{item.timeframe}</span>
          </div>
          {item.location ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {item.location}
            </p>
          ) : null}
        </div>
      </div>
      <p className="mt-6 text-base text-muted-foreground">{item.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {item.highlights.map((highlight) => (
          <span
            key={highlight}
            className="inline-flex items-center rounded-full border border-border/80 bg-background px-3 py-1 text-sm text-muted-foreground transition-colors group-hover:border-primary/40"
          >
            {highlight}
          </span>
        ))}
      </div>
      {item.link ? (
        <a
          href={item.link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${item.company} in a new tab`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          {item.link.label}
        </a>
      ) : null}
    </article>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = category.icon;
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg sm:p-6" tabIndex={0}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground">
          {category.title}
        </h3>
      </div>
      <ul className="grid gap-3 text-sm text-muted-foreground">
        {category.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 rounded-lg bg-background/80 px-3 py-2 shadow-sm"
          >
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlatformCard({ platform }: { platform: PlatformSolution }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card/80 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8" tabIndex={0}>
      <div className="flex flex-wrap items-center gap-3">
        <HighlightBadge>{platform.badge}</HighlightBadge>
        <h3 className="font-display text-2xl font-semibold text-foreground">
          {platform.title}
        </h3>
      </div>
      <p className="mt-4 text-base font-medium text-muted-foreground">
        {platform.description}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {platform.details}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {platform.bullets.map((bullet) => (
          <span
            key={bullet}
            className="inline-flex items-center rounded-full bg-background px-3 py-1 text-sm text-muted-foreground"
          >
            {bullet}
          </span>
        ))}
      </div>
      <a
        href={platform.link.href}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${platform.title} in a new tab`}
        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
      >
        <ExternalLink className="h-4 w-4" aria-hidden />
        {platform.link.label}
      </a>
    </div>
  );
}

function ServiceCard({ service }: { service: ServicePackage }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-lg sm:p-6" tabIndex={0}>
      <div>
        <h3 className="font-display text-xl font-semibold text-foreground">
          {service.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">{service.price}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {service.description}
        </p>
      </div>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card/70 p-8 shadow-sm">
      <p className="text-base leading-relaxed text-muted-foreground">
        “{testimonial.quote}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Users className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </blockquote>
  );
}

function ContactChannelCard({ channel }: { channel: ContactChannel }) {
  const Icon = channel.icon;
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/70 p-6 text-left shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">
        {channel.title}
      </h3>
      <p className="text-sm text-muted-foreground">{channel.description}</p>
    </div>
  );
}

export default function Index() {
  const [contactStatus, setContactStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setContactStatus("success");
        event.currentTarget.reset();
        setTimeout(() => setContactStatus("idle"), 5000);
      } else {
        setContactStatus("error");
        setErrorMessage(result.error || "Failed to send message");
      }
    } catch (error) {
      setContactStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection
        status={contactStatus}
        errorMessage={errorMessage}
        onSubmit={handleContactSubmit}
      />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src="https://macaly-fuagtp0bk4zo8xer5umsdn5d.macaly-app.com/network-bg.jpg"
          alt="Network topology background"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
      </div>
      <div className="relative mx-auto flex min-h-[640px] w-full max-w-6xl flex-col items-center px-6 pb-24 pt-36 text-center">
        <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-primary/20 bg-background shadow-[0_25px_60px_rgba(15,23,42,0.18)]">
          <img
            src="/clive-profile.jpg"
            alt="Clive Just_Clive Makazhu"
            className="h-full w-full object-cover"
          />
          <span className="absolute -bottom-4 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
            <Monitor className="h-7 w-7" aria-hidden />
          </span>
        </div>
        <div className="mt-10 max-w-4xl space-y-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Clive "Just_Clive" Makazhu
          </h1>
          <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
            Entrepreneur &amp; Technology Leader
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Founder &amp; CEO of BurbGigz IT Services, SuperK53, and Taxfy —
            building innovative digital solutions for South African businesses
            and consumers.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            title="Jump to the contact section"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-primary/90 active:translate-y-0 sm:px-10"
          >
            Get In Touch
          </a>
          <a
            href="#experience"
            title="View Clive's professional experience"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-input bg-background/70 px-8 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg active:translate-y-0 sm:px-10"
          >
            View Experience
          </a>
        </div>
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Twitter className="h-5 w-5 text-primary" aria-hidden />
          <a
            href="https://x.com/just_clive_sa"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Clive Makazhu on X"
            className="font-medium text-muted-foreground transition-colors hover:text-primary"
            aria-label="Follow @just_clive_sa on X"
          >
            @just_clive_sa
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      className="bg-gradient-to-b from-background to-background/60"
    >
      <SectionHeading
        eyebrow="About"
        title="Building impactful technology for South Africa"
        description="Technology entrepreneur creating digital products and services that empower South African citizens and businesses alike."
      />
      <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          I am a technology entrepreneur and the founder of three successful
          South African digital businesses. My journey began with BurbGigz IT
          Services in 2010, providing professional IT support across
          Johannesburg, and has expanded to include innovative platforms serving
          thousands of South Africans.
        </p>
        <p>
          As Founder &amp; CEO of SuperK53, I've created South Africa's official
          learner's license assessment platform, helping citizens prepare for
          their driving tests with Department of Transport certified content.
          Through Taxfy, I've built a trusted SARS-compliant tax calculator that
          has assisted over 50,000 South Africans in maximising their tax
          refunds.
        </p>
        <p>
          My expertise spans from hands-on IT support and professional
          certifications to building scalable digital platforms that solve real
          problems for South African consumers and businesses. I combine
          technical knowledge with entrepreneurial vision to create solutions
          that make a meaningful impact.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-base font-medium text-muted-foreground">
          <MapPin className="h-5 w-5 text-primary" aria-hidden />
          <span>
            Lombardy East, Johannesburg • Building digital solutions for South
            Africa
          </span>
        </div>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="bg-background">
      <SectionHeading
        eyebrow="Experience"
        title="Business Portfolio"
        description="Leading digital ventures and enterprise IT support that empower South African citizens and organisations."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {portfolioItems.map((item) => (
          <PortfolioCard key={`${item.company}-${item.role}`} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function SkillsSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-background/60 to-background">
      <SectionHeading
        eyebrow="Capabilities"
        title="Technical Expertise & Business Skills"
        description="End-to-end capabilities across product development, compliance, IT support, and business growth."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <SkillCard key={category.title} category={category} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ServicesSection() {
  return (
    <SectionWrapper className="bg-background">
      <SectionHeading
        eyebrow="Solutions"
        title="Digital Solutions & Services"
        description="From enterprise-ready digital platforms to reliable IT support for homes and businesses across South Africa."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {platformSolutions.map((platform) => (
          <PlatformCard key={platform.title} platform={platform} />
        ))}
      </div>
      <div className="mt-16 space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl bg-primary/5 p-8 text-center text-primary">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">
            BurbGigz IT Services
          </p>
          <h3 className="font-display text-3xl font-semibold text-foreground">
            Professional remote-first IT support with on-site services when
            needed
          </h3>
          <p className="text-base text-muted-foreground">
            Remote sessions start immediately • Professional helpdesk experience
            • 30-day warranty on all repairs
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicePackages.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
        <div className="flex justify-center">
          <a
            href="https://burbgigz.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit BurbGigz IT Services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Visit BurbGigz
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

function TestimonialsSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-background/60 to-background">
      <SectionHeading
        eyebrow="Testimonials"
        title="What Clients Say"
        description="Real feedback from South Africans who trust SuperK53, Taxfy, and BurbGigz."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={`${testimonial.name}-${testimonial.role}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper className="bg-gradient-to-b from-background to-background/60">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Quick answers to common questions about my services and platforms."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm transition-all hover:border-primary/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-5 text-left transition-all hover:bg-accent/10 focus-visible:bg-accent/10 sm:p-6"
              aria-expanded={openIndex === index}
            >
              <h3 className="pr-8 font-display text-lg font-semibold text-foreground">
                {item.question}
              </h3>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                  openIndex === index && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function ContactSection({
  status,
  errorMessage,
  onSubmit,
}: {
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <SectionWrapper id="contact" className="bg-background">
      <SectionHeading
        eyebrow="Contact"
        title="Get In Touch"
        description="Whether you need IT support, want to discuss digital platform development, or have questions about my businesses, I'm here to help."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="grid gap-6">
          {contactChannels.map((channel) => (
            <ContactChannelCard key={channel.title} channel={channel} />
          ))}
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-gradient-to-br from-green-500/10 to-green-600/5 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-600">
              <MessageCircle className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              WhatsApp Support
            </h3>
            <p className="text-sm text-muted-foreground">
              Instant messaging for urgent IT support and quick consultations
            </p>
            <span className="text-sm font-medium text-green-600">
              +27 67 049 4876
            </span>
            <a
              href="https://wa.me/27670494876?text=Hi%20Clive,%20I%20need%20help%20with"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-8 shadow-lg">
          <h3 className="font-display text-2xl font-semibold text-foreground">
            Share your project or support request
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Have a question about IT support or digital platforms? I'd love to
            help you find the right solution.
          </p>
          <form className="mt-6 space-y-5" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
                className="h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-foreground"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="What can I help you with?"
                className="h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me more about your IT support needs or platform goals..."
                className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-primary/90 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
          {status === "success" && (
            <div
              className="mt-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-600"
              role="status"
              aria-live="polite"
            >
              ✓ Thank you for reaching out! I'll respond shortly.
            </div>
          )}
          {status === "error" && (
            <div
              className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600"
              role="alert"
              aria-live="assertive"
            >
              ✗ {errorMessage || "Failed to send message. Please try again."}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
