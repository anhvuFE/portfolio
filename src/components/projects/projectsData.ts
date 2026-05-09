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

// Replace the placeholders below with real numbers and detail before showing
// this section to recruiters. Anything you don't have yet, leave as a TODO so
// it stays visible.

export const projects: ProjectCaseStudy[] = [
  {
    id: "neli-shopify-app",
    title: "Shopify merchant app — neliSoftwares",
    role: "Software Engineer",
    company: "neliSoftwares",
    period: "Jul 2025 — Present",
    oneLiner: "Embedded Shopify app helping merchants manage [TODO: feature].",
    problem:
      "Merchants needed [TODO: describe the merchant pain — e.g. faster bulk product edits, theme integrations, custom workflows]. Existing solutions were either too generic or required engineering hours per store.",
    approach: [
      "Built the embedded admin UI with Polaris Web Components and App Bridge.",
      "Wired Prisma + Postgres for per-shop data; Redis for session and cache.",
      "Integrated Shopify GraphQL Admin API with retry + rate-limit handling.",
      "Added webhook handlers for shop install / uninstall / data update events."
    ],
    result: [
      "[TODO: ship metric — e.g. installs, MRR, conversion lift]",
      "[TODO: perf metric — e.g. p95 < 500ms]",
      "[TODO: any GitHub stars / merchant testimonials]"
    ],
    stack: ["TypeScript", "React", "Polaris", "Prisma", "Postgres", "Redis", "Shopify"],
    accent: "#0eaddf"
  },
  {
    id: "technixo-frontend",
    title: "Frontend rebuild — Technixo",
    role: "Frontend Developer",
    company: "Technixo",
    period: "Dec 2023 — Apr 2024",
    oneLiner: "Rewrote the marketing surface from legacy templates to a modern React + TypeScript stack.",
    problem:
      "Legacy templates were hard to update, slow on mobile, and inconsistent across pages.",
    approach: [
      "Migrated the page templates to React + TypeScript with shared layout components.",
      "Set up component library and design tokens to keep visual consistency.",
      "Optimized images and bundles to hit a healthy Lighthouse score on mobile."
    ],
    result: [
      "[TODO: lighthouse before / after]",
      "[TODO: dev velocity — pages/week, designer review turnaround]"
    ],
    stack: ["React", "TypeScript", "CSS Modules"],
    accent: "#a855f7"
  },
  {
    id: "true-connect",
    title: "Internal dashboard — True Connect",
    role: "Frontend Developer",
    company: "True Connect",
    period: "Jul 2022 — Feb 2023",
    oneLiner: "Built dashboards for the operations team to monitor and act on customer data.",
    problem:
      "Ops were piecing together insights from multiple systems with spreadsheets, which was slow and error-prone.",
    approach: [
      "Designed table-heavy screens with virtualization for large data sets.",
      "Wired the JS/TS frontend to internal APIs with optimistic updates for common actions.",
      "Iterated with the ops team weekly to remove the slowest manual steps."
    ],
    result: [
      "[TODO: time saved per shift]",
      "[TODO: error rate before / after]"
    ],
    stack: ["JavaScript", "TypeScript"],
    accent: "#22c55e"
  }
];
