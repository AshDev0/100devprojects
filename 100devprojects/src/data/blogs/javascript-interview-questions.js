// Blog Post: JavaScript Interview Questions & Answers 2026
// Author: Ashwani
// Last Updated: 2026-02-18

export const javascriptInterviewBlog = {
  id: 12,
  title: "50+ JavaScript Interview Questions & Answers (2026) — Beginner to Advanced",
  slug: "javascript-interview-questions-answers-2026",
  category: "Guide",
  author: "Ashwani",
  datePublished: "2026-02-18",
  readTime: "25 min read",

  meta: {
    title: "50+ JavaScript Interview Questions & Answers 2026 | Beginner to Advanced",
    description:
      "Top JavaScript interview questions with detailed answers for 2026. Covers closures, hoisting, event loop, promises, async/await, prototypes, ES6+, and more. Crack your next JS interview.",
    keywords: [
      "javascript interview questions 2026",
      "javascript interview questions answers",
      "javascript interview questions for freshers",
      "advanced javascript interview questions",
      "javascript coding interview",
      "javascript es6 interview questions",
      "closure javascript interview",
      "event loop javascript interview"
    ],
    canonicalUrl:
      "https://100devprojects.in/blog/javascript-interview-questions-answers-2026"
  },

  excerpt:
    "50+ most asked JavaScript interview questions with clear, detailed answers. From beginner basics to advanced concepts like closures, event loop, prototypes, and async patterns — everything you need to crack your next JS interview.",

  content: `
# 50+ JavaScript Interview Questions & Answers (2026)

Whether you're a fresher applying for your first job or an experienced developer preparing for a senior role, JavaScript interviews follow predictable patterns. This guide covers the **50+ most frequently asked JS interview questions** with clear, concise answers.

Bookmark this page — it covers everything from basic syntax to advanced concepts like the event loop, closures, and prototypes.

---

## Table of Contents

1. [Beginner Questions (1–15)](#beginner)
2. [Intermediate Questions (16–35)](#intermediate)
3. [Advanced Questions (36–50)](#advanced)
4. [Coding Questions](#coding)

---

## Beginner Questions {#beginner}

### 1. What is JavaScript?

JavaScript is a lightweight, interpreted, single-threaded programming language primarily used to make web pages interactive. It runs in the browser (client-side) and also on servers via Node.js (server-side).

### 2. What are the data types in JavaScript?

JavaScript has **8 data types**:

**Primitive (7):**
- \`string\`
- \`number\`
- \`bigint\`
- \`boolean\`
- \`undefined\`
- \`null\`
- \`symbol\`

**Non-Primitive (1):**
- \`object\` (includes Arrays, Functions, Dates, etc.)

\`\`\`javascript
typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object"  ← famous bug in JS
typeof {}          // "object"
typeof []          // "object"
typeof function(){} // "function"
\`\`\`

### 3. What is the difference between \`var\`, \`let\`, and \`const\`?

| Feature | \`var\` | \`let\` | \`const\` |
|---------|--------|--------|---------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declare | Yes | No | No |
| Re-assign | Yes | Yes | No |

\`\`\`javascript
// var is function-scoped
function example() {
  var x = 1;
  if (true) {
    var x = 2; // same variable!
    console.log(x); // 2
  }
  console.log(x); // 2
}

// let is block-scoped
function example2() {
  let x = 1;
  if (true) {
    let x = 2; // different variable
    console.log(x); // 2
  }
  console.log(x); // 1
}
\`\`\`

> **Rule of thumb:** Always use \`const\` by default. Use \`let\` when you need to reassign. Never use \`var\`.

### 4. What is \`undefined\` vs \`null\`?

- \`undefined\`: Variable declared but not assigned a value (JS sets it automatically)
- \`null\`: Intentional absence of value (you set it manually)

\`\`\`javascript
let a;
console.log(a); // undefined

let b = null;
console.log(b); // null

console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (historical bug)
\`\`\`

### 5. What is the difference between \`==\` and \`===\`?

- \`==\` (Loose equality): Compares values **after type coercion**
- \`===\` (Strict equality): Compares values **AND types** — no coercion

\`\`\`javascript
0 == false    // true  (false coerces to 0)
0 === false   // false (different types)

"" == false   // true
"" === false  // false

null == undefined  // true
null === undefined // false

// Always use === in production code
\`\`\`

### 6. What is type coercion?

Automatic conversion of one data type to another by JavaScript.

\`\`\`javascript
"5" + 3   // "53"  (number coerces to string)
"5" - 3   // 2     (string coerces to number)
"5" * "2" // 10    (both coerce to number)
true + 1  // 2     (true coerces to 1)
false + 1 // 1     (false coerces to 0)
\`\`\`

### 7. What are template literals?

Template literals (backticks) allow embedded expressions and multi-line strings:

\`\`\`javascript
const name = "Rahul";
const age = 25;

// Old way
console.log("My name is " + name + " and I am " + age + " years old.");

// Template literal
console.log(\`My name is \${name} and I am \${age} years old.\`);

// Multi-line
const html = \`
  <div>
    <h1>\${name}</h1>
  </div>
\`;
\`\`\`

### 8. What is the difference between \`function declaration\` and \`function expression\`?

\`\`\`javascript
// Function Declaration — hoisted, can be called before definition
sayHello(); // Works!
function sayHello() {
  console.log("Hello!");
}

// Function Expression — NOT hoisted
greet(); // TypeError: greet is not a function
const greet = function() {
  console.log("Hi!");
};
\`\`\`

### 9. What are arrow functions?

Shorter syntax for functions. Key differences from regular functions:
- No own \`this\` binding
- Cannot be used as constructors
- No \`arguments\` object

\`\`\`javascript
// Regular function
function add(a, b) { return a + b; }

// Arrow function
const add = (a, b) => a + b;

// Arrow function with body
const greet = (name) => {
  const message = \`Hello, \${name}!\`;
  return message;
};
\`\`\`

### 10. What is the difference between \`forEach\`, \`map\`, \`filter\`, and \`reduce\`?

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// forEach — executes for each element, returns undefined
numbers.forEach(n => console.log(n));

// map — returns NEW array with transformed elements
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter — returns NEW array with elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce — reduces array to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15
\`\`\`

### 11. What is the spread operator (\`...\`)?

Expands an iterable (array, string, object) into individual elements:

\`\`\`javascript
// Array spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Function arguments
function sum(a, b, c) { return a + b + c; }
sum(...arr1); // 6

// Clone array (shallow)
const clone = [...arr1];
\`\`\`

### 12. What is destructuring?

Extract values from arrays or properties from objects:

\`\`\`javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [3, 4, 5]

// Object destructuring
const { name, age, city = "Delhi" } = { name: "Rahul", age: 25 };
console.log(name); // "Rahul"
console.log(city); // "Delhi" (default value)

// Rename while destructuring
const { name: fullName } = { name: "Ashwani" };
console.log(fullName); // "Ashwani"
\`\`\`

### 13. What is \`NaN\` and how to check for it?

\`NaN\` (Not a Number) is returned when a mathematical operation fails:

\`\`\`javascript
console.log(0 / 0);          // NaN
console.log("hello" * 2);    // NaN
console.log(parseInt("abc")); // NaN

// NaN is the only value not equal to itself!
NaN === NaN  // false

// Correct way to check
Number.isNaN(NaN)      // true ✅
Number.isNaN("hello")  // false ✅ (doesn't coerce)
isNaN("hello")         // true ⚠️ (coerces first — less reliable)
\`\`\`

### 14. What is short-circuit evaluation?

Logical operators \`&&\` and \`||\` can "short-circuit" and return a value early:

\`\`\`javascript
// && returns first falsy value, or last value if all truthy
false && "hello"   // false
"hi" && "hello"   // "hello"
0 && "hello"      // 0

// || returns first truthy value, or last value if all falsy
false || "hello"  // "hello"
"hi" || "hello"   // "hi"
null || undefined || "default" // "default"

// Practical use
const user = null;
const name = user && user.name; // null (safe — no error)
const displayName = name || "Guest"; // "Guest"

// Nullish coalescing ?? (only null/undefined, not 0 or "")
const count = 0 ?? 10; // 0 (unlike || which would return 10)
\`\`\`

### 15. What are truthy and falsy values?

**Falsy values (only 6):** \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`

Everything else is **truthy**, including:
\`\`\`javascript
if ([]) console.log("truthy");  // empty array → truthy
if ({}) console.log("truthy");  // empty object → truthy
if ("0") console.log("truthy"); // non-empty string → truthy
if (-1) console.log("truthy");  // non-zero number → truthy
\`\`\`

---

## Intermediate Questions {#intermediate}

### 16. What is hoisting?

JavaScript moves **declarations** (not initializations) to the top of their scope during compilation.

\`\`\`javascript
// What you write:
console.log(name); // undefined (not ReferenceError!)
var name = "Rahul";

// What JS sees:
var name;          // declaration hoisted
console.log(name); // undefined
name = "Rahul";    // initialization stays here

// let/const are hoisted BUT in "Temporal Dead Zone" (TDZ)
console.log(age); // ReferenceError: Cannot access 'age' before initialization
let age = 25;

// Functions are fully hoisted
greet(); // "Hello!" — works!
function greet() { console.log("Hello!"); }
\`\`\`

### 17. What is a closure?

A closure is a function that **remembers its outer scope** even after the outer function has finished executing.

\`\`\`javascript
function makeCounter() {
  let count = 0; // this variable is "closed over"

  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// counter() still has access to count
// even though makeCounter() has already returned!
\`\`\`

**Real-world use:** Data privacy, memoization, event handlers, factory functions.

\`\`\`javascript
// Private variable pattern using closure
function bankAccount(initialBalance) {
  let balance = initialBalance; // private!

  return {
    deposit(amount) { balance += amount; },
    withdraw(amount) { balance -= amount; },
    getBalance() { return balance; }
  };
}

const account = bankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
console.log(account.balance);      // undefined — truly private!
\`\`\`

### 18. What is the event loop?

JavaScript is single-threaded. The event loop allows it to handle async operations without blocking.

**Components:**
1. **Call Stack** — executes code (LIFO)
2. **Web APIs** — handles async tasks (setTimeout, fetch, DOM events)
3. **Callback Queue (Task Queue)** — holds completed callbacks
4. **Microtask Queue** — holds Promise callbacks (higher priority)

\`\`\`javascript
console.log("1");         // synchronous → call stack

setTimeout(() => {
  console.log("2");       // async → Web API → Callback Queue
}, 0);

Promise.resolve().then(() => {
  console.log("3");       // async → Microtask Queue
});

console.log("4");         // synchronous → call stack

// Output: 1, 4, 3, 2
// Microtasks (3) always run before callbacks (2)!
\`\`\`

### 19. What is the difference between \`call\`, \`apply\`, and \`bind\`?

All three control what \`this\` refers to inside a function:

\`\`\`javascript
function greet(greeting, punctuation) {
  console.log(\`\${greeting}, \${this.name}\${punctuation}\`);
}

const user = { name: "Rahul" };

// call — invoke immediately, args passed individually
greet.call(user, "Hello", "!");   // "Hello, Rahul!"

// apply — invoke immediately, args passed as array
greet.apply(user, ["Hi", "."]);   // "Hi, Rahul."

// bind — returns NEW function with this bound, call later
const boundGreet = greet.bind(user, "Hey");
boundGreet("?"); // "Hey, Rahul?"
\`\`\`

### 20. What is \`this\` in JavaScript?

\`this\` refers to the **object that is calling the function**. Its value depends on context:

\`\`\`javascript
// Global context
console.log(this); // window (browser) / global (Node)

// Object method
const obj = {
  name: "Rahul",
  greet() {
    console.log(this.name); // "Rahul" — this = obj
  }
};

// Arrow function — inherits this from surrounding scope
const obj2 = {
  name: "Priya",
  greet: () => {
    console.log(this.name); // undefined — arrow functions have no own this
  }
};

// Constructor
function Person(name) {
  this.name = name; // this = new object being created
}
const p = new Person("Aman");
console.log(p.name); // "Aman"
\`\`\`

### 21. What is prototypal inheritance?

Every JavaScript object has a hidden \`__proto__\` property linking to another object (its prototype). This chain allows objects to inherit properties and methods.

\`\`\`javascript
const animal = {
  eat() { console.log(\`\${this.name} is eating\`); }
};

const dog = {
  name: "Bruno",
  bark() { console.log("Woof!"); }
};

// Set animal as dog's prototype
Object.setPrototypeOf(dog, animal);

dog.bark(); // "Woof!" — own method
dog.eat();  // "Bruno is eating" — inherited from animal!
\`\`\`

### 22. What is the difference between \`Promise.all\`, \`Promise.race\`, \`Promise.allSettled\`, and \`Promise.any\`?

\`\`\`javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject("Error");

// Promise.all — resolves when ALL resolve, rejects if ANY rejects
Promise.all([p1, p2])      // [1, 2]
Promise.all([p1, p3])      // rejects with "Error"

// Promise.race — resolves/rejects with FIRST settled promise
Promise.race([p1, p3])     // 1 (p1 resolves first)

// Promise.allSettled — resolves when ALL settle (never rejects)
Promise.allSettled([p1, p3])
// [{ status: "fulfilled", value: 1 }, { status: "rejected", reason: "Error" }]

// Promise.any — resolves with FIRST fulfilled, rejects if ALL reject
Promise.any([p3, p1])      // 1 (first fulfilled)
\`\`\`

### 23. What is async/await?

Syntactic sugar over Promises for writing async code that reads like synchronous code:

\`\`\`javascript
// Promise chain
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch(\`/api/posts/\${user.id}\`))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));

// async/await — same thing, cleaner
async function getUserPosts() {
  try {
    const userRes = await fetch('/api/user');
    const user = await userRes.json();

    const postsRes = await fetch(\`/api/posts/\${user.id}\`);
    const posts = await postsRes.json();

    console.log(posts);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

### 24. What is debouncing and throttling?

Both limit how often a function executes:

**Debounce:** Wait until the user **stops** doing something, then execute once.
\`\`\`javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Search input: only fire API call 300ms AFTER user stops typing
const search = debounce((query) => fetchResults(query), 300);
input.addEventListener('input', (e) => search(e.target.value));
\`\`\`

**Throttle:** Execute at most once per time period, no matter how often triggered.
\`\`\`javascript
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Scroll handler: fire at most once every 200ms
const handleScroll = throttle(() => updateScrollPosition(), 200);
window.addEventListener('scroll', handleScroll);
\`\`\`

### 25. What is event delegation?

Instead of adding event listeners to each child element, add ONE listener to the parent and use event bubbling:

\`\`\`javascript
// ❌ Bad — listener on every button (memory waste)
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// ✅ Good — one listener on parent
document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    handleClick(e.target);
  }
});
// Works even for dynamically added buttons!
\`\`\`

### 26. What is the difference between \`localStorage\`, \`sessionStorage\`, and cookies?

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Capacity | ~5MB | ~5MB | ~4KB |
| Expiry | Never (manual) | Tab close | Custom |
| Server access | No | No | Yes |
| Scope | Origin | Tab | Origin + path |

\`\`\`javascript
// localStorage — persists across sessions
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme'); // "dark"

// sessionStorage — cleared when tab closes
sessionStorage.setItem('token', 'abc123');

// Cookies — sent with every HTTP request
document.cookie = "name=Rahul; expires=...; path=/";
\`\`\`

### 27. What is the difference between deep copy and shallow copy?

\`\`\`javascript
const original = { a: 1, b: { c: 2 } };

// Shallow copy — nested objects still share reference
const shallow = { ...original };
shallow.b.c = 99;
console.log(original.b.c); // 99 — original modified!

// Deep copy — completely independent
const deep = JSON.parse(JSON.stringify(original)); // simple but has limitations
// Or: const deep = structuredClone(original); // modern, recommended

deep.b.c = 99;
console.log(original.b.c); // 2 — original safe!
\`\`\`

### 28. What is memoization?

Caching function results to avoid recalculating for the same inputs:

\`\`\`javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function
function slowSquare(n) {
  // imagine this takes 2 seconds
  return n * n;
}

const fastSquare = memoize(slowSquare);
fastSquare(10); // calculates (slow)
fastSquare(10); // returns cached result (instant)
\`\`\`

### 29. What are generators?

Functions that can be paused and resumed using \`yield\`:

\`\`\`javascript
function* counter() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = counter();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// Infinite sequence, no memory issues!
\`\`\`

### 30. What is the Temporal Dead Zone (TDZ)?

The period between entering a scope and a \`let\`/\`const\` variable being declared. Accessing a variable in TDZ throws a ReferenceError:

\`\`\`javascript
{
  // TDZ starts here for 'name'
  console.log(name); // ReferenceError!
  let name = "Rahul"; // TDZ ends here
  console.log(name); // "Rahul"
}
\`\`\`

---

## Advanced Questions {#advanced}

### 31. What is currying?

Transforming a function with multiple arguments into a series of functions each taking one argument:

\`\`\`javascript
// Normal function
function add(a, b, c) { return a + b + c; }
add(1, 2, 3); // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// Or with arrow functions
const add = a => b => c => a + b + c;

add(1)(2)(3); // 6

// Partial application
const add5 = add(5);
add5(3)(2); // 10
\`\`\`

### 32. What is the difference between \`Map\` and \`Object\`?

| Feature | Map | Object |
|---------|-----|--------|
| Key types | Any type | String/Symbol only |
| Order | Insertion order | Not guaranteed (was) |
| Size | \`.size\` property | \`Object.keys().length\` |
| Iteration | Directly iterable | Need \`Object.keys()\` |
| Performance | Better for frequent add/delete | Better for static |

\`\`\`javascript
const map = new Map();
map.set(1, 'one');          // number key
map.set({ id: 1 }, 'obj'); // object key
map.set(true, 'bool');     // boolean key

console.log(map.size); // 3
map.forEach((value, key) => console.log(key, value));
\`\`\`

### 33. What is \`WeakMap\` and \`WeakSet\`?

Like Map/Set but:
- Keys must be **objects** (WeakMap) or values must be **objects** (WeakSet)
- References are **weak** — don't prevent garbage collection
- **Not iterable** — no \`.forEach\`, no \`.size\`

\`\`\`javascript
// Use case: private data without memory leaks
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  getName() {
    return privateData.get(this).name;
  }
}

const user = new User("Rahul");
user.getName(); // "Rahul"
// When user is garbage collected, privateData entry is too
\`\`\`

### 34. What are Symbols?

Unique, immutable primitive values — guaranteed to never conflict:

\`\`\`javascript
const id1 = Symbol('id');
const id2 = Symbol('id');
id1 === id2; // false — always unique!

// Use: adding properties that won't conflict with other code
const SECRET = Symbol('secret');
const obj = {
  name: "Public",
  [SECRET]: "Private value"
};

Object.keys(obj);    // ["name"] — Symbol not included!
obj[SECRET];         // "Private value"
\`\`\`

### 35. What is the Proxy object?

Intercept and customize fundamental operations on an object:

\`\`\`javascript
const handler = {
  get(target, key) {
    return key in target ? target[key] : \`Property "\${key}" not found\`;
  },
  set(target, key, value) {
    if (typeof value !== 'number') throw new TypeError('Only numbers allowed');
    target[key] = value;
    return true;
  }
};

const scores = new Proxy({}, handler);
scores.math = 95;        // OK
scores.math;             // 95
scores.physics;          // "Property "physics" not found"
scores.english = "A+";   // TypeError: Only numbers allowed
\`\`\`

---

## Coding Questions {#coding}

These are commonly asked in technical rounds. Read them carefully before looking at the answers.

### Q1: What is the output?

\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
\`\`\`

**Answer:** \`3, 3, 3\`

\`var\` is function-scoped, so all three callbacks reference the **same \`i\`**, which is 3 by the time they run.

**Fix with \`let\`:**
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}
\`\`\`

### Q2: What is the output?

\`\`\`javascript
console.log(typeof null);
console.log(null instanceof Object);
\`\`\`

**Answer:**
\`\`\`
"object"   // famous JS bug — null is NOT an object
false      // null is not an instance of Object
\`\`\`

### Q3: Flatten a nested array

\`\`\`javascript
const nested = [1, [2, [3, [4, [5]]]]];

// Method 1: flat() with Infinity
nested.flat(Infinity); // [1, 2, 3, 4, 5]

// Method 2: Recursive
function flatten(arr) {
  return arr.reduce((acc, item) =>
    Array.isArray(item) ? acc.concat(flatten(item)) : [...acc, item]
  , []);
}
\`\`\`

### Q4: What is the output?

\`\`\`javascript
console.log(1 + "2" + "2"); // "122"
console.log(1 + +"2" + "2"); // "32"
console.log(1 + -"1" + "2"); // "02"
console.log(+"1" + +"1" + "2"); // "22"
\`\`\`

### Q5: Implement a function that runs promises sequentially

\`\`\`javascript
async function runSequentially(tasks) {
  const results = [];
  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }
  return results;
}

// Usage
const tasks = [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3),
];

runSequentially(tasks).then(console.log); // [1, 2, 3]
\`\`\`

### Q6: Remove duplicates from an array

\`\`\`javascript
const arr = [1, 2, 2, 3, 3, 4];

// Method 1: Set
[...new Set(arr)]; // [1, 2, 3, 4]

// Method 2: filter + indexOf
arr.filter((item, index) => arr.indexOf(item) === index);

// Method 3: reduce
arr.reduce((acc, item) => acc.includes(item) ? acc : [...acc, item], []);
\`\`\`

### Q7: What is the output and why?

\`\`\`javascript
const obj = {
  name: "Rahul",
  greet: function() {
    console.log(this.name);
    const inner = () => console.log(this.name);
    inner();
  }
};

obj.greet();
\`\`\`

**Answer:** \`Rahul\` then \`Rahul\`

The arrow function \`inner\` inherits \`this\` from \`greet\`, which is \`obj\`.

### Q8: Implement \`Array.prototype.flat\`

\`\`\`javascript
Array.prototype.myFlat = function(depth = 1) {
  if (depth === 0) return this.slice();
  return this.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...item.myFlat(depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
};

[1, [2, [3]]].myFlat(1);   // [1, 2, [3]]
[1, [2, [3]]].myFlat(2);   // [1, 2, 3]
\`\`\`

---

## Quick Reference: Most Common Interview Topics

| Topic | Key Points |
|-------|-----------|
| **Hoisting** | var declarations hoisted; let/const in TDZ; function declarations fully hoisted |
| **Closure** | Inner function + outer scope variables; used for private data, memoization |
| **Event Loop** | Call Stack → Web APIs → Microtask Queue → Callback Queue |
| **this** | Depends on how function is called; arrow functions inherit from surrounding scope |
| **Prototype** | Chain of objects; \`__proto__\` links; used for inheritance |
| **async/await** | Syntactic sugar for Promises; always wrap in try/catch |
| **Promises** | Pending → Fulfilled/Rejected; chain with .then/.catch |
| **== vs ===** | Always use ===; == does type coercion |
| **let vs var** | Always use let/const; var is function-scoped and hoisted |

---

## Tips for Your JS Interview

1. **Always explain your thought process** — interviewers care about HOW you think
2. **Start with brute force** — then optimize
3. **Mention edge cases** — null, empty array, negative numbers
4. **Know the Big-O** — especially for arrays (O(n)) vs objects (O(1) lookup)
5. **Practice on whiteboard/paper** — not just in IDE
6. **Build projects** — hands-on experience > memorization

---

All the projects on **100 Dev Projects** are designed to help you learn these concepts practically. The best way to ace JavaScript interviews is to build things — not just read about them.

Good luck with your interview!
  `,

  tags: [
    "javascript",
    "interview",
    "interview-questions",
    "guide",
    "closures",
    "event-loop",
    "promises",
    "es6",
    "beginner",
    "intermediate",
    "advanced"
  ],
  relatedProjects: ["weather-app", "todo-app"],
  featured: true,
  views: 0
};
