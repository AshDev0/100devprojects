// ============================================
// PROJECTS DATA - 100 DEV PROJECTS
// ============================================

export const projects = [
  // ============================================
  // PROJECT 1: BMI CALCULATOR
  // ============================================
  {
    id: 1,
    title: "BMI Calculator (Body Mass Index)",
    slug: "bmi-calculator",
    shortTitle: "BMI Calculator",
    category: "JavaScript",
    difficulty: "Beginner",

    meta: {
      title: "BMI Calculator JavaScript Project | 100 Dev Projects",
      description:
        "Build a responsive BMI Calculator using Vanilla JavaScript. Learn form validation, DOM manipulation, BMI logic, and localStorage with a real-world health project.",
      keywords: [
        "BMI calculator JavaScript",
        "body mass index calculator",
        "JavaScript beginner project",
        "DOM manipulation project",
        "localStorage JavaScript",
        "health calculator JS"
      ],
      canonicalUrl: "https://100devprojects.in/demos/bmi-calculator/index.html"
    },

    description:
      "A responsive BMI Calculator built using Vanilla JavaScript that calculates BMI, shows health categories, and stores previous results using localStorage.",

    longDescription: `
This BMI Calculator is a beginner-friendly JavaScript project focused on solving
a real-world health problem.

Users can calculate BMI using height and weight, view health categories,
and see previous calculations stored in localStorage.

The project is built using clean HTML, modern CSS, and well-structured JavaScript,
making it perfect for a beginner portfolio.
    `,

    features: [
      "Height and weight input validation",
      "Accurate BMI calculation",
      "Health category detection",
      "Color-coded results UI",
      "Calculation history using localStorage",
      "Delete individual history records",
      "Responsive design"
    ],

    techStack: [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "LocalStorage API"
    ],

    learningOutcomes: [
      "DOM manipulation",
      "Form validation",
      "Event handling",
      "Working with localStorage",
      "Conditional logic",
      "Responsive UI development"
    ],

    demoUrl: "/demos/bmi-calculator/index.html",
    githubUrl:
      "https://github.com/AshDev0/100devprojects/tree/main/100devprojects/public/demos/bmi-calculator",

    thumbnail: "/images/projects/bmi-calculator.jpg",

    dateAdded: "2024-12-15",
    estimatedTime: "2–3 hours",
    tags: ["bmi", "calculator", "health", "javascript", "beginner"],
    status: "active",
    featured: true,
    trending: false
  },

  // ============================================
  // PROJECT 2: TIP CALCULATOR
  // ============================================
  {
    id: 2,
    title: "Tip Calculator using JavaScript",
    slug: "tip-calculator",
    shortTitle: "Tip Calculator",
    category: "JavaScript",
    difficulty: "Beginner",

    meta: {
      title: "Tip Calculator JavaScript Project | 100 Dev Projects",
      description:
        "Build a simple Tip Calculator using Vanilla JavaScript. Learn DOM manipulation, event handling, and basic calculations.",
      keywords: [
        "tip calculator javascript",
        "javascript beginner project",
        "dom manipulation project",
        "bill calculator js"
      ],
      canonicalUrl: "https://100devprojects.in/demos/tip-calculator/index.html"
    },

    description:
      "A simple Tip Calculator built with Vanilla JavaScript that calculates the total bill amount based on the entered tip percentage.",

    longDescription: `
This Tip Calculator is a very beginner-friendly JavaScript project.

Users enter the bill amount and tip percentage, and the total amount
is calculated on button click.

The project focuses on understanding input handling,
basic calculations, and updating the DOM dynamically.
    `,

    features: [
      "Bill amount input",
      "Tip percentage input",
      "Button-based calculation",
      "Dynamic total update",
      "Simple and clean logic"
    ],

    techStack: [
      "HTML5",
      "Vanilla JavaScript"
    ],

    learningOutcomes: [
      "Selecting DOM elements",
      "Handling click events",
      "Reading input values",
      "Performing calculations",
      "Updating UI with JavaScript"
    ],

    demoUrl: "/demos/tip-calculator/index.html",
    githubUrl:
      "https://github.com/AshDev0/100devprojects/tree/main/100devprojects/public/demos/tip-calculator",

    thumbnail: "/images/projects/tip-calculator.jpg",

    dateAdded: "2024-12-15",
    estimatedTime: "30–45 minutes",
    tags: ["tip", "calculator", "javascript", "beginner"],
    status: "active",
    featured: false,
    trending: false
  },

  // ============================================
  // PROJECT 3: TODO APP (BASIC)
  // ============================================
  {
    id: 3,
    title: "Todo App using Vanilla JavaScript",
    slug: "todo-app",
    shortTitle: "Todo App",
    category: "JavaScript",
    difficulty: "Beginner",

    meta: {
      title: "Todo App JavaScript Project | 100 Dev Projects",
      description:
        "Build a basic Todo App using Vanilla JavaScript and Tailwind CSS. Learn DOM manipulation and array-based state management.",
      keywords: [
        "todo app javascript",
        "vanilla javascript todo app",
        "beginner javascript project",
        "tailwind css todo app"
      ],
      canonicalUrl: "https://100devprojects.in/demos/todo-app-basic/index.html"
    },

    description:
      "A basic Todo App that allows users to add, complete, and delete tasks using Vanilla JavaScript.",

    longDescription: `
This Basic Todo App helps beginners understand how to manage
application state using arrays and render UI dynamically.

Users can add todos, mark them as completed,
and delete tasks with a clean Tailwind CSS interface.
    `,

    features: [
      "Add todo items",
      "Mark todos as completed",
      "Delete todos",
      "Dynamic rendering",
      "Clean UI with Tailwind CSS"
    ],

    techStack: [
      "HTML5",
      "Vanilla JavaScript",
      "Tailwind CSS (CDN)"
    ],

    learningOutcomes: [
      "DOM manipulation",
      "Array-based state management",
      "Template literals",
      "Handling user events",
      "Conditional rendering"
    ],

    demoUrl: "/demos/todo-app/index.html",
    githubUrl:
      "https://github.com/AshDev0/100devprojects/tree/main/100devprojects/public/demos/todo-app",

    thumbnail: "/images/projects/todo-app-basic.jpg",

    dateAdded: "2024-12-15",
    estimatedTime: "1–2 hours",
    tags: ["todo", "javascript", "beginner", "tailwind"],
    status: "active",
    featured: false,
    trending: false
  },

  // ============================================
  // PROJECT 4: TODO APP (ADVANCED)
  // ============================================
  {
    id: 4,
    title: "Advanced Todo App with LocalStorage",
    slug: "todo-app-advanced",
    shortTitle: "Advanced Todo App",
    category: "JavaScript",
    difficulty: "Intermediate",

    meta: {
      title: "Advanced Todo App JavaScript | 100 Dev Projects",
      description:
        "Build an advanced Todo App using Vanilla JavaScript with filters, categories, priorities, dark mode, statistics, and localStorage.",
      keywords: [
        "advanced todo app javascript",
        "todo app localstorage",
        "intermediate javascript project",
        "dark mode javascript"
      ],
      canonicalUrl:
        "https://100devprojects.in/demos/todo-app-advanced/index.html"
    },

    description:
      "An advanced Todo App featuring categories, priorities, filters, statistics, dark mode, and persistent storage.",

    longDescription: `
This Advanced Todo App demonstrates intermediate-level JavaScript skills
without using any frameworks.

The app includes localStorage persistence, filters, search,
dark mode, statistics, and data export functionality,
making it a strong portfolio project.
    `,

    features: [
      "Add, edit, delete todos",
      "Categories and priorities",
      "Due dates with overdue detection",
      "Search and filters",
      "LocalStorage persistence",
      "Dark mode with saved preference",
      "Task statistics",
      "Export todos as JSON"
    ],

    techStack: [
      "HTML5",
      "Vanilla JavaScript (ES6+)",
      "Tailwind CSS (CDN)",
      "LocalStorage API",
      "Font Awesome"
    ],

    learningOutcomes: [
      "Class-based JavaScript architecture",
      "State management without frameworks",
      "Advanced filtering logic",
      "Dark mode implementation",
      "Working with dates",
      "Building scalable JS projects"
    ],

    demoUrl: "/demos/todo-app-advanced/index.html",
    githubUrl:
      "https://github.com/AshDev0/100devprojects/tree/main/100devprojects/public/demos/todo-app-advanced",

    thumbnail: "/images/projects/advanced-todo-app.jpg",

    dateAdded: "2024-12-15",
    estimatedTime: "6–8 hours",
    tags: [
      "todo",
      "javascript",
      "intermediate",
      "localstorage",
      "dark-mode",
      "portfolio"
    ],
    status: "active",
    featured: true,
    trending: true
  },
   // ============================================
  // PROJECT 5: Digital Clock, Stopwatch & Timer App
  // ============================================
  {
  id: 5,
  title: "Digital Clock, Stopwatch & Timer App",
  slug: "digital-clock",
  shortTitle: "Digital Clock",
  category: "JavaScript",
  difficulty: "Beginner",

  meta: {
    title: "Digital Clock, Stopwatch & Timer using JavaScript | 100 Dev Projects",
    description:
      "Build a Digital Clock with Stopwatch and Countdown Timer using Vanilla JavaScript. Includes dark mode, keyboard shortcuts, timer alerts, and responsive UI.",
    keywords: [
      "digital clock javascript",
      "stopwatch javascript",
      "countdown timer javascript",
      "javascript beginner project",
      "clock app javascript",
      "vanilla javascript project"
    ],
    canonicalUrl:
      "https://100devprojects.in/demos/digital-clock/index.html"
  },

  description:
    "A multi-feature Digital Clock application built with Vanilla JavaScript that includes a real-time clock, stopwatch with lap tracking, and a countdown timer with alerts.",

  longDescription: `
This Digital Clock project is a complete beginner-to-intermediate level JavaScript application
that combines three time-based utilities into a single interface.

Users can view the current time with date and timezone, switch between 12 and 24 hour formats,
use a stopwatch with lap recording, and run a countdown timer with visual progress and alerts.

The app also supports dark mode with saved preferences, keyboard shortcuts,
and a fully responsive UI — making it a strong portfolio-ready JavaScript project.
  `,

  features: [
    "Real-time digital clock with date & timezone",
    "12 / 24 hour format toggle",
    "Stopwatch with lap recording",
    "Countdown timer with progress ring",
    "Timer sound alert & browser notification",
    "Dark mode with saved preference",
    "Keyboard shortcuts support",
    "Tab-based UI navigation",
    "Responsive design"
  ],

  techStack: [
    "HTML5",
    "CSS3",
    "Vanilla JavaScript (ES6+)",
    "LocalStorage API",
    "Font Awesome Icons"
  ],

  learningOutcomes: [
    "Working with Date and Time in JavaScript",
    "setInterval & time-based logic",
    "State management without frameworks",
    "DOM manipulation & event handling",
    "LocalStorage usage",
    "Keyboard event handling",
    "Building multi-feature JS apps"
  ],

  demoUrl: "/demos/digital-clock/index.html",
  githubUrl:
    "https://github.com/AshDev0/100devprojects/tree/main/100devprojects/public/demos/digital-clock",

  thumbnail: "/images/projects/digital-clock.jpg",

  dateAdded: "2024-12-15",
  estimatedTime: "4–5 hours",
  tags: [
    "digital-clock",
    "stopwatch",
    "timer",
    "javascript",
    "beginner",
    "portfolio-project"
  ],

  status: "active",
  featured: true,
  trending: true
}
];

// ============================================
// FILTER HELPERS
// ============================================

export const categories = ["All", "JavaScript"];
export const difficultyLevels = ["All", "Beginner", "Intermediate"];

export function getProjectBySlug(slug) {
  return projects.find(project => project.slug === slug);
}

export function getProjectsByCategory(category) {
  if (category === "All") return projects;
  return projects.filter(project => project.category === category);
}

export function getProjectsByDifficulty(level) {
  if (level === "All") return projects;
  return projects.filter(project => project.difficulty === level);
}

export function searchProjects(query) {
  const q = query.toLowerCase();
  return projects.filter(project =>
    project.title.toLowerCase().includes(q) ||
    project.description.toLowerCase().includes(q) ||
    project.tags.some(tag => tag.toLowerCase().includes(q))
  );
}
