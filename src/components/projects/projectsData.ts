export interface ProjectCaseStudy {
  id: string;
  title: string;
  role: string;
  company?: string;
  period: string;
  oneLiner: string;
  problem: string;
  approach: string[];
  result: string[];
  stack: string[];
  links?: { label: string; url: string }[];
  accent: string;
}

export const projects: ProjectCaseStudy[] = [
  {
    id: "neli-shopify-app",
    title: "Shopify app ecosystem — neliSoftwares",
    role: "Full Stack Developer",
    company: "neliSoftwares",
    period: "Sep 2025 — Present",
    oneLiner:
      "An ecosystem of Shopify apps in an npm-workspaces monorepo, each built on Remix and sharing a single PostgreSQL database via Prisma.",
    problem:
      "Merchants needed focused, production-grade tools across their store. The solution: a shared monorepo powering Label Maker, FAQ Page, Stock Alert, Pre-Order, and an Admin Dashboard, each reusing common infrastructure.",
    approach: [
      "Built admin UIs with Polaris Web Components + Shopify App Bridge using a route → handler → repository architecture with strict shop-scoped multi-tenancy.",
      "Developed storefront widgets via Theme App Extensions (Liquid) and secure App Proxy routes.",
      "Optimized React performance (memoization, code-splitting), managed state with Zustand, and kept bundles lean while meeting WCAG 2.1 AA accessibility.",
      "Worked with the Shopify GraphQL Admin API, webhooks, and metafields; deployed to Fly.io with GitHub Actions CI/CD."
    ],
    result: [
      "Shipped Label Maker, FAQ Page, Stock Alert, Pre-Order, and Admin Dashboard as production apps.",
      "Shared monorepo infrastructure keeps every app on one Prisma/PostgreSQL data layer with consistent multi-tenancy."
    ],
    stack: ["Shopify", "React", "Remix", "TypeScript", "Prisma", "PostgreSQL", "Polaris", "Zustand"],
    accent: "#0eaddf"
  },
  {
    id: "screenmindr",
    title: "ScreenMindr — family screen-time app",
    role: "React Native Developer (child app) & parent web",
    company: "neliSoftwares",
    period: "May 2026 — Aug 2026",
    oneLiner:
      "A family screen-time management app: a child device app (iOS/Android) and a parent web dashboard for assigning tasks and rewarding unlock time.",
    problem:
      "Parents wanted to control app usage on their kids' devices while motivating good habits — kids unlock screen time by completing tasks the parent assigns.",
    approach: [
      "Integrated iOS Screen Time (FamilyControls / ManagedSettings / DeviceActivity) to block apps by the parent's selection.",
      "Built real-time block/unlock sync across the child app, backend, and parent web via Firebase Cloud Messaging (foreground + background).",
      "Built app extensions (Notification Service, DeviceActivity Monitor) for background re-blocking, plus the device-pairing flow."
    ],
    result: [
      "Kids unlock screen time by completing tasks; parents manage everything from the web dashboard.",
      "Reliable background re-blocking and cross-device sync between child app, backend, and parent web."
    ],
    stack: ["React Native", "React", "TypeScript", "Firebase", "iOS", "Node.js"],
    accent: "#7c5cff"
  },
  {
    id: "ohana-handyman",
    title: "Ohana Handyman Group — booking platform",
    role: "Full Stack Developer",
    company: "neliSoftwares",
    period: "Oct 2025 — Feb 2026",
    oneLiner:
      "Full-stack web platform for an on-demand handyman services company, letting customers book, price, and schedule home repair services online.",
    problem:
      "The company needed a single platform where both signed-in customers and guests could book services with consistent, transparent pricing.",
    approach: [
      "Built a dual booking flow (authenticated dashboard + guest checkout) sharing a unified service-question engine, reducing code duplication and ensuring pricing consistency.",
      "Designed a duration-first dynamic pricing system with a canonical catalog of 238+ services, real-time cost/time estimation, and quarter-hour rounding logic.",
      "Developed reusable React components and custom hooks (booking review, service estimates) following a modular, maintainable architecture.",
      "Implemented an AI-powered chat assistant with robust error handling for customer support."
    ],
    result: [
      "Unified booking engine serves both authenticated and guest flows with consistent pricing.",
      "Canonical catalog of 238+ services with real-time cost and time estimation."
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    accent: "#22c55e"
  },
  {
    id: "ecocau",
    title: "EcoCau — sustainable recycling from areca sheaths",
    role: "Full Stack Developer",
    period: "Aug 2025 — Dec 2025",
    oneLiner:
      "An eco-friendly initiative that reclaims value from nature by upcycling areca palm sheaths into sustainable consumer products.",
    problem:
      "The project aims to reduce waste, limit plastic usage, and create environmentally responsible alternatives that are both practical and aesthetically pleasing.",
    approach: [
      "Collects naturally fallen areca sheaths from local farms.",
      "Cleans, treats, and processes them using chemical-free methods.",
      "Recycles and reshapes the material into everyday eco-friendly products (plates, trays, decor items, crafts).",
      "Promotes plastic-free consumption and zero-waste habits while supporting local farmers."
    ],
    result: [
      "Transforms naturally fallen areca sheaths into reusable and biodegradable products.",
      "Encourages a greener lifestyle and sustainable production communities."
    ],
    stack: ["Node.js", "TypeScript", "React"],
    links: [{ label: "EcoCau — Xanh từ Mo Cau, Bền vững cho Mai sau", url: "#" }],
    accent: "#16a34a"
  },
  {
    id: "kiosko",
    title: "Kiosko — online news & magazine platform",
    role: "Full Stack Developer",
    company: "neliSoftwares",
    period: "Jul 2025 — Sep 2025",
    oneLiner:
      "An online news and magazine platform, developed in collaboration with ReadON and ONMO Gaming.",
    problem:
      "Readers needed a smooth, intuitive way to access international news outlets across many sources and categories.",
    approach: [
      "Digitized the reading experience with a clean, responsive interface.",
      "Optimized the news distribution interface by source and category.",
      "Made it easy for users to browse international news outlets smoothly and intuitively."
    ],
    result: [
      "A unified reading surface aggregating international news by source and category."
    ],
    stack: ["React", "TypeScript", "Node.js"],
    accent: "#f59e0b"
  },
  {
    id: "lcms",
    title: "Laundry Chain Management System (LCMS)",
    role: "Full Stack Developer",
    company: "FPT University",
    period: "Dec 2024 — May 2025",
    oneLiner:
      "A web-based platform that streamlines the operations of multi-branch laundry businesses, centralizing orders, pricing, staff workflows, and customer data across all locations.",
    problem:
      "Multi-branch laundry owners lacked real-time visibility across stores, making order management, pricing, and staff workflows slow and inconsistent.",
    approach: [
      "Built the web application interface and admin dashboard.",
      "Developed secure RESTful APIs for order, store, and user management.",
      "Implemented workflow tracking and branch-level permission control.",
      "Optimized UI/UX for faster daily operations in stores."
    ],
    result: [
      "Multi-branch management with centralized configuration and role-based access for admins, staff, and branch managers.",
      "Order tracking through each stage (Received → Washing → Drying → Ironing → Delivered), plus a real-time revenue dashboard, customer history, and invoice management."
    ],
    stack: ["C#", ".NET", "React", "TypeScript", "SQL Server"],
    accent: "#3b82f6"
  }
];
