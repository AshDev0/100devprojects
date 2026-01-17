// Blog Post: LocalStorage Complete Guide Hindi
// Author: Ashwani
// Created: 2026-01-17
// Style: Hitesh Choudhary inspired - Hinglish

export const localStorageHindiBlog = {
  id: 8,
  title: "LocalStorage Complete Guide: Browser Mein Data Store Karna Seekho",
  slug: "localstorage-complete-guide-hindi-tutorial",
  category: "Tutorial",
  author: "Ashwani",
  datePublished: "2026-01-17",
  readTime: "20 min read",

  meta: {
    title: "LocalStorage Complete Guide Hindi 2026 | Browser Storage Tutorial",
    description: "LocalStorage seekho Hindi mein! Data store karna, retrieve karna, delete karna - Login remember, Cart save, Theme preference. Complete guide with real projects.",
    keywords: [
      "localstorage javascript hindi",
      "browser storage tutorial hindi",
      "localstorage vs sessionstorage hindi",
      "javascript data storage hindi",
      "web storage api hindi",
      "localstorage tutorial hindi",
      "save data in browser hindi",
      "javascript tutorial hindi 2026",
      "frontend development hindi",
      "web development hindi"
    ],
    canonicalUrl: "https://100devprojects.in/blog/localstorage-complete-guide-hindi-tutorial"
  },

  excerpt: "LocalStorage use karke browser mein data store karna seekho! Login remember karna, shopping cart save karna, dark mode preference - sab kuch Hindi mein with real project examples.",

  content: `
# LocalStorage Complete Guide: Browser Mein Data Store Karna Seekho

Hanji developers! Aaj hum baat karenge ek bahut hi useful topic ki - **LocalStorage**. Ye wo magic hai jisse tumhara data browser mein save rehta hai, chahe page refresh ho ya browser band ho jaye!

Kabhi socha hai ki:
- Netflix kaise yaad rakhta hai ki tum kahan tak dekh chuke ho?
- Amazon cart mein items kaise save rehte hain?
- Dark mode preference kaise remember hota hai?

Ye sab **LocalStorage** ki wajah se possible hai. Chalo deep dive karte hain!

---

## Table of Contents

1. [LocalStorage Kya Hai?](#localstorage-kya-hai)
2. [LocalStorage vs SessionStorage vs Cookies](#comparison)
3. [Basic Operations - CRUD](#basic-operations)
4. [Objects aur Arrays Store Karna](#objects-arrays)
5. [Real Project Examples](#real-projects)
6. [LocalStorage Wrapper Class](#wrapper-class)
7. [Security Best Practices](#security)
8. [Common Mistakes](#common-mistakes)
9. [Interview Questions](#interview-questions)

---

## LocalStorage Kya Hai? {#localstorage-kya-hai}

LocalStorage ek **Web Storage API** hai jo browsers provide karte hain. Isse tum browser mein key-value pairs store kar sakte ho.

### Key Features:

| Feature | Description |
|---------|-------------|
| **Storage Limit** | ~5-10 MB per domain |
| **Data Type** | Sirf strings store hoti hain |
| **Expiry** | Kabhi expire nahi hota (manual delete karna padta hai) |
| **Scope** | Same origin (domain + protocol + port) |
| **Accessibility** | Sirf client-side (JavaScript) |

### Kab Use Karna Chahiye?

**Use Karo:**
- User preferences (theme, language)
- Form draft save karna
- Shopping cart data
- Game scores / progress
- Recently viewed items

**Use MAT Karo:**
- Sensitive data (passwords, tokens)
- Large data (images, files)
- Data jo server pe hona chahiye

---

## LocalStorage vs SessionStorage vs Cookies {#comparison}

Teen options hain browser mein data store karne ke liye. Samjho difference:

| Feature | LocalStorage | SessionStorage | Cookies |
|---------|--------------|----------------|---------|
| **Capacity** | 5-10 MB | 5-10 MB | 4 KB |
| **Expiry** | Never (manual) | Tab close hone tak | Custom set kar sakte ho |
| **Server Access** | Nahi | Nahi | Har request mein bhejta hai |
| **Scope** | All tabs (same origin) | Single tab only | All tabs + Server |
| **Use Case** | Preferences, Cart | Form wizard, Temp data | Auth tokens, Tracking |

### Quick Example:

\`\`\`javascript
// LocalStorage - Permanent storage
localStorage.setItem('theme', 'dark');

// SessionStorage - Tab close = data gone
sessionStorage.setItem('formStep', '2');

// Cookies - Server bhi access kar sakta hai
document.cookie = 'userId=123; expires=Fri, 31 Dec 2026 23:59:59 GMT';
\`\`\`

---

## Basic Operations - CRUD {#basic-operations}

LocalStorage mein 4 main operations hain: **Create, Read, Update, Delete**

### 1. Data Save Karna (setItem)

\`\`\`javascript
// Syntax: localStorage.setItem(key, value)

// String save karna
localStorage.setItem('username', 'RahulSharma');

// Number save karna (string mein convert hoga)
localStorage.setItem('age', '25');

// Boolean save karna (string banega)
localStorage.setItem('isLoggedIn', 'true');
\`\`\`

### 2. Data Read Karna (getItem)

\`\`\`javascript
// Syntax: localStorage.getItem(key)

const username = localStorage.getItem('username');
console.log(username); // "RahulSharma"

// Agar key exist nahi karti - null milega
const email = localStorage.getItem('email');
console.log(email); // null

// Safe way to read with default value
const theme = localStorage.getItem('theme') || 'light';
console.log(theme); // "light" (agar set nahi hai toh)
\`\`\`

### 3. Data Update Karna

\`\`\`javascript
// Same key pe setItem karo - value overwrite ho jayegi
localStorage.setItem('username', 'RahulSharma');
console.log(localStorage.getItem('username')); // "RahulSharma"

localStorage.setItem('username', 'Rahul_2024');
console.log(localStorage.getItem('username')); // "Rahul_2024"
\`\`\`

### 4. Data Delete Karna (removeItem & clear)

\`\`\`javascript
// Single item delete karna
localStorage.removeItem('username');

// Check karo - ab null milega
console.log(localStorage.getItem('username')); // null

// SAARA data delete karna (Careful!)
localStorage.clear();
\`\`\`

### 5. Check Karna Key Exists Ya Nahi

\`\`\`javascript
// Method 1: getItem check karo
if (localStorage.getItem('username') !== null) {
  console.log('User logged in hai');
}

// Method 2: key method use karo
console.log(localStorage.key(0)); // First key ka naam

// Method 3: length check karo
console.log(localStorage.length); // Total items count
\`\`\`

### 6. Saari Keys Loop Karna

\`\`\`javascript
// Method 1: for loop
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(key + ': ' + value);
}

// Method 2: Object.keys (Modern way)
Object.keys(localStorage).forEach(key => {
  console.log(key + ': ' + localStorage.getItem(key));
});

// Method 3: Object.entries
Object.entries(localStorage).forEach(([key, value]) => {
  console.log(key + ': ' + value);
});
\`\`\`

---

## Objects aur Arrays Store Karna {#objects-arrays}

**Important:** LocalStorage sirf **strings** store karta hai. Objects/Arrays directly store nahi ho sakte!

### Problem Dekho:

\`\`\`javascript
// GALAT - Ye kaam nahi karega properly
const user = { name: 'Rahul', age: 25 };
localStorage.setItem('user', user);

console.log(localStorage.getItem('user'));
// Output: "[object Object]" - DATA LOST!
\`\`\`

### Solution: JSON.stringify() aur JSON.parse()

\`\`\`javascript
// Object Save Karna
const user = {
  name: 'Rahul Sharma',
  age: 25,
  city: 'Mumbai',
  skills: ['JavaScript', 'React', 'Node.js']
};

// Step 1: Object ko JSON string mein convert karo
localStorage.setItem('user', JSON.stringify(user));

// Step 2: Read karte waqt JSON parse karo
const savedUser = JSON.parse(localStorage.getItem('user'));
console.log(savedUser.name); // "Rahul Sharma"
console.log(savedUser.skills[0]); // "JavaScript"
\`\`\`

### Array Store Karna

\`\`\`javascript
// Shopping Cart Example
const cart = [
  { id: 1, name: 'iPhone 15', price: 79999, qty: 1 },
  { id: 2, name: 'AirPods Pro', price: 24999, qty: 2 },
  { id: 3, name: 'MacBook Air', price: 99999, qty: 1 }
];

// Save karo
localStorage.setItem('cart', JSON.stringify(cart));

// Read karo
const savedCart = JSON.parse(localStorage.getItem('cart'));
console.log(savedCart.length); // 3

// Total calculate karo
const total = savedCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
console.log('Total: Rs.' + total); // Total: Rs.229996
\`\`\`

### Safe Parse Function (Error Handling)

\`\`\`javascript
function safeGetItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error parsing ' + key + ':', error);
    return defaultValue;
  }
}

// Usage
const user = safeGetItem('user', { name: 'Guest' });
const cart = safeGetItem('cart', []);
const settings = safeGetItem('settings', { theme: 'light', lang: 'hi' });
\`\`\`

---

## Real Project Examples {#real-projects}

### Project 1: Dark Mode Toggle

\`\`\`javascript
// HTML: <button id="themeToggle">Toggle Theme</button>

class ThemeManager {
  constructor() {
    this.storageKey = 'theme';
    this.init();
  }

  init() {
    // Page load pe saved theme apply karo
    const savedTheme = localStorage.getItem(this.storageKey) || 'light';
    this.applyTheme(savedTheme);

    // Button click handler
    document.getElementById('themeToggle').addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme + '-mode';
  }

  toggleTheme() {
    const currentTheme = localStorage.getItem(this.storageKey) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem(this.storageKey, newTheme);
    this.applyTheme(newTheme);

    console.log('Theme changed to: ' + newTheme);
  }

  getTheme() {
    return localStorage.getItem(this.storageKey) || 'light';
  }
}

// Initialize
const themeManager = new ThemeManager();
\`\`\`

### Project 2: Remember Me Login

\`\`\`javascript
class AuthManager {
  constructor() {
    this.storageKey = 'rememberedUser';
  }

  // Login with Remember Me
  login(email, password, rememberMe) {
    // API call simulation
    const user = { email, name: 'Rahul', token: 'abc123' };

    if (rememberMe) {
      // 30 days ke liye remember karo
      const rememberData = {
        email: email,
        timestamp: Date.now(),
        expiresIn: 30 * 24 * 60 * 60 * 1000 // 30 days in ms
      };
      localStorage.setItem(this.storageKey, JSON.stringify(rememberData));
    }

    // Session storage mein current session store karo
    sessionStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  }

  // Check if user should be auto-logged in
  checkRememberedUser() {
    const remembered = localStorage.getItem(this.storageKey);

    if (!remembered) return null;

    try {
      const data = JSON.parse(remembered);
      const now = Date.now();

      // Check if expired
      if (now - data.timestamp > data.expiresIn) {
        localStorage.removeItem(this.storageKey);
        return null;
      }

      return data.email;
    } catch {
      return null;
    }
  }

  // Logout
  logout() {
    sessionStorage.removeItem('currentUser');
    // Remember me data mat delete karo - sirf session clear karo
  }

  // Complete logout (forget me too)
  forgetAndLogout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem(this.storageKey);
  }
}

// Usage
const auth = new AuthManager();

// Check on page load
const rememberedEmail = auth.checkRememberedUser();
if (rememberedEmail) {
  document.getElementById('email').value = rememberedEmail;
  console.log('Welcome back!');
}
\`\`\`

### Project 3: Shopping Cart with LocalStorage

\`\`\`javascript
class ShoppingCart {
  constructor() {
    this.storageKey = 'shoppingCart';
    this.cart = this.loadCart();
  }

  // Cart load karo
  loadCart() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }

  // Cart save karo
  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    this.updateCartUI();
  }

  // Item add karo
  addItem(product) {
    const existingIndex = this.cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      // Already exists - quantity increase karo
      this.cart[existingIndex].quantity += 1;
    } else {
      // New item add karo
      this.cart.push({
        ...product,
        quantity: 1,
        addedAt: Date.now()
      });
    }

    this.saveCart();
    console.log(product.name + ' added to cart!');
  }

  // Item remove karo
  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  // Quantity update karo
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  // Total calculate karo
  getTotal() {
    return this.cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  // Item count
  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Cart clear karo
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // UI update karo
  updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');

    if (countEl) countEl.textContent = this.getItemCount();
    if (totalEl) totalEl.textContent = 'Rs.' + this.getTotal();
  }
}

// Usage
const cart = new ShoppingCart();

// Add items
cart.addItem({ id: 1, name: 'iPhone 15', price: 79999 });
cart.addItem({ id: 2, name: 'Case', price: 999 });
cart.addItem({ id: 1, name: 'iPhone 15', price: 79999 }); // Quantity increase

console.log('Total: Rs.' + cart.getTotal());
console.log('Items: ' + cart.getItemCount());
\`\`\`

### Project 4: Form Auto-Save (Draft Feature)

\`\`\`javascript
class FormAutoSave {
  constructor(formId, storageKey) {
    this.form = document.getElementById(formId);
    this.storageKey = storageKey;
    this.autoSaveInterval = null;

    this.init();
  }

  init() {
    // Load saved data
    this.loadDraft();

    // Auto-save every 5 seconds
    this.autoSaveInterval = setInterval(() => {
      this.saveDraft();
    }, 5000);

    // Save on input change
    this.form.addEventListener('input', () => {
      this.saveDraft();
    });

    // Clear draft on successful submit
    this.form.addEventListener('submit', (e) => {
      this.clearDraft();
    });

    // Save before page unload
    window.addEventListener('beforeunload', () => {
      this.saveDraft();
    });
  }

  saveDraft() {
    const formData = new FormData(this.form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data._savedAt = Date.now();

    localStorage.setItem(this.storageKey, JSON.stringify(data));
    console.log('Draft saved!');
  }

  loadDraft() {
    const saved = localStorage.getItem(this.storageKey);

    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      // Check if draft is older than 24 hours
      if (Date.now() - data._savedAt > 24 * 60 * 60 * 1000) {
        this.clearDraft();
        return;
      }

      // Fill form fields
      Object.keys(data).forEach(key => {
        if (key.startsWith('_')) return; // Skip meta fields

        const field = this.form.elements[key];
        if (field) {
          field.value = data[key];
        }
      });

      console.log('Draft loaded!');
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  }

  clearDraft() {
    localStorage.removeItem(this.storageKey);
    clearInterval(this.autoSaveInterval);
    console.log('Draft cleared!');
  }
}

// Usage
const contactFormSaver = new FormAutoSave('contactForm', 'contactFormDraft');
\`\`\`

### Project 5: Recently Viewed Products

\`\`\`javascript
class RecentlyViewed {
  constructor(maxItems = 10) {
    this.storageKey = 'recentlyViewed';
    this.maxItems = maxItems;
  }

  addItem(product) {
    let items = this.getItems();

    // Remove if already exists (to move to front)
    items = items.filter(item => item.id !== product.id);

    // Add to beginning
    items.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      viewedAt: Date.now()
    });

    // Keep only maxItems
    items = items.slice(0, this.maxItems);

    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }

  clearHistory() {
    localStorage.removeItem(this.storageKey);
  }

  renderWidget(containerId) {
    const container = document.getElementById(containerId);
    const items = this.getItems();

    if (items.length === 0) {
      container.innerHTML = '<p>No recently viewed items</p>';
      return;
    }

    let html = '';
    items.forEach(item => {
      html += '<div class="recent-item">';
      html += '<img src="' + item.image + '" alt="' + item.name + '">';
      html += '<h4>' + item.name + '</h4>';
      html += '<p>Rs.' + item.price + '</p>';
      html += '</div>';
    });
    container.innerHTML = html;
  }
}

// Usage
const recentlyViewed = new RecentlyViewed(5);

// Product page pe call karo
recentlyViewed.addItem({
  id: 123,
  name: 'iPhone 15 Pro',
  price: 134999,
  image: '/images/iphone15.jpg'
});

// Widget render karo
recentlyViewed.renderWidget('recentlyViewedContainer');
\`\`\`

---

## LocalStorage Wrapper Class {#wrapper-class}

Ek complete utility class jo tum apne projects mein use kar sakte ho:

\`\`\`javascript
class Storage {
  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  // Prefixed key generate karo
  _getKey(key) {
    return this.prefix + key;
  }

  // Set item (auto JSON stringify)
  set(key, value, expiresInMs = null) {
    const data = {
      value: value,
      timestamp: Date.now(),
      expiresIn: expiresInMs
    };

    try {
      localStorage.setItem(this._getKey(key), JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      // Storage full - try to clear old items
      if (error.name === 'QuotaExceededError') {
        this.clearExpired();
        return false;
      }
      return false;
    }
  }

  // Get item (auto JSON parse + expiry check)
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this._getKey(key));

      if (!item) return defaultValue;

      const data = JSON.parse(item);

      // Check expiry
      if (data.expiresIn && Date.now() - data.timestamp > data.expiresIn) {
        this.remove(key);
        return defaultValue;
      }

      return data.value;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  // Remove item
  remove(key) {
    localStorage.removeItem(this._getKey(key));
  }

  // Check if key exists
  has(key) {
    return this.get(key) !== null;
  }

  // Get all keys with prefix
  keys() {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.replace(this.prefix, ''));
  }

  // Clear all items with prefix
  clear() {
    this.keys().forEach(key => this.remove(key));
  }

  // Clear expired items
  clearExpired() {
    this.keys().forEach(key => {
      this.get(key); // This will auto-remove if expired
    });
  }

  // Get storage size used
  getSize() {
    let total = 0;
    this.keys().forEach(key => {
      const item = localStorage.getItem(this._getKey(key));
      total += item ? item.length : 0;
    });
    return {
      bytes: total,
      kb: (total / 1024).toFixed(2),
      mb: (total / (1024 * 1024)).toFixed(4)
    };
  }
}

// Usage
const storage = new Storage('myapp_');

// Set with expiry (1 hour)
storage.set('tempData', { foo: 'bar' }, 60 * 60 * 1000);

// Set without expiry
storage.set('user', { name: 'Rahul', role: 'admin' });

// Get
const user = storage.get('user');
const temp = storage.get('tempData', { default: true });

// Check
if (storage.has('user')) {
  console.log('User logged in');
}

// List all keys
console.log(storage.keys()); // ['tempData', 'user']

// Get size
console.log(storage.getSize()); // { bytes: 150, kb: '0.15', mb: '0.0001' }
\`\`\`

---

## Security Best Practices {#security}

### 1. Sensitive Data KABHI Store Mat Karo

\`\`\`javascript
// GALAT - Ye kabhi mat karo!
localStorage.setItem('password', 'mySecretPassword');
localStorage.setItem('creditCard', '1234-5678-9012-3456');
localStorage.setItem('authToken', 'jwt-token-here');

// Auth tokens ke liye httpOnly cookies use karo
// Passwords server pe hash hoke store hone chahiye
\`\`\`

### 2. Data Validation Karo

\`\`\`javascript
function getValidatedUser() {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) return null;

    const user = JSON.parse(userData);

    // Validate structure
    if (!user.id || !user.name || typeof user.id !== 'number') {
      console.warn('Invalid user data, clearing...');
      localStorage.removeItem('user');
      return null;
    }

    return user;
  } catch (error) {
    console.error('User data corrupted:', error);
    localStorage.removeItem('user');
    return null;
  }
}
\`\`\`

### 3. XSS Attacks Se Bachao

\`\`\`javascript
// GALAT - Direct innerHTML mein mat daalo
const username = localStorage.getItem('username');
document.getElementById('welcome').innerHTML = 'Welcome, ' + username;
// Agar username mein <script> hai toh XSS attack!

// SAHI - textContent use karo ya sanitize karo
document.getElementById('welcome').textContent = 'Welcome, ' + username;

// Ya sanitize karo
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
\`\`\`

### 4. Storage Quota Handle Karo

\`\`\`javascript
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.warn('Storage full! Clearing old data...');

      // Strategy 1: Clear all
      // localStorage.clear();

      // Strategy 2: Clear oldest items
      clearOldestItems();

      // Retry
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}
\`\`\`

---

## Common Mistakes {#common-mistakes}

### Mistake 1: JSON Parse Bhool Jana

\`\`\`javascript
// GALAT
localStorage.setItem('count', 5);
const count = localStorage.getItem('count');
console.log(count + 1); // "51" (string concatenation!)

// SAHI
localStorage.setItem('count', JSON.stringify(5));
const countNum = JSON.parse(localStorage.getItem('count'));
console.log(countNum + 1); // 6
\`\`\`

### Mistake 2: Null Check Nahi Karna

\`\`\`javascript
// GALAT - Error aayega agar key nahi hai
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.name); // Error: Cannot read property 'name' of null

// SAHI
const userData = localStorage.getItem('user');
const user = userData ? JSON.parse(userData) : null;

if (user) {
  console.log(user.name);
} else {
  console.log('No user found');
}
\`\`\`

### Mistake 3: Circular Reference

\`\`\`javascript
// GALAT - Circular reference error
const obj = { name: 'Test' };
obj.self = obj; // Circular reference

localStorage.setItem('data', JSON.stringify(obj));
// Error: Converting circular structure to JSON

// Solution: Custom replacer use karo
function safeStringify(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  });
}
\`\`\`

### Mistake 4: Browser Compatibility Check Nahi Karna

\`\`\`javascript
// SAHI - Pehle check karo
function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

if (isLocalStorageAvailable()) {
  // LocalStorage use karo
} else {
  // Fallback (in-memory storage, cookies, etc.)
  console.warn('LocalStorage not available');
}
\`\`\`

---

## Interview Questions {#interview-questions}

### Q1: LocalStorage aur SessionStorage mein kya difference hai?

**Answer:**
- **LocalStorage**: Data permanently store hota hai, tab close karne pe bhi rehta hai
- **SessionStorage**: Data sirf tab open hone tak rehta hai, tab close = data gone
- Dono ka storage limit same hai (~5-10 MB)

### Q2: LocalStorage synchronous hai ya asynchronous?

**Answer:** LocalStorage **synchronous** hai. Matlab jab tum setItem/getItem call karte ho, ye main thread ko block karta hai. Large data ke liye ye performance issue create kar sakta hai. Alternative: IndexedDB (async)

### Q3: LocalStorage mein kya store nahi karna chahiye?

**Answer:**
- Passwords
- Auth tokens (use httpOnly cookies instead)
- Credit card details
- Personal sensitive information
- Large files/images

### Q4: Agar LocalStorage full ho jaye toh kya hoga?

**Answer:** QuotaExceededError exception throw hoga. Isliye hamesha try-catch use karo aur graceful fallback implement karo.

### Q5: Kya LocalStorage secure hai?

**Answer:** Nahi, LocalStorage **secure nahi hai**:
- Same origin ka koi bhi JavaScript access kar sakta hai
- XSS attack se data leak ho sakta hai
- Data encrypted nahi hota
- User DevTools se dekh sakta hai

### Q6: LocalStorage event kya hai?

**Answer:** Jab ek tab mein LocalStorage change hota hai, doosre tabs ko storage event milta hai:

\`\`\`javascript
window.addEventListener('storage', (event) => {
  console.log('Key changed:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('URL:', event.url);
});
\`\`\`

Note: Event sirf OTHER tabs mein fire hota hai, same tab mein nahi.

---

## Quick Reference Cheatsheet

\`\`\`javascript
// ========== BASIC OPERATIONS ==========
localStorage.setItem('key', 'value');        // Save
localStorage.getItem('key');                  // Read
localStorage.removeItem('key');               // Delete one
localStorage.clear();                         // Delete all
localStorage.length;                          // Count
localStorage.key(0);                          // Get key by index

// ========== OBJECTS/ARRAYS ==========
// Save
localStorage.setItem('data', JSON.stringify(obj));

// Read
const data = JSON.parse(localStorage.getItem('data'));

// Safe read with default
const data = JSON.parse(localStorage.getItem('data') || '{}');

// ========== CHECK EXISTS ==========
if (localStorage.getItem('key') !== null) {
  // Key exists
}

// ========== LOOP ALL ==========
Object.entries(localStorage).forEach(([key, value]) => {
  console.log(key, value);
});

// ========== STORAGE EVENT ==========
window.addEventListener('storage', (e) => {
  console.log(e.key, e.newValue);
});
\`\`\`

---

## Conclusion

LocalStorage bahut powerful tool hai client-side data storage ke liye. Yaad rakho:

**Key Takeaways:**
- Sirf **strings** store hoti hain - JSON.stringify/parse use karo
- **5-10 MB** limit hai - large data ke liye IndexedDB use karo
- **Sensitive data** kabhi store mat karo
- **Error handling** hamesha karo
- **Validation** karo read karte waqt
- Cross-tab sync ke liye **storage event** use karo

Ab jao aur apne projects mein LocalStorage implement karo! Shopping cart banao, theme switcher banao, form auto-save banao - possibilities endless hain.

Happy Coding!
  `,

  tags: [
    "javascript",
    "localstorage",
    "web-storage",
    "tutorial",
    "browser-storage",
    "hindi",
    "hinglish",
    "web-development",
    "frontend"
  ],
  relatedProjects: ["todo-app", "shopping-cart"],
  featured: true,
  views: 0
};
