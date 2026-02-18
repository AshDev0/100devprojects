// DOM ELEMENTS
const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const modeDisplay = document.getElementById("mode");
const sessionDisplay = document.getElementById("session");
const muteBtn = document.getElementById("muteBtn");
const progressCircle = document.getElementById("progressCircle");
const container = document.querySelector(".container");
const toastContainer = document.getElementById("toastContainer");
const radius = 140;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;

// Settings panel elements
const settingsPanel = document.getElementById("settingsPanel");
const workInput = document.getElementById("workInput");
const breakInput = document.getElementById("breakInput");
const longBreakInput = document.getElementById("longBreakInput");
const saveSettingsBtn = document.getElementById("saveSettings");
const cancelSettingsBtn = document.getElementById("cancelSettings");
const settingsBtn = document.getElementById("settingsBtn");

// State Variables
let timeLeft = 1500;
let intervalId = null;
let isRunning = false;
let isMuted = false;

// Mode variables
let currentMode = "work";
let workDuration = 1500;
let breakDuration = 300;
let longBreakDuration = 900;
const workSound = new Audio("./sounds/work-done.mp3");
const breakSound = new Audio("./sounds/break-done.mp3");

// Session tracking
let completedSessions = 0;

// Notification permission
let hasRequestedPermission = false;

// ─── LOCAL STORAGE ───────────────────────────────────────
const saveToLocalStorage = () => {
  try {
    const data = JSON.stringify({
      workDuration,
      breakDuration,
      longBreakDuration,
      isMuted,
    });
    localStorage.setItem("pomodoroSettings", data);
  } catch (e) {
    // localStorage not available
  }
};

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("pomodoroSettings");
    if (!saved) return;
    const settings = JSON.parse(saved);
    workDuration = settings.workDuration || 1500;
    breakDuration = settings.breakDuration || 300;
    longBreakDuration = settings.longBreakDuration || 900;
    isMuted = !!settings.isMuted;
    timeLeft = workDuration;
  } catch (e) {
    // Invalid or unavailable, use defaults
  }
};

// ─── TOAST NOTIFICATIONS ─────────────────────────────────
const showToast = (message, type = "info") => {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

// ─── NOTIFICATION PERMISSION ─────────────────────────────
const requestNotificationPermission = () => {
  if (!("Notification" in window)) {
    showToast("Your browser does not support notifications", "error");
    return;
  }

  if (
    Notification.permission === "granted" ||
    Notification.permission === "denied"
  ) {
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      showToast("Notifications enabled!", "success");
    }
  });
};

const showNotification = (title, message) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    showToast(`${title} - ${message}`, "info");
    return;
  }

  const notification = new Notification(title, {
    body: message,
    icon: "🍅",
    badge: "🍅",
    tag: "pomodoro-timer",
    requireInteraction: false,
  });

  notification.onclick = function () {
    window.focus();
    this.close();
  };
};

// ─── DISPLAY FUNCTIONS ───────────────────────────────────
const updateProgress = () => {
  let totalTime;
  if (currentMode === "work") {
    totalTime = workDuration;
  } else if (currentMode === "break") {
    totalTime = breakDuration;
  } else if (currentMode === "longBreak") {
    totalTime = longBreakDuration;
  }

  const percent = timeLeft / totalTime;
  const offset = circumference - percent * circumference;
  progressCircle.style.strokeDashoffset = offset;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const updateDisplay = () => {
  const time = formatTime(timeLeft);
  timerDisplay.textContent = time;
  document.title = `${time} | Pomodoro Timer`;
};

const updateModeDisplay = () => {
  container.classList.remove("mode-work", "mode-break", "mode-long-break");

  if (currentMode === "work") {
    modeDisplay.textContent = "WORK MODE";
    container.classList.add("mode-work");
  } else if (currentMode === "break") {
    modeDisplay.textContent = "BREAK MODE";
    container.classList.add("mode-break");
  } else if (currentMode === "longBreak") {
    modeDisplay.textContent = "LONG BREAK";
    container.classList.add("mode-long-break");
  }
};

const updateSessionDisplay = () => {
  const currentSession = completedSessions + 1;
  sessionDisplay.textContent = `Session ${currentSession} of 4`;
};

const updateMuteDisplay = () => {
  if (isMuted) {
    muteBtn.textContent = "🔇 Sound Off";
    muteBtn.classList.add("muted");
    muteBtn.setAttribute("aria-label", "Sound is off, click to turn on");
  } else {
    muteBtn.textContent = "🔊 Sound On";
    muteBtn.classList.remove("muted");
    muteBtn.setAttribute("aria-label", "Sound is on, click to turn off");
  }
};

// ─── CORE FUNCTIONS ──────────────────────────────────────
const switchMode = () => {
  if (currentMode === "work") {
    completedSessions += 1;

    if (completedSessions === 4) {
      currentMode = "longBreak";
      timeLeft = longBreakDuration;
      completedSessions = 0;
    } else {
      currentMode = "break";
      timeLeft = breakDuration;
    }
  } else if (currentMode === "break" || currentMode === "longBreak") {
    currentMode = "work";
    timeLeft = workDuration;
  }

  updateDisplay();
  updateModeDisplay();
  updateSessionDisplay();
  updateProgress();
};

const playSound = (soundType) => {
  if (isMuted) return;
  try {
    const audio = soundType === "work" ? workSound : breakSound;
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {
    // Audio playback failed
  }
};

const toggleMute = () => {
  isMuted = !isMuted;
  updateMuteDisplay();
  saveToLocalStorage();
};

// ─── SETTINGS PANEL ──────────────────────────────────────
const trapFocus = (e) => {
  if (e.key !== "Tab") return;

  const focusable = settingsPanel.querySelectorAll("input, button");
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
};

const openSettings = () => {
  workInput.value = workDuration / 60;
  breakInput.value = breakDuration / 60;
  longBreakInput.value = longBreakDuration / 60;
  settingsPanel.classList.remove("hidden");
  workInput.focus();
  settingsPanel.addEventListener("keydown", trapFocus);
};

const closeSettings = () => {
  settingsPanel.classList.add("hidden");
  settingsPanel.removeEventListener("keydown", trapFocus);
  settingsBtn.focus();
};

const applySettings = () => {
  const newWork = parseInt(workInput.value) * 60;
  const newBreak = parseInt(breakInput.value) * 60;
  const newLongBreak = parseInt(longBreakInput.value) * 60;

  if (isNaN(newWork) || newWork < 60 || newWork > 3600) {
    showToast("Work duration must be between 1-60 minutes", "error");
    return;
  }

  if (isNaN(newBreak) || newBreak < 60 || newBreak > 1800) {
    showToast("Break duration must be between 1-30 minutes", "error");
    return;
  }

  if (isNaN(newLongBreak) || newLongBreak < 300 || newLongBreak > 3600) {
    showToast("Long break must be between 5-60 minutes", "error");
    return;
  }

  workDuration = newWork;
  breakDuration = newBreak;
  longBreakDuration = newLongBreak;

  if (!isRunning && currentMode === "work") {
    timeLeft = workDuration;
    updateDisplay();
    updateProgress();
  }

  saveToLocalStorage();
  closeSettings();
  showToast("Settings saved successfully!", "success");
};

// ─── TIMER CONTROLS ──────────────────────────────────────
const startTimer = () => {
  if (!hasRequestedPermission) {
    requestNotificationPermission();
    hasRequestedPermission = true;
  }

  if (isRunning) return;

  isRunning = true;
  startBtn.textContent = "Running";
  startBtn.disabled = true;

  intervalId = setInterval(() => {
    timeLeft -= 1;
    updateDisplay();
    updateProgress();

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      isRunning = false;

      if (currentMode === "work") {
        const sessionsCompleted = completedSessions + 1;
        playSound("work");
        if (sessionsCompleted === 4) {
          showNotification(
            "Pomodoro Complete!",
            "4 work sessions done! Take a 15-minute long break.",
          );
        } else {
          showNotification(
            "Work Session Complete!",
            `Session ${sessionsCompleted} of 4 done! Take a 5-minute break.`,
          );
        }
      } else if (currentMode === "break") {
        playSound("break");
        showNotification(
          "Break Over!",
          "Ready for the next work session? Let's focus!",
        );
      } else if (currentMode === "longBreak") {
        playSound("longBreak");
        showNotification(
          "Long Break Over!",
          "Great work! Starting a fresh cycle. Session 1 of 4.",
        );
      }

      switchMode();
      startBtn.textContent = "Start";
      startBtn.disabled = false;
    }
  }, 1000);
};

const pauseTimer = () => {
  if (!isRunning) return;
  clearInterval(intervalId);
  isRunning = false;
  startBtn.textContent = "Resume";
  startBtn.disabled = false;
};

const resetTimer = () => {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }

  if (currentMode === "work") {
    timeLeft = workDuration;
  } else if (currentMode === "break") {
    timeLeft = breakDuration;
  } else if (currentMode === "longBreak") {
    timeLeft = longBreakDuration;
  }

  updateDisplay();
  updateProgress();
  startBtn.textContent = "Start";
  startBtn.disabled = false;
};

// ─── EVENT LISTENERS ─────────────────────────────────────
settingsBtn.addEventListener("click", openSettings);
saveSettingsBtn.addEventListener("click", applySettings);
cancelSettingsBtn.addEventListener("click", closeSettings);

settingsPanel.addEventListener("click", (e) => {
  if (e.target === settingsPanel) {
    closeSettings();
  }
});

startBtn.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
muteBtn.addEventListener("click", toggleMute);

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !settingsPanel.classList.contains("hidden")) {
    closeSettings();
    return;
  }

  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    return;
  }

  if (e.key === " " || e.code === "Space") {
    e.preventDefault();
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }
});

// ─── INIT ────────────────────────────────────────────────
loadFromLocalStorage();
updateMuteDisplay();
updateDisplay();
updateModeDisplay();
updateSessionDisplay();
updateProgress();
