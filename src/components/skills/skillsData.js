// Skills data với icon SVG tương tự như trong hình mẫu
export const skillsData = [
  // Frontend Technologies
  {
    id: 1,
    name: "React",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="1.5" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="6" ry="2.5" stroke="#61DAFB" strokeWidth="1" fill="none"/>
        <ellipse cx="12" cy="12" rx="6" ry="2.5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="6" ry="2.5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(-60 12 12)"/>
      </svg>
    ),
    description: "A JavaScript library for building user interfaces",
    level: "Intermediate",
    category: "frontend"
  },
  {
    id: 2,
    name: "JavaScript",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E"/>
        <text x="12" y="16" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">JS</text>
      </svg>
    ),
    description: "The world's most popular programming language and easy to learn",
    level: "Intermediate",
    category: "frontend"
  },
  {
    id: 3,
    name: "TypeScript",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6"/>
        <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">TS</text>
      </svg>
    ),
    description: "Typed superset of JavaScript that compiles to plain JavaScript",
    level: "Basic",
    category: "frontend"
  },
  {
    id: 4,
    name: "HTML",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2L4.5 20L12 22L19.5 20L21 2H3Z" fill="#E34F26"/>
        <path d="M12 4V20L17.5 18.5L18.5 4H12Z" fill="#FF5722"/>
        <text x="12" y="14" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold">HTML</text>
      </svg>
    ),
    description: "The standard markup language for creating web pages",
    level: "Advanced",
    category: "frontend"
  },
  {
    id: 5,
    name: "CSS",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2L4.5 20L12 22L19.5 20L21 2H3Z" fill="#1572B6"/>
        <path d="M12 4V20L17.5 18.5L18.5 4H12Z" fill="#33A9DC"/>
        <text x="12" y="14" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">CSS</text>
      </svg>
    ),
    description: "Style sheet language used for describing presentation",
    level: "Intermediate",
    category: "frontend"
  },
  {
    id: 6,
    name: "Bootstrap",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#7952B3"/>
        <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">B</text>
      </svg>
    ),
    description: "Popular CSS framework for responsive web development",
    level: "Intermediate",
    category: "frontend"
  },

  // Backend Technologies
  {
    id: 7,
    name: "Java",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="10" fill="#f89820"/>
        <path d="M8 14c0 0 1.5-1 4-1s4 1 4 1v2c0 0-1.5-1-4-1s-4 1-4 1v-2z" fill="#fff"/>
        <path d="M9 10c0 0 1-1 3-1s3 1 3 1v1c0 0-1-1-3-1s-3 1-3 1v-1z" fill="#fff"/>
        <circle cx="12" cy="7" r="1" fill="#fff"/>
      </svg>
    ),
    description: "Object-oriented programming language and computing platform",
    level: "Intermediate",
    category: "backend"
  },
  {
    id: 8,
    name: "C#",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#239120"/>
        <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C#</text>
      </svg>
    ),
    description: "Modern, object-oriented programming language by Microsoft",
    level: "Intermediate",
    category: "backend"
  },
  {
    id: 9,
    name: "C++",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#00599C"/>
        <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">C++</text>
      </svg>
    ),
    description: "General-purpose programming language for system/application development",
    level: "Basic",
    category: "backend"
  },

  // Database Technologies
  {
    id: 10,
    name: "MySQL",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#4479A1"/>
        <path d="M8 9c1 0 2-1 2-1s1 1 2 1c1.5 0 2.5-1.5 2.5-1.5S15 8 16 9c.5.5.5 1.5-.5 2.5-1 1-2.5.5-2.5.5s-1.5.5-2.5-.5c-1-1-1-2 .5-2.5z" fill="#fff"/>
        <path d="M7 15c0-1 1-2 3-2s3 1 3 2v1c0 1-1 2-3 2s-3-1-3-2v-1z" fill="#fff"/>
      </svg>
    ),
    description: "Open-source relational database management system (RDBMS) for any application",
    level: "Intermediate",
    category: "database"
  },
  {
    id: 11,
    name: "SQL Server",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#CC2927"/>
        <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">SQL</text>
      </svg>
    ),
    description: "Microsoft's relational database management system",
    level: "Intermediate",
    category: "database"
  },
  {
    id: 12,
    name: "Firebase",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 14l3-8 2 4 2-4 3 8v6l-5 2-5-2v-6z" fill="#FFCA28"/>
        <path d="M5 14l5 6 5-6-2-4-3 2-3-2-2 4z" fill="#FF9800"/>
        <circle cx="12" cy="6" r="1" fill="#FF5722"/>
      </svg>
    ),
    description: "Platform for building mobile and web applications",
    level: "Intermediate",
    category: "database"
  },

  // Tools & Others
  {
    id: 13,
    name: "Git",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#F05032"/>
        <path d="M12 3L8 7h3v8h2V7h3l-4-4z" fill="#fff"/>
      </svg>
    ),
    description: "Distributed version control system for tracking changes",
    level: "Intermediate",
    category: "tools"
  },
  {
    id: 14,
    name: "WordPress",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#21759B"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="#fff"/>
        <circle cx="12" cy="12" r="3" fill="#fff"/>
      </svg>
    ),
    description: "Content management system for building websites",
    level: "Intermediate",
    category: "tools"
  }
];

// Hàm helper để lấy skills theo category
export const getSkillsByCategory = (category) => {
  return skillsData.filter(skill => skill.category === category);
};

// Hàm helper để lấy tất cả categories
export const getCategories = () => {
  return [...new Set(skillsData.map(skill => skill.category))];
};