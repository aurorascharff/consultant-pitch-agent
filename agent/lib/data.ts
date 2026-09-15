export type Opportunity = {
  id: string;
  customer: string;
  industry: string;
  summary: string;
  needs: string[];
  constraints: string[];
  desiredOutcome: string;
};

export type ConsultantProject = {
  title: string;
  customer: string;
  summary: string;
  outcomes: string[];
};

export type Consultant = {
  id: string;
  name: string;
  role: string;
  location: string;
  availability: string;
  skills: string[];
  industries: string[];
  summary: string;
  projects: ConsultantProject[];
};

export type CaseStudy = {
  id: string;
  title: string;
  customer: string;
  industry: string;
  topics: string[];
  challenge: string;
  approach: string[];
  outcomes: string[];
};

export const opportunities: Opportunity[] = [
  {
    id: "northstar-energy",
    customer: "Northstar Energy",
    industry: "Energy",
    summary: "Modernize an aging customer portal without disrupting service.",
    needs: [
      "Move the portal to React and Next.js",
      "Migrate the existing application in stages",
      "Improve navigation performance and accessibility",
      "Transfer knowledge to the internal product team",
    ],
    constraints: [
      "The portal must remain available during the migration",
      "The internal team must be able to maintain the new application",
    ],
    desiredOutcome:
      "A faster, accessible portal that can be released incrementally and owned by the internal team.",
  },
  {
    id: "harborline-logistics",
    customer: "Harborline Logistics",
    industry: "Logistics",
    summary:
      "Replace fragmented operational reporting with a shared logistics data platform.",
    needs: [
      "Build a React operations dashboard",
      "Create Node.js APIs for partner integrations",
      "Consolidate operational data in a cloud platform",
      "Reduce the delay between events and reporting",
    ],
    constraints: [
      "Existing partner integrations must continue to work",
      "The first release must use the current data sources",
    ],
    desiredOutcome:
      "A real-time operations view backed by maintainable APIs and a scalable data platform.",
  },
  {
    id: "greenfield-health",
    customer: "Greenfield Health",
    industry: "Healthcare",
    summary:
      "Create accessible digital intake services with consistent interaction patterns.",
    needs: [
      "Build production interfaces in React",
      "Meet WCAG 2.2 AA requirements",
      "Establish a shared design system",
      "Use user research and content design to improve forms",
    ],
    constraints: [
      "Patients must be able to complete forms with assistive technology",
      "Several product teams must be able to contribute safely",
    ],
    desiredOutcome:
      "Accessible healthcare forms that more patients complete and product teams can maintain consistently.",
  },
  {
    id: "connectone-telecom",
    customer: "ConnectOne Telecom",
    industry: "Telecommunications",
    summary:
      "Define the technical direction and delivery model for a cloud modernization program.",
    needs: [
      "Provide engineering leadership across several teams",
      "Define the target platform architecture",
      "Plan a staged cloud migration",
      "Improve DevOps practices and technical governance",
    ],
    constraints: [
      "Customer-facing services must remain available",
      "Eight delivery teams need clear ownership boundaries",
    ],
    desiredOutcome:
      "A practical modernization roadmap with shared ownership, progressive delivery, and measurable reliability goals.",
  },
];

export const consultants: Consultant[] = [
  {
    id: "amelia-brooks",
    name: "Amelia Brooks",
    role: "Principal Frontend Consultant",
    location: "London",
    availability: "Available for a new engagement from October",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Incremental migration",
      "Web performance",
      "Accessibility",
      "Technical mentoring",
    ],
    industries: ["Energy", "Insurance", "Public sector"],
    summary:
      "Frontend lead who specializes in replacing business-critical web applications in stages while helping internal teams take ownership.",
    projects: [
      {
        title: "Self-service portal migration",
        customer: "Boreal Insurance",
        summary:
          "Led a route-by-route migration from a legacy React SPA to Next.js while the existing portal remained in production.",
        outcomes: [
          "Released the migration incrementally without a full rewrite",
          "Reduced median navigation time by 38%",
          "Introduced automated accessibility checks",
          "Pair-programmed with the customer team and documented the new architecture",
        ],
      },
      {
        title: "Accessible design system rollout",
        customer: "Northbridge Council",
        summary:
          "Created accessible React foundations and adoption guidance for six public services.",
        outcomes: [
          "Standardized navigation and form patterns",
          "Trained four product teams to maintain the shared components",
        ],
      },
    ],
  },
  {
    id: "ethan-reed",
    name: "Ethan Reed",
    role: "Senior Full-stack Consultant",
    location: "Manchester",
    availability: "Available at 50% from September",
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "APIs",
      "Cloud architecture",
      "Data platforms",
    ],
    industries: ["Energy", "Logistics"],
    summary:
      "Full-stack engineer focused on APIs, integrations, and cloud platforms for data-heavy products.",
    projects: [
      {
        title: "Energy insights platform",
        customer: "Northwind Analytics",
        summary:
          "Built a cloud data platform and React dashboard for operational energy data.",
        outcomes: [
          "Consolidated five data sources behind one API",
          "Cut reporting latency from one day to fifteen minutes",
        ],
      },
    ],
  },
  {
    id: "sophie-carter",
    name: "Sophie Carter",
    role: "Senior UX Engineer",
    location: "Bristol",
    availability: "Available from September",
    skills: [
      "React",
      "Accessibility",
      "Design systems",
      "User research",
      "Content design",
    ],
    industries: ["Public sector", "Healthcare", "Finance"],
    summary:
      "UX engineer who turns accessibility and design-system requirements into production React interfaces.",
    projects: [
      {
        title: "Accessible citizen services",
        customer: "Westbridge Digital",
        summary:
          "Redesigned and implemented high-traffic public forms with a shared React design system.",
        outcomes: [
          "Met WCAG 2.2 AA requirements",
          "Reduced form abandonment by 24%",
        ],
      },
    ],
  },
  {
    id: "james-morgan",
    name: "James Morgan",
    role: "Engineering Lead",
    location: "London",
    availability: "Available for advisory work from November",
    skills: [
      "Engineering leadership",
      "Platform architecture",
      "Cloud migration",
      "DevOps",
      "Technical strategy",
    ],
    industries: ["Energy", "Telecommunications"],
    summary:
      "Engineering lead for platform modernization, delivery models, and large multidisciplinary teams.",
    projects: [
      {
        title: "Platform modernization program",
        customer: "PolarNet",
        summary:
          "Defined the technical roadmap and delivery model for a multi-year cloud migration.",
        outcomes: [
          "Established shared platform ownership across eight teams",
          "Introduced progressive delivery and service-level objectives",
        ],
      },
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "boreal-portal-modernization",
    title: "Modernizing a customer portal without a rewrite",
    customer: "Boreal Insurance",
    industry: "Insurance",
    topics: [
      "React",
      "Next.js",
      "Incremental migration",
      "Web performance",
      "Accessibility",
      "Knowledge transfer",
    ],
    challenge:
      "Replace a business-critical legacy portal while keeping it available to customers throughout the program.",
    approach: [
      "Migrated one route and customer journey at a time",
      "Used a shared shell so old and new experiences could coexist",
      "Added performance budgets and automated accessibility checks",
      "Paired with the internal team and documented architectural decisions",
    ],
    outcomes: [
      "Completed the migration without a big-bang release",
      "Reduced median navigation time by 38%",
      "Enabled the internal team to own subsequent releases",
    ],
  },
  {
    id: "brightshore-self-service",
    title: "A faster self-service experience for an energy provider",
    customer: "Brightshore Energy",
    industry: "Energy",
    topics: [
      "React",
      "Web performance",
      "Accessibility",
      "Customer portal",
    ],
    challenge:
      "Improve a slow account experience used by customers during high-volume billing periods.",
    approach: [
      "Measured the highest-friction customer journeys",
      "Rebuilt the account overview with accessible React components",
      "Introduced real-user performance monitoring",
    ],
    outcomes: [
      "Improved the 75th-percentile Largest Contentful Paint by 31%",
      "Reduced support contacts for account navigation by 18%",
    ],
  },
  {
    id: "northbridge-design-system",
    title: "Scaling accessible services with a shared design system",
    customer: "Northbridge Council",
    industry: "Public sector",
    topics: ["React", "Accessibility", "Design systems", "Knowledge transfer"],
    challenge:
      "Give several product teams a consistent, accessible foundation without centralizing every implementation decision.",
    approach: [
      "Built reusable React components and contribution guidelines",
      "Added accessibility tests to continuous integration",
      "Ran workshops with product designers and engineers",
    ],
    outcomes: [
      "Adopted by six services",
      "Reduced repeated accessibility defects in shared patterns",
    ],
  },
  {
    id: "coastline-control-tower",
    title: "A real-time control tower for logistics operations",
    customer: "Coastline Freight",
    industry: "Logistics",
    topics: [
      "React",
      "Node.js",
      "APIs",
      "Cloud architecture",
      "Data platforms",
    ],
    challenge:
      "Give operations teams one current view of shipments spread across partner systems and delayed reports.",
    approach: [
      "Connected partner systems through versioned Node.js APIs",
      "Consolidated events in a cloud data platform",
      "Built a React dashboard around operational exceptions",
    ],
    outcomes: [
      "Reduced reporting latency from hours to minutes",
      "Gave operations teams one view of delayed shipments",
    ],
  },
  {
    id: "harbor-health-intake",
    title: "Accessible digital intake across healthcare services",
    customer: "Harbor Health",
    industry: "Healthcare",
    topics: [
      "React",
      "Accessibility",
      "Design systems",
      "User research",
      "Content design",
    ],
    challenge:
      "Replace inconsistent intake forms that patients struggled to complete with assistive technology.",
    approach: [
      "Tested the highest-volume forms with patients",
      "Built accessible React patterns in a shared design system",
      "Rewrote form content and validation guidance",
    ],
    outcomes: [
      "Met WCAG 2.2 AA requirements across the new forms",
      "Reduced incomplete intake submissions by 19%",
    ],
  },
  {
    id: "telebridge-modernization",
    title: "A shared operating model for telecom modernization",
    customer: "Telebridge",
    industry: "Telecommunications",
    topics: [
      "Engineering leadership",
      "Platform architecture",
      "Cloud migration",
      "DevOps",
      "Technical strategy",
    ],
    challenge:
      "Coordinate a cloud modernization program across teams with overlapping platform responsibilities.",
    approach: [
      "Defined the target architecture and staged migration roadmap",
      "Assigned platform ownership across delivery teams",
      "Introduced progressive delivery and service-level objectives",
    ],
    outcomes: [
      "Established clear ownership for shared platform capabilities",
      "Reduced release risk through staged delivery",
    ],
  },
];

export function normalize(value: string): string {
  return value.trim().toLocaleLowerCase("en");
}

export function includesTerm(value: string, query: string): boolean {
  const normalizedValue = normalize(value);
  const normalizedQuery = normalize(query);

  return (
    normalizedValue.includes(normalizedQuery) ||
    normalizedQuery.includes(normalizedValue)
  );
}
