// ============================================
// BLOG INDEX - Central Import File
// ============================================
// This file combines new modular blogs with old blogs.js structure
// Hybrid approach: Old blogs still work, new blogs use modular structure

// New modular blogs
import { weatherAppBlog } from './weather-app-fetch-api';
import { bmiCalculatorBlog } from './bmi-calculator';
import { asyncJavaScriptBlog } from './async-javascript';
import { asyncJavaScriptHindiBlog } from './async-javascript-hindi';
import { localStorageHindiBlog } from './localstorage-hindi';
import { javascriptBasicsHindiBlog } from './javascript-basics-hindi';
import { domManipulationHindiBlog } from './dom-manipulation-hindi';

// Old blogs (temporary - will be migrated gradually)
import { blogs as oldBlogs } from '../blogs';

// ============================================
// BLOGS ARRAY - Hybrid System
// ============================================
// Combines new modular blogs with old structure
// Old blogs are filtered to exclude already migrated ones
export const blogs = [
  weatherAppBlog,             // ID 11 - Weather App + Fetch API Tutorial
  domManipulationHindiBlog,  // ID 10 - DOM Manipulation Hindi Tutorial
  javascriptBasicsHindiBlog,  // ID 9 - JavaScript Basics Hindi Tutorial
  localStorageHindiBlog,      // ID 8 - LocalStorage Complete Guide Hindi
  asyncJavaScriptHindiBlog,   // ID 7 - Async JavaScript Hindi Tutorial
  asyncJavaScriptBlog,        // ID 6 - Migrated to modular structure
  bmiCalculatorBlog,          // ID 1 - Migrated to modular structure
  ...oldBlogs.filter(blog => ![6, 1].includes(blog.id))  // IDs 2-5 - Still in old structure
];

// Future: As you migrate blogs, add them here and filter from oldBlogs
// Example:
// import { bmiCalculatorBlog } from './bmi-calculator';
// export const blogs = [
//   asyncJavaScriptBlog,
//   bmiCalculatorBlog,
//   ...oldBlogs.filter(blog => ![6, 1].includes(blog.id))
// ];

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
