#!/usr/bin/env node

/**
 * Blog Migration Script
 * Extracts blogs from old blogs.js and creates individual files
 * Run: node scripts/migrate-blogs.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const blogsJsPath = path.join(__dirname, '../src/data/blogs.js');
const blogsDir = path.join(__dirname, '../src/data/blogs');

console.log('🚀 Starting blog migration...\n');

// Read the old blogs.js file
const blogsContent = fs.readFileSync(blogsJsPath, 'utf8');

// Extract the blogs array using regex
const blogsArrayMatch = blogsContent.match(/export const blogs = \[([\s\S]*)\];/);

if (!blogsArrayMatch) {
  console.error('❌ Could not find blogs array in blogs.js');
  process.exit(1);
}

// Parse individual blog objects
// This is a simple extraction - adjust if needed
const blogsString = blogsArrayMatch[1];

// Split by blog ID to separate individual blogs
const blogRegex = /{[\s\S]*?id:\s*(\d+),[\s\S]*?views:\s*\d+\s*}/g;
const blogs = [];
let match;

while ((match = blogRegex.exec(blogsString)) !== null) {
  const blogId = match[1];
  const blogObject = match[0];

  if (blogId !== '6') { // Skip ID 6 (already migrated)
    blogs.push({
      id: blogId,
      content: blogObject
    });
  }
}

console.log(`✅ Found ${blogs.length} blogs to migrate (excluding ID 6)\n`);

// Blog name mappings
const blogNames = {
  '1': 'bmi-calculator',
  '2': 'todo-app',
  '3': 'javascript-projects-2025',
  '4': 'learn-web-development',
  '5': 'localstorage-guide'
};

// Variable name mappings
const varNames = {
  '1': 'bmiCalculatorBlog',
  '2': 'todoAppBlog',
  '3': 'javascriptProjects2025Blog',
  '4': 'learnWebDevelopmentBlog',
  '5': 'localStorageGuideBlog'
};

// Create individual blog files
blogs.forEach(blog => {
  const fileName = blogNames[blog.id];
  const varName = varNames[blog.id];

  if (!fileName || !varName) {
    console.warn(`⚠️  Skipping blog ID ${blog.id} - no name mapping`);
    return;
  }

  const filePath = path.join(blogsDir, `${fileName}.js`);

  // Create file content
  const fileContent = `// Blog Post ID ${blog.id}
// Author: Ashwani
// Auto-migrated from blogs.js

export const ${varName} = ${blog.content};
`;

  // Write file
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`✅ Created: ${fileName}.js`);
});

console.log('\n✨ Migration complete!');
console.log('\nNext steps:');
console.log('1. Update src/data/blogs/index.js to import all blogs');
console.log('2. Test that all blogs load correctly');
console.log('3. Remove old blogs.js file');
