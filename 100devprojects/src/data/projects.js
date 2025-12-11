export const projects = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    slug: "ecommerce-dashboard",
    category: "React",
    difficulty: "Intermediate",
    description: "A complete admin dashboard with real-time data visualization, user management, and inventory tracking. Perfect for learning state management and API integration.",
    features: [
      "Real-time data visualization with charts",
      "User management system with CRUD operations",
      "Product inventory tracking and management",
      "Responsive design for all devices"
    ],
    techStack: ["React", "Tailwind CSS", "Chart.js", "Context API"],
    demoUrl: "/demos/ecommerce-dashboard/index.html",
    githubUrl: "https://github.com/yourusername/demo-ecommerce-dashboard",
    thumbnail: "/images/projects/ecommerce-dashboard.jpg",
    learningOutcomes: [
      "Advanced React patterns and hooks",
      "State management with Context API",
      "Data visualization techniques",
      "Responsive dashboard layouts"
    ],
    dateAdded: "2024-12-01",
    tags: ["dashboard", "admin", "charts", "ecommerce"]
  },
  {
    id: 2,
    title: "Todo App with Authentication",
    slug: "todo-app-auth",
    category: "Full Stack",
    difficulty: "Beginner",
    description: "A feature-rich todo application with user authentication, local storage, and drag-and-drop functionality.",
    features: [
      "User authentication and authorization",
      "Add, edit, delete todos",
      "Drag and drop to reorder",
      "Filter by status (all, active, completed)"
    ],
    techStack: ["React", "Tailwind CSS", "Firebase Auth", "LocalStorage"],
    demoUrl: "/demos/todo-app/index.html",
    githubUrl: "https://github.com/yourusername/demo-todo-app",
    thumbnail: "/images/projects/todo-app.jpg",
    learningOutcomes: [
      "React hooks (useState, useEffect, useContext)",
      "Firebase authentication integration",
      "Local storage management",
      "Form handling and validation"
    ],
    dateAdded: "2024-12-05",
    tags: ["todo", "authentication", "firebase", "crud"]
  },
  {
    id: 3,
    title: "Weather App with API",
    slug: "weather-app",
    category: "JavaScript",
    difficulty: "Beginner",
    description: "A beautiful weather application that fetches real-time weather data from OpenWeather API with location search.",
    features: [
      "Real-time weather data",
      "5-day forecast",
      "Location-based search",
      "Animated weather icons"
    ],
    techStack: ["React", "Tailwind CSS", "OpenWeather API", "Axios"],
    demoUrl: "/demos/weather-app/index.html",
    githubUrl: "https://github.com/yourusername/demo-weather-app",
    thumbnail: "/images/projects/weather-app.jpg",
    learningOutcomes: [
      "API integration and data fetching",
      "Async/await and promises",
      "Error handling",
      "Conditional rendering"
    ],
    dateAdded: "2024-12-08",
    tags: ["api", "weather", "axios", "geolocation"]
  }
];

export const categories = [
  "All",
  "React",
  "JavaScript",
  "Full Stack",
  "API Integration",
  "CSS"
];

export const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"];