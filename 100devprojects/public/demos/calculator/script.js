// ============================================
// CALCULATOR - JavaScript
// ============================================

// State
let currentOperand = '0';
let previousOperand = '';
let operation = null;
let shouldResetScreen = false;
let history = [];

// DOM Elements
const currentOperandEl = document.getElementById('current-operand');
const previousOperandEl = document.getElementById('previous-operand');
const displayEl = document.querySelector('.display');
const historyListEl = document.getElementById('history-list');
const scientificButtonsEl = document.getElementById('scientific-buttons');
const modeBtns = document.querySelectorAll('.mode-btn');
const clearHistoryBtn = document.getElementById('clear-history');

// Initialize
function init() {
    loadHistory();
    renderHistory();
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Number buttons
    document.querySelectorAll('[data-number]').forEach(btn => {
        btn.addEventListener('click', () => appendNumber(btn.dataset.number));
    });

    // Action buttons
    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => handleAction(btn.dataset.action));
    });

    // Mode toggle
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleMode(btn.dataset.mode));
    });

    // Clear history
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Keyboard support
    document.addEventListener('keydown', handleKeyboard);
}

// Append Number
function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }

    // Prevent multiple zeros at start
    if (number === '0' && currentOperand === '0') return;

    // Replace initial zero
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        // Limit length
        if (currentOperand.length >= 15) return;
        currentOperand += number;
    }

    updateDisplay();
}

// Handle Actions
function handleAction(action) {
    switch (action) {
        case 'clear':
            clear();
            break;
        case 'delete':
            deleteNumber();
            break;
        case 'decimal':
            appendDecimal();
            break;
        case 'negate':
            negate();
            break;
        case 'percent':
            percent();
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            setOperation(action);
            break;
        case 'equals':
            calculate();
            break;
        // Scientific functions
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'ln':
        case 'sqrt':
        case 'square':
        case 'cube':
        case 'factorial':
            scientificOperation(action);
            break;
        case 'power':
            setOperation('power');
            break;
        case 'pi':
            currentOperand = Math.PI.toString();
            updateDisplay();
            break;
        case 'e':
            currentOperand = Math.E.toString();
            updateDisplay();
            break;
    }
}

// Clear
function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    displayEl.classList.remove('error');
    updateDisplay();
}

// Delete last digit
function deleteNumber() {
    if (currentOperand.length === 1 || currentOperand === 'Error') {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// Append Decimal
function appendDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0';
        shouldResetScreen = false;
    }

    if (currentOperand.includes('.')) return;
    currentOperand += '.';
    updateDisplay();
}

// Negate (change sign)
function negate() {
    if (currentOperand === '0' || currentOperand === 'Error') return;

    if (currentOperand.startsWith('-')) {
        currentOperand = currentOperand.slice(1);
    } else {
        currentOperand = '-' + currentOperand;
    }
    updateDisplay();
}

// Percent
function percent() {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;

    currentOperand = (current / 100).toString();
    updateDisplay();
}

// Set Operation
function setOperation(op) {
    if (currentOperand === 'Error') return;

    if (operation !== null && !shouldResetScreen) {
        calculate();
    }

    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

// Calculate
function calculate() {
    if (operation === null || shouldResetScreen) return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    let result;
    const expression = `${formatNumber(prev)} ${getOperationSymbol(operation)} ${formatNumber(current)}`;

    switch (operation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                showError();
                return;
            }
            result = prev / current;
            break;
        case 'power':
            result = Math.pow(prev, current);
            break;
        default:
            return;
    }

    // Add to history
    addToHistory(expression, result);

    currentOperand = formatResult(result);
    operation = null;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

// Scientific Operations
function scientificOperation(op) {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;

    let result;
    let expression = '';

    switch (op) {
        case 'sin':
            result = Math.sin(current * Math.PI / 180); // Degrees
            expression = `sin(${formatNumber(current)})`;
            break;
        case 'cos':
            result = Math.cos(current * Math.PI / 180);
            expression = `cos(${formatNumber(current)})`;
            break;
        case 'tan':
            result = Math.tan(current * Math.PI / 180);
            expression = `tan(${formatNumber(current)})`;
            break;
        case 'log':
            if (current <= 0) {
                showError();
                return;
            }
            result = Math.log10(current);
            expression = `log(${formatNumber(current)})`;
            break;
        case 'ln':
            if (current <= 0) {
                showError();
                return;
            }
            result = Math.log(current);
            expression = `ln(${formatNumber(current)})`;
            break;
        case 'sqrt':
            if (current < 0) {
                showError();
                return;
            }
            result = Math.sqrt(current);
            expression = `√(${formatNumber(current)})`;
            break;
        case 'square':
            result = Math.pow(current, 2);
            expression = `(${formatNumber(current)})²`;
            break;
        case 'cube':
            result = Math.pow(current, 3);
            expression = `(${formatNumber(current)})³`;
            break;
        case 'factorial':
            if (current < 0 || !Number.isInteger(current) || current > 170) {
                showError();
                return;
            }
            result = factorial(current);
            expression = `${formatNumber(current)}!`;
            break;
        default:
            return;
    }

    addToHistory(expression, result);
    currentOperand = formatResult(result);
    shouldResetScreen = true;
    updateDisplay();
}

// Factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Show Error
function showError() {
    currentOperand = 'Error';
    displayEl.classList.add('error');
    operation = null;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

// Get Operation Symbol
function getOperationSymbol(op) {
    const symbols = {
        add: '+',
        subtract: '−',
        multiply: '×',
        divide: '÷',
        power: '^'
    };
    return symbols[op] || op;
}

// Format Number
function formatNumber(num) {
    if (typeof num === 'string') return num;

    // Handle very small or very large numbers
    if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-7 && num !== 0)) {
        return num.toExponential(6);
    }

    // Round to avoid floating point issues
    const rounded = Math.round(num * 1e10) / 1e10;
    return rounded.toLocaleString('en-US', { maximumFractionDigits: 10 });
}

// Format Result
function formatResult(result) {
    // Handle Infinity
    if (!isFinite(result)) {
        return 'Error';
    }

    // Round to avoid floating point issues
    const rounded = Math.round(result * 1e10) / 1e10;

    // Convert to string
    let str = rounded.toString();

    // Limit length
    if (str.length > 15) {
        if (Math.abs(rounded) > 1e10 || Math.abs(rounded) < 1e-7) {
            str = rounded.toExponential(8);
        } else {
            str = rounded.toPrecision(12);
        }
    }

    return str;
}

// Update Display
function updateDisplay() {
    // Format current operand for display
    let displayValue = currentOperand;

    if (currentOperand !== 'Error' && currentOperand !== '') {
        const num = parseFloat(currentOperand);
        if (!isNaN(num) && !currentOperand.endsWith('.')) {
            displayValue = formatNumber(num);
        }
    }

    currentOperandEl.textContent = displayValue;

    // Show previous operand with operation
    if (operation && previousOperand) {
        previousOperandEl.textContent = `${formatNumber(parseFloat(previousOperand))} ${getOperationSymbol(operation)}`;
    } else {
        previousOperandEl.textContent = '';
    }

    // Adjust font size for long numbers
    currentOperandEl.classList.remove('small', 'smaller');
    if (displayValue.length > 12) {
        currentOperandEl.classList.add('smaller');
    } else if (displayValue.length > 9) {
        currentOperandEl.classList.add('small');
    }
}

// Toggle Mode (Basic/Scientific)
function toggleMode(mode) {
    modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    if (mode === 'scientific') {
        scientificButtonsEl.classList.add('active');
    } else {
        scientificButtonsEl.classList.remove('active');
    }
}

// History Functions
function addToHistory(expression, result) {
    const historyItem = {
        expression,
        result: formatResult(result),
        timestamp: Date.now()
    };

    history.unshift(historyItem);

    // Keep only last 20 items
    if (history.length > 20) {
        history.pop();
    }

    saveHistory();
    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historyListEl.innerHTML = '<p class="empty-history">No calculations yet</p>';
        return;
    }

    historyListEl.innerHTML = history.map((item, index) => `
        <div class="history-item" data-index="${index}">
            <span class="history-expression">${item.expression} =</span>
            <span class="history-result">${formatNumber(parseFloat(item.result))}</span>
        </div>
    `).join('');

    // Add click handlers to use history values
    historyListEl.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            currentOperand = history[index].result;
            shouldResetScreen = true;
            updateDisplay();
        });
    });
}

function clearHistory() {
    history = [];
    saveHistory();
    renderHistory();
}

function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function loadHistory() {
    const saved = localStorage.getItem('calculatorHistory');
    if (saved) {
        try {
            history = JSON.parse(saved);
        } catch (e) {
            history = [];
        }
    }
}

// Keyboard Support
function handleKeyboard(e) {
    // Prevent default for calculator keys
    if (e.key.match(/[0-9.+\-*/%=]/) || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Escape') {
        e.preventDefault();
    }

    // Numbers
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
        highlightButton(`[data-number="${e.key}"]`);
    }

    // Decimal
    if (e.key === '.') {
        appendDecimal();
        highlightButton('[data-action="decimal"]');
    }

    // Operations
    switch (e.key) {
        case '+':
            handleAction('add');
            highlightButton('[data-action="add"]');
            break;
        case '-':
            handleAction('subtract');
            highlightButton('[data-action="subtract"]');
            break;
        case '*':
            handleAction('multiply');
            highlightButton('[data-action="multiply"]');
            break;
        case '/':
            handleAction('divide');
            highlightButton('[data-action="divide"]');
            break;
        case '%':
            handleAction('percent');
            highlightButton('[data-action="percent"]');
            break;
        case '=':
        case 'Enter':
            handleAction('equals');
            highlightButton('[data-action="equals"]');
            break;
        case 'Backspace':
            handleAction('delete');
            highlightButton('[data-action="delete"]');
            break;
        case 'Escape':
            handleAction('clear');
            highlightButton('[data-action="clear"]');
            break;
    }
}

// Highlight button on keyboard press
function highlightButton(selector) {
    const btn = document.querySelector(selector);
    if (btn) {
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 100);
    }
}

// Start
init();
