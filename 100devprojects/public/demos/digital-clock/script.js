// ============================================
// DIGITAL CLOCK
// ============================================

// ============================================
// GLOBAL STATE & DOM ELEMENTS
// ============================================

// Mode Management
let currentMode = "clock";

// DOM Elements - Clock Mode
const dateDisplay = document.getElementById("date-display");
const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const ampmDisplay = document.getElementById("ampm");
const timezoneInfo = document.getElementById("timezone-info");
const formatToggle = document.getElementById("format-toggle");
const formatText = document.getElementById("format-text");

// DOM Elements - Stopwatch Mode
const swMinutes = document.getElementById("sw-minutes");
const swSeconds = document.getElementById("sw-seconds");
const swMilliseconds = document.getElementById("sw-milliseconds");
const swStart = document.getElementById("sw-start");
const swStop = document.getElementById("sw-stop");
const swLap = document.getElementById("sw-lap");
const swReset = document.getElementById("sw-reset");
const lapsList = document.getElementById("laps-list");

// DOM Elements - Timer Mode
const timerHoursInput = document.getElementById("timer-hours");
const timerMinutesInput = document.getElementById("timer-minutes");
const timerSecondsInput = document.getElementById("timer-seconds");
const timerInput = document.getElementById("timer-input");
const timerDisplay = document.getElementById("timer-display");
const tHours = document.getElementById("t-hours");
const tMinutes = document.getElementById("t-minutes");
const tSeconds = document.getElementById("t-seconds");
const timerStart = document.getElementById("timer-start");
const timerPause = document.getElementById("timer-pause");
const timerReset = document.getElementById("timer-reset");
const progressCircle = document.getElementById("progress-circle");
const progressText = document.getElementById("progress-text");
const timerAlert = document.getElementById("timer-alert");

// DOM Elements - General
const darkModeToggle = document.getElementById("darkModeToggle");
const tabButtons = document.querySelectorAll(".tab-btn");
const modeContents = document.querySelectorAll(".mode-content");

// CLOCK STATE
let is24HourFormat = true;
let clockInterval = null;

// STOPWATCH STATE
let stopWatchRunning = false;
let stopWatchInterval = null;
let stopWatchTime = 0;
let lapCounter = 1;
let laps = [];

//TIMER STATE
let timerRunning = false;
let timerPaused = false;
let timerInterval = null;
let timerTotalSeconds = 0;
let timerRemainingSeconds = 0;

// UTILITY FUNCTIONS
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function formatStopwatchTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  return {
    minutes: padZero(minutes),
    seconds: padZero(seconds),
    milliseconds: padZero(milliseconds),
  };
}

function formatTimerTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: padZero(hours),
    minutes: padZero(minutes),
    seconds: padZero(seconds),
  };
}

// Save Settings to localStorage

function saveSettings() {
  localStorage.setItem(
    "clockSettings",
    JSON.stringify({
      is24HourFormat,
      darkMode: document.body.classList.contains("dark-mode"),
    })
  );
}

// Load settings from localStorage

function loadSettings() {
  const saved = localStorage.getItem("clockSettings");
  if (saved) {
    const settings = JSON.parse(saved);
    is24HourFormat = settings.is24HourFormat;

    if (settings.darkMode) {
      document.body.classList.add("dark-mode");
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    updateFormatButton();
  }
}

function updateFormatButton() {
  formatText.innerText = is24HourFormat ? "24H" : "12H";
}

// CLOCK MODE FUNCTIONS

// Start the clock and update every second

function startClock() {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
}

// Update clock display with current time
function updateClock() {
  const now = new Date();

  //get time Components;
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  //Format date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("en-US", options);
  dateDisplay.textContent = dateString;

  //Handle 12/24 hour format
  if (is24HourFormat) {
    hoursDisplay.textContent = padZero(hours);
    ampmDisplay.style.display = "none";
  } else {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hoursDisplay.textContent = padZero(hours);
    ampmDisplay.textContent = ampm;
    ampmDisplay.style.display = "inline";
  }

  minutesDisplay.textContent = padZero(minutes);
  secondsDisplay.textContent = padZero(seconds);

  // Update timezone info
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timezoneInfo.textContent = `Time Zone: ${timeZone}`;
}

/**
 * Toggle between 12 and 24 hour format
 */

function toggleFormat() {
  is24HourFormat = !is24HourFormat;
  updateFormatButton();
  updateClock();
  saveSettings();
}

// ============================================
// STOPWATCH MODE FUNCTIONS
// ============================================

/**
 * Start the stopwatch
 */

function startStopwatch() {
  if (!stopWatchRunning) {
    stopWatchRunning = true;
    const startTime = Date.now() - stopWatchTime;

    stopWatchInterval = setInterval(() => {
      stopWatchTime = Date.now() - startTime;
      updateStopwatchDisplay();
    }, 10);

    // Update button states
    swStart.disabled = true;
    swStop.disabled = false;
    swLap.disabled = false;

    // Change start button to resume if paused
    swStart.innerHTML = '<i class="fas fa-play"></i> Resume';
  }
}

/**
 * Stop/Pause the stopwatch
 */

function stopStopwatch() {
  if (stopWatchRunning) {
    stopWatchRunning = false;
    clearInterval(stopWatchInterval);
    // Update button states
    swStart.disabled = false;
    swStop.disabled = true;
    swLap.disabled = true;
  }
}

/**
 * Record a lap time
 */

function recordLap() {
  if (stopWatchRunning) {
    const lapTime = formatStopwatchTime(stopWatchTime);
    const lapTimeString = `${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds}`;

    laps.push({
      number: lapCounter,
      time: lapTimeString,
      timeStamp: stopWatchTime,
    });

    displayLaps();
    lapCounter++;
  }
}

function displayLaps() {
  if (laps.length === 0) {
    lapsList.innerHTML = '<p class="empty-message">No laps recorded yet</p>';
    return;
  }
  // Reverse to show latest first
  const reversedLaps = [...laps].reverse();
  lapsList.innerHTML = reversedLaps
    .map(
      (lap) => `
    <div class="lap-item">
    <span class="lap-number">Lap ${lap.number}</span>
    <span class="lap-time">${lap.time}</span>
    </div>
    `
    )
    .join("");
}

/**
 * Reset the stopwatch
 */
function resetStopwatch() {
  stopStopwatch();
  stopWatchTime = 0;
  lapCounter = 1;
  laps = [];
  updateStopwatchDisplay();
  displayLaps();
  // Reset button text
  swStart.innerHTML = '<i class="fas fa-play"></i> Start';
  swStart.disabled = false;
  swStop.disabled = true;
  swLap.disabled = true;
}

/**
 * Update stopwatch display
 */
function updateStopwatchDisplay() {
  const time = formatStopwatchTime(stopWatchTime);
  swMinutes.textContent = time.minutes;
  swSeconds.textContent = time.seconds;
  swMilliseconds.textContent = time.milliseconds;
}

// ============================================
// TIMER MODE FUNCTIONS
// ============================================

/**
 * Start the countdown timer
 */

function startTimer() {
  if (!timerRunning) {
    // Get input values
    const hours = parseInt(timerHoursInput.value) || 0;
    const minutes = parseInt(timerMinutesInput.value) || 0;
    const seconds = parseInt(timerSecondsInput.value) || 0;

    // Calculate total seconds
    timerTotalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (timerTotalSeconds === 0) {
      alert("Please set a time greater than 0!");
      return;
    }

    // If starting fresh (not resumed)
    if (!timerPaused) {
      timerRemainingSeconds = timerTotalSeconds;
    }

    timerRunning = true;
    timerPaused = false;

    // Hide input, show display
    timerInput.style.display = "none";
    timerDisplay.style.display = "block";

    // Update button states
    timerStart.disabled = true;
    timerPause.disabled = false;

    // Start countdown
    timerInterval = setInterval(() => {
      timerRemainingSeconds--;

      if (timerRemainingSeconds < 0) {
        timerComplete();
        return;
      }

      updateTimerDisplay();
      updateTimerProgress();
    }, 1000);
    updateTimerDisplay();
    updateTimerProgress();
  }
}

/**
 * Pause the timer
 */

function pauseTimer() {
  if (timerRunning) {
    timerRunning = false;
    timerPaused = true;
    clearInterval(timerInterval);

    //Update button States
    timerStart.disabled = false;
    timerPause.disabled = true;
    timerStart.innerHTML = '<i class="fas fa-play"></i> Resume';
  }
}

/**
 * Reset the timer
 */

function resetTimer() {
  timerRunning = false;
  timerPaused = false;
  clearInterval(timerInterval);
  timerRemainingSeconds = 0;

  // Show input, hide display
  timerInput.style.display = "flex";
  timerDisplay.style.display = "none";

  // Reset inputs
  timerHoursInput.value = 0;
  timerMinutesInput.value = 0;
  timerSecondsInput.value = 0;
  // Reset button states
  timerStart.disabled = false;
  timerPause.disabled = true;
  timerStart.innerHTML = '<i class="fas fa-play"></i> Start';
  // Reset progress
  updateTimerProgress();
}

/**
 * Update timer display
 */

function updateTimerDisplay() {
  const time = formatTimerTime(timerRemainingSeconds);
  tHours.textContent = time.hours;
  tMinutes.textContent = time.minutes;
  tSeconds.textContent = time.seconds;
}

/**
 * Update timer progress circle
 */

function updateTimerProgress() {
  const circumference = 2 * Math.PI * 90; //radius = 90
  const progress =
    timerTotalSeconds > 0 ? timerRemainingSeconds / timerTotalSeconds : 0;
  const offset = circumference * (1 - progress);

  progressCircle.style.strokeDashoffset = offset;
  progressText.textContent = `${Math.round(progress * 100)}%`;

  // Change color based on remaining time
  if (progress < 0.2) {
    progressCircle.style.stroke = "#EF4444"; // Red
  } else if (progress < 0.5) {
    progressCircle.style.stroke = "#F59E0B"; // Orange
  } else {
    progressCircle.style.stroke = "#3B82F6"; // Blue
  }
}

/**
 * Handle timer completion
 */
function timerComplete() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerRemainingSeconds = 0;
  updateTimerDisplay();
  updateTimerProgress();

  // Play alert sound
  timerAlert.play().catch((err) => console.log("Audio play failed:", err));

  // Show notification

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Timer Complete!", {
      body: "Your countdown timer has finished.",
      icon: "/favicon.ico",
    });
  }

  // Visual feedback
  timerDisplay.style.animation = "pulse 0.5s ease 3";

  // Show alert
  setTimeout(() => {
    alert("⏰ Timer Complete!");
    resetTimer();
  }, 500);
}

// ============================================
// TAB/MODE SWITCHING
// ============================================

function switchMode(mode) {
  currentMode = mode;

  // Update tab buttons
  tabButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.tab === mode) {
      btn.classList.add("active");
    }
  });

  // Update content visibility
  modeContents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === `${mode}-mode`) {
      content.classList.add("active");
    }
  });

  // Handle mode-specific logic
  if (mode === "clock") {
    if (!clockInterval) {
      startClock();
    }
  } else {
    // Stop clock when switching away
    if (clockInterval) {
      clearInterval(clockInterval);
      clockInterval = null;
    }
  }
}

// ============================================
// DARK MODE
// ============================================

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  darkModeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  saveSettings();
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function handleKeyboardShortcuts(e) {
  if (e.target.tagName === "INPUT") return;
  switch (e.key.toLowerCase()) {
    case " ": // Space - Start/Stop
      e.preventDefault();
      if (currentMode === "stopwatch") {
        if (stopWatchRunning) {
          stopStopwatch();
        } else {
          startStopwatch();
        }
      } else if (currentMode === "timer") {
        if (timerRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      }
      break;

    case "r": // R - Reset
      if (currentMode === "stopwatch") {
        resetStopwatch();
      } else if (currentMode === "timer") {
        resetTimer();
      }
      break;

    case "l": // L - Lap (stopwatch only)
      if (currentMode === "stopwatch") {
        recordLap();
      }
      break;

    case "d": // D - Dark mode
      toggleDarkMode();
      break;

    case "f": // F - Format toggle
      if (currentMode === "clock") {
        toggleFormat();
      }
      break;
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Tab switching
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchMode(btn.dataset.tab);
  });
});

// Clock controls
formatToggle.addEventListener("click", toggleFormat);

// Stopwatch controls
swStart.addEventListener("click", startStopwatch);
swStop.addEventListener("click", stopStopwatch);
swLap.addEventListener("click", recordLap);
swReset.addEventListener("click", resetStopwatch);

// Timer controls
timerStart.addEventListener("click", startTimer);
timerPause.addEventListener("click", pauseTimer);
timerReset.addEventListener("click", resetTimer);

// Prevent negative values in timer inputs
[timerHoursInput, timerMinutesInput, timerSecondsInput].forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
  });

  // Auto-adjust values on blur
  input.addEventListener("blur", (e) => {
    const value = parseInt(e.target.value) || 0;
    const max = e.target.max ? parseInt(e.target.max) : Infinity;
    e.target.value = Math.min(value, max);
  });
});

// Dark mode toggle
darkModeToggle.addEventListener("click", toggleDarkMode);

// Keyboard shortcuts
document.addEventListener("keydown", handleKeyboardShortcuts);

/**
 * Request notification permission for timer alerts
 */
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */

function init() {
  console.log("🔥 Digital Clock initialized");
  // Load saved settings
  loadSettings();

  // Start Clock
  startClock();

  // Initialize displays
  updateStopwatchDisplay();
  displayLaps();

  // Request notification permission
  requestNotificationPermission();

  // Add CSS animation for pulse effect
  const style = document.createElement("style");
  style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
  document.head.appendChild(style);
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

