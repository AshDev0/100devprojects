//
const form = document.getElementById("bmi-form");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const resultsDiv = document.getElementById("results");
const historyDiv = document.getElementById("history");
const historyList = document.getElementById("history-list");
const resetBtn = document.getElementById("reset-btn");

// BMI CATEGORIES OBJECTS AND MESSAGES
const BMI_CATEGORIES = {
  UNDERWEIGHT: {
    max: 18.5,
    class: "underweight",
    label: "Underweight",
    message:
      "You might want to gain some weight. Consult a healthcare provider for personalized advice.",
    color: "#3B82F6",
  },
  NORMAL: {
    min: 18.5,
    max: 24.9,
    class: "normal",
    label: "Normal Weight",
    message:
      "Great! You are at a healthy weight. Keep maintaining your current lifestyle.",
    color: "#10B981",
  },
  OVERWEIGHT: {
    min: 25,
    max: 29.9,
    class: "overweight",
    label: "Overweight",
    message:
      "Consider adopting a healthier diet and exercise routine. Consult a healthcare provider.",
    color: "#F59E0B",
  },
  OBESE: {
    min: 30,
    class: "obese",
    label: "Obese",
    message:
      "It's important to consult a healthcare provider for a personalized health plan.",
    color: "#EF4444",
  },
};

// UTILITY FUNCTIONS

function calculateBMI(height, weight) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10;
}

function getBMICategory(bmi) {
  if (bmi < BMI_CATEGORIES.UNDERWEIGHT.max) {
    return BMI_CATEGORIES.UNDERWEIGHT;
  } else if (
    bmi >= BMI_CATEGORIES.NORMAL.min &&
    bmi <= BMI_CATEGORIES.NORMAL.max
  ) {
    return BMI_CATEGORIES.NORMAL;
  } else if (
    bmi >= BMI_CATEGORIES.OVERWEIGHT.min &&
    bmi <= BMI_CATEGORIES.OVERWEIGHT.max
  ) {
    return BMI_CATEGORIES.OVERWEIGHT;
  } else {
    return BMI_CATEGORIES.OBESE;
  }
}

// Validate Input - Check if value is a positive number
function validateInput(value, fieldName) {
  if (!value || value === "") {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }

  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return {
      isValid: false,
      error: `${fieldName} must be a valid number`,
    };
  }

  if (numValue <= 0) {
    return {
      isValid: false,
      error: `${fieldName} must be greater than 0`,
    };
  }

  if (fieldName === "Height" && (numValue < 50 || numValue > 300)) {
    return {
      isValid: false,
      error: "Height must be between 50 and 300 cm",
    };
  }

  if (fieldName === "Weight" && (numValue < 10 || numValue > 500)) {
    return {
      isValid: false,
      error: "Weight must be between 10 and 500 kg",
    };
  }

  return { isValid: true, error: "" };
}

function showError(input, errorId, message) {
  const errorElement = document.getElementById(errorId);
  input.classList.add("error");
  errorElement.textContent = message;
}

function clearError(input, errorId) {
  const errorElement = document.getElementById(errorId);
  input.classList.remove("error");
  errorElement.textContent = "";
}

function getTimestamp() {
  const now = new Date();
  return now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Local Storage Functions

function saveToHistory(data) {
  let history = getHistory();
  data.timestamp = getTimestamp();
  data.id = Date.now();
  history.unshift(data);
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  localStorage.setItem("bmiHistory", JSON.stringify(history));
}

function getHistory() {
  const stored = localStorage.getItem("bmiHistory");
  return stored ? JSON.parse(stored) : [];
}

// Make these available globally for inline onclick handlers
window.deleteFromHistory = function(id) {
  let history = getHistory();
  history = history.filter((item) => item.id !== id);
  localStorage.setItem("bmiHistory", JSON.stringify(history));
  displayHistory();
}

window.clearHistory = function() {
  localStorage.removeItem("bmiHistory");
  historyDiv.classList.remove("show");
  historyList.innerHTML = "";
}

// DISPLAY FUNCTIONS

function displayResults(bmi, height, weight) {
  const category = getBMICategory(bmi);

  resultsDiv.innerHTML = `
    <h2>Your BMI Result</h2>
    <div class="bmi-value" style="color: ${category.color}">${bmi}</div>
    <div class="bmi-category">${category.label}</div>
    <p class="bmi-message">${category.message}</p>
    `;

  resultsDiv.className = "results";

  resultsDiv.classList.add(category.class);
  resultsDiv.classList.add("show");

  saveToHistory({
    bmi,
    height,
    weight,
    category: category.label,
    categoryClass: category.class,
  });

  displayHistory();
  resultsDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Display BMI calculation history

function displayHistory() {
  const history = getHistory();
  if (history.length === 0) {
    historyDiv.classList.remove("show");
    return;
  }

  historyDiv.classList.add("show");
  historyList.innerHTML = history
    .map(
      (item) => `<div class="history-item ${item.categoryClass}">
       <div class="history-info">
                <div class="history-bmi">${item.bmi}</div>
                <div class="history-details">
                    ${item.height}cm • ${item.weight}kg • ${item.category}
                </div>
                <div class="history-details" style="font-size: 0.75rem; margin-top: 0.25rem;">
                    ${item.timestamp}
                </div>
            </div>
            <button 
                class="history-delete" 
                onclick="deleteFromHistory(${item.id})"
                title="Delete"
            >
                🗑️
            </button> 
        </div>`
    )
    .join("");
}

// Event Handlers

function handleSubmit(e) {
  e.preventDefault();

  const height = heightInput.value.trim();
  const weight = weightInput.value.trim();

  clearError(heightInput, "height-error");
  clearError(weightInput, "weight-error");

  const heightValidation = validateInput(height, "Height");
  if (!heightValidation.isValid) {
    showError(heightInput, "height-error", heightValidation.error);
    heightInput.focus();
    return;
  }

  const weightValidation = validateInput(weight, "Weight");
  if (!weightValidation.isValid) {
    showError(weightInput, "weight-error", weightValidation.error);
    weightInput.focus();
    return;
  }

  const heightNum = parseFloat(height);
  const weightNum = parseFloat(weight);

  const bmi = calculateBMI(heightNum, weightNum);

  displayResults(bmi, heightNum, weightNum);
}

// Handle Reset

function handleReset() {
  form.reset();
  clearError(heightInput, "height-error");
  clearError(weightInput, "weight-error");
  resultsDiv.classList.remove("show");
  heightInput.focus();
}

function handleInputChange(e) {
  const input = e.target;
  const errorId = `${input.id}-error`;

  if (input.classList.contains("error")) {
    clearError(input, errorId);
  }
}

// EVENT LISTENERS
form.addEventListener("submit", handleSubmit);
resetBtn.addEventListener("click", handleReset);
heightInput.addEventListener("input", handleInputChange);
weightInput.addEventListener("input", handleInputChange);
document.addEventListener("DOMContentLoaded", () => {
  displayHistory();
  heightInput.focus();

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      heightInput.focus();
    }

    if (e.key === "Escape") {
      handleReset();
    }
  });
});
