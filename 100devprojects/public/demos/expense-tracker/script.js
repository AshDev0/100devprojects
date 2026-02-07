// =====================
// Expense Tracker Logic - Enhanced Version
// =====================

// ===== CONFIGURATION =====
const CONFIG = {
  ITEMS_PER_PAGE: 50,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 2500,
  MAX_DATE_YEARS_AGO: 5,
  MAX_STORAGE_SIZE: 5 * 1024 * 1024, // 5MB limit for localStorage
  FOCUS_DELAY: 100,
  CHART: {
    colors: ['#f97316', '#f43f5e', '#38bdf8', '#a855f7', '#22c55e', '#eab308', '#14b8a6', '#fb7185'],
    legendColor: '#f8fafc',
    axisColor: '#cbd5e1',
    income: '#22c55e',
    expense: '#ef4444'
  },
  CATEGORIES: {
    income: ['salary', 'freelance', 'investment', 'business', 'other-income'],
    expense: ['food', 'transport', 'shopping', 'bills', 'entertainment', 'healthcare', 'education', 'rent', 'other-expense']
  }
};

// ===== DOM REFERENCES =====
const addTransactionForm = document.getElementById("addTransactionForm");
const filtersForm = document.getElementById("filtersForm");
const transactionsUl = document.getElementById("transactionsUl");
const emptyState = document.getElementById("emptyState");
const balanceAmount = document.getElementById("balanceAmount");
const incomeAmount = document.getElementById("incomeAmount");
const expensesAmount = document.getElementById("expensesAmount");
const categorySelect = document.getElementById("category");
const incomeGroup = document.getElementById("incomeCategoriesGroup");
const expenseGroup = document.getElementById("expenseCategoriesGroup");
const dateInput = document.getElementById("date");
const themeToggle = document.getElementById("themeToggle");
const exportCSVBtn = document.getElementById("exportCSV");
const printReportBtn = document.getElementById("printReport");

// Edit modal
const editModal = document.getElementById("editModal");
const editTransactionForm = document.getElementById("editTransactionForm");
const editTransactionId = document.getElementById("editTransactionId");
const editCategory = document.getElementById("editCategory");
const closeEditModal = document.getElementById("closeEditModal");
const cancelEdit = document.getElementById("cancelEdit");

// Delete modal
const deleteModal = document.getElementById("deleteModal");
const closeDeleteModal = document.getElementById("closeDeleteModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

// Toast and loader
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const loadingSpinner = document.getElementById("loadingSpinner");

// ===== CURRENCY FORMATTER =====
const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

// ===== STATE MANAGEMENT =====
const state = {
  transactions: [],
  filteredTransactions: [],
  filters: {
    type: "all",
    category: "all",
    startDate: "",
    endDate: "",
  },
  charts: {
    pie: null,
    bar: null,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: CONFIG.ITEMS_PER_PAGE
  },
  pendingDeleteId: null,
};

// ===== UTILITY FUNCTIONS =====

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle helper for localStorage with error handling
const throttledSave = (() => {
  let timeout;
  let pendingData = null;

  return (data) => {
    pendingData = data;

    if (timeout) return;

    timeout = setTimeout(() => {
      try {
        const jsonData = JSON.stringify(pendingData);

        // Check approximate size (1 char ≈ 2 bytes in UTF-16)
        const sizeInBytes = new Blob([jsonData]).size;

        if (sizeInBytes > CONFIG.MAX_STORAGE_SIZE) {
          showToast('Storage limit reached! Export and clear old transactions.', 'error');
          console.warn(`Data size: ${(sizeInBytes / 1024 / 1024).toFixed(2)}MB exceeds limit`);
          timeout = null;
          pendingData = null;
          return;
        }

        localStorage.setItem("transactions", jsonData);
      } catch (error) {
        if (error.name === 'QuotaExceededError') {
          showToast('Storage full! Export old data and clear transactions.', 'error');
          console.error('LocalStorage quota exceeded');
        } else {
          showToast('Failed to save data. Please try again.', 'error');
          console.error('LocalStorage save failed:', error);
        }
      } finally {
        timeout = null;
        pendingData = null;
      }
    }, 500);
  };
})();

// Generate unique ID
function generateId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `tx_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

// Format date for display
function formatDisplayDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Escape HTML to prevent XSS
function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Sanitize user input
function sanitizeInput(text, maxLength = 100) {
  if (typeof text !== 'string') return '';

  return text
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove angle brackets
}

// Set default date to today
function setDefaultDate() {
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
}

// Get category label from value
function getCategoryLabel(value) {
  const option = categorySelect.querySelector(`option[value="${value}"]`);
  return option ? option.textContent.trim() : value;
}

// ===== INITIALIZATION =====
function initState() {
  showLoading();

  state.transactions = loadTransactions();
  syncEditCategoryOptions();
  setDefaultDate();
  updateCategoryDropdown(addTransactionForm);
  applyFilters();
  initTheme();
  initKeyboardShortcuts();

  hideLoading();
}

// ===== LOCALSTORAGE OPERATIONS =====
function loadTransactions() {
  try {
    const transactions = localStorage.getItem("transactions");
    if (transactions) {
      const parsed = JSON.parse(transactions);

      // Validate data structure
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        console.warn('Invalid transactions data structure');
        return [];
      }
    }
  } catch (error) {
    console.error("Error loading transactions:", error);

    if (error.name === 'SyntaxError') {
      showToast("Corrupted data detected. Starting fresh.", "error");
    } else if (error.name === 'SecurityError') {
      showToast("Storage access denied. Check browser settings.", "error");
    } else {
      showToast("Error loading saved data", "error");
    }
  }
  return [];
}

function saveTransactions(transactions) {
  throttledSave(transactions);
}

// ===== TRANSACTION OPERATIONS =====
function addTransaction(transactionData) {
  state.transactions.unshift(transactionData);
  saveTransactions(state.transactions);
  state.pagination.currentPage = 1; // Reset to first page
  applyFilters();
  showToast("Transaction added successfully", "success");
}

function editTransaction(id, updatedData) {
  const index = state.transactions.findIndex((item) => item.id === id);
  if (index === -1) {
    showToast("Transaction not found", "error");
    return;
  }

  state.transactions[index] = { 
    ...state.transactions[index], 
    ...updatedData 
  };
  
  saveTransactions(state.transactions);
  applyFilters();
  showToast("Transaction updated successfully", "success");
}

function deleteTransaction(id) {
  const initialLength = state.transactions.length;
  state.transactions = state.transactions.filter((item) => item.id !== id);
  
  if (state.transactions.length === initialLength) {
    showToast("Transaction not found", "error");
    return;
  }
  
  saveTransactions(state.transactions);
  applyFilters();
  showToast("Transaction deleted", "success");
}

function getTransactionById(id) {
  return state.transactions.find((item) => item.id === id);
}

// ===== CALCULATION FUNCTIONS =====
function calculateTotalIncome(transactions = state.filteredTransactions) {
  return transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);
}

function calculateTotalExpense(transactions = state.filteredTransactions) {
  return transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);
}

function calculateBalance(transactions = state.filteredTransactions) {
  return calculateTotalIncome(transactions) - calculateTotalExpense(transactions);
}

function getCategoryTotals(transactions = state.filteredTransactions) {
  const totals = {};

  transactions
    .filter((item) => item.type === "expense")
    .forEach((item) => {
      totals[item.category] = (totals[item.category] || 0) + item.amount;
    });

  return totals;
}

function getMonthlyTotals() {
  const map = new Map();

  state.filteredTransactions.forEach((item) => {
    const date = new Date(item.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!map.has(key)) {
      map.set(key, { income: 0, expense: 0 });
    }

    const entry = map.get(key);
    entry[item.type] += item.amount;
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([key, totals]) => {
      const [year, month] = key.split("-").map(Number);
      const label = new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
        month: "short",
        year: "2-digit",
      });

      return {
        label,
        income: totals.income,
        expense: totals.expense,
      };
    });
}

// ===== UI UPDATE FUNCTIONS =====
function updateSummaryCards() {
  const income = calculateTotalIncome();
  const expense = calculateTotalExpense();
  const balance = calculateBalance();

  incomeAmount.textContent = currencyFormatter.format(income);
  expensesAmount.textContent = currencyFormatter.format(expense);
  balanceAmount.textContent = currencyFormatter.format(balance);
}

function displayTransactions(transactionsArray) {
  const start = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
  const end = start + state.pagination.itemsPerPage;
  const paginatedData = transactionsArray.slice(start, end);

  transactionsUl.innerHTML = "";

  if (!transactionsArray.length) {
    emptyState.setAttribute("aria-hidden", "false");
    transactionsUl.appendChild(emptyState);
    return;
  }

  emptyState.setAttribute("aria-hidden", "true");

  const markup = paginatedData.map(createTransactionHTML).join("");
  transactionsUl.insertAdjacentHTML("beforeend", markup);

  // Add pagination controls if needed
  if (transactionsArray.length > state.pagination.itemsPerPage) {
    addPaginationControls(transactionsArray.length);
  }
}

function createTransactionHTML(transaction) {
  const amount = transaction.type === "expense"
    ? -transaction.amount
    : transaction.amount;

  const formattedAmount = currencyFormatter.format(Math.abs(amount));
  const amountText = amount < 0 ? `-${formattedAmount}` : formattedAmount;
  const date = formatDisplayDate(transaction.date);
  const categoryLabel = getCategoryLabel(transaction.category);

  return `
    <li class="transaction-item ${transaction.type}" data-id="${transaction.id}">
      <div class="transaction-details">
        <h4 class="transaction-description">${escapeHTML(transaction.description)}</h4>
        <div class="transaction-meta">
          <span class="transaction-category">${categoryLabel}</span>
          <span class="transaction-date">${date}</span>
        </div>
      </div>
      <div class="transaction-amount">${amountText}</div>
      <div class="transaction-actions">
        <button class="btn-secondary btn-edit" data-id="${transaction.id}" aria-label="Edit transaction">Edit</button>
        <button class="btn-danger btn-delete" data-id="${transaction.id}" aria-label="Delete transaction">Delete</button>
      </div>
    </li>
  `;
}

function addPaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
  const currentPage = state.pagination.currentPage;

  const paginationHTML = `
    <li class="pagination-controls" style="display: flex; justify-content: center; gap: 0.5rem; padding: 1rem; margin-top: 1rem;">
      <button class="btn-secondary page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
        Previous
      </button>
      <span style="padding: 0.5rem 1rem; color: var(--text-secondary);">
        Page ${currentPage} of ${totalPages}
      </span>
      <button class="btn-secondary page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
        Next
      </button>
    </li>
  `;

  transactionsUl.insertAdjacentHTML("beforeend", paginationHTML);
}

// Internal function for pagination (no longer global)
function changePage(page) {
  const totalPages = Math.ceil(state.filteredTransactions.length / state.pagination.itemsPerPage);

  if (page < 1 || page > totalPages) return;

  state.pagination.currentPage = page;
  displayTransactions(state.filteredTransactions);
}

// ===== FILTER FUNCTIONS =====
function filterByType(type, transactions = state.transactions) {
  if (type === "all") return transactions;
  return transactions.filter((item) => item.type === type);
}

function filterByCategory(category, transactions = state.transactions) {
  if (category === "all") return transactions;
  return transactions.filter((item) => item.category === category);
}

function filterByDateRange(range, transactions = state.transactions) {
  const { startDate, endDate } = range;

  if (!startDate && !endDate) return transactions;

  return transactions.filter((item) => {
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });
}

function applyFilters() {
  const { type, category, startDate, endDate } = state.filters;
  let result = [...state.transactions];

  result = filterByType(type, result);
  result = filterByCategory(category, result);
  result = filterByDateRange({ startDate, endDate }, result);

  state.filteredTransactions = result;
  state.pagination.currentPage = 1; // Reset to first page on filter change

  displayTransactions(state.filteredTransactions);
  updateSummaryCards();
  updateCharts();
  updateTransactionCount();
}

// Debounced filter application
const debouncedApplyFilters = debounce(() => {
  state.filters.type = document.getElementById("filterType").value;
  state.filters.category = document.getElementById("filterCategory").value;
  state.filters.startDate = document.getElementById("filterStartDate").value;
  state.filters.endDate = document.getElementById("filterEndDate").value;
  applyFilters();
}, CONFIG.DEBOUNCE_DELAY);

// ===== CHART FUNCTIONS =====
function createCategoryChart() {
  // Check if Chart.js is loaded
  if (typeof Chart === 'undefined') {
    console.error('Chart.js library not loaded');
    const chartContainer = document.getElementById("pieChart");
    if (chartContainer) {
      chartContainer.parentElement.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">Charts unavailable. Please check your connection.</p>';
    }
    return;
  }

  const ctx = document.getElementById("pieChart");
  if (!ctx) return;

  const totals = getCategoryTotals();
  const labels = Object.keys(totals).map(getCategoryLabel);
  const data = Object.values(totals);

  if (!labels.length) return;

  try {
    state.charts.pie = new Chart(ctx.getContext("2d"), {
      type: "pie",
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: CONFIG.CHART.colors,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: CONFIG.CHART.legendColor,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to create pie chart:', error);
    showToast('Unable to create category chart', 'error');
  }
}

function createMonthlyChart() {
  // Check if Chart.js is loaded
  if (typeof Chart === 'undefined') {
    console.error('Chart.js library not loaded');
    const chartContainer = document.getElementById("barChart");
    if (chartContainer) {
      chartContainer.parentElement.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">Charts unavailable. Please check your connection.</p>';
    }
    return;
  }

  const ctx = document.getElementById("barChart");
  if (!ctx) return;

  const monthly = getMonthlyTotals();
  const labels = monthly.map((item) => item.label);
  const incomeData = monthly.map((item) => item.income);
  const expenseData = monthly.map((item) => item.expense);

  if (!labels.length) return;

  try {
    state.charts.bar = new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            backgroundColor: CONFIG.CHART.income,
          },
          {
            label: "Expense",
            data: expenseData,
            backgroundColor: CONFIG.CHART.expense,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: CONFIG.CHART.legendColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: CONFIG.CHART.axisColor,
            },
          },
          y: {
            ticks: {
              color: CONFIG.CHART.axisColor,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to create bar chart:', error);
    showToast('Unable to create monthly chart', 'error');
  }
}

function updateCharts() {
  // Destroy existing charts
  if (state.charts.pie) {
    state.charts.pie.destroy();
    state.charts.pie = null;
  }

  if (state.charts.bar) {
    state.charts.bar.destroy();
    state.charts.bar = null;
  }

  // Only create charts if we have data
  const totals = getCategoryTotals();
  if (Object.keys(totals).length > 0) {
    createCategoryChart();
  }

  const monthly = getMonthlyTotals();
  if (monthly.length > 0) {
    createMonthlyChart();
  }
}

// ===== VALIDATION FUNCTIONS =====
function validateFormData(data) {
  // Check required fields
  if (!data.description || !data.description.trim()) {
    showToast("Description is required", "error");
    return false;
  }

  if (data.amount <= 0) {
    showToast("Amount must be greater than 0", "error");
    return false;
  }

  if (!data.date) {
    showToast("Date is required", "error");
    return false;
  }

  // Validate date is not in future
  const selectedDate = new Date(data.date);
  selectedDate.setHours(0, 0, 0, 0); // Reset time to start of day
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day

  if (selectedDate > today) {
    showToast("Transaction date cannot be in the future", "error");
    return false;
  }

  // Validate date is not too old (optional business rule)
  const maxYearsAgo = new Date();
  maxYearsAgo.setFullYear(maxYearsAgo.getFullYear() - CONFIG.MAX_DATE_YEARS_AGO);

  if (selectedDate < maxYearsAgo) {
    showToast(`Transaction date cannot be older than ${CONFIG.MAX_DATE_YEARS_AGO} years`, "error");
    return false;
  }

  // Validate category matches type
  if (data.type === 'income' && !CONFIG.CATEGORIES.income.includes(data.category)) {
    showToast("Invalid category for income type", "error");
    return false;
  }

  if (data.type === 'expense' && !CONFIG.CATEGORIES.expense.includes(data.category)) {
    showToast("Invalid category for expense type", "error");
    return false;
  }

  return true;
}

// ===== FORM HANDLING =====
function handleFormSubmit(e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  // Add loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Adding...';

  try {
    const formData = new FormData(addTransactionForm);
    const transaction = {
      id: generateId(),
      type: formData.get("type"),
      category: formData.get("category"),
      amount: Number(formData.get("amount")),
      date: formData.get("date"),
      description: sanitizeInput(formData.get("description"), 100),
    };

    if (!validateFormData(transaction)) {
      return;
    }

    addTransaction(transaction);
    resetForm();
  } finally {
    // Restore button state
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

function resetForm() {
  addTransactionForm.reset();
  setDefaultDate();
  updateCategoryDropdown(addTransactionForm);
}

// ===== CATEGORY DROPDOWN MANAGEMENT =====
function updateCategoryDropdown(formElement) {
  const isEditForm = formElement.id === 'editTransactionForm';
  const typeName = isEditForm ? 'editType' : 'type';
  const currentCategorySelect = isEditForm ? editCategory : categorySelect;
  
  const selectedType = formElement.querySelector(`input[name="${typeName}"]:checked`)?.value;
  if (!selectedType) return;

  const incomeGroupElement = currentCategorySelect.querySelector('optgroup[label*="Income"]');
  const expenseGroupElement = currentCategorySelect.querySelector('optgroup[label*="Expense"]');

  if (!incomeGroupElement || !expenseGroupElement) return;

  // Show/hide optgroups based on selected type
  if (selectedType === "income") {
    incomeGroupElement.disabled = false;
    incomeGroupElement.hidden = false;
    expenseGroupElement.disabled = true;
    expenseGroupElement.hidden = true;
  } else {
    incomeGroupElement.disabled = true;
    incomeGroupElement.hidden = true;
    expenseGroupElement.disabled = false;
    expenseGroupElement.hidden = false;
  }

  // Set default category based on type only if current selection is invalid
  const currentValue = currentCategorySelect.value;
  const currentOption = currentCategorySelect.querySelector(`option[value="${currentValue}"]`);
  const isCurrentOptionInVisibleGroup = currentOption && !currentOption.closest('optgroup').hidden;

  if (!isCurrentOptionInVisibleGroup) {
    if (selectedType === "income") {
      const firstOption = incomeGroupElement.querySelector("option");
      if (firstOption) currentCategorySelect.value = firstOption.value;
    } else {
      const firstOption = expenseGroupElement.querySelector("option");
      if (firstOption) currentCategorySelect.value = firstOption.value;
    }
  }
}

function syncEditCategoryOptions() {
  editCategory.innerHTML = "";

  const incomeClone = incomeGroup.cloneNode(true);
  const expenseClone = expenseGroup.cloneNode(true);

  incomeClone.label = "Income Categories";
  expenseClone.label = "Expense Categories";

  editCategory.appendChild(incomeClone);
  editCategory.appendChild(expenseClone);
}

// ===== MODAL FUNCTIONS =====
function openEditModal(transaction) {
  editTransactionId.value = transaction.id;
  
  const typeRadio = editTransactionForm.querySelector(`input[name="editType"][value="${transaction.type}"]`);
  if (typeRadio) {
    typeRadio.checked = true;
  }

  updateCategoryDropdown(editTransactionForm);
  editCategory.value = transaction.category;
  document.getElementById("editAmount").value = transaction.amount;
  document.getElementById("editDate").value = transaction.date;
  document.getElementById("editDescription").value = transaction.description;

  editModal.classList.remove("hidden");

  // Focus first input
  setTimeout(() => {
    document.getElementById("editAmount").focus();
  }, CONFIG.FOCUS_DELAY);
}

function closeEditModalWindow() {
  editModal.classList.add("hidden");
}

function openDeleteModal(id) {
  state.pendingDeleteId = id;
  deleteModal.classList.remove("hidden");
}

function closeDeleteModalWindow() {
  state.pendingDeleteId = null;
  deleteModal.classList.add("hidden");
}



// ===== THEME MANAGEMENT =====
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// ===== EXPORT FUNCTIONS =====
function downloadCSV(data) {
  if (!data.length) {
    showToast("No transactions to export", "error");
    return;
  }

  const headers = ["Type", "Category", "Amount (INR)", "Date", "Description"];
  const rows = data.map((item) => [
    item.type,
    getCategoryLabel(item.category),
    item.amount.toFixed(2), // Remove currency symbol for Excel
    item.date,
    item.description.replace(/"/g, '""') // Escape quotes properly
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value)}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `expense-tracker-${new Date().toISOString().split('T')[0]}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
  
  showToast("CSV exported successfully", "success");
}

function handlePrintReport() {
  // Hide unnecessary elements
  const elementsToHide = [
    '.filters-section',
    '.transaction-section',
    '.transaction-actions',
    'button'
  ];

  elementsToHide.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = 'none';
    });
  });

  window.print();

  // Restore elements after print
  setTimeout(() => {
    elementsToHide.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = '';
      });
    });
  }, 100);
}

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Esc to close modals
    if (e.key === 'Escape') {
      if (!editModal.classList.contains('hidden')) {
        closeEditModalWindow();
      }
      if (!deleteModal.classList.contains('hidden')) {
        closeDeleteModalWindow();
      }
    }

    // Ctrl/Cmd + N for new transaction (focus form)
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      const transactionForm = document.getElementById('transaction-form');
      if (transactionForm) {
        transactionForm.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById('description')?.focus();
        }, 300);
      }
    }

    // Ctrl/Cmd + E for export CSV
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      downloadCSV(state.filteredTransactions);
    }

    // Ctrl/Cmd + P for print (override default to use custom handler)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      handlePrintReport();
    }
  });
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = "info") {
  toastMessage.textContent = message;
  toast.style.display = "flex";
  toast.classList.remove("toast-success", "toast-error", "toast-info");

  if (type === "success") toast.classList.add("toast-success");
  if (type === "error") toast.classList.add("toast-error");
  if (type === "info") toast.classList.add("toast-info");

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.style.display = "none";
  }, CONFIG.TOAST_DURATION);
}

// ===== LOADING STATE =====
function showLoading() {
  loadingSpinner.classList.remove("hidden");
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

function updateTransactionCount() {
  const count = state.filteredTransactions.length;
  document.getElementById('transactionCount').textContent = 
    `${count} transaction${count !== 1 ? 's' : ''}`;
}

// ===== EVENT LISTENERS =====

// Add transaction form
addTransactionForm.addEventListener("submit", handleFormSubmit);
addTransactionForm.addEventListener("change", () => updateCategoryDropdown(addTransactionForm));

// Filter form with debouncing
filtersForm.addEventListener("change", debouncedApplyFilters);

// Transaction list actions
transactionsUl.addEventListener("click", (e) => {
  const editButton = e.target.closest(".btn-edit");
  const deleteButton = e.target.closest(".btn-delete");
  const pageButton = e.target.closest(".page-btn");

  if (editButton) {
    const transaction = getTransactionById(editButton.dataset.id);
    if (transaction) {
      openEditModal(transaction);
    }
  }

  if (deleteButton) {
    openDeleteModal(deleteButton.dataset.id);
  }

  // Handle pagination buttons
  if (pageButton && !pageButton.disabled) {
    const page = parseInt(pageButton.dataset.page);
    changePage(page);
  }
});

// Edit transaction form
editTransactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Updating...';

  try {
    const selectedType = editTransactionForm.querySelector('input[name="editType"]:checked')?.value;

    const updated = {
      type: selectedType,
      category: editCategory.value,
      amount: Number(document.getElementById("editAmount").value),
      date: document.getElementById("editDate").value,
      description: sanitizeInput(document.getElementById("editDescription").value, 100),
    };

    if (!validateFormData(updated)) {
      return;
    }

    editTransaction(editTransactionId.value, updated);
    closeEditModalWindow();
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

editTransactionForm.addEventListener("change", () => updateCategoryDropdown(editTransactionForm));

// Edit modal controls
closeEditModal.addEventListener("click", closeEditModalWindow);
cancelEdit.addEventListener("click", closeEditModalWindow);
editModal.addEventListener("click", (e) => {
  if (e.target === editModal) {
    closeEditModalWindow();
  }
});

// Delete modal controls
closeDeleteModal.addEventListener("click", closeDeleteModalWindow);
cancelDelete.addEventListener("click", closeDeleteModalWindow);
deleteModal.addEventListener("click", (e) => {
  if (e.target === deleteModal) {
    closeDeleteModalWindow();
  }
});

confirmDelete.addEventListener("click", () => {
  if (state.pendingDeleteId) {
    deleteTransaction(state.pendingDeleteId);
  }
  closeDeleteModalWindow();
});

// Theme toggle
themeToggle.addEventListener("click", toggleTheme);

// Export and print
exportCSVBtn.addEventListener("click", () => downloadCSV(state.filteredTransactions));
printReportBtn.addEventListener("click", handlePrintReport);

// 1. Clear Filters button handler
document.getElementById('clearFilters').addEventListener('click', () => {
  document.getElementById('filterType').value = 'all';
  document.getElementById('filterCategory').value = 'all';
  document.getElementById('filterStartDate').value = '';
  document.getElementById('filterEndDate').value = '';
  applyFilters();
  showToast('Filters cleared', 'info');
});

// 3. Toast close button
document.querySelector('.toast-close')?.addEventListener('click', () => {
  document.getElementById('toast').style.display = 'none';
});



// ===== INITIALIZE APP =====
initState();
