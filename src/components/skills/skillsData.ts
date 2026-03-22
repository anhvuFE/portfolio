// Skills data with actual technology logos

export interface Skill {
  id: number;
  name: string;
  icon: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "frontend" | "backend" | "database" | "tools";
  projects?: string[];
}

export const skillsData: Skill[] = [
  // Frontend Technologies - Languages and Frameworks first
  {
    id: 1,
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: "The world's most popular programming language",
    level: "advanced",
    category: "frontend"
  },
  {
    id: 2,
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Typed superset of JavaScript that compiles to plain JavaScript",
    level: "intermediate",
    category: "frontend"
  },
  {
    id: 3,
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "A JavaScript library for building user interfaces",
    level: "advanced",
    category: "frontend"
  },
  {
    id: 4,
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    description: "React framework for production with SSR/SSG",
    level: "advanced",
    category: "frontend"
  },
  {
    id: 5,
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    description: "Utility-first CSS framework",
    level: "advanced",
    category: "frontend"
  },
  {
    id: 6,
    name: "Material UI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    description: "React component library implementing Material Design",
    level: "advanced",
    category: "frontend"
  },

  // Backend Technologies
  {
    id: 7,
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "JavaScript runtime built on Chrome's V8 engine",
    level: "advanced",
    category: "backend"
  },
  {
    id: 8,
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    description: "Fast, unopinionated web framework for Node.js",
    level: "advanced",
    category: "backend"
  },
  {
    id: 9,
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: "High-level programming language",
    level: "intermediate",
    category: "backend"
  },

  // HTML and CSS moved down
  {
    id: 10,
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "The standard markup language for creating web pages",
    level: "expert",
    category: "frontend"
  },
  {
    id: 11,
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description: "Style sheet language for describing presentation",
    level: "advanced",
    category: "frontend"
  },

  // Database Technologies
  {
    id: 12,
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    description: "NoSQL database for modern applications",
    level: "advanced",
    category: "database"
  },
  {
    id: 13,
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    description: "Powerful open source relational database",
    level: "intermediate",
    category: "database"
  },
  {
    id: 14,
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    description: "Popular open source relational database",
    level: "intermediate",
    category: "database"
  },
  {
    id: 15,
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    description: "In-memory data structure store",
    level: "intermediate",
    category: "database"
  },
  {
    id: 16,
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    description: "Open source Firebase alternative",
    level: "advanced",
    category: "database"
  },
  {
    id: 17,
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    description: "Google's mobile and web application platform",
    level: "advanced",
    category: "database"
  },

  // Tools & Others
  {
    id: 18,
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Distributed version control system",
    level: "advanced",
    category: "tools"
  },
  {
    id: 19,
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    description: "Web-based platform for version control",
    level: "advanced",
    category: "tools"
  },
  {
    id: 20,
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    description: "Platform for containerization",
    level: "intermediate",
    category: "tools"
  },
  {
    id: 21,
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    description: "Source code editor",
    level: "expert",
    category: "tools"
  },
  {
    id: 22,
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    description: "Collaborative interface design tool",
    level: "intermediate",
    category: "tools"
  },
  {
    id: 23,
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    description: "Cloud computing platform",
    level: "intermediate",
    category: "tools"
  }
];

// Helper functions
export const getSkillsByCategory = (category: string): Skill[] => {
  return skillsData.filter(skill => skill.category === category);
};

export const getCategories = (): string[] => {
  return Array.from(new Set(skillsData.map(skill => skill.category)));
};
