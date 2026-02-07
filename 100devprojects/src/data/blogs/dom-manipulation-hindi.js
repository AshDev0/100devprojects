// ============================================
// DOM MANIPULATION HINDI BLOG - MARKDOWN FORMAT
// ============================================
// Complete DOM Guide in Hinglish (Hitesh Choudhary Style)
// Formatted exactly like async-javascript-hindi.js

export const domManipulationHindiBlog = {
  id: 10,
  title: "DOM Manipulation JavaScript Hindi: Complete Guide with Real Examples",
  slug: "dom-manipulation-javascript-hindi-tutorial",
  category: "Tutorial",
  author: "Ashwani",
  datePublished: "2026-01-21",
  readTime: "22 min read",

  meta: {
    title: "DOM Manipulation JavaScript Hindi Tutorial | Complete Guide 2026",
    description: "DOM Manipulation seekho Hindi mein! getElementById, querySelector, createElement, Event Handling - sab kuch real examples ke saath. Beginners ke liye perfect guide.",
    keywords: [
      "dom manipulation javascript hindi",
      "dom tutorial hindi",
      "javascript dom hindi",
      "document object model hindi",
      "dom methods javascript",
      "getelementbyid hindi",
      "queryselector hindi tutorial",
      "javascript dom events hindi",
      "dom manipulation for beginners",
      "javascript tutorial hindi 2026"
    ],
    canonicalUrl: "https://100devprojects.in/blog/dom-manipulation-javascript-hindi-tutorial"
  },

  excerpt: "DOM Manipulation JavaScript ka sabse important concept hai! Is guide mein seekho getElementById, querySelector, createElement, Events - sab kuch Hindi mein real examples ke saath.",

  content: `
# DOM Manipulation JavaScript Hindi: Complete Guide with Real Examples

Hanji developers! Kaise ho sab? Aaj hum baat karenge JavaScript ke **sabse powerful aur practical topic** ki - **DOM Manipulation**!

Dekho bhai, jab bhi tum kisi website pe button click karte ho aur kuch change hota hai - wo sab DOM Manipulation hai! Instagram pe like button red hota hai, Swiggy pe cart count badhta hai, Amazon pe products filter hote hain - ye sab DOM ki karamaat hai.

Aaj hum isko ekdum practical examples ke saath samjhenge - real projects banayenge, common mistakes dekhenge, aur pro tips bhi milenge. Toh chalo shuru karte hain!

---

## Table of Contents

1. [DOM Kya Hai? - Basics](#dom-kya-hai)
2. [DOM Tree Structure Samjho](#dom-tree-structure)
3. [Elements Select Karna - 4 Methods](#elements-select-karna)
4. [Elements Modify Karna](#elements-modify-karna)
5. [Elements Create & Delete Karna](#elements-create-delete)
6. [DOM Events - User Interaction](#dom-events)
7. [Event Delegation - Smart Way](#event-delegation)
8. [DOM Traversal - Navigate Karna](#dom-traversal)
9. [Real Projects Practice](#real-projects)
10. [Common Mistakes - Avoid Karo](#common-mistakes)
11. [Best Practices aur Pro Tips](#best-practices)

---

## DOM Kya Hai? - Deep Dive {#dom-kya-hai}

Bhai, **DOM** ka matlab hai **Document Object Model**. Simple words mein samjho:

- **Document** = Tumhara HTML page
- **Object** = Har element ek object hai (div, p, button, etc.)
- **Model** = Ek tree structure jisme sab elements organized hain

### Real Life Example

**Swiggy App Analogy:**
- Jab tum "Add to Cart" click karte ho, cart count change hota hai - ye DOM manipulation hai
- Instagram pe like button red hota hai - ye bhi DOM manipulation hai
- Amazon pe filter lagao toh products change hote hain - ye bhi DOM hai!

### Browser Kaise Kaam Karta Hai?

Jab browser HTML file load karta hai, wo usse ek tree structure mein convert karta hai. Is tree ko DOM kehte hain.

\`\`\`html
<!-- Ye HTML hai -->
<html>
  <head>
    <title>Meri Website</title>
  </head>
  <body>
    <h1>Hello Bhai!</h1>
    <p>Kaise ho?</p>
  </body>
</html>
\`\`\`

Browser isse aise tree mein convert karta hai:

\`\`\`
document
└── html
    ├── head
    │   └── title
    │       └── "Meri Website"
    └── body
        ├── h1
        │   └── "Hello Bhai!"
        └── p
            └── "Kaise ho?"
\`\`\`

JavaScript se hum is tree ke kisi bhi element ko:
- **Select** kar sakte hain (pakadna)
- **Modify** kar sakte hain (change karna)
- **Create** kar sakte hain (naya banana)
- **Delete** kar sakte hain (hatana)

---

## DOM Tree Structure Samjho {#dom-tree-structure}

DOM mein har element ek **Node** hai. Different types of nodes hain:

\`\`\`javascript
// 1. Document Node - sabse top pe
console.log(document);

// 2. Element Nodes - HTML tags
// <div>, <p>, <span>, etc.

// 3. Text Nodes - text content
// "Hello Bhai!" ye text node hai

// 4. Attribute Nodes - attributes
// class="container", id="main"

// 5. Comment Nodes - HTML comments
// <!-- Ye comment hai -->
\`\`\`

### Node Relationships - Parent, Children, Siblings

\`\`\`html
<div class="parent">
  <p class="child">First</p>
  <p class="child">Second</p>
  <p class="child">Third</p>
</div>
\`\`\`

\`\`\`javascript
// Relationships samjho:
// - div hai PARENT
// - teeno p hain CHILDREN
// - p elements aapas mein SIBLINGS hain

const parent = document.querySelector('.parent');

// Parent ke children
console.log(parent.children);        // [p, p, p]
console.log(parent.childNodes);      // includes text nodes bhi

// First aur Last child
console.log(parent.firstElementChild);  // First p
console.log(parent.lastElementChild);   // Third p

// Children count
console.log(parent.childElementCount);  // 3
\`\`\`

---

## Elements Select Karna - 4 Important Methods {#elements-select-karna}

DOM manipulation ka pehla step hai element select karna. 4 main methods hain:

### Method 1: getElementById() - Sabse Fast ⚡

ID unique hoti hai, isliye ye sabse fast method hai.

\`\`\`html
<button id="submitBtn">Submit</button>
<div id="container">Main container</div>
\`\`\`

\`\`\`javascript
// ID se select karo
const btn = document.getElementById('submitBtn');
console.log(btn);  // <button id="submitBtn">Submit</button>

const container = document.getElementById('container');
console.log(container.textContent);  // "Main container"

// Agar ID nahi mili toh null milega
const notFound = document.getElementById('random');
console.log(notFound);  // null

// Null check karna zaroori hai!
if (notFound) {
  notFound.textContent = 'Found!';
} else {
  console.log('Element nahi mila');
}
\`\`\`

**Pro Tip:** getElementById sabse fast method hai kyunki ID unique hoti hai. Jab bhi single element select karna ho, ID use karo!

### Method 2: getElementsByClassName() - Multiple Elements

Class se select karna - HTMLCollection milega (array jaisa but array nahi).

\`\`\`html
<div class="card">Card 1</div>
<div class="card">Card 2</div>
<div class="card">Card 3</div>
<div class="card active">Card 4</div>
\`\`\`

\`\`\`javascript
// Class se select karo - HTMLCollection milega
const cards = document.getElementsByClassName('card');
console.log(cards);        // HTMLCollection(4)
console.log(cards.length); // 4
console.log(cards[0]);     // First card

// Loop karna hai toh
for (let i = 0; i < cards.length; i++) {
  console.log(cards[i].textContent);
}

// PROBLEM: forEach directly nahi chalega!
// cards.forEach(card => {...})  // ERROR!

// Solution 1: for loop use karo (upar dekha)

// Solution 2: Array mein convert karo
const cardsArray = Array.from(cards);
cardsArray.forEach(card => {
  console.log(card.textContent);
});

// Solution 3: Spread operator
[...cards].forEach(card => {
  console.log(card.textContent);
});
\`\`\`

### Method 3: querySelector() - CSS Selector (Most Flexible) 🎯

Ye sabse powerful method hai! CSS selectors use kar sakte ho.

\`\`\`html
<div class="container">
  <button class="btn primary">Click Me</button>
  <button class="btn secondary">Cancel</button>
  <input type="email" name="email" placeholder="Email">
  <input type="password" name="password">
</div>
\`\`\`

\`\`\`javascript
// ID se
const byId = document.querySelector('#submitBtn');

// Class se (FIRST matching element)
const byClass = document.querySelector('.btn');
console.log(byClass);  // Primary button (pehla)

// Tag se
const byTag = document.querySelector('button');

// Complex selectors
const primary = document.querySelector('.btn.primary');
const secondary = document.querySelector('.btn.secondary');
const containerBtn = document.querySelector('.container .btn');

// Attribute se
const email = document.querySelector('input[type="email"]');
const byName = document.querySelector('input[name="password"]');
const withPlaceholder = document.querySelector('input[placeholder]');

// Pseudo selectors
const firstCard = document.querySelector('.card:first-child');
const lastCard = document.querySelector('.card:last-child');
const evenCards = document.querySelector('.card:nth-child(even)');

// Descendant combinator
const divButton = document.querySelector('div button');

// Direct child
const directChild = document.querySelector('.container > .btn');
\`\`\`

### Method 4: querySelectorAll() - Multiple Elements (NodeList)

Sab matching elements select karna - NodeList milega (better than HTMLCollection).

\`\`\`javascript
// Sab matching elements select karo
const allCards = document.querySelectorAll('.card');
console.log(allCards);  // NodeList(4)

// NodeList pe directly forEach chal jata hai! 🎉
allCards.forEach(card => {
  console.log(card.textContent);
});

// Index se access
console.log(allCards[0]);   // First card
console.log(allCards[3]);   // Fourth card

// Array methods use karo
const cardTexts = [...allCards].map(card => card.textContent);
console.log(cardTexts);  // ["Card 1", "Card 2", "Card 3", "Card 4"]

// Filter kar sakte ho
const activeCards = [...allCards].filter(card => 
  card.classList.contains('active')
);

// Complex queries
const buttons = document.querySelectorAll('button.btn:not(.disabled)');
const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
\`\`\`

### Comparison Table - Kab Kya Use Karein?

| Method | Returns | Performance | forEach? | Use Case |
|--------|---------|-------------|----------|----------|
| **getElementById** | Single Element / null | Fastest ⚡ | N/A | Single element by ID |
| **getElementsByClassName** | HTMLCollection | Fast | ❌ No | Multiple by class, live |
| **querySelector** | Single Element / null | Medium | N/A | Complex CSS selector |
| **querySelectorAll** | NodeList | Medium | ✅ Yes | Multiple, static |

**Key Differences:**

\`\`\`javascript
// HTMLCollection (getElementsByClassName)
// - Live collection (DOM change hone pe auto update)
// - forEach nahi chalta

// NodeList (querySelectorAll)
// - Static collection (snapshot, DOM change se update nahi hota)
// - forEach chalta hai
\`\`\`

---

## Elements Modify Karna {#elements-modify-karna}

Element select karne ke baad usse modify karna seekho:

### 1. Text Content Change Karna

\`\`\`html
<h1 id="title">Hello World</h1>
<div id="content"><span>Nested</span> Text</div>
<p id="para">Original text</p>
\`\`\`

\`\`\`javascript
const title = document.getElementById('title');
const content = document.getElementById('content');
const para = document.getElementById('para');

// textContent - Sirf text (Fast, Safe) ✅
title.textContent = 'Namaste Duniya!';
console.log(content.textContent);  // "Nested Text" (sab text)

// innerText - Visible text only (CSS aware)
console.log(content.innerText);    // "Nested Text" (jo dikhta hai)

// innerHTML - HTML include (XSS risk! ⚠️)
content.innerHTML = '<strong>Bold</strong> Text';
console.log(content.innerHTML);  // "<strong>Bold</strong> Text"

// Differences samjho:
// textContent: Fast, ignores CSS, includes hidden text
// innerText: Slow, respects CSS (display:none check karta)
// innerHTML: HTML parse karta hai (careful with user input!)
\`\`\`

**Security Warning - XSS Attack:**

\`\`\`javascript
// ❌ WRONG - XSS vulnerable (NEVER do this!)
const userInput = '<script>alert("Hacked!");</script>';
element.innerHTML = userInput;  // Script execute ho jayega!

// ✅ RIGHT - Safe
element.textContent = userInput;  // Safe, text hi rahega
// Output: "<script>alert("Hacked!");</script>" (as plain text)

// Real example - Comment system
const userComment = getUserInput();

// WRONG
commentsDiv.innerHTML = userComment;  // DANGER!

// RIGHT
const commentP = document.createElement('p');
commentP.textContent = userComment;  // SAFE
commentsDiv.appendChild(commentP);
\`\`\`

### 2. Attributes Change Karna

\`\`\`html
<img id="profile" src="old.jpg" alt="Profile">
<a id="link" href="https://google.com">Google</a>
<input id="email" type="text" disabled>
<button id="btn" data-user-id="123">Click</button>
\`\`\`

\`\`\`javascript
const img = document.getElementById('profile');
const link = document.getElementById('link');
const input = document.getElementById('email');
const btn = document.getElementById('btn');

// getAttribute - Attribute value lo
console.log(img.getAttribute('src'));     // "old.jpg"
console.log(link.getAttribute('href'));   // "https://google.com"
console.log(btn.getAttribute('data-user-id')); // "123"

// setAttribute - Attribute set karo
img.setAttribute('src', 'new.jpg');
img.setAttribute('alt', 'New Profile Picture');
link.setAttribute('target', '_blank');

// Direct property access (preferred for standard attributes)
img.src = 'another.jpg';
img.alt = 'Another pic';
link.href = 'https://100devprojects.in';

// Boolean attributes
console.log(input.disabled);  // true
input.disabled = false;       // Enable kar diya
input.required = true;        // Required bana diya

// hasAttribute - Check karo attribute exist karta hai ya nahi
console.log(input.hasAttribute('disabled')); // false (ab)
console.log(input.hasAttribute('type'));     // true

// removeAttribute - Hata do
img.removeAttribute('alt');
input.removeAttribute('disabled');

// Data attributes (custom attributes)
console.log(btn.dataset.userId);  // "123"
btn.dataset.userId = '456';       // Change
btn.dataset.userName = 'Rahul';   // New custom attribute
\`\`\`

### 3. CSS Styles Change Karna

\`\`\`javascript
const box = document.querySelector('.box');

// Inline styles (style property)
box.style.backgroundColor = '#6366f1';
box.style.padding = '20px';
box.style.borderRadius = '8px';
box.style.color = 'white';
box.style.fontSize = '18px';
box.style.fontWeight = 'bold';

// IMPORTANT: CSS property names camelCase mein!
// background-color → backgroundColor
// font-size → fontSize
// margin-top → marginTop
// border-radius → borderRadius

// Multiple styles at once
box.style.cssText = \`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
\`;

// Get computed styles (actual rendered styles)
const styles = getComputedStyle(box);
console.log(styles.backgroundColor);  // "rgb(102, 102, 241)"
console.log(styles.width);            // "200px"
console.log(styles.fontSize);         // "18px"

// Remove inline style
box.style.backgroundColor = '';  // Remove specific
box.style.cssText = '';          // Remove all inline styles
\`\`\`

### 4. Classes Manipulate Karna (Best Practice) ✨

Inline styles se better hai CSS classes use karna!

\`\`\`css
/* CSS */
.card {
  padding: 20px;
  background: white;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card.active {
  background: #6366f1;
  color: white;
  transform: scale(1.05);
}

.card.highlight {
  border: 2px solid gold;
  box-shadow: 0 0 20px gold;
}

.hidden {
  display: none;
}

.fade-in {
  animation: fadeIn 0.5s ease;
}
\`\`\`

\`\`\`javascript
const card = document.querySelector('.card');

// classList methods - BEST WAY! ✅
card.classList.add('active');           // Class add karo
card.classList.remove('active');        // Class remove karo
card.classList.toggle('active');        // Toggle (hai toh hatao, nahi toh lagao)
card.classList.contains('active');      // Check karo (true/false)
card.classList.replace('active', 'inactive');  // Replace karo

// Multiple classes at once
card.classList.add('active', 'highlight', 'fade-in');
card.classList.remove('active', 'highlight');

// Toggle with condition (super useful!)
const isLoggedIn = true;
card.classList.toggle('premium', isLoggedIn);
// Agar isLoggedIn true hai toh add, false hai toh remove

// Real example - Dark mode toggle
const isDark = localStorage.getItem('theme') === 'dark';
document.body.classList.toggle('dark-mode', isDark);

// Check if element has class
if (card.classList.contains('active')) {
  console.log('Card is active');
}

// Get all classes as array
const classes = [...card.classList];
console.log(classes);  // ["card", "active", "highlight"]

// Old way (avoid karo! ❌)
card.className = 'card active';  // Overwrites ALL classes!
// Problem: Purane classes hat jayenge
\`\`\`

**Why classList.toggle() is Amazing:**

\`\`\`javascript
// Accordion example
accordionHeaders.forEach(header => {
  header.addEventListener('click', function() {
    // Toggle current
    this.parentElement.classList.toggle('open');
    
    // Or with condition
    const isOpen = this.parentElement.classList.contains('open');
    this.querySelector('.icon').classList.toggle('rotate', isOpen);
  });
});

// Dark mode
themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  
  // Update button
  const isDark = document.body.classList.contains('dark-mode');
  this.textContent = isDark ? '☀️' : '🌙';
  
  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
\`\`\`

---

## Elements Create & Delete Karna {#elements-create-delete}

Dynamically elements banana aur hatana seekho:

### 1. Simple Element Create Karna

\`\`\`javascript
// Step 1: Element create karo
const newDiv = document.createElement('div');

// Step 2: Content aur attributes add karo
newDiv.textContent = 'Main naya div hoon!';
newDiv.classList.add('card', 'new-card');
newDiv.id = 'dynamicCard';
newDiv.setAttribute('data-id', '123');

// Step 3: Styles (optional)
newDiv.style.padding = '20px';
newDiv.style.background = '#f3f4f6';

// Step 4: DOM mein add karo
const container = document.querySelector('.container');
container.appendChild(newDiv);  // End mein add

console.log('New element added!');
\`\`\`

### 2. Complex Element - Todo List Item

\`\`\`javascript
// Todo list item create karna (realistic example)
function createTodoItem(text, id) {
  // Main li element
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.setAttribute('data-id', id);

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = \`todo-\${id}\`;
  checkbox.classList.add('todo-checkbox');

  // Label with text
  const label = document.createElement('label');
  label.htmlFor = \`todo-\${id}\`;
  label.classList.add('todo-text');
  label.textContent = text;

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('aria-label', 'Delete todo');

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.classList.add('edit-btn');

  // Sab combine karo
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

// Use karo
const todoList = document.querySelector('.todo-list');
const newTodo = createTodoItem('JavaScript seekhna hai', Date.now());
todoList.appendChild(newTodo);
\`\`\`

### 3. Insert Methods - Position Control

\`\`\`javascript
const container = document.querySelector('.container');
const newElement = document.createElement('div');
newElement.textContent = 'New Element';
newElement.classList.add('item');

// appendChild - End mein add (purana method)
container.appendChild(newElement);

// prepend - Start mein add (modern method)
container.prepend(newElement);

// insertBefore - Specific element se pehle (purana)
const reference = document.querySelector('.reference');
container.insertBefore(newElement, reference);

// Modern methods (better! ✨)
reference.before(newElement);  // Element ke pehle
reference.after(newElement);   // Element ke baad

// insertAdjacentElement - Full control
reference.insertAdjacentElement('beforebegin', newElement);
reference.insertAdjacentElement('afterbegin', newElement);
reference.insertAdjacentElement('beforeend', newElement);
reference.insertAdjacentElement('afterend', newElement);

// insertAdjacentHTML - HTML string insert
container.insertAdjacentHTML('beforeend', '<div class="item">HTML String</div>');

// Position options samjho:
// beforebegin: <element> ke pehle (sibling)
// afterbegin:  <element> ke andar, pehle child se pehle
// beforeend:   <element> ke andar, last child ke baad
// afterend:    <element> ke baad (sibling)
\`\`\`

**Visual representation:**

\`\`\`html
<!-- beforebegin -->
<div id="target">
  <!-- afterbegin -->
  <p>Existing content</p>
  <!-- beforeend -->
</div>
<!-- afterend -->
\`\`\`

### 4. Elements Delete Karna

\`\`\`javascript
const elementToRemove = document.querySelector('.remove-me');

// Modern way (recommended) ✅
elementToRemove.remove();

// Old way (parent se remove) - avoid karo
elementToRemove.parentNode.removeChild(elementToRemove);

// Sab children remove karo
const container = document.querySelector('.container');

// Method 1: innerHTML (fast but loses event listeners)
container.innerHTML = '';

// Method 2: Loop se remove (proper way)
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

// Method 3: Modern
container.replaceChildren();  // Sab children hata do

// Specific child remove
const firstChild = container.firstElementChild;
firstChild.remove();

// Conditional remove
const inactiveCards = document.querySelectorAll('.card:not(.active)');
inactiveCards.forEach(card => card.remove());
\`\`\`

### 5. Replace Elements

\`\`\`javascript
const oldElement = document.querySelector('.old');
const newElement = document.createElement('div');
newElement.textContent = 'New Element';
newElement.classList.add('new');

// replaceChild (old way)
const container = document.querySelector('.container');
container.replaceChild(newElement, oldElement);

// replaceWith (modern way) ✅
oldElement.replaceWith(newElement);

// Replace with HTML string
oldElement.outerHTML = '<div class="replaced">Replaced!</div>';
\`\`\`

### 6. Clone Elements

\`\`\`javascript
const original = document.querySelector('.card');

// Shallow clone (sirf element, children nahi)
const shallowClone = original.cloneNode(false);
console.log(shallowClone.children.length);  // 0

// Deep clone (element + sab children) ✅
const deepClone = original.cloneNode(true);
console.log(deepClone.children.length);  // Same as original

// Clone ko modify karo before adding
deepClone.id = 'cloned-card';
deepClone.querySelector('.title').textContent = 'Cloned Card';

// Add to DOM
document.body.appendChild(deepClone);

// Real use case - Template pattern
const template = document.querySelector('#card-template');
function addCard(data) {
  const card = template.cloneNode(true);
  card.querySelector('.title').textContent = data.title;
  card.querySelector('.desc').textContent = data.description;
  document.querySelector('.cards').appendChild(card);
}
\`\`\`

---

## DOM Events - User Interaction Handle Karna {#dom-events}

Events se user actions handle karte hain - clicks, typing, scrolling, etc.

### 1. addEventListener - Best Practice ✅

\`\`\`javascript
const button = document.querySelector('.btn');

// Basic syntax
button.addEventListener('click', function() {
  console.log('Button clicked!');
});

// Arrow function ke saath
button.addEventListener('click', () => {
  console.log('Arrow function style!');
});

// Named function (better for removal)
function handleClick() {
  console.log('Named function!');
}
button.addEventListener('click', handleClick);

// Event remove karna
button.removeEventListener('click', handleClick);

// Multiple listeners - sab chalenge!
button.addEventListener('click', handler1);
button.addEventListener('click', handler2);
button.addEventListener('click', handler3);
\`\`\`

**Why addEventListener is Better:**

\`\`\`javascript
// Old way (avoid karo) ❌
button.onclick = function() {
  console.log('Old way');
};
// Problem: Only ONE function attach ho sakta hai
// Overwrite ho jata hai

// New way (recommended) ✅
button.addEventListener('click', handler1);
button.addEventListener('click', handler2);
// Both will execute!
\`\`\`

### 2. Event Object - Sari Information

\`\`\`javascript
button.addEventListener('click', function(event) {
  // event object mein sab info hai
  console.log(event.type);          // "click"
  console.log(event.target);        // clicked element
  console.log(event.currentTarget); // event listener wala element
  console.log(event.timeStamp);     // timestamp

  // Mouse position
  console.log(event.clientX);       // X (viewport ke relative)
  console.log(event.clientY);       // Y (viewport ke relative)
  console.log(event.pageX);         // X (page ke relative)
  console.log(event.pageY);         // Y (page ke relative)
  console.log(event.offsetX);       // X (element ke relative)
  console.log(event.offsetY);       // Y (element ke relative)

  // Mouse buttons
  console.log(event.button);        // 0=left, 1=middle, 2=right

  // Modifier keys
  console.log(event.ctrlKey);       // Ctrl pressed?
  console.log(event.shiftKey);      // Shift pressed?
  console.log(event.altKey);        // Alt pressed?
  console.log(event.metaKey);       // Cmd/Win pressed?
});

// Keyboard events
document.addEventListener('keydown', function(e) {
  console.log(e.key);          // "a", "Enter", "Escape"
  console.log(e.code);         // "KeyA", "Enter", "Escape"
  console.log(e.keyCode);      // 65, 13, 27 (deprecated)
  console.log(e.ctrlKey);      // Ctrl pressed?
  
  // Shortcuts check karna
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    console.log('Save shortcut!');
  }
});
\`\`\`

### 3. Common Events - Complete List

\`\`\`javascript
const element = document.querySelector('.element');

// === MOUSE EVENTS ===
element.addEventListener('click', handler);       // Single click
element.addEventListener('dblclick', handler);    // Double click
element.addEventListener('mouseenter', handler);  // Mouse enter (no bubble)
element.addEventListener('mouseleave', handler);  // Mouse leave (no bubble)
element.addEventListener('mouseover', handler);   // Mouse over (bubbles)
element.addEventListener('mouseout', handler);    // Mouse out (bubbles)
element.addEventListener('mousemove', handler);   // Mouse move
element.addEventListener('mousedown', handler);   // Mouse button press
element.addEventListener('mouseup', handler);     // Mouse button release

// === KEYBOARD EVENTS ===
document.addEventListener('keydown', handler);    // Key press down
document.addEventListener('keyup', handler);      // Key release
document.addEventListener('keypress', handler);   // Deprecated! Use keydown

// === FORM EVENTS ===
const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', handler);         // Form submit
input.addEventListener('input', handler);         // Input change (real-time)
input.addEventListener('change', handler);        // Value change (on blur)
input.addEventListener('focus', handler);         // Input focus
input.addEventListener('blur', handler);          // Focus lost
input.addEventListener('focusin', handler);       // Focus (bubbles)
input.addEventListener('focusout', handler);      // Blur (bubbles)

// === WINDOW/DOCUMENT EVENTS ===
window.addEventListener('load', handler);         // Page fully loaded (images etc)
window.addEventListener('DOMContentLoaded', handler); // DOM ready (faster)
window.addEventListener('resize', handler);       // Window resize
window.addEventListener('scroll', handler);       // Scroll
window.addEventListener('beforeunload', handler); // Before page unload

// === DRAG EVENTS ===
element.addEventListener('drag', handler);
element.addEventListener('dragstart', handler);
element.addEventListener('dragend', handler);
element.addEventListener('dragenter', handler);
element.addEventListener('dragleave', handler);
element.addEventListener('dragover', handler);
element.addEventListener('drop', handler);

// === TOUCH EVENTS (Mobile) ===
element.addEventListener('touchstart', handler);
element.addEventListener('touchmove', handler);
element.addEventListener('touchend', handler);
element.addEventListener('touchcancel', handler);
\`\`\`

### 4. Real World Examples

**Example 1: Form Validation**

\`\`\`javascript
const form = document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', function(e) {
  e.preventDefault();  // Default submit roko

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Validation
  if (!email.includes('@')) {
    alert('Valid email daalo bhai!');
    emailInput.focus();
    return;
  }

  if (password.length < 6) {
    alert('Password 6 characters se bada hona chahiye!');
    passwordInput.focus();
    return;
  }

  // Success
  console.log('Form submitted:', { email, password });
  // API call karo...
});

// Real-time validation
emailInput.addEventListener('input', function(e) {
  const email = e.target.value;
  const isValid = email.includes('@') && email.includes('.');
  
  if (isValid) {
    this.classList.remove('invalid');
    this.classList.add('valid');
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid');
  }
});
\`\`\`

**Example 2: Search with Debouncing**

\`\`\`javascript
const searchInput = document.querySelector('#search');
let debounceTimer;

searchInput.addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase();
  
  // Clear previous timer
  clearTimeout(debounceTimer);
  
  // Set new timer (300ms wait)
  debounceTimer = setTimeout(() => {
    console.log('Searching:', query);
    performSearch(query);
  }, 300);
});

function performSearch(query) {
  // API call ya filtering logic
  const results = allItems.filter(item => 
    item.name.toLowerCase().includes(query)
  );
  displayResults(results);
}
\`\`\`

**Example 3: Keyboard Shortcuts**

\`\`\`javascript
document.addEventListener('keydown', function(e) {
  // Ctrl + S - Save
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    console.log('Saving...');
    saveDocument();
  }

  // Ctrl + K - Search
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }

  // Escape - Close modal
  if (e.key === 'Escape') {
    closeAllModals();
  }

  // Arrow keys - Navigation
  if (e.key === 'ArrowUp') {
    navigateUp();
  } else if (e.key === 'ArrowDown') {
    navigateDown();
  }
});
\`\`\`

**Example 4: Smooth Scroll to Top**

\`\`\`javascript
const scrollTopBtn = document.querySelector('.scroll-top');

// Show/hide button based on scroll
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// Smooth scroll on click
scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
\`\`\`

### 5. Event Prevention Methods

\`\`\`javascript
element.addEventListener('click', function(e) {
  // 1. preventDefault() - Default behavior roko
  e.preventDefault();
  // Examples:
  // - Link click pe page navigate na ho
  // - Form submit na ho
  // - Right-click menu na aaye

  // 2. stopPropagation() - Event bubbling roko
  e.stopPropagation();
  // Parent ka click handler nahi chalega

  // 3. stopImmediatePropagation() - Same element ke baaki listeners bhi roko
  e.stopImmediatePropagation();
});

// Example - Prevent right-click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  console.log('Right-click disabled!');
});

// Example - Prevent form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Form submitted via AJAX instead');
});
\`\`\`

---

## Event Delegation - Smart Event Handling {#event-delegation}

Bhai ye bahut important concept hai! Jab bahut saare similar elements pe same event lagana ho, toh har ek pe listener lagane ki jagah **parent pe ek listener** lagao.

### Problem Without Delegation

\`\`\`javascript
// ❌ BAD - Har button pe listener (memory waste!)
const buttons = document.querySelectorAll('.delete-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function() {
    console.log('Delete clicked');
    this.closest('.todo-item').remove();
  });
});

// Problems:
// 1. 1000 buttons = 1000 listeners (memory waste)
// 2. Naye dynamically added buttons pe kaam nahi karega!
// 3. Remove karte time cleanup zaroori
\`\`\`

### Solution: Event Delegation ✅

\`\`\`javascript
// ✅ GOOD - Parent pe ek listener
const todoList = document.querySelector('.todo-list');

todoList.addEventListener('click', function(e) {
  // Check karo kaunsa element click hua
  
  // Delete button click
  if (e.target.classList.contains('delete-btn')) {
    const todoItem = e.target.closest('.todo-item');
    todoItem.remove();
    console.log('Todo deleted!');
  }

  // Edit button click
  if (e.target.classList.contains('edit-btn')) {
    const todoItem = e.target.closest('.todo-item');
    const text = todoItem.querySelector('.todo-text').textContent;
    editTodo(text);
  }

  // Checkbox click
  if (e.target.classList.contains('todo-checkbox')) {
    const todoItem = e.target.closest('.todo-item');
    todoItem.classList.toggle('completed');
  }
});

// Ab naye dynamically added items pe bhi automatically kaam karega! 🎉
function addNewTodo(text) {
  const newTodo = createTodoItem(text);
  todoList.appendChild(newTodo);
  // No need to attach event listeners!
}
\`\`\`

### Event Bubbling Samjho

\`\`\`html
<div class="grandparent">
  <div class="parent">
    <button class="child">Click Me</button>
  </div>
</div>
\`\`\`

\`\`\`javascript
// Jab button click hoga, event "bubble up" hoga:
// child → parent → grandparent → document → window

document.querySelector('.grandparent').addEventListener('click', () => {
  console.log('3. Grandparent clicked');
});

document.querySelector('.parent').addEventListener('click', () => {
  console.log('2. Parent clicked');
});

document.querySelector('.child').addEventListener('click', () => {
  console.log('1. Child clicked');
});

// Output (bottom to top):
// 1. Child clicked
// 2. Parent clicked
// 3. Grandparent clicked

// Bubbling rokna
document.querySelector('.child').addEventListener('click', (e) => {
  console.log('Child clicked');
  e.stopPropagation();  // Parent/Grandparent ke listeners nahi chalenge
});
\`\`\`

### Real Example - Dynamic Todo List

\`\`\`javascript
const todoList = document.querySelector('.todo-list');
const addBtn = document.querySelector('.add-todo-btn');
const inputField = document.querySelector('.todo-input');

// Event delegation - ONE listener for ALL todos
todoList.addEventListener('click', function(e) {
  const target = e.target;
  
  // Delete
  if (target.matches('.delete-btn')) {
    target.closest('.todo-item').remove();
    saveTodos();
  }
  
  // Toggle complete
  if (target.matches('.todo-checkbox')) {
    target.closest('.todo-item').classList.toggle('completed');
    saveTodos();
  }
  
  // Edit
  if (target.matches('.edit-btn')) {
    const todoItem = target.closest('.todo-item');
    const textSpan = todoItem.querySelector('.todo-text');
    const currentText = textSpan.textContent;
    
    const newText = prompt('Edit todo:', currentText);
    if (newText) {
      textSpan.textContent = newText;
      saveTodos();
    }
  }
});

// Add new todo
addBtn.addEventListener('click', function() {
  const text = inputField.value.trim();
  if (!text) return;
  
  const newTodo = createTodoItem(text, Date.now());
  todoList.appendChild(newTodo);
  inputField.value = '';
  saveTodos();
});

function saveTodos() {
  const todos = [];
  document.querySelectorAll('.todo-item').forEach(item => {
    todos.push({
      text: item.querySelector('.todo-text').textContent,
      completed: item.classList.contains('completed'),
      id: item.dataset.id
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
\`\`\`

### closest() Method - Super Useful!

\`\`\`javascript
// closest() finds nearest ancestor matching selector
button.addEventListener('click', function(e) {
  // Find nearest .card (agar button card ke andar nested hai)
  const card = e.target.closest('.card');
  
  if (card) {
    card.classList.toggle('active');
  }
});

// Real example - Table row click
table.addEventListener('click', function(e) {
  const row = e.target.closest('tr');
  if (row && row.parentElement.tagName === 'TBODY') {
    console.log('Row clicked:', row.dataset.id);
  }
});
\`\`\`

---

## DOM Traversal - Navigate Karna {#dom-traversal}

DOM tree mein navigate karna seekho - parent, children, siblings:

\`\`\`html
<ul class="list">
  <li>First</li>
  <li class="active">Second</li>
  <li>Third</li>
</ul>
\`\`\`

\`\`\`javascript
const activeItem = document.querySelector('.active');

// === PARENT ACCESS ===
console.log(activeItem.parentElement);      // <ul class="list">
console.log(activeItem.parentNode);         // Same (usually)

// Closest ancestor with specific selector
console.log(activeItem.closest('ul'));      // <ul class="list">
console.log(activeItem.closest('.container')); // Nearest .container

// === CHILDREN ACCESS ===
const list = document.querySelector('.list');

console.log(list.children);                 // HTMLCollection [li, li, li]
console.log(list.childNodes);               // NodeList (includes text nodes!)
console.log(list.childElementCount);        // 3
console.log(list.firstElementChild);        // First <li>
console.log(list.lastElementChild);         // Third <li>

// === SIBLINGS ACCESS ===
console.log(activeItem.previousElementSibling);  // First <li>
console.log(activeItem.nextElementSibling);      // Third <li>

// All previous siblings
function getAllPreviousSiblings(element) {
  const siblings = [];
  let sibling = element.previousElementSibling;
  
  while (sibling) {
    siblings.push(sibling);
    sibling = sibling.previousElementSibling;
  }
  
  return siblings;
}

// === CHECKING RELATIONSHIPS ===
console.log(list.contains(activeItem));        // true
console.log(activeItem.matches('.active'));    // true
console.log(activeItem.matches('li.active'));  // true
\`\`\`

### Practical Traversal Examples

\`\`\`javascript
// Example 1: Highlight current and adjacent items
const item = document.querySelector('.list-item.active');

item.classList.add('highlight');
item.previousElementSibling?.classList.add('adjacent');
item.nextElementSibling?.classList.add('adjacent');

// Example 2: Get all form inputs
const form = document.querySelector('form');
const inputs = form.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
  console.log(input.name, input.value);
});

// Example 3: Navigate card structure
const card = document.querySelector('.card');
const cardHeader = card.querySelector('.card-header');
const cardBody = card.querySelector('.card-body');
const cardFooter = card.querySelector('.card-footer');

// Get all buttons in card footer
const buttons = cardFooter.querySelectorAll('button');

// Example 4: Table navigation
const cell = document.querySelector('td.active');
const row = cell.closest('tr');
const table = cell.closest('table');
const tbody = cell.closest('tbody');

// Get all cells in same row
const cellsInRow = row.querySelectorAll('td');

// Get all rows in table
const allRows = table.querySelectorAll('tbody tr');
\`\`\`

---

## Real Projects Practice {#real-projects}

Ab jo seekha hai wo real projects mein apply karo:

### Project 1: Dark Mode Toggle

\`\`\`javascript
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('.icon');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.add(savedTheme + '-mode');
updateIcon();

themeToggle.addEventListener('click', function() {
  // Toggle theme
  if (body.classList.contains('dark-mode')) {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark');
  }
  
  updateIcon();
});

function updateIcon() {
  const isDark = body.classList.contains('dark-mode');
  icon.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', 
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );
}
\`\`\`

### Project 2: Accordion

\`\`\`javascript
const accordion = document.querySelector('.accordion');

accordion.addEventListener('click', function(e) {
  const header = e.target.closest('.accordion-header');
  if (!header) return;

  const item = header.parentElement;
  const content = item.querySelector('.accordion-content');
  const isActive = item.classList.contains('active');

  // Close all items (single open)
  const allItems = accordion.querySelectorAll('.accordion-item');
  allItems.forEach(i => {
    if (i !== item) {
      i.classList.remove('active');
    }
  });

  // Toggle current
  item.classList.toggle('active');
  
  // Smooth height animation (optional)
  if (!isActive) {
    content.style.maxHeight = content.scrollHeight + 'px';
  } else {
    content.style.maxHeight = '0';
  }
});
\`\`\`

### Project 3: Modal Popup

\`\`\`javascript
const modal = document.querySelector('.modal');
const openBtn = document.querySelector('.open-modal');
const closeBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.modal-overlay');

function openModal() {
  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus management
  const firstInput = modal.querySelector('input, button');
  firstInput?.focus();
}

function closeModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Escape key se close
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Trap focus inside modal (accessibility)
modal.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll(
      'button, input, textarea, select, a[href]'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});
\`\`\`

### Project 4: Tabs Component

\`\`\`javascript
const tabsContainer = document.querySelector('.tabs');
const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
const tabPanels = tabsContainer.querySelectorAll('.tab-panel');

tabsContainer.addEventListener('click', function(e) {
  const button = e.target.closest('.tab-btn');
  if (!button) return;
  
  const targetId = button.dataset.tab;
  
  // Remove active from all
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabPanels.forEach(panel => panel.classList.remove('active'));
  
  // Add active to clicked
  button.classList.add('active');
  document.getElementById(targetId).classList.add('active');
});

// Keyboard navigation (accessibility)
tabsContainer.addEventListener('keydown', function(e) {
  const currentTab = document.activeElement;
  if (!currentTab.classList.contains('tab-btn')) return;
  
  const tabs = [...tabButtons];
  const currentIndex = tabs.indexOf(currentTab);
  
  let nextIndex;
  if (e.key === 'ArrowRight') {
    nextIndex = (currentIndex + 1) % tabs.length;
  } else if (e.key === 'ArrowLeft') {
    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  } else {
    return;
  }
  
  tabs[nextIndex].click();
  tabs[nextIndex].focus();
});
\`\`\`

### Project 5: Infinite Scroll

\`\`\`javascript
const container = document.querySelector('.items-container');
const loader = document.querySelector('.loader');
let loading = false;
let page = 1;
const itemsPerPage = 10;

async function loadMoreItems() {
  if (loading) return;
  loading = true;
  loader.style.display = 'block';

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  for (let i = 0; i < itemsPerPage; i++) {
    const itemNumber = (page - 1) * itemsPerPage + i + 1;
    const item = createItem(itemNumber);
    container.appendChild(item);
  }
  
  page++;
  loading = false;
  loader.style.display = 'none';
}

function createItem(number) {
  const div = document.createElement('div');
  div.classList.add('item');
  div.innerHTML = \\\`
    <h3>Item \${number}</h3>
    <p>This is item number \${number}</p>
  \\\`;
  return div;
}

// Intersection Observer (modern way)
const observer = new IntersectionObserver((entries) => {
  const lastItem = entries[0];
  if (lastItem.isIntersecting) {
    loadMoreItems();
  }
}, {
  rootMargin: '100px'  // 100px pehle se trigger karo
});

// Observe loader
observer.observe(loader);

// Initial load
loadMoreItems();

// Old way - scroll event (less efficient)
/*
window.addEventListener('scroll', function() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMoreItems();
  }
});
*/
\`\`\`

### Project 6: Image Slider/Carousel

\`\`\`javascript
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const prevBtn = slider.querySelector('.prev');
const nextBtn = slider.querySelector('.next');
const dotsContainer = slider.querySelector('.dots');

let currentSlide = 0;
const totalSlides = slides.length;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  dot.dataset.slide = i;
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

function goToSlide(n) {
  currentSlide = n;
  
  // Update slides
  slides.forEach((slide, i) => {
    slide.style.transform = \`translateX(\${(i - currentSlide) * 100}%)\`;
  });
  
  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
  
  // Update buttons
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Button clicks
prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  }
});

// Dot clicks (event delegation)
dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dot')) {
    goToSlide(Number(e.target.dataset.slide));
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// Auto play (optional)
let autoplayInterval;
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(0);  // Loop back
    }
  }, 3000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Pause on hover
slider.addEventListener('mouseenter', stopAutoplay);
slider.addEventListener('mouseleave', startAutoplay);

// Initialize
goToSlide(0);
startAutoplay();
\`\`\`

---

## Common Mistakes - Avoid Karo! {#common-mistakes}

### Mistake 1: null Check Nahi Karna ❌

\`\`\`javascript
// WRONG - Element nahi mila toh crash!
const element = document.querySelector('.not-exist');
element.textContent = 'Hello';  // ERROR: Cannot read property of null

// RIGHT - Always check ✅
const element = document.querySelector('.not-exist');
if (element) {
  element.textContent = 'Hello';
} else {
  console.log('Element not found');
}

// Modern way - Optional chaining
element?.textContent = 'Hello';  // No error if element is null

// Null coalescing
const text = element?.textContent ?? 'Default text';
\`\`\`

### Mistake 2: innerHTML mein User Input ❌

\`\`\`javascript
// WRONG - XSS Attack possible! 🚨
const userInput = '<script>alert("Hacked!")</script>';
element.innerHTML = userInput;  // Script execute ho jayega!

// Another example
const userName = '<img src=x onerror="alert(\'XSS\')">';
element.innerHTML = \`Welcome \${userName}\`;  // DANGER!

// RIGHT - textContent use karo ✅
element.textContent = userInput;  // Safe, text hi rahega
// Output: "<script>alert("Hacked!")</script>" (as plain text)

// Or sanitize input
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
element.innerHTML = sanitizeHTML(userInput);
\`\`\`

### Mistake 3: Loop mein Event Listeners ❌

\`\`\`javascript
// WRONG - 1000 buttons = 1000 listeners (memory waste)
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function() {
    console.log('Clicked');
  });
});

// RIGHT - Event Delegation ✅
const container = document.querySelector('.container');
container.addEventListener('click', function(e) {
  if (e.target.matches('.btn')) {
    console.log('Clicked');
  }
});
\`\`\`

### Mistake 4: DOMContentLoaded Ignore Karna ❌

\`\`\`javascript
// WRONG - Element nahi milega agar script head mein hai
// <script src="app.js"></script> in <head>
const btn = document.querySelector('.btn');  // null!

// RIGHT Option 1 - DOMContentLoaded ✅
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.btn');  // Works!
});

// RIGHT Option 2 - Script ko body ke end mein ✅
// <script src="app.js"></script> before </body>

// RIGHT Option 3 - defer attribute ✅
// <script src="app.js" defer></script> in <head>
\`\`\`

### Mistake 5: Memory Leaks ❌

\`\`\`javascript
// WRONG - Listeners remove nahi kiye
function showModal() {
  const modal = document.querySelector('.modal');
  modal.addEventListener('click', handleClick);
  // Modal close hone pe listener remove nahi hua!
}

// RIGHT - Cleanup ✅
let clickHandler;

function showModal() {
  const modal = document.querySelector('.modal');
  clickHandler = () => console.log('Clicked');
  modal.addEventListener('click', clickHandler);
}

function hideModal() {
  const modal = document.querySelector('.modal');
  modal.removeEventListener('click', clickHandler);
}
\`\`\`

### Mistake 6: classList vs className ❌

\`\`\`javascript
// WRONG - Overwrites all classes!
element.className = 'active';  // Purane classes gayab!

// RIGHT - classList use karo ✅
element.classList.add('active');     // Add
element.classList.remove('old');     // Remove
element.classList.toggle('active');  // Toggle
\`\`\`

### Mistake 7: Live vs Static Collections ❌

\`\`\`javascript
// Live Collection - Auto updates
const divs = document.getElementsByTagName('div');
console.log(divs.length);  // 3

// Naya div add karo
document.body.appendChild(document.createElement('div'));
console.log(divs.length);  // 4 (auto updated!)

// Static Collection - Doesn't update
const divs2 = document.querySelectorAll('div');
console.log(divs2.length);  // 4

document.body.appendChild(document.createElement('div'));
console.log(divs2.length);  // Still 4 (not updated)
\`\`\`

---

## Best Practices aur Pro Tips {#best-practices}

### 1. Use Semantic HTML

\`\`\`javascript
// BAD - Generic div soup
<div class="button" onclick="doSomething()">Click</div>

// GOOD - Semantic elements
<button type="button" class="btn">Click</button>

// Benefits:
// - Better accessibility
// - SEO friendly
// - Keyboard navigation built-in
// - Screen reader friendly
\`\`\`

### 2. Cache DOM Queries

\`\`\`javascript
// BAD - Repeated queries
function updateUI() {
  document.querySelector('.title').textContent = 'New Title';
  document.querySelector('.title').style.color = 'red';
  document.querySelector('.title').classList.add('active');
}

// GOOD - Cache once
function updateUI() {
  const title = document.querySelector('.title');
  title.textContent = 'New Title';
  title.style.color = 'red';
  title.classList.add('active');
}
\`\`\`

### 3. Use Event Delegation

\`\`\`javascript
// BAD
buttons.forEach(btn => btn.addEventListener('click', handler));

// GOOD
container.addEventListener('click', e => {
  if (e.target.matches('.btn')) handler(e);
});
\`\`\`

### 4. Batch DOM Updates

\`\`\`javascript
// BAD - Multiple reflows
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  div.textContent = i;
  container.appendChild(div);  // 100 reflows!
}

// GOOD - Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  div.textContent = i;
  fragment.appendChild(div);
}
container.appendChild(fragment);  // 1 reflow!
\`\`\`

### 5. Use CSS Classes Over Inline Styles

\`\`\`javascript
// BAD
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.padding = '10px';

// GOOD
element.classList.add('highlighted');
// CSS mein .highlighted define karo
\`\`\`

### 6. Debounce Expensive Operations

\`\`\`javascript
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Use karo
const expensiveSearch = debounce(function(query) {
  // Heavy operation
}, 300);

input.addEventListener('input', e => expensiveSearch(e.target.value));
\`\`\`

### 7. Use Data Attributes

\`\`\`javascript
// HTML
<button data-user-id="123" data-action="delete">Delete</button>

// JavaScript
button.addEventListener('click', function() {
  const userId = this.dataset.userId;     // "123"
  const action = this.dataset.action;     // "delete"
  
  performAction(action, userId);
});
\`\`\`

---

## Performance Tips

### 1. Minimize Reflows and Repaints

\`\`\`javascript
// BAD - Multiple reflows
element.style.width = '100px';   // reflow
element.style.height = '100px';  // reflow
element.style.margin = '10px';   // reflow

// GOOD - Single reflow
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// Or use class
element.classList.add('sized');
\`\`\`

### 2. Use requestAnimationFrame for Animations

\`\`\`javascript
// BAD
setInterval(() => {
  element.style.left = element.offsetLeft + 1 + 'px';
}, 16);

// GOOD
function animate() {
  element.style.left = element.offsetLeft + 1 + 'px';
  if (element.offsetLeft < 500) {
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);
\`\`\`

### 3. Lazy Load Images

\`\`\`javascript
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
\`\`\`

---

## Quick Reference Cheatsheet

\`\`\`javascript
// ========== SELECT ELEMENTS ==========
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('.class')
document.getElementsByClassName('class')
document.getElementsByTagName('div')

// ========== MODIFY CONTENT ==========
element.textContent = 'text'              // Safe text
element.innerHTML = '<b>html</b>'         // HTML (careful!)
element.value = 'value'                   // Form inputs

// ========== ATTRIBUTES ==========
element.getAttribute('href')
element.setAttribute('href', 'url')
element.removeAttribute('href')
element.hasAttribute('href')
element.dataset.userId                    // data-user-id

// ========== STYLES ==========
element.style.color = 'red'
element.style.backgroundColor = '#fff'
getComputedStyle(element).color

// ========== CLASSES ==========
element.classList.add('class')
element.classList.remove('class')
element.classList.toggle('class')
element.classList.contains('class')
element.classList.replace('old', 'new')

// ========== CREATE/DELETE ==========
document.createElement('div')
parent.appendChild(child)
element.remove()
element.replaceWith(newElement)
element.cloneNode(true)

// ========== EVENTS ==========
element.addEventListener('click', handler)
element.removeEventListener('click', handler)
e.preventDefault()
e.stopPropagation()
e.target
e.currentTarget

// ========== TRAVERSAL ==========
element.parentElement
element.children
element.firstElementChild
element.lastElementChild
element.previousElementSibling
element.nextElementSibling
element.closest('.selector')
\`\`\`

---

## Summary - Key Takeaways

Dekho bhai, DOM Manipulation master karne ke liye ye cheezein yaad rakho:

**Core Concepts:**
1. **DOM** ek tree structure hai - har HTML element ek node hai
2. **Select** karne ke liye querySelector family sabse flexible hai
3. **Modify** karte time textContent > innerHTML (security!)
4. **Classes** use karo inline styles se better hain
5. **Event Delegation** memory efficient hai aur dynamic elements handle karta hai

**Best Practices:**
- Null checks hamesha karo
- User input ko innerHTML mein KABHI na dalo
- DOM queries cache karo
- Batch updates karo
- Event delegation use karo
- CSS classes prefer karo inline styles se

**Performance:**
- Reflows minimize karo
- DocumentFragment use karo bulk inserts ke liye
- Debounce expensive operations
- Intersection Observer for lazy loading

**Common Pitfalls Avoid Karo:**
- ❌ null checks skip karna
- ❌ XSS vulnerabilities (innerHTML + user input)
- ❌ Memory leaks (listeners remove nahi karna)
- ❌ Loop mein listeners lagana
- ❌ Repeated DOM queries

---

## Aage Kya Seekhein?

DOM Manipulation master karne ke baad ye topics explore karo:

1. **Async JavaScript** - Promises, async/await, API calls
2. **Local Storage & Session Storage** - Data persistence
3. **Form Validation** - Advanced validation techniques
4. **Web APIs** - Intersection Observer, Fetch API, etc.
5. **Performance Optimization** - Critical rendering path
6. **Modern Frameworks** - React, Vue (ye bhi DOM manipulate karte hain!)

---

## Practice Projects Banao

In concepts ko master karne ke liye ye projects try karo:

1. **Todo List App** - Full CRUD operations
2. **Weather Dashboard** - API integration
3. **Image Gallery** - Lightbox, filtering
4. **Quiz App** - Dynamic questions
5. **Calculator** - Event handling
6. **Modal Library** - Reusable components
7. **Tabs Component** - Navigation
8. **Accordion FAQ** - Toggle functionality
9. **Form Validator** - Real-time validation
10. **Infinite Scroll** - Pagination

[Explore All Projects →](/projects)

---

## Useful Resources

- **MDN Web Docs**
  - [DOM Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
  - [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
  - [Events](https://developer.mozilla.org/en-US/docs/Web/Events)

- **JavaScript.info**
  - [DOM Navigation](https://javascript.info/dom-navigation)
  - [Modifying Document](https://javascript.info/modifying-document)
  - [Event Delegation](https://javascript.info/event-delegation)

- **W3Schools**
  - [DOM Methods](https://www.w3schools.com/js/js_htmldom_methods.asp)
  - [DOM Events](https://www.w3schools.com/js/js_htmldom_events.asp)

---

## Conclusion

Bhai, DOM Manipulation JavaScript ka sabse practical aur important concept hai. Bina iske aap koi bhi interactive website nahi bana sakte.

**Remember:**
- Practice is key! Roz code karo, projects banao
- Console mein experiment karo - try different methods
- DevTools use karo debugging ke liye
- Real projects banao - theory se practice better hai
- Mistakes karo aur unse seekho

DOM manipulation ek baar samajh aa gaya toh:
- ✅ Koi bhi interactive feature bana sakte ho
- ✅ Frameworks samajhna easy ho jayega
- ✅ Client-side development master kar loge
- ✅ Job interviews ace kar loge

**Sabse important baat - Practice, practice, practice!**

Real projects banao, break karo, fix karo - yahi best way hai seekhne ka. Stack Overflow pe answers padhna, GitHub pe code explore karna, aur apne projects ko gradually improve karte rahna.

Happy Coding! 🚀

**Questions? Doubts? Comments mein batao!**

---

*Keep Learning, Keep Building! 💪*
  `,

  tags: [
    "javascript",
    "dom",
    "dom-manipulation",
    "tutorial",
    "hindi",
    "hinglish",
    "web-development",
    "beginners",
    "events",
    "queryselector"
  ],
  
  relatedProjects: [
    "todo-list-app",
    "modal-component",
    "accordion-faq"
  ],
  
  views: 0
};
  