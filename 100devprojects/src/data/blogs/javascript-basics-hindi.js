// Blog Post: JavaScript Basics Hindi Tutorial
// Author: Ashwani
// Created: 2026-01-21
// Style: Hitesh Choudhary inspired - Hinglish

export const javascriptBasicsHindiBlog = {
  id: 9,
  title: "JavaScript Basics Hindi: Variables, Functions, Loops Complete Guide",
  slug: "javascript-basics-hindi-tutorial",
  category: "Tutorial",
  author: "Ashwani",
  datePublished: "2026-01-21",
  readTime: "25 min read",

  meta: {
    title: "JavaScript Basics Hindi Tutorial 2026 | Variables, Functions, Loops",
    description: "JavaScript seekho Hindi mein! Variables, Data Types, Functions, Loops, Arrays - Complete beginner guide with practical examples. Coding journey yahan se shuru karo!",
    keywords: [
      "javascript basics hindi",
      "javascript tutorial hindi",
      "javascript for beginners hindi",
      "javascript variables hindi",
      "javascript functions hindi",
      "javascript loops hindi",
      "learn javascript hindi",
      "javascript kaise sikhe",
      "javascript in hindi 2026",
      "web development hindi"
    ],
    canonicalUrl: "https://100devprojects.in/blog/javascript-basics-hindi-tutorial"
  },

  excerpt: "JavaScript ki complete journey Hindi mein! Variables, Data Types, Operators, Functions, Loops, Arrays - sab kuch ek hi jagah. Beginners ke liye perfect guide with real examples.",

  content: `
# JavaScript Basics Hindi: Complete Beginner Guide

Hanji developers! Swagat hai aapka JavaScript ki duniya mein. Aaj hum JavaScript ke fundamentals cover karenge - wo building blocks jo har JavaScript developer ko aane chahiye.

Dekho bhai, JavaScript web ka backbone hai. Har website jo interactive hai - buttons, forms, animations, API calls - sab JavaScript se hota hai. Toh chalo shuru karte hain!

---

## Table of Contents

1. [JavaScript Kya Hai?](#javascript-kya-hai)
2. [Variables - Data Store Karna](#variables)
3. [Data Types - Kitne Type Ka Data?](#data-types)
4. [Operators - Operations Karna](#operators)
5. [Conditional Statements - Decision Making](#conditionals)
6. [Loops - Baar Baar Karna](#loops)
7. [Functions - Reusable Code](#functions)
8. [Arrays - Multiple Values](#arrays)
9. [Objects - Real World Data](#objects)
10. [Practice Exercises](#exercises)

---

## JavaScript Kya Hai? {#javascript-kya-hai}

JavaScript ek **programming language** hai jo websites ko interactive banati hai.

### Kahan Use Hota Hai?

| Use Case | Example |
|----------|---------|
| **Frontend** | Button clicks, form validation, animations |
| **Backend** | Node.js se servers banana |
| **Mobile Apps** | React Native se apps banana |
| **Desktop Apps** | Electron se apps banana |
| **Games** | Browser games banana |

### Pehla JavaScript Code

Browser mein Console kholo (F12 ya Right Click > Inspect > Console):

\`\`\`javascript
console.log("Hello, Duniya!");
console.log("Mera naam JavaScript hai");
console.log(2 + 2);
\`\`\`

**Output:**
\`\`\`
Hello, Duniya!
Mera naam JavaScript hai
4
\`\`\`

Dekha? Itna simple hai!

---

## Variables - Data Store Karna {#variables}

Variables matlab **containers** jo data store karte hain. Socho ek dabba hai jisme tum kuch rakh sakte ho.

### 3 Ways to Declare Variables

\`\`\`javascript
// 1. let - Value change ho sakti hai (RECOMMENDED)
let name = "Rahul";
let age = 25;
age = 26; // Value change kar sakte ho

// 2. const - Value change NAHI ho sakti (RECOMMENDED for fixed values)
const PI = 3.14159;
const COUNTRY = "India";
// PI = 3.14; // ERROR! const ki value change nahi hoti

// 3. var - Purana tarika (AVOID karo)
var oldWay = "Don't use this";
\`\`\`

### let vs const - Kab Kya Use Kare?

| Situation | Use | Example |
|-----------|-----|---------|
| Value change hogi | \`let\` | Score, counter, user input |
| Value fixed rahegi | \`const\` | API URL, config, PI |
| Kabhi bhi | \`var\` | AVOID! |

### Variable Naming Rules

\`\`\`javascript
// SAHI - Correct naming
let userName = "Rahul";        // camelCase (recommended)
let user_name = "Rahul";       // snake_case (allowed)
let $price = 100;              // $ allowed
let _private = true;           // _ allowed
let user1 = "First";           // numbers allowed (not at start)

// GALAT - Will cause error
// let 1user = "Error";        // Number se start nahi ho sakta
// let user-name = "Error";    // Hyphen allowed nahi
// let let = "Error";          // Reserved words nahi use kar sakte
\`\`\`

### Best Practices

\`\`\`javascript
// Meaningful names do
let x = 25;                    // BAD - x kya hai?
let userAge = 25;              // GOOD - clear hai

// camelCase use karo
let firstname = "Rahul";       // BAD
let firstName = "Rahul";       // GOOD

// const by default use karo, let jab zaroorat ho
const API_URL = "https://api.example.com";
let currentUser = null;
\`\`\`

---

## Data Types - Kitne Type Ka Data? {#data-types}

JavaScript mein 8 data types hain. Inhe 2 categories mein divide karte hain:

### Primitive Types (7)

\`\`\`javascript
// 1. String - Text data
let name = "Rahul Sharma";
let message = 'Hello World';
let template = \`My name is \${name}\`;  // Template literal

// 2. Number - Integers and decimals
let age = 25;
let price = 99.99;
let negative = -10;

// 3. Boolean - True ya False
let isLoggedIn = true;
let hasPermission = false;

// 4. Undefined - Variable declare but no value
let futureValue;
console.log(futureValue);  // undefined

// 5. Null - Intentionally empty
let emptyValue = null;

// 6. BigInt - Very large numbers
let bigNumber = 9007199254740991n;

// 7. Symbol - Unique identifier (advanced)
let id = Symbol("id");
\`\`\`

### Non-Primitive Type (1)

\`\`\`javascript
// 8. Object - Collection of data
let user = {
    name: "Rahul",
    age: 25,
    isActive: true
};

// Arrays bhi objects hain
let colors = ["red", "green", "blue"];

// Functions bhi objects hain
function greet() {
    console.log("Hello!");
}
\`\`\`

### typeof Operator - Type Check Karo

\`\`\`javascript
console.log(typeof "Hello");      // "string"
console.log(typeof 42);           // "number"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (JavaScript bug!)
console.log(typeof {});           // "object"
console.log(typeof []);           // "object"
console.log(typeof function(){}); // "function"
\`\`\`

### Type Conversion

\`\`\`javascript
// String to Number
let str = "42";
let num = Number(str);        // 42
let num2 = parseInt(str);     // 42 (integer)
let num3 = parseFloat("3.14"); // 3.14

// Number to String
let n = 100;
let s = String(n);            // "100"
let s2 = n.toString();        // "100"

// To Boolean
Boolean(1);         // true
Boolean(0);         // false
Boolean("");        // false
Boolean("hello");   // true
Boolean(null);      // false
Boolean(undefined); // false
\`\`\`

---

## Operators - Operations Karna {#operators}

### Arithmetic Operators (Math)

\`\`\`javascript
let a = 10;
let b = 3;

console.log(a + b);   // 13 (Addition)
console.log(a - b);   // 7  (Subtraction)
console.log(a * b);   // 30 (Multiplication)
console.log(a / b);   // 3.333... (Division)
console.log(a % b);   // 1  (Modulus - remainder)
console.log(a ** b);  // 1000 (Power - 10^3)

// Increment & Decrement
let count = 5;
count++;              // 6 (count = count + 1)
count--;              // 5 (count = count - 1)
\`\`\`

### Assignment Operators

\`\`\`javascript
let x = 10;

x += 5;   // x = x + 5  => 15
x -= 3;   // x = x - 3  => 12
x *= 2;   // x = x * 2  => 24
x /= 4;   // x = x / 4  => 6
x %= 4;   // x = x % 4  => 2
\`\`\`

### Comparison Operators

\`\`\`javascript
let a = 5;
let b = "5";

// Equal (value only)
console.log(a == b);   // true (5 == "5")

// Strict Equal (value + type) - RECOMMENDED
console.log(a === b);  // false (number !== string)

// Not Equal
console.log(a != b);   // false
console.log(a !== b);  // true (strict)

// Greater/Less
console.log(10 > 5);   // true
console.log(10 < 5);   // false
console.log(10 >= 10); // true
console.log(10 <= 9);  // false
\`\`\`

**Important:** Hamesha \`===\` aur \`!==\` use karo (strict comparison)!

### Logical Operators

\`\`\`javascript
let a = true;
let b = false;

// AND - Dono true hone chahiye
console.log(a && b);  // false
console.log(true && true);  // true

// OR - Ek bhi true ho
console.log(a || b);  // true
console.log(false || false);  // false

// NOT - Ulta kar do
console.log(!a);      // false
console.log(!b);      // true

// Practical Example
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log("Drive kar sakte ho!");
}
\`\`\`

---

## Conditional Statements - Decision Making {#conditionals}

### if...else Statement

\`\`\`javascript
let age = 20;

if (age >= 18) {
    console.log("Adult ho tum!");
} else {
    console.log("Abhi bachche ho!");
}

// Multiple conditions
let marks = 75;

if (marks >= 90) {
    console.log("Grade: A+");
} else if (marks >= 80) {
    console.log("Grade: A");
} else if (marks >= 70) {
    console.log("Grade: B");
} else if (marks >= 60) {
    console.log("Grade: C");
} else {
    console.log("Grade: F - Fail");
}
\`\`\`

### Ternary Operator (Short if-else)

\`\`\`javascript
let age = 20;

// Long way
let status;
if (age >= 18) {
    status = "Adult";
} else {
    status = "Minor";
}

// Short way - Ternary
let status2 = age >= 18 ? "Adult" : "Minor";

// Nested ternary (avoid if complex)
let category = age < 13 ? "Child" : age < 20 ? "Teen" : "Adult";
\`\`\`

### switch Statement

\`\`\`javascript
let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

console.log(dayName);  // "Wednesday"
\`\`\`

---

## Loops - Baar Baar Karna {#loops}

Jab ek kaam baar baar karna ho, loops use karo.

### for Loop (Jab pata ho kitni baar)

\`\`\`javascript
// 1 se 5 tak print karo
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
// Output: 1, 2, 3, 4, 5

// Reverse loop
for (let i = 5; i >= 1; i--) {
    console.log(i);
}
// Output: 5, 4, 3, 2, 1

// Skip by 2
for (let i = 0; i <= 10; i += 2) {
    console.log(i);
}
// Output: 0, 2, 4, 6, 8, 10
\`\`\`

### while Loop (Jab condition based ho)

\`\`\`javascript
let count = 1;

while (count <= 5) {
    console.log(count);
    count++;
}
// Output: 1, 2, 3, 4, 5

// Practical: User input tak loop
let password = "";
while (password !== "secret123") {
    password = prompt("Enter password:");
}
console.log("Access granted!");
\`\`\`

### do...while Loop (Kam se kam 1 baar chalega)

\`\`\`javascript
let num = 1;

do {
    console.log(num);
    num++;
} while (num <= 5);

// Difference: ye pehle execute hoga, phir condition check hogi
let x = 10;
do {
    console.log("Ye print hoga even though condition false hai");
} while (x < 5);
\`\`\`

### for...of Loop (Arrays ke liye)

\`\`\`javascript
let fruits = ["Apple", "Banana", "Mango"];

for (let fruit of fruits) {
    console.log(fruit);
}
// Output: Apple, Banana, Mango

// With index (use entries)
for (let [index, fruit] of fruits.entries()) {
    console.log(index + ": " + fruit);
}
\`\`\`

### for...in Loop (Objects ke liye)

\`\`\`javascript
let user = {
    name: "Rahul",
    age: 25,
    city: "Mumbai"
};

for (let key in user) {
    console.log(key + ": " + user[key]);
}
// Output:
// name: Rahul
// age: 25
// city: Mumbai
\`\`\`

### break & continue

\`\`\`javascript
// break - Loop se bahar niklo
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        break;  // Loop stop at 5
    }
    console.log(i);
}
// Output: 1, 2, 3, 4

// continue - Current iteration skip karo
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue;  // Skip 3
    }
    console.log(i);
}
// Output: 1, 2, 4, 5
\`\`\`

---

## Functions - Reusable Code {#functions}

Functions ek tarah ke "machines" hain - input do, output lo.

### Function Declaration

\`\`\`javascript
// Basic function
function greet() {
    console.log("Hello!");
}

greet();  // Call the function
// Output: Hello!

// Function with parameters
function greetUser(name) {
    console.log("Hello, " + name + "!");
}

greetUser("Rahul");  // Hello, Rahul!
greetUser("Priya");  // Hello, Priya!

// Function with return value
function add(a, b) {
    return a + b;
}

let sum = add(5, 3);
console.log(sum);  // 8
\`\`\`

### Default Parameters

\`\`\`javascript
function greet(name = "Guest") {
    console.log("Hello, " + name + "!");
}

greet();          // Hello, Guest!
greet("Rahul");   // Hello, Rahul!
\`\`\`

### Arrow Functions (Modern Way)

\`\`\`javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add2 = (a, b) => {
    return a + b;
};

// Short arrow function (one line)
const add3 = (a, b) => a + b;

// Single parameter (no parentheses needed)
const square = x => x * x;

// No parameters
const sayHello = () => console.log("Hello!");

// Examples
console.log(add3(5, 3));   // 8
console.log(square(4));     // 16
sayHello();                 // Hello!
\`\`\`

### Callback Functions

\`\`\`javascript
// Function as parameter
function processUser(name, callback) {
    console.log("Processing user: " + name);
    callback();
}

function done() {
    console.log("Done!");
}

processUser("Rahul", done);
// Output:
// Processing user: Rahul
// Done!

// Inline callback
processUser("Priya", function() {
    console.log("Completed!");
});

// Arrow function callback
processUser("Amit", () => console.log("Finished!"));
\`\`\`

---

## Arrays - Multiple Values {#arrays}

Arrays ek list hai jisme multiple values store kar sakte ho.

### Creating Arrays

\`\`\`javascript
// Method 1: Array literal (recommended)
let fruits = ["Apple", "Banana", "Mango"];

// Method 2: Array constructor
let numbers = new Array(1, 2, 3, 4, 5);

// Mixed types (allowed but avoid)
let mixed = ["Hello", 42, true, null];

// Empty array
let empty = [];
\`\`\`

### Accessing Elements

\`\`\`javascript
let fruits = ["Apple", "Banana", "Mango", "Orange"];

console.log(fruits[0]);  // "Apple" (first)
console.log(fruits[1]);  // "Banana"
console.log(fruits[3]);  // "Orange" (last)
console.log(fruits[10]); // undefined (doesn't exist)

// Last element
console.log(fruits[fruits.length - 1]);  // "Orange"

// Modify element
fruits[1] = "Grapes";
console.log(fruits);  // ["Apple", "Grapes", "Mango", "Orange"]
\`\`\`

### Array Methods (Important!)

\`\`\`javascript
let fruits = ["Apple", "Banana", "Mango"];

// Add to end
fruits.push("Orange");
console.log(fruits);  // ["Apple", "Banana", "Mango", "Orange"]

// Remove from end
let last = fruits.pop();
console.log(last);    // "Orange"

// Add to beginning
fruits.unshift("Grapes");
console.log(fruits);  // ["Grapes", "Apple", "Banana", "Mango"]

// Remove from beginning
let first = fruits.shift();
console.log(first);   // "Grapes"

// Find index
console.log(fruits.indexOf("Banana"));  // 1

// Check if exists
console.log(fruits.includes("Mango"));  // true

// Length
console.log(fruits.length);  // 3

// Join to string
console.log(fruits.join(", "));  // "Apple, Banana, Mango"

// Slice (copy portion)
let some = fruits.slice(0, 2);
console.log(some);  // ["Apple", "Banana"]

// Splice (remove/add)
fruits.splice(1, 1, "Kiwi");  // At index 1, remove 1, add "Kiwi"
console.log(fruits);  // ["Apple", "Kiwi", "Mango"]
\`\`\`

### Array Loop Methods

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];

// forEach - Har element pe kuch karo
numbers.forEach(num => {
    console.log(num * 2);
});
// Output: 2, 4, 6, 8, 10

// map - Naya array banao (VERY IMPORTANT)
let doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// filter - Condition se filter karo
let even = numbers.filter(num => num % 2 === 0);
console.log(even);  // [2, 4]

// find - Pehla matching element
let found = numbers.find(num => num > 3);
console.log(found);  // 4

// reduce - Ek value mein combine karo
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);  // 15

// some - Koi bhi ek match kare
let hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);  // true

// every - Sab match kare
let allPositive = numbers.every(num => num > 0);
console.log(allPositive);  // true
\`\`\`

---

## Objects - Real World Data {#objects}

Objects real-world entities ko represent karte hain with properties.

### Creating Objects

\`\`\`javascript
// Object literal (recommended)
let user = {
    name: "Rahul",
    age: 25,
    email: "rahul@example.com",
    isActive: true
};

// Nested objects
let employee = {
    name: "Priya",
    department: "Engineering",
    address: {
        city: "Mumbai",
        pincode: "400001"
    },
    skills: ["JavaScript", "React", "Node.js"]
};
\`\`\`

### Accessing Properties

\`\`\`javascript
let user = {
    name: "Rahul",
    age: 25,
    "full name": "Rahul Sharma"
};

// Dot notation
console.log(user.name);   // "Rahul"
console.log(user.age);    // 25

// Bracket notation (for special keys)
console.log(user["full name"]);  // "Rahul Sharma"

// Dynamic key
let key = "age";
console.log(user[key]);   // 25

// Nested access
let emp = { address: { city: "Mumbai" } };
console.log(emp.address.city);  // "Mumbai"
\`\`\`

### Modifying Objects

\`\`\`javascript
let user = {
    name: "Rahul",
    age: 25
};

// Add property
user.email = "rahul@example.com";

// Modify property
user.age = 26;

// Delete property
delete user.age;

console.log(user);  // { name: "Rahul", email: "rahul@example.com" }
\`\`\`

### Object Methods

\`\`\`javascript
let user = {
    name: "Rahul",
    age: 25,
    greet: function() {
        console.log("Hello, I am " + this.name);
    },
    // Short syntax
    introduce() {
        console.log("I am " + this.age + " years old");
    }
};

user.greet();      // Hello, I am Rahul
user.introduce();  // I am 25 years old

// Object.keys() - Get all keys
console.log(Object.keys(user));  // ["name", "age", "greet", "introduce"]

// Object.values() - Get all values
console.log(Object.values(user));  // ["Rahul", 25, function, function]

// Object.entries() - Get key-value pairs
console.log(Object.entries(user));  // [["name", "Rahul"], ["age", 25], ...]
\`\`\`

### Destructuring (Modern Way)

\`\`\`javascript
let user = {
    name: "Rahul",
    age: 25,
    city: "Mumbai"
};

// Traditional way
let name = user.name;
let age = user.age;

// Destructuring (Modern)
let { name: userName, age: userAge, city } = user;
console.log(userName);  // "Rahul"
console.log(userAge);   // 25
console.log(city);      // "Mumbai"

// Default values
let { country = "India" } = user;
console.log(country);  // "India"

// Array destructuring
let colors = ["red", "green", "blue"];
let [first, second] = colors;
console.log(first);   // "red"
console.log(second);  // "green"
\`\`\`

---

## Practice Exercises {#exercises}

### Exercise 1: Grade Calculator

\`\`\`javascript
function calculateGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

console.log(calculateGrade(85));  // "A"
console.log(calculateGrade(45));  // "F"
\`\`\`

### Exercise 2: Sum of Array

\`\`\`javascript
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

console.log(sumArray([1, 2, 3, 4, 5]));  // 15
\`\`\`

### Exercise 3: Find Maximum

\`\`\`javascript
function findMax(arr) {
    return Math.max(...arr);
}

console.log(findMax([3, 7, 2, 9, 1]));  // 9
\`\`\`

### Exercise 4: Reverse String

\`\`\`javascript
function reverseString(str) {
    return str.split("").reverse().join("");
}

console.log(reverseString("hello"));  // "olleh"
\`\`\`

### Exercise 5: Count Vowels

\`\`\`javascript
function countVowels(str) {
    const vowels = "aeiouAEIOU";
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) count++;
    }
    return count;
}

console.log(countVowels("Hello World"));  // 3
\`\`\`

---

## Quick Reference Cheatsheet

\`\`\`javascript
// ========== VARIABLES ==========
let x = 10;         // Can change
const PI = 3.14;    // Cannot change

// ========== DATA TYPES ==========
"string"            // String
42                  // Number
true / false        // Boolean
null                // Null
undefined           // Undefined
{}                  // Object
[]                  // Array

// ========== OPERATORS ==========
+  -  *  /  %       // Arithmetic
=  +=  -=  *=       // Assignment
==  ===  !=  !==    // Comparison
&&  ||  !           // Logical

// ========== CONDITIONALS ==========
if (condition) { }
else if (condition) { }
else { }

condition ? true : false  // Ternary

// ========== LOOPS ==========
for (let i = 0; i < 10; i++) { }
while (condition) { }
for (let item of array) { }
for (let key in object) { }

// ========== FUNCTIONS ==========
function name(params) { return value; }
const name = (params) => value;

// ========== ARRAYS ==========
arr.push()    arr.pop()
arr.shift()   arr.unshift()
arr.map()     arr.filter()
arr.find()    arr.reduce()

// ========== OBJECTS ==========
obj.property
obj["property"]
Object.keys(obj)
Object.values(obj)
\`\`\`

---

## Aage Kya Seekhna Hai?

JavaScript basics ho gaye! Ab ye seekho:

1. **DOM Manipulation** - HTML elements control karna
2. **Events** - Click, submit, keyboard handling
3. **Async JavaScript** - Promises, async/await
4. **Fetch API** - Server se data lena
5. **ES6+ Features** - Modern JavaScript

[Explore JavaScript Projects](/projects)

---

## Conclusion

Bhai, ye the JavaScript ke basics! Yaad rakho:

- **Variables** - let aur const use karo
- **Data Types** - 8 types hain, typeof se check karo
- **Operators** - === use karo, == nahi
- **Conditionals** - if/else aur switch
- **Loops** - for, while, forEach, map
- **Functions** - Arrow functions seekho
- **Arrays** - map, filter, reduce yaad rakho
- **Objects** - Destructuring use karo

**Practice karo, projects banao, code karo!**

Happy Coding!
  `,

  tags: [
    "javascript",
    "basics",
    "tutorial",
    "hindi",
    "hinglish",
    "beginner",
    "variables",
    "functions",
    "loops",
    "arrays",
    "objects"
  ],
  relatedProjects: ["calculator", "todo-app", "quiz-app"],
  featured: true,
  views: 0
};
