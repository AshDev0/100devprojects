// ============================================
// BLOGS DATA - 100 DEV PROJECTS
// ============================================

export const blogs = [
  // ============================================
  // BLOG 1: BMI CALCULATOR TUTORIAL
  // ============================================
  {
    id: 1,
    title: "How to Build a BMI Calculator in JavaScript - Complete Tutorial",
    slug: "how-to-build-bmi-calculator-javascript",
    category: "Tutorial",
    author: "Ashwani",
    datePublished: "2024-12-20",
    readTime: "8 min read",

    meta: {
      title: "Build a BMI Calculator in JavaScript | Complete Tutorial 2025",
      description: "Learn how to build a BMI calculator using vanilla JavaScript with form validation, localStorage, and responsive design. Step-by-step tutorial with complete code.",
      keywords: [
        "bmi calculator javascript tutorial",
        "how to build bmi calculator",
        "javascript project tutorial",
        "beginner javascript project",
        "form validation javascript",
        "localStorage tutorial"
      ],
      canonicalUrl: "https://100devprojects.in/blog/how-to-build-bmi-calculator-javascript"
    },

    excerpt: "Learn how to build a fully functional BMI Calculator using vanilla JavaScript. This step-by-step tutorial covers form validation, BMI calculation logic, localStorage for history, and responsive design.",

    content: `
# How to Build a BMI Calculator in JavaScript

Building a BMI (Body Mass Index) Calculator is an excellent beginner project that teaches you essential JavaScript concepts including DOM manipulation, form validation, and local storage.

## What You'll Learn

- Form input handling and validation
- Mathematical calculations in JavaScript
- Working with localStorage API
- Conditional rendering based on BMI categories
- Building a responsive user interface

## Project Overview

Our BMI Calculator will have these features:
- Height and weight input with validation
- Instant BMI calculation
- Color-coded health category display
- History of previous calculations
- Delete individual history items
- Fully responsive design

## Step 1: HTML Structure

First, let's create the basic HTML structure:

\`\`\`html
<div class="container">
  <h1>BMI Calculator</h1>
  <form id="bmi-form">
    <input type="number" id="height" placeholder="Height (cm)" required>
    <input type="number" id="weight" placeholder="Weight (kg)" required>
    <button type="submit">Calculate BMI</button>
  </form>
  <div id="result"></div>
  <div id="history"></div>
</div>
\`\`\`

## Step 2: BMI Calculation Logic

The BMI formula is: **BMI = weight (kg) / (height (m))²**

\`\`\`javascript
function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(1);
}
\`\`\`

## Step 3: Determine Health Category

\`\`\`javascript
function getCategory(bmi) {
  if (bmi < 18.5) return { category: 'Underweight', color: '#3b82f6' };
  if (bmi < 25) return { category: 'Normal', color: '#10b981' };
  if (bmi < 30) return { category: 'Overweight', color: '#f59e0b' };
  return { category: 'Obese', color: '#ef4444' };
}
\`\`\`

## Step 4: Form Validation

\`\`\`javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    alert('Please enter valid values');
    return;
  }

  const bmi = calculateBMI(weight, height);
  displayResult(bmi);
  saveToHistory(bmi, weight, height);
});
\`\`\`

## Step 5: LocalStorage Integration

\`\`\`javascript
function saveToHistory(bmi, weight, height) {
  const history = JSON.parse(localStorage.getItem('bmiHistory')) || [];
  history.unshift({
    bmi,
    weight,
    height,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('bmiHistory', JSON.stringify(history));
  displayHistory();
}
\`\`\`

## Why This Project is Great for Beginners

1. **Real-world Application** - BMI calculators are actually used
2. **Multiple Concepts** - Covers forms, validation, storage
3. **Visual Feedback** - Color-coded results make it engaging
4. **Portfolio-Ready** - Looks professional with minimal styling

## Try It Yourself

[View Live Demo](/demos/bmi-calculator/index.html)
[Get Source Code](https://github.com/AshDev0/100devprojects/tree/main/100devprojects/public/demos/bmi-calculator)

## Next Steps

After completing this project, try:
- Adding metric/imperial unit conversion
- Creating charts to visualize BMI trends
- Adding user authentication
- Building a mobile app version

Happy coding! 🚀
    `,

    tags: ["javascript", "tutorial", "beginner", "html", "css", "dom-manipulation"],
    relatedProjects: ["bmi-calculator"],
    featured: true,
    views: 0
  },

  // ============================================
  // BLOG 2: TODO APP TUTORIAL
  // ============================================
  {
    id: 2,
    title: "Building an Advanced Todo App with Dark Mode and LocalStorage",
    slug: "advanced-todo-app-javascript-dark-mode",
    category: "Tutorial",
    author: "Ashwani",
    datePublished: "2024-12-18",
    readTime: "12 min read",

    meta: {
      title: "Advanced Todo App JavaScript Tutorial | Dark Mode & LocalStorage",
      description: "Build a feature-rich Todo App with categories, priorities, filters, dark mode, and localStorage persistence. Complete JavaScript tutorial with code examples.",
      keywords: [
        "todo app javascript",
        "dark mode javascript",
        "localStorage tutorial",
        "advanced javascript project",
        "todo app with filters",
        "javascript categories"
      ],
      canonicalUrl: "https://100devprojects.in/blog/advanced-todo-app-javascript-dark-mode"
    },

    excerpt: "Create a production-ready Todo App with advanced features like categories, priorities, filters, search, dark mode, and complete localStorage persistence. Perfect for intermediate developers.",

    content: `
# Building an Advanced Todo App with JavaScript

Take your JavaScript skills to the next level by building a feature-rich Todo application with categories, priorities, dark mode, and more.

## Features We'll Build

- ✅ Add, edit, and delete todos
- ✅ Categories (Work, Personal, Shopping)
- ✅ Priority levels (Low, Medium, High)
- ✅ Due dates with overdue detection
- ✅ Search and filter functionality
- ✅ Dark mode with saved preference
- ✅ LocalStorage persistence
- ✅ Task statistics dashboard
- ✅ Export todos as JSON

## Architecture Overview

We'll use a class-based approach for better code organization:

\`\`\`javascript
class TodoApp {
  constructor() {
    this.todos = this.loadFromStorage();
    this.darkMode = this.loadDarkMode();
    this.init();
  }

  init() {
    this.renderTodos();
    this.attachEventListeners();
    this.updateStats();
  }
}
\`\`\`

## Step 1: Todo Data Structure

\`\`\`javascript
const todo = {
  id: Date.now(),
  text: 'Complete project',
  category: 'Work',
  priority: 'High',
  dueDate: '2024-12-25',
  completed: false,
  createdAt: new Date().toISOString()
};
\`\`\`

## Step 2: Dark Mode Implementation

\`\`\`javascript
toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  this.darkMode = !this.darkMode;
  localStorage.setItem('darkMode', this.darkMode);
  this.updateDarkModeIcon();
}
\`\`\`

## Step 3: Advanced Filtering

\`\`\`javascript
filterTodos(filter) {
  return this.todos.filter(todo => {
    const matchesCategory = !filter.category ||
                           todo.category === filter.category;
    const matchesPriority = !filter.priority ||
                           todo.priority === filter.priority;
    const matchesSearch = !filter.search ||
                         todo.text.toLowerCase()
                             .includes(filter.search.toLowerCase());

    return matchesCategory && matchesPriority && matchesSearch;
  });
}
\`\`\`

## Step 4: Due Date Detection

\`\`\`javascript
isOverdue(dueDate) {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  return due < today;
}
\`\`\`

## Step 5: Statistics Dashboard

\`\`\`javascript
updateStats() {
  const total = this.todos.length;
  const completed = this.todos.filter(t => t.completed).length;
  const pending = total - completed;
  const overdue = this.todos.filter(t =>
    !t.completed && this.isOverdue(t.dueDate)
  ).length;

  this.renderStats({ total, completed, pending, overdue });
}
\`\`\`

## Why Build This Project?

1. **Portfolio Standout** - Shows advanced JavaScript skills
2. **Real-world Features** - Dark mode, filters, persistence
3. **Scalable Architecture** - Class-based, modular code
4. **Interview Ready** - Common coding interview project

## Live Demo & Source Code

[View Live Demo](/demos/todo-app-advanced/index.html)
[Get Source Code](https://github.com/AshDev0/100devprojects/tree/main/100devprojects/public/demos/todo-app-advanced)

## Challenges to Try

- Add drag-and-drop reordering
- Implement sub-tasks
- Add recurring tasks
- Build a Pomodoro timer integration

Keep building!
    `,

    tags: ["javascript", "tutorial", "intermediate", "dark-mode", "localStorage", "filters"],
    relatedProjects: ["todo-app-advanced", "todo-app"],
    featured: true,
    views: 0
  },

  // ============================================
  // BLOG 3: JAVASCRIPT PROJECTS LIST
  // ============================================
  {
    id: 3,
    title: "10 JavaScript Projects That Will Get You Hired in 2025",
    slug: "javascript-projects-get-hired-2025",
    category: "Guide",
    author: "Ashwani",
    datePublished: "2024-12-22",
    readTime: "6 min read",

    meta: {
      title: "10 JavaScript Projects to Get Hired in 2025 | Portfolio Guide",
      description: "Build these 10 JavaScript projects to create an impressive developer portfolio and land your first job. Includes project ideas from beginner to advanced level.",
      keywords: [
        "javascript projects for portfolio",
        "get hired as developer",
        "javascript project ideas 2025",
        "beginner to advanced projects",
        "developer portfolio projects"
      ],
      canonicalUrl: "https://100devprojects.in/blog/javascript-projects-get-hired-2025"
    },

    excerpt: "Building the right projects can make or break your developer portfolio. Here are 10 JavaScript projects that recruiters actually look for, from beginner to advanced level.",

    content: `
# 10 JavaScript Projects That Will Get You Hired in 2025

Your portfolio is your ticket to landing your first developer job. Here are 10 projects that demonstrate real-world skills recruiters value.

## Why These Projects Matter

Recruiters look for:
- **Problem-solving ability** - Can you build complete solutions?
- **Code quality** - Is your code clean and maintainable?
- **Real-world features** - Does it solve actual problems?
- **Technical depth** - Do you understand core concepts?

## Beginner Level Projects

### 1. BMI Calculator with History
**Why it matters:** Shows form handling, validation, and localStorage

**Key features:**
- Input validation
- Mathematical calculations
- Data persistence
- Conditional UI rendering

[View Project →](/project/bmi-calculator)

### 2. Tip Calculator
**Why it matters:** Demonstrates basic DOM manipulation and calculations

**Key features:**
- User input handling
- Real-time calculations
- Clean UI/UX

[View Project →](/project/tip-calculator)

### 3. Digital Clock with Timer & Stopwatch
**Why it matters:** Shows understanding of time, intervals, and state management

**Key features:**
- setInterval/setTimeout usage
- Multiple features in one app
- Tab-based navigation
- Dark mode toggle

[View Project →](/project/digital-clock)

## Intermediate Level Projects

### 4. Advanced Todo App
**Why it matters:** Classic project that shows you can build complex features

**Must-have features:**
- Categories and priorities
- Search and filters
- LocalStorage persistence
- Dark mode
- Statistics dashboard

[View Project →](/project/todo-app-advanced)

### 5. Color Generator & Palette Tool
**Why it matters:** Shows creativity and understanding of color manipulation

**Key features:**
- Random color generation
- Palette creation
- Gradient maker
- Copy to clipboard
- Favorites system

[View Project →](/project/color-generator)

### 6. Weather App with API Integration
**Why it matters:** Demonstrates API consumption and async JavaScript

**Key features:**
- Fetch API usage
- Error handling
- Location services
- Data visualization

## Advanced Level Projects

### 7. E-commerce Product Page
**Why it matters:** Shows you can build commercial applications

**Key features:**
- Shopping cart
- Product filters
- Checkout flow
- Payment integration (Stripe)

### 8. Real-time Chat Application
**Why it matters:** Demonstrates WebSocket/real-time capabilities

**Key features:**
- Firebase/WebSocket integration
- User authentication
- Message persistence
- Online status indicators

### 9. Full-stack CRUD App
**Why it matters:** Shows full-stack capabilities

**Tech stack:**
- Frontend: React/Vue
- Backend: Node.js + Express
- Database: MongoDB/PostgreSQL
- Authentication: JWT

### 10. Personal Portfolio with CMS
**Why it matters:** Shows you can build for clients

**Key features:**
- Headless CMS integration
- Blog system
- Contact form
- SEO optimization

## How to Present These Projects

### 1. GitHub README
- Clear project description
- Screenshots/GIFs
- Tech stack used
- Installation instructions
- Live demo link

### 2. Live Demos
Host on:
- GitHub Pages (free)
- Vercel (free)
- Netlify (free)

### 3. Code Quality
- Clean, commented code
- Consistent naming conventions
- Proper file structure
- No console.log() in production

## Common Mistakes to Avoid

❌ Building only tutorial projects
✅ Add your own features and styling

❌ No live demos
✅ Always deploy your projects

❌ Poor code organization
✅ Use modular, reusable code

❌ No error handling
✅ Handle edge cases gracefully

## Next Steps

1. Pick 3 projects from this list
2. Build them with your own twist
3. Deploy and add to portfolio
4. Write a blog post about each
5. Share on LinkedIn/Twitter

## Start Building Today

Browse all our projects and pick one to start:
[Explore All Projects →](/projects)

Remember: **Quality over quantity**. 3 excellent projects beat 10 mediocre ones.

Good luck with your job search! 🚀
    `,

    tags: ["career", "portfolio", "javascript", "guide", "job-search"],
    relatedProjects: ["bmi-calculator", "todo-app-advanced", "digital-clock", "color-generator"],
    featured: true,
    views: 0
  },

  // ============================================
  // BLOG 4: BEGINNER GUIDE
  // ============================================
  {
    id: 4,
    title: "How to Learn Web Development by Building Projects - Complete Roadmap",
    slug: "learn-web-development-building-projects-roadmap",
    category: "Guide",
    author: "Ashwani",
    datePublished: "2024-12-15",
    readTime: "10 min read",

    meta: {
      title: "Learn Web Development by Building Projects | 2025 Roadmap",
      description: "Complete roadmap to learn web development through hands-on projects. Step-by-step guide from HTML/CSS basics to advanced JavaScript and React.",
      keywords: [
        "learn web development",
        "project-based learning",
        "web development roadmap 2025",
        "learn javascript by building",
        "beginner web developer"
      ],
      canonicalUrl: "https://100devprojects.in/blog/learn-web-development-building-projects-roadmap"
    },

    excerpt: "Forget boring tutorials. Learn web development the right way by building real projects. This complete roadmap takes you from zero to job-ready developer.",

    content: `
# How to Learn Web Development by Building Projects

Reading tutorials won't make you a developer. Building projects will. Here's your complete roadmap to learn by doing.

## Why Project-Based Learning Works

**Traditional Learning:**
- Watch 40 hours of tutorials
- Forget 90% in a week
- Can't build anything on your own
- Imposter syndrome kicks in

**Project-Based Learning:**
- Build 10 real projects
- Learn concepts as you need them
- Create a portfolio
- Gain real confidence

## The Roadmap

### Phase 1: HTML & CSS Fundamentals (2-3 weeks)

**Goal:** Build static websites

**Projects to build:**
1. Personal landing page
2. Restaurant menu page
3. Survey form
4. Product card gallery

**Key concepts learned:**
- HTML semantic tags
- CSS Flexbox & Grid
- Responsive design
- Basic animations

### Phase 2: JavaScript Basics (3-4 weeks)

**Goal:** Add interactivity

**Projects to build:**
1. [Tip Calculator](/project/tip-calculator)
2. [BMI Calculator](/project/bmi-calculator)
3. Random quote generator
4. Simple todo list

**Key concepts learned:**
- Variables, functions, loops
- DOM manipulation
- Event listeners
- Form validation

### Phase 3: Intermediate JavaScript (4-6 weeks)

**Goal:** Build complex applications

**Projects to build:**
1. [Digital Clock with Timer](/project/digital-clock)
2. [Advanced Todo App](/project/todo-app-advanced)
3. [Color Generator](/project/color-generator)
4. Quiz application

**Key concepts learned:**
- LocalStorage API
- Array methods (map, filter, reduce)
- ES6+ features
- Async JavaScript basics

### Phase 4: APIs & Async Programming (3-4 weeks)

**Goal:** Consume external data

**Projects to build:**
1. Weather app
2. Movie search app
3. Recipe finder
4. GitHub profile viewer

**Key concepts learned:**
- Fetch API
- Promises & async/await
- Error handling
- Working with JSON

### Phase 5: Advanced Concepts (4-6 weeks)

**Goal:** Production-ready apps

**Projects to build:**
1. E-commerce product page
2. Blog with CMS
3. Authentication system
4. Real-time chat app

**Key concepts learned:**
- State management
- Authentication (JWT)
- WebSockets
- Performance optimization

## Learning Strategy

### 1. Start Small
Don't jump to complex projects immediately. Master basics first.

### 2. Code Without Tutorials
- Read documentation
- Google specific problems
- Use Stack Overflow
- Debug independently

### 3. Add Your Own Features
Don't just copy tutorials. Add:
- Your own design
- Extra features
- Better error handling
- Improved UX

### 4. Review and Refactor
After finishing a project:
- Review your code
- Refactor for clarity
- Add comments
- Improve naming

## Common Pitfalls to Avoid

### Tutorial Hell
❌ Watching endless tutorials
✅ Build first, learn as you go

### Perfection Paralysis
❌ Waiting to learn everything
✅ Start building with what you know

### Skipping Fundamentals
❌ Jumping to React too soon
✅ Master vanilla JavaScript first

### Not Finishing Projects
❌ Starting 10, finishing 0
✅ Finish what you start

## Tools You'll Need

**Code Editor:**
- VS Code (recommended)
- Sublime Text
- WebStorm

**Version Control:**
- Git & GitHub
- Learn basic commands
- Commit regularly

**Hosting:**
- GitHub Pages
- Vercel
- Netlify

**Learning Resources:**
- MDN Web Docs
- JavaScript.info
- 100 Dev Projects (this site!)

## Your 90-Day Plan

**Weeks 1-3:** HTML & CSS projects
**Weeks 4-7:** JavaScript basics
**Weeks 8-12:** Intermediate JS projects
**Weeks 13+:** Advanced projects & job prep

## How to Stay Motivated

1. **Join a community**
   - Twitter dev community
   - Discord servers
   - Local meetups

2. **Share your progress**
   - #100DaysOfCode
   - LinkedIn posts
   - Dev.to articles

3. **Track your wins**
   - Celebrate completed projects
   - Note what you learned
   - Compare to week 1

## Start Today

Don't wait for the "perfect" time. Pick a project and start building.

[Browse All Projects →](/projects)

Remember: **Everyone started where you are now.** The only difference between you and a professional developer is projects completed.

Happy coding! 🚀
    `,

    tags: ["guide", "learning", "roadmap", "beginner", "career"],
    relatedProjects: ["bmi-calculator", "tip-calculator", "todo-app", "digital-clock"],
    featured: false,
    views: 0
  },

  // ============================================
  // BLOG 5: LOCALSTORAGE GUIDE
  // ============================================
  {
    id: 5,
    title: "LocalStorage in JavaScript - Complete Guide with Real Examples",
    slug: "localstorage-javascript-complete-guide",
    category: "Tutorial",
    author: "Ashwani",
    datePublished: "2024-12-10",
    readTime: "7 min read",

    meta: {
      title: "LocalStorage JavaScript Tutorial | Complete Guide with Examples",
      description: "Learn how to use localStorage in JavaScript with practical examples. Store, retrieve, update and delete data in the browser. Includes best practices and real projects.",
      keywords: [
        "localStorage javascript",
        "browser storage tutorial",
        "localStorage examples",
        "web storage api",
        "javascript data persistence"
      ],
      canonicalUrl: "https://100devprojects.in/blog/localstorage-javascript-complete-guide"
    },

    excerpt: "Master localStorage in JavaScript with this complete guide. Learn how to persist data in the browser with practical examples from real projects.",

    content: `
# LocalStorage in JavaScript - Complete Guide

LocalStorage is one of the most useful browser APIs for storing data on the client side. Let's learn how to use it effectively.

## What is LocalStorage?

LocalStorage allows you to store key-value pairs in the browser that persist even after the page is closed.

**Key features:**
- Storage limit: ~5-10MB per domain
- Stores only strings
- Synchronous API
- No expiration time
- Accessible only from same origin

## Basic Operations

### 1. Storing Data

\`\`\`javascript
// Store a string
localStorage.setItem('username', 'John');

// Store a number (will be converted to string)
localStorage.setItem('age', 25);

// Store an object (must stringify first)
const user = { name: 'John', age: 25 };
localStorage.setItem('user', JSON.stringify(user));
\`\`\`

### 2. Retrieving Data

\`\`\`javascript
// Get a string
const username = localStorage.getItem('username');

// Get and parse an object
const userString = localStorage.getItem('user');
const user = JSON.parse(userString);
\`\`\`

### 3. Removing Data

\`\`\`javascript
// Remove a specific item
localStorage.removeItem('username');

// Clear all localStorage
localStorage.clear();
\`\`\`

### 4. Checking if Key Exists

\`\`\`javascript
if (localStorage.getItem('username')) {
  console.log('Username exists');
}

// Or check all keys
const hasUser = Object.keys(localStorage).includes('username');
\`\`\`

## Real-World Examples

### Example 1: Dark Mode Preference

\`\`\`javascript
// Save dark mode preference
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
}

// Load dark mode on page load
window.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
});
\`\`\`

### Example 2: Todo List Persistence

\`\`\`javascript
// Save todos array
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos on app start
function loadTodos() {
  const todosString = localStorage.getItem('todos');
  return todosString ? JSON.parse(todosString) : [];
}

// Usage
let todos = loadTodos();
\`\`\`

### Example 3: Form Data Auto-save

\`\`\`javascript
// Auto-save form input
const input = document.getElementById('email');
input.addEventListener('input', (e) => {
  localStorage.setItem('draft_email', e.target.value);
});

// Restore on page load
window.addEventListener('DOMContentLoaded', () => {
  const draft = localStorage.getItem('draft_email');
  if (draft) {
    input.value = draft;
  }
});
\`\`\`

## Best Practices

### 1. Always Handle Errors

\`\`\`javascript
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
    }
    return false;
  }
}
\`\`\`

### 2. Use Helper Functions

\`\`\`javascript
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};

// Usage
storage.set('user', { name: 'John' });
const user = storage.get('user');
\`\`\`

### 3. Namespace Your Keys

\`\`\`javascript
// Bad
localStorage.setItem('todos', '[]');
localStorage.setItem('settings', '{}');

// Good - prefix with app name
localStorage.setItem('myapp_todos', '[]');
localStorage.setItem('myapp_settings', '{}');
\`\`\`

## Common Pitfalls

### ❌ Not Checking for Browser Support

\`\`\`javascript
// Always check first
if (typeof Storage !== 'undefined') {
  localStorage.setItem('key', 'value');
} else {
  console.log('LocalStorage not supported');
}
\`\`\`

### ❌ Storing Sensitive Data

Never store:
- Passwords
- Credit card numbers
- API keys
- Personal identification

### ❌ Forgetting to Parse JSON

\`\`\`javascript
// Wrong
const todos = localStorage.getItem('todos');
todos.push(newTodo); // Error! todos is a string

// Correct
const todos = JSON.parse(localStorage.getItem('todos'));
todos.push(newTodo);
\`\`\`

## LocalStorage vs SessionStorage vs Cookies

| Feature | LocalStorage | SessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Capacity | ~5-10MB | ~5-10MB | ~4KB |
| Expiration | Never | Tab close | Configurable |
| Sent to server | No | No | Yes |
| Accessible from | JavaScript | JavaScript | JS & Server |

## Projects Using LocalStorage

See localStorage in action:
- [BMI Calculator](/project/bmi-calculator) - History storage
- [Advanced Todo App](/project/todo-app-advanced) - Full CRUD with localStorage
- [Digital Clock](/project/digital-clock) - Settings persistence

## Further Reading

- [MDN - Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Can I Use - LocalStorage](https://caniuse.com/namevalue-storage)

Start building projects with localStorage today! 🚀
    `,

    tags: ["javascript", "tutorial", "localStorage", "web-api", "browser-storage"],
    relatedProjects: ["bmi-calculator", "todo-app-advanced", "digital-clock"],
    featured: false,
    views: 0
  },

  // ============================================
  // BLOG 6: ASYNC JAVASCRIPT - CHAI AUR CODE STYLE
  // ============================================
  {
    id: 6,
    title: "Async JavaScript Explained: Promises, Async/Await ke Saath Chai Pe Charcha",
    slug: "async-javascript-promises-async-await-hindi-tutorial",
    category: "Tutorial",
    author: "Ashwani",
    datePublished: "2024-12-23",
    readTime: "15 min read",

    meta: {
      title: "Async JavaScript Complete Tutorial in Hindi | Promises & Async/Await 2025",
      description: "Asynchronous JavaScript ko samjho Promises, Async/Await, Fetch API ke saath. Real examples, common errors aur best practices ke saath complete Hindi guide.",
      keywords: [
        "async javascript hindi",
        "promises tutorial hindi",
        "async await javascript",
        "fetch api tutorial",
        "javascript asynchronous programming",
        "callback hell solution"
      ],
      canonicalUrl: "https://100devprojects.in/blog/async-javascript-promises-async-await-hindi-tutorial"
    },

    excerpt: "Async JavaScript sabse confusing topic hai beginners ke liye. Is detailed guide mein hum Promises, Async/Await, Fetch API aur sab kuch seekhenge with real-world examples. Chai ke saath code karo!",

    content: `
# Async JavaScript Explained: Promises, Async/Await, and Real-World Examples

Hey developers! 👋 Today we're diving deep into one of JavaScript's most important concepts - **Asynchronous Programming**. If you've ever made an API call, used setTimeout, or fetched data from a server, you've already worked with async code.

But do you truly understand how it works? Don't worry - by the end of this comprehensive guide, everything will be crystal clear. Let's get started!

## Understanding Synchronous vs Asynchronous Code

Before we jump into promises and async/await, let's understand the fundamental difference between synchronous and asynchronous execution.

### Synchronous Code (Blocking Execution)

Synchronous code executes line by line, one after another. Think of it like ordering food at a busy restaurant where there's only one chef - each order must be completed before the next one starts.

\`\`\`javascript
console.log('Customer 1: Order placed - Pasta');
console.log('Chef: Cooking pasta... (5 mins)');
console.log('Customer 1: Pasta served!');

// Output (in order):
// Customer 1: Order placed - Pasta
// Chef: Cooking pasta... (5 mins)
// Customer 1: Pasta served!
\`\`\`

This seems simple, but there's a major problem: if cooking pasta takes 5 minutes, the entire restaurant waits. Customer 2, 3, and 4 can't even place their orders! This is called **blocking code** - everything stops until the current task finishes.

### Asynchronous Code (Non-blocking Execution)

Asynchronous code doesn't wait for tasks to complete. It's like a modern restaurant with multiple chefs - orders are taken from all customers, prepared simultaneously, and served when ready.

\`\`\`javascript
console.log('Customer 1: Order placed - Pasta');

setTimeout(() => {
  console.log('Customer 1: Pasta ready and served!');
}, 5000); // 5 seconds later

console.log('Customer 2: Order placed - Burger');
console.log('Customer 3: Order placed - Pizza');

// Output:
// Customer 1: Order placed - Pasta
// Customer 2: Order placed - Burger
// Customer 3: Order placed - Pizza
// Customer 1: Pasta ready and served! (after 5 seconds)
\`\`\`

Notice how Customer 2 and 3 could place orders immediately without waiting for Customer 1's pasta? That's the power of asynchronous programming!

## Callback Functions - The Old Way

Before promises existed, developers used callback functions to handle asynchronous operations. Let's see how this worked with our restaurant example.

\`\`\`javascript
function placeOrder(dish, callback) {
  console.log(\`Order received: \${dish}\`);
  console.log('Chef is cooking...');

  setTimeout(() => {
    const order = { dish: dish, ready: true, price: 250 };
    callback(order);
  }, 3000); // 3 seconds cooking time
}

// Usage
placeOrder('Pasta', function(order) {
  console.log(\`Your \${order.dish} is ready!  ₹\${order.price}\`);
});
\`\`\`

This works fine for simple scenarios, but what if you need to perform multiple sequential operations?

### Callback Hell - The Nightmare of Nested Callbacks

Imagine a restaurant scenario where you need to:
1. Take the order
2. Prepare the food
3. Serve it to the table
4. Process payment

With callbacks, this becomes a nightmare:

\`\`\`javascript
takeOrder('Pasta', function(order) {
  console.log('Step 1: Order taken');

  prepareFood(order, function(preparedFood) {
    console.log('Step 2: Food prepared');

    serveToTable(preparedFood, function(servedDish) {
      console.log('Step 3: Served to customer');

      processPayment(servedDish, function(receipt) {
        console.log('Step 4: Payment done');
        // Even more nesting possible... 😱
      });
    });
  });
});
\`\`\`

This deeply nested structure is called **Callback Hell** or the **Pyramid of Doom**. It's difficult to read, debug, and maintain. Error handling becomes a nightmare, and code reusability is nearly impossible.

## Promises - Modern Solution

Promises ES6 mein aaye aur unhone async code ko bahut readable bana diya.

### Promise Kya Hai?

Promise ek commitment hai jo ki future mein **resolve** (successful) ya **reject** (failed) ho sakti hai.

Example: "Main tumhe chai dunga" - yeh ek promise hai. Ho sakta hai:
- **Resolved**: Chai mil gayi ✅
- **Rejected**: Chai nahi mili ❌
- **Pending**: Abhi chai ban rahi hai ⏳

### Promise Banana

\`\`\`javascript
const chaiPromise = new Promise((resolve, reject) => {
  const chaiAvailable = true;

  setTimeout(() => {
    if (chaiAvailable) {
      resolve({ type: 'Masala Chai', temp: 'Hot' });
    } else {
      reject('Chai khatam ho gayi bhai!');
    }
  }, 2000);
});
\`\`\`

### Promise Use Karna - .then() aur .catch()

\`\`\`javascript
chaiPromise
  .then((chai) => {
    console.log('Chai mil gayi:', chai.type);
    console.log('Temperature:', chai.temp);
  })
  .catch((error) => {
    console.log('Error:', error);
  })
  .finally(() => {
    console.log('Promise complete ho gaya');
  });
\`\`\`

**Important Points:**
- \`.then()\` jab promise resolve hota hai
- \`.catch()\` jab promise reject hota hai
- \`.finally()\` har case mein chalega (success ya failure)

### Promise Chaining - Multiple Steps

Callback hell ki jagah ab clean code:

\`\`\`javascript
getChai()
  .then(chai => {
    console.log('Step 1: Chai mili');
    return getSnacks();
  })
  .then(snacks => {
    console.log('Step 2: Snacks mile');
    return getFriends();
  })
  .then(friends => {
    console.log('Step 3: Dost aa gaye');
    return enjoyParty();
  })
  .catch(error => {
    console.log('Kuch gadbad ho gayi:', error);
  });
\`\`\`

Clean aur readable! 🎉

## Async/Await - Aur Bhi Easy!

ES2017 mein \`async/await\` aaya jo asynchronous code ko **synchronous jaisa** dikhata hai.

### Basic Syntax

\`\`\`javascript
async function makeChai() {
  console.log('Chai bana raha hun...');

  const chai = await chaiPromise; // Wait karega jab tak resolve nahi hota
  console.log('Chai ready:', chai.type);

  return chai;
}

makeChai();
\`\`\`

**Important:**
- \`async\` function hamesha promise return karta hai
- \`await\` sirf \`async\` function ke andar use kar sakte ho
- \`await\` promise ke resolve/reject hone tak wait karega

### Error Handling with Try/Catch

\`\`\`javascript
async function makeChai() {
  try {
    const chai = await chaiPromise;
    console.log('Chai mil gayi:', chai);

    const snacks = await getSnacks();
    console.log('Snacks bhi aa gaye:', snacks);

    return { chai, snacks };
  } catch (error) {
    console.log('Error aaya:', error);
    throw error; // Re-throw if needed
  } finally {
    console.log('Process complete');
  }
}
\`\`\`

## Real-World Example: Weather App

Chalo ab ek real API call karte hain. Weather data fetch karenge.

### Using .then()/.catch()

\`\`\`javascript
function getWeather(city) {
  const API_KEY = 'your_api_key';
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}\`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City nahi mila');
      }
      return response.json();
    })
    .then(data => {
      console.log('Temperature:', data.main.temp);
      console.log('Weather:', data.weather[0].description);
    })
    .catch(error => {
      console.log('Error:', error.message);
    });
}

getWeather('Delhi');
\`\`\`

### Using Async/Await (Recommended!)

\`\`\`javascript
async function getWeather(city) {
  const API_KEY = 'your_api_key';
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}\`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }

    const data = await response.json();

    console.log(\`\${city} ka temperature: \${data.main.temp}K\`);
    console.log(\`Mausam: \${data.weather[0].description}\`);

    return data;
  } catch (error) {
    console.log('Kuch problem hai:', error.message);
    throw error;
  }
}

// Use karo
getWeather('Mumbai');
\`\`\`

## Multiple Promises - Promise.all()

Kabhi kabhi tumhe multiple async operations parallel mein karne hote hain.

### Promise.all() - Sab ka Intezar

Sab promises resolve hone tak wait karta hai. Agar ek bhi fail ho jaye, toh sab fail.

\`\`\`javascript
async function getAllData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);

    console.log('Users:', users);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  } catch (error) {
    console.log('Koi ek API fail ho gayi:', error);
  }
}
\`\`\`

### Promise.race() - Jo Pehle Aaye

Pehla promise jo resolve/reject ho, wahi result milega.

\`\`\`javascript
const promise1 = new Promise(resolve => setTimeout(() => resolve('Fast'), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Slow'), 3000));

Promise.race([promise1, promise2])
  .then(result => console.log(result)); // Output: "Fast"
\`\`\`

### Promise.allSettled() - Sab ka Result Chahiye

Har promise ka result milega, chahe resolve ho ya reject.

\`\`\`javascript
const promises = [
  Promise.resolve('Success 1'),
  Promise.reject('Failed'),
  Promise.resolve('Success 2')
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      console.log(result.status); // "fulfilled" ya "rejected"
      console.log(result.value || result.reason);
    });
  });
\`\`\`

## Common Mistakes - Yeh Galtiyan Mat Karo!

### ❌ Mistake 1: Await Bhool Gaye

\`\`\`javascript
// Wrong
async function getData() {
  const data = fetch('/api/users'); // Promise return hoga, data nahi!
  console.log(data); // Promise object print hoga
}

// Correct
async function getData() {
  const data = await fetch('/api/users');
  console.log(data); // Actual response milega
}
\`\`\`

### ❌ Mistake 2: Try/Catch Nahi Lagaya

\`\`\`javascript
// Wrong - Error handle nahi hua
async function getData() {
  const data = await fetch('/api/users');
  return data.json();
}

// Correct
async function getData() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error.message);
    return null;
  }
}
\`\`\`

### ❌ Mistake 3: Sequential Jahan Parallel Kar Sakte Ho

\`\`\`javascript
// Wrong - Sequential execution (slow!)
async function getMultipleData() {
  const users = await fetch('/api/users');
  const posts = await fetch('/api/posts');
  const comments = await fetch('/api/comments');
  // Total time: time1 + time2 + time3
}

// Correct - Parallel execution (fast!)
async function getMultipleData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);
  // Total time: max(time1, time2, time3)
}
\`\`\`

## Best Practices - Pro Tips

### 1. Hamesha Error Handling Karo

\`\`\`javascript
async function robustFetch(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Fetch failed:', error);
    return { success: false, error: error.message };
  }
}
\`\`\`

### 2. Loading States Manage Karo

\`\`\`javascript
let isLoading = false;

async function fetchData() {
  if (isLoading) {
    console.log('Pehle wala request abhi chal raha hai');
    return;
  }

  isLoading = true;
  try {
    const data = await fetch('/api/data');
    console.log('Data mil gaya:', data);
  } finally {
    isLoading = false;
  }
}
\`\`\`

### 3. Timeout Lagao Long Requests Par

\`\`\`javascript
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout!')), timeout)
    )
  ]);
}

// Usage
try {
  const data = await fetchWithTimeout('/api/slow-endpoint', 3000);
} catch (error) {
  console.log('3 second se zyada laga:', error);
}
\`\`\`

## Practice Project: Movie Search App

Chalo ab seekha hua apply karte hain!

\`\`\`javascript
class MovieApp {
  constructor() {
    this.API_KEY = 'your_omdb_api_key';
    this.baseURL = 'https://www.omdbapi.com/';
  }

  async searchMovie(title) {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';

    try {
      const response = await fetch(
        \`\${this.baseURL}?apikey=\${this.API_KEY}&s=\${title}\`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      this.displayMovies(data.Search);
      return data.Search;

    } catch (error) {
      this.showError(error.message);
      return null;
    } finally {
      searchBtn.disabled = false;
      searchBtn.textContent = 'Search';
    }
  }

  async getMovieDetails(imdbID) {
    try {
      const response = await fetch(
        \`\${this.baseURL}?apikey=\${this.API_KEY}&i=\${imdbID}\`
      );
      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      return data;
    } catch (error) {
      console.error('Details nahi mile:', error);
      return null;
    }
  }

  displayMovies(movies) {
    const container = document.getElementById('movies-container');
    container.innerHTML = movies.map(movie => \`
      <div class="movie-card" onclick="app.getMovieDetails('\${movie.imdbID}')">
        <img src="\${movie.Poster}" alt="\${movie.Title}">
        <h3>\${movie.Title}</h3>
        <p>\${movie.Year}</p>
      </div>
    \`).join('');
  }

  showError(message) {
    const container = document.getElementById('movies-container');
    container.innerHTML = \`<p class="error">Error: \${message}</p>\`;
  }
}

// Initialize
const app = new MovieApp();
\`\`\`

## Summary - Quick Revision

**Promises:**
- \`.then()\` for success
- \`.catch()\` for errors
- \`.finally()\` for cleanup
- Chainable hai

**Async/Await:**
- Cleaner syntax
- \`try/catch\` for errors
- Top-level await supported (modern browsers)
- Always returns a promise

**Multiple Promises:**
- \`Promise.all()\` - sab chahiye
- \`Promise.race()\` - jo pehle aaye
- \`Promise.allSettled()\` - sab ka status chahiye

## Next Steps

Ab tumhe async JavaScript ka solid foundation mil gaya hai. Aage:

1. Build karohttps Weather App with real API
2. Movie/Recipe finder banao
3. GitHub profile viewer create karo
4. Real-time chat application try karo

[Explore Projects →](/projects)

## Resources

- [MDN - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info - Async](https://javascript.info/async)

Bas itna yaad rakho: **Practice karo, build karo, repeat karo!**

Chai pi lo aur code karo! Happy coding! ☕🚀
    `,

    tags: ["javascript", "async", "promises", "tutorial", "hindi", "async-await", "fetch-api"],
    relatedProjects: [],
    featured: true,
    views: 0
  }
];

// ============================================
// FILTER HELPERS
// ============================================

export const blogCategories = ["All", "Tutorial", "Guide", "Tips"];

export function getBlogBySlug(slug) {
  return blogs.find(blog => blog.slug === slug);
}

export function getBlogsByCategory(category) {
  if (category === "All") return blogs;
  return blogs.filter(blog => blog.category === category);
}

export function getFeaturedBlogs() {
  return blogs.filter(blog => blog.featured);
}

export function searchBlogs(query) {
  const q = query.toLowerCase();
  return blogs.filter(blog =>
    blog.title.toLowerCase().includes(q) ||
    blog.excerpt.toLowerCase().includes(q) ||
    blog.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

export function getRelatedBlogs(currentBlog, limit = 3) {
  return blogs
    .filter(blog => blog.id !== currentBlog.id)
    .filter(blog =>
      blog.category === currentBlog.category ||
      blog.tags.some(tag => currentBlog.tags.includes(tag))
    )
    .slice(0, limit);
}
