// Blog Post: BMI Calculator Tutorial
// Author: Ashwani
// Last Updated: 2024-12-20

export const bmiCalculatorBlog = {
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
};
