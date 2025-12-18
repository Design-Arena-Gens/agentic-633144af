"use client";

import { useCallback, useEffect, useState } from "react";

type Slide = {
  title: string;
  subtitle?: string;
  lead?: string;
  bullets?: string[];
  visual?: string;
  tags?: string[];
  stats?: { label: string; value: string }[];
  timeline?: { phase: string; detail: string }[];
  columns?: { heading: string; points: string[] }[];
  footerNote?: string;
  background: {
    color?: string;
    gradient?: string;
    image?: string;
    position?: string;
    overlay?: string;
    saturation?: number;
  };
};

const slides: Slide[] = [
  {
    title: "Smart Cafe Management System",
    subtitle: "B.Tech Mini Project",
    lead: "Digitizing end-to-end café operations with a lightweight web-based platform.",
    bullets: [
      "Presenter: Anika Verma · Roll No: 21CS045",
      "Department of Computer Science & Engineering",
      "Sunrise Institute of Technology",
      "College logo: SIT crest aligned with institutional branding",
    ],
    visual: "College logo placement – circular crest with SIT initials",
    background: {
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
      overlay: "bg-neutral-900/75",
      position: "center",
    },
  },
  {
    title: "Motivation & Background",
    lead:
      "Small cafés in India want to modernize operations but are priced out of existing tools.",
    bullets: [
      "Selected to support neighborhood cafés embracing digital transformation.",
      "Majority rely on manual billing and spreadsheet tracking.",
      "Need for affordable, vernacular-friendly, low-maintenance solutions.",
      "Inspired by the growth of café culture and smartphone adoption.",
    ],
    visual: "Infographic of Indian café industry growth (2018-2024)",
    background: {
      gradient:
        "linear-gradient(135deg, rgba(218, 165, 32, 0.35), rgba(15, 23, 42, 0.85))",
      image:
        "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=1600&q=80",
      overlay: "bg-slate-950/70",
    },
  },
  {
    title: "Literature Review / Existing Systems",
    bullets: [
      "POS heavyweights (Toast, Square) optimized for Western markets.",
      "Indian SaaS products like Petpooja & Posify target chain restaurants.",
      "Standalone billing apps focus on invoicing; limited kitchen integration.",
      "Identified gaps: high licensing cost, complex onboarding, no regional UX.",
    ],
    visual: "Comparison radar chart: Cost vs Local Support vs Simplicity",
    background: {
      gradient: "linear-gradient(135deg, rgba(15,118,110,0.7), rgba(17,24,39,0.95))",
      image:
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80",
      overlay: "bg-slate-900/75",
    },
  },
  {
    title: "Problem Statement",
    bullets: [
      "Manual billing errors erode profit margins and customer trust.",
      "No unified view of daily sales, best-selling items, or wastage.",
      "Kitchen staff rely on verbal cues – missed or delayed orders.",
      "Inventory and customer loyalty data scattered across notebooks.",
    ],
    visual: "Illustration of a busy counter with paper receipts piling up",
    background: {
      gradient: "linear-gradient(135deg, rgba(76,29,149,0.7), rgba(24,24,27,0.9))",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      overlay: "bg-neutral-950/70",
    },
  },
  {
    title: "Objectives",
    bullets: [
      "Automate order capture, billing, and digital receipts.",
      "Provide real-time kitchen display system for seamless communication.",
      "Track stock levels with reorder alerts for raw materials.",
      "Enable customer profiling and loyalty rewards.",
      "Generate actionable dashboards for owners on any device.",
    ],
    visual: "Icon set: POS terminal, kitchen screen, inventory shelf, loyalty card",
    background: {
      gradient: "linear-gradient(135deg, rgba(239,68,68,0.65), rgba(17,24,39,0.92))",
      image:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80",
      overlay: "bg-slate-950/78",
    },
  },
  {
    title: "Project Scope",
    lead:
      "Designed for independent cafés with up to 5 billing counters and 2 kitchens.",
    bullets: [
      "Supports dine-in, takeaway, pre-order, and delivery partner integrations.",
      "Cloud-first architecture with offline queue for network downtime.",
      "Modular deployments: POS, KDS, inventory, analytics, and CRM.",
      "Localization ready for English, Hindi, and regional menu labels.",
    ],
    visual: "High-level scope diagram showing cafe front, kitchen, back office",
    background: {
      gradient: "linear-gradient(135deg, rgba(14,116,144,0.65), rgba(30,58,138,0.85))",
      overlay: "bg-slate-900/65",
    },
  },
  {
    title: "Stakeholders & Personas",
    bullets: [
      "Owner-Manager Priya: wants bird’s-eye view of daily performance.",
      "Cashier Rohan: needs quick order entry and stress-free billing.",
      "Barista Meera: requires clear, prioritized preparation queue.",
      "Supplier Arjun: expects digital purchase orders and payment updates.",
    ],
    visual: "Persona cards with photo placeholders and key motivations",
    background: {
      gradient: "linear-gradient(135deg, rgba(217,119,6,0.6), rgba(55,7,109,0.85))",
      overlay: "bg-slate-950/70",
    },
  },
  {
    title: "System Overview",
    lead:
      "Unified web application with responsive dashboards and device-specific interfaces.",
    bullets: [
      "Progressive web app accessible on tablets, desktops, and large displays.",
      "Role-based login: admin, cashier, kitchen, inventory manager.",
      "Real-time sync via WebSockets and background workers.",
      "Analytics layer built atop event-driven data pipeline.",
    ],
    visual: "Block diagram: UI layer → API Gateway → Services → Data Lake",
    background: {
      gradient: "linear-gradient(135deg, rgba(34,197,94,0.55), rgba(21,94,117,0.88))",
      overlay: "bg-slate-950/70",
    },
  },
  {
    title: "Core Functional Modules",
    columns: [
      {
        heading: "Front of House",
        points: [
          "Touch-friendly POS with customizable menu tiles.",
          "Split bills, table transfer, discounts, GST compliance.",
          "WhatsApp-based e-receipts with feedback links.",
        ],
      },
      {
        heading: "Back of House",
        points: [
          "Kitchen Display System with course tracking and timers.",
          "Inventory ledger auto-deducts ingredients per recipe.",
          "Vendor management & purchase order approvals.",
        ],
      },
    ],
    visual: "Module map linking POS ↔ Kitchen ↔ Inventory ↔ Analytics",
    background: {
      gradient: "linear-gradient(135deg, rgba(96,165,250,0.5), rgba(55,48,163,0.85))",
      overlay: "bg-slate-950/65",
    },
  },
  {
    title: "Technology Stack",
    tags: [
      "Frontend: Next.js 14, React 18, Tailwind CSS",
      "Backend: Node.js, Express, REST + WebSocket APIs",
      "Database: PostgreSQL, Redis cache",
      "DevOps: Docker, GitHub Actions, Vercel hosting",
    ],
    bullets: [
      "Leverages microservice-ready architecture with API gateway.",
      "Modular codebase for faster feature releases and testing.",
      "Responsive UI optimized for 10\" Android POS tablets.",
    ],
    visual: "Layered stack diagram from user interface to infrastructure",
    background: {
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.6), rgba(22,163,74,0.7))",
      overlay: "bg-slate-950/65",
    },
  },
  {
    title: "System Architecture",
    columns: [
      {
        heading: "Presentation Layer",
        points: [
          "Next.js web app served via Vercel CDN edge network.",
          "Offline-enabled POS built with Service Workers.",
        ],
      },
      {
        heading: "Application Layer",
        points: [
          "Order service, inventory service, CRM service (Node.js).",
          "Event bus (RabbitMQ) for kitchen queue and analytics feed.",
        ],
      },
      {
        heading: "Data Layer",
        points: [
          "PostgreSQL for structured data and recipes.",
          "Redis for session caching and real-time counters.",
        ],
      },
    ],
    visual: "3-tier architecture illustration with arrows",
    background: {
      gradient: "linear-gradient(135deg, rgba(125,211,252,0.5), rgba(203,213,225,0.8))",
      overlay: "bg-slate-900/60",
    },
  },
  {
    title: "Data Flow Diagram",
    lead:
      "Events propagate seamlessly from customer order intake to analytics dashboards.",
    bullets: [
      "POS captures order → publishes `order.created` event.",
      "Kitchen service subscribes & updates preparation status.",
      "Inventory service deducts stock based on recipe map.",
      "Analytics service aggregates KPIs for owner dashboard.",
    ],
    visual: "Linear flow with event bus at center",
    background: {
      gradient: "linear-gradient(135deg, rgba(79,70,229,0.45), rgba(14,165,233,0.7))",
      overlay: "bg-slate-950/68",
    },
  },
  {
    title: "Database Design",
    bullets: [
      "Entities: Users, Roles, MenuItems, Recipes, Orders, OrderItems, InventoryLots, Suppliers, Customers, Payments, Feedback.",
      "Many-to-many mapping for recipes to ingredients and modifier groups.",
      "Soft deletes with audit columns for compliance.",
      "Partitioned order table by month for faster reporting.",
    ],
    visual: "ER diagram showing relationships between key tables",
    background: {
      gradient: "linear-gradient(135deg, rgba(248,113,113,0.55), rgba(249,115,22,0.7))",
      overlay: "bg-slate-950/70",
    },
  },
  {
    title: "UI Experience Highlights",
    bullets: [
      "POS home screen uses color-coded categories & quick add combos.",
      "Kitchen view sorts by promised time with audible alerts.",
      "Owner dashboard features KPI cards and real-time trends.",
      "Mobile-friendly CRM view for loyalty enrollments.",
    ],
    visual: "Mockup collage of POS tablet, kitchen screen, analytics dashboard",
    background: {
      gradient: "linear-gradient(135deg, rgba(236,72,153,0.55), rgba(192,132,252,0.7))",
      overlay: "bg-slate-950/68",
    },
  },
  {
    title: "Order Processing Workflow",
    timeline: [
      { phase: "1. Order Intake", detail: "Cashier selects items, customizations, and payment mode." },
      { phase: "2. Kitchen Queue", detail: "Order ticket appears on KDS with prep timer." },
      { phase: "3. Preparation", detail: "Barista updates progress; notifications sent to POS." },
      { phase: "4. Pickup/Delivery", detail: "Order marked complete; receipt auto-sent via SMS/WhatsApp." },
    ],
    visual: "Swimlane diagram for cashier, kitchen, customer",
    background: {
      gradient: "linear-gradient(135deg, rgba(14,116,144,0.55), rgba(234,88,12,0.7))",
      overlay: "bg-slate-950/70",
    },
  },
  {
    title: "Inventory & Procurement",
    bullets: [
      "Recipe-level BOM ensures accurate ingredient consumption.",
      "Low-stock alerts triggered by configurable thresholds.",
      "Digital purchase orders emailed to suppliers with approval trail.",
      "Waste tracking module records spoilage and returns.",
    ],
    visual: "Bar chart showing stock vs reorder level for coffee beans, milk, syrups",
    background: {
      gradient: "linear-gradient(135deg, rgba(22,101,52,0.55), rgba(139,92,246,0.6))",
      overlay: "bg-slate-950/65",
    },
  },
  {
    title: "Billing & Payments",
    bullets: [
      "Supports UPI, cash, cards, and wallet settlements with split payments.",
      "Automatic GST calculation, HSN codes, and compliant invoice formats.",
      "Tip handling with nightly reconciliation reports.",
      "Offline mode queues payments and syncs once online.",
    ],
    visual: "Minimalist receipt mockup with QR code for UPI",
    background: {
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.55), rgba(2,132,199,0.6))",
      overlay: "bg-slate-950/60",
    },
  },
  {
    title: "Customer Engagement",
    bullets: [
      "Loyalty program with points and personalized offers.",
      "Feedback capture via QR on receipts; sentiment analytics.",
      "Birthday and festival campaigns through WhatsApp templates.",
      "Customer heatmaps for peak-hour staffing decisions.",
    ],
    visual: "Circular chart of loyalty tiers: Bronze, Silver, Gold",
    background: {
      gradient: "linear-gradient(135deg, rgba(244,114,182,0.55), rgba(168,85,247,0.65))",
      overlay: "bg-slate-950/68",
    },
  },
  {
    title: "Reporting & Analytics",
    stats: [
      { label: "Avg. Daily Orders", value: "+25%" },
      { label: "Inventory Variance", value: "-18%" },
      { label: "Customer Retention", value: "+32%" },
    ],
    bullets: [
      "Interactive dashboards highlighting daily, weekly, and monthly KPIs.",
      "Scheduled email reports with PDF attachments for owners.",
      "Drill-down analysis for product mix and barista performance.",
      "Exports to Excel/Google Sheets for auditors.",
    ],
    visual: "Dashboard widgets: KPI cards, trend line, donut chart",
    background: {
      gradient: "linear-gradient(135deg, rgba(14,165,233,0.55), rgba(34,197,94,0.6))",
      overlay: "bg-slate-950/65",
    },
  },
  {
    title: "Security & Compliance",
    bullets: [
      "OAuth 2.0 with role-based access control and MFA for admins.",
      "Encryption at rest for sensitive customer and payment data.",
      "Audit logs for order edits, refunds, and inventory adjustments.",
      "Compliance with Indian GST and data retention regulations.",
    ],
    visual: "Shield icon with layered security rings",
    background: {
      gradient: "linear-gradient(135deg, rgba(15,118,110,0.6), rgba(30,64,175,0.7))",
      overlay: "bg-slate-950/65",
    },
  },
  {
    title: "Implementation Roadmap",
    timeline: [
      { phase: "Phase 1 · Weeks 1-3", detail: "Requirement analysis, persona mapping, low-fidelity UI." },
      { phase: "Phase 2 · Weeks 4-7", detail: "Core POS, order service, PostgreSQL schema." },
      { phase: "Phase 3 · Weeks 8-11", detail: "Inventory module, kitchen displays, integrations." },
      { phase: "Phase 4 · Weeks 12-14", detail: "Testing, analytics dashboards, deployment." },
    ],
    visual: "Milestone timeline with café icons",
    background: {
      gradient: "linear-gradient(135deg, rgba(249,115,22,0.55), rgba(234,179,8,0.65))",
      overlay: "bg-slate-950/60",
    },
  },
  {
    title: "Testing Strategy",
    bullets: [
      "Unit and integration tests with Jest & Supertest for services.",
      "Cypress end-to-end flows for POS and KDS scenarios.",
      "Load testing using K6 simulating peak weekend traffic.",
      "UAT with café staff to validate usability and language support.",
    ],
    visual: "Test pyramid diagram covering unit → integration → E2E",
    background: {
      gradient: "linear-gradient(135deg, rgba(79,70,229,0.55), rgba(236,72,153,0.55))",
      overlay: "bg-slate-950/68",
    },
  },
  {
    title: "Deployment & Maintenance",
    bullets: [
      "Continuous deployment to Vercel for frontend; backend on managed Kubernetes.",
      "Blue-green deployment strategy to avoid downtime.",
      "Automated backups of PostgreSQL and Redis snapshots.",
      "24/7 monitoring dashboards with alerting via Slack/Email.",
    ],
    visual: "DevOps infinity loop showing deploy, monitor, improve",
    background: {
      gradient: "linear-gradient(135deg, rgba(56,189,248,0.55), rgba(96,165,250,0.65))",
      overlay: "bg-slate-950/62",
    },
  },
  {
    title: "Cost-Benefit & Sustainability",
    bullets: [
      "Initial setup ~₹45,000 covering tablets, thermal printers, and staff onboarding.",
      "Monthly SaaS subscription ₹1,999 with optional delivery & CRM add-ons.",
      "Break-even in 8 months through faster billing, reduced wastage, and loyalty uplift.",
      "Sustainable operations: paperless receipts, energy-efficient devices, solar-ready routers.",
    ],
    visual: "ROI bar graph with sustainability highlights",
    background: {
      gradient: "linear-gradient(135deg, rgba(101,163,13,0.5), rgba(14,165,233,0.65))",
      overlay: "bg-slate-950/65",
    },
  },
  {
    title: "Conclusion & Q&A",
    lead:
      "Smart Cafe Management System delivers a holistic, affordable, and scalable digital backbone for neighborhood cafés.",
    bullets: [
      "Key mitigations: offline-first billing, vernacular onboarding, encryption with RBAC, hardware redundancy.",
      "Future roadmap: AI demand forecasting, voice-assisted POS, IoT machine calibration, self-service kiosks.",
      "Next steps: Pilot deployment at Sunrise Café, capture KPIs, iterate with staff feedback.",
      "Thank you! Happy to take questions.",
    ],
    visual: "Team celebrating successful café service",
    background: {
      image:
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1600&q=80",
      overlay: "bg-neutral-950/70",
      position: "center",
    },
  },
];

const totalSlides = slides.length;

function IconChevronLeft() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0) {
        setIndex(totalSlides - 1);
      } else if (nextIndex >= totalSlides) {
        setIndex(0);
      } else {
        setIndex(nextIndex);
      }
    },
    []
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo, index]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0">
        {slide.background.color && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: slide.background.color }}
          />
        )}
        {slide.background.gradient && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: slide.background.gradient,
            }}
          />
        )}
        {slide.background.image && (
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `url(${slide.background.image})`,
              backgroundPosition: slide.background.position ?? "center",
              backgroundSize: "cover",
            }}
          />
        )}
        <div className={`absolute inset-0 ${slide.background.overlay ?? "bg-slate-950/75"}`} />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-8 pt-6 sm:px-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/15 px-4 py-1 text-sm font-semibold text-white">
              Slide {index + 1} / {totalSlides}
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              Smart Cafe Management System
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span className="hidden sm:inline">Use ← → keys or tap buttons</span>
            <nav className="flex items-center gap-2">
              <button
                aria-label="Previous slide"
                className="rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/25"
                onClick={() => goTo(index - 1)}
              >
                <IconChevronLeft />
              </button>
              <button
                aria-label="Next slide"
                className="rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/25"
                onClick={() => goTo(index + 1)}
              >
                <IconChevronRight />
              </button>
            </nav>
          </div>
        </header>

        <section className="mt-6 flex-1 overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-md">
          <div className="flex h-full flex-col gap-6 p-8 sm:p-10 lg:flex-row">
            <div className="flex flex-1 flex-col gap-4 lg:pr-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200/80">
                  {slide.subtitle ?? "Smart Café Initiative"}
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                {slide.lead && (
                  <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
                    {slide.lead}
                  </p>
                )}
              </div>

              {slide.tags && (
                <div className="flex flex-wrap gap-2">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {slide.bullets && (
                <ul className="mt-2 flex flex-col gap-3 text-sm text-white/80 sm:text-base">
                  {slide.bullets.map((item) => (
                    <li className="flex items-start gap-3" key={item}>
                      <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amber-300/80" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {slide.columns && (
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {slide.columns.map((column) => (
                    <div
                      key={column.heading}
                      className="rounded-2xl border border-white/15 bg-white/10 p-4"
                    >
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-200/80">
                        {column.heading}
                      </h2>
                      <ul className="mt-3 flex flex-col gap-2 text-sm text-white/80">
                        {column.points.map((point) => (
                          <li key={point} className="leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {slide.timeline && (
                <div className="mt-4 grid gap-3">
                  {slide.timeline.map((item) => (
                    <div
                      key={item.phase}
                      className="rounded-2xl border border-white/15 bg-white/10 p-3 text-sm leading-relaxed text-white/80"
                    >
                      <div className="font-semibold text-amber-200/90">{item.phase}</div>
                      <div className="mt-1 text-white/80">{item.detail}</div>
                    </div>
                  ))}
                </div>
              )}

              {slide.stats && (
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {slide.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center"
                    >
                      <div className="text-3xl font-bold text-amber-200">{stat.value}</div>
                      <div className="mt-2 text-xs uppercase tracking-widest text-white/70">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {slide.footerNote && (
                <p className="mt-auto text-xs uppercase tracking-[0.25em] text-white/60">
                  {slide.footerNote}
                </p>
              )}
            </div>

            <aside className="flex w-full max-w-sm flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm lg:max-w-xs">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200/80">
                  Visual Cue
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  {slide.visual ?? "Illustrative graphic supporting the slide."}
                </p>
              </div>
              <div>
                <div className="h-32 rounded-xl border border-dashed border-white/25 bg-black/10 backdrop-blur">
                  <div className="flex h-full items-center justify-center text-center text-xs text-white/40">
                    Placeholder for illustrative graphic / chart
                  </div>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">
                  Customize with actual assets for final deck export.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <footer className="mt-4 flex items-center justify-between text-xs text-white/70">
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-amber-300 transition-all duration-500"
                style={{ width: `${((index + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>
          <span className="ml-4">
            {index + 1} of {totalSlides} slides
          </span>
        </footer>
      </div>
    </main>
  );
}
