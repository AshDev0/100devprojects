// ============================================
// GUESS THE NUMBER GAME - 100 Dev Projects STYLE
// ============================================
// Bhai, yeh game simple hai: ek number guess karo!
// Sab kuch clearly samjhaya gaya hai - comments padhte jao

// ============================================
// 1. GAME KI SETTINGS (Configuration)
// ============================================

// Difficulty levels ki configuration
const DIFFICULTY_LEVELS = {
    easy: {
        min: 1,
        max: 50,
        attempts: 15,
        name: 'Easy'
    },
    medium: {
        min: 1,
        max: 100,
        attempts: 10,
        name: 'Medium'
    },
    hard: {
        min: 1,
        max: 200,
        attempts: 7,
        name: 'Hard'
    },
    expert: {
        min: 1,
        max: 500,
        attempts: 5,
        name: 'Expert'
    }
};

// Game ki current settings
let settings = {
    difficulty: 'medium',
    soundEffects: true,
    hintsEnabled: true,
    timerMode: false
};

// ============================================
// 2. GAME KA CURRENT STATE (Kya chal raha hai abhi)
// ============================================

let game = {
    secretNumber: 0,        // Jo number guess karna hai
    guesses: [],            // User ne kya-kya guess kiya
    attemptsLeft: 10,       // Kitne chances bache hain
    isActive: false,        // Game chal raha hai ya nahi
    hasWon: false,          // Jeet gaye ya nahi
    startTime: null         // Game kab start hua
};

// ============================================
// 3. STATISTICS (Player ka track record)
// ============================================

let stats = {
    totalGames: 0,          // Kitne games khele
    gamesWon: 0,            // Kitne jeete
    bestScore: null,        // Sabse kam attempts mein jeet
    currentStreak: 0,       // Kitne baar continuously jeeta
    recentGames: []         // Last 10 games ka record
};

// ============================================
// 4. DOM ELEMENTS (HTML ke sab elements pakdo)
// ============================================

// Main game elements
const mysteryNumber = document.querySelector('.mystery-number');
const guessInput = document.getElementById('guess-input');
const guessForm = document.getElementById('guess-form');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const guessesList = document.getElementById('guesses-list');
const gameSection = document.getElementById('game-section');
const gameOver = document.getElementById('game-over');

// Info display elements
const difficultyDisplay = document.getElementById('difficulty-display');
const rangeDisplay = document.getElementById('range-display');
const attemptsLeftDisplay = document.getElementById('attempts-left');
const highScoreDisplay = document.getElementById('high-score');
const hintText = document.getElementById('hint-text');

// Game over elements
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const revealedNumber = document.getElementById('revealed-number');

// Button elements
const newGameBtn = document.getElementById('new-game-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const settingsBtn = document.getElementById('settings-btn');
const statsBtn = document.getElementById('stats-btn');

// Modal elements
const settingsModal = document.getElementById('settings-modal');
const statsModal = document.getElementById('stats-modal');
const closeSettings = document.getElementById('close-settings');
const closeStats = document.getElementById('close-stats');

// Settings controls
const difficultySelect = document.getElementById('difficulty-select');
const soundEffectsCheckbox = document.getElementById('sound-effects');
const hintsEnabledCheckbox = document.getElementById('hints-enabled');
const timerModeCheckbox = document.getElementById('timer-mode');
const saveSettingsBtn = document.getElementById('save-settings');
const resetStatsBtn = document.getElementById('reset-stats');

// Stats display
const totalGamesDisplay = document.getElementById('total-games');
const gamesWonDisplay = document.getElementById('games-won');
const winRateDisplay = document.getElementById('win-rate');
const bestScoreDisplay = document.getElementById('best-score');
const avgGuessesDisplay = document.getElementById('avg-guesses');
const currentStreakDisplay = document.getElementById('current-streak');
const recentGamesList = document.getElementById('recent-games-list');

// Toast notification
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ============================================
// 5. CORE GAME FUNCTIONS (Main logic yahan hai)
// ============================================

/**
 * Naya game start karo
 * Yeh function game ko reset karke fresh start deta hai
 */
function startNewGame() {
    console.log('🎮 Naya game shuru kar rahe hain...');

    // Current difficulty ke settings le lo
    const config = DIFFICULTY_LEVELS[settings.difficulty];

    // Random number generate karo (secret number)
    game.secretNumber = getRandomNumber(config.min, config.max);

    // Game state reset karo
    game.guesses = [];
    game.attemptsLeft = config.attempts;
    game.isActive = true;
    game.hasWon = false;
    game.startTime = Date.now();

    // UI update karo
    updateDisplay();
    resetUI();

    // Input field par focus karo
    guessInput.focus();

    // Debug ke liye (production mein comment out kar dena)
    console.log('Secret Number:', game.secretNumber);
}

/**
 * Random number generate karta hai min aur max ke beech
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * User ka guess process karo
 * Yahan sab validation aur checking hoti hai
 */
function handleGuess(guessValue) {
    // Pehle check karo ki game active hai ya nahi
    if (!game.isActive) {
        showToast('Pehle naya game start karo!');
        return;
    }

    // Number mein convert karo
    const guess = Number(guessValue);

    // Validation: kya valid number hai?
    if (!isValidGuess(guess)) {
        return;
    }

    // Check karo: pehle se guess kiya hai kya?
    if (game.guesses.includes(guess)) {
        showFeedback('Yeh number toh pehle hi try kar chuke ho!', 'error');
        return;
    }

    // Guess ko save karo
    game.guesses.push(guess);
    game.attemptsLeft--;

    // Guesses list update karo
    updateGuessesList();

    // Check: sahi guess hai?
    if (guess === game.secretNumber) {
        handleWin();
    }
    // Check: attempts khatam ho gaye?
    else if (game.attemptsLeft === 0) {
        handleLoss();
    }
    // Wrong guess - hint do
    else {
        giveHint(guess);
    }

    // Attempts display update karo
    attemptsLeftDisplay.textContent = game.attemptsLeft;

    // Input field clear karo
    guessInput.value = '';
    guessInput.focus();
}

/**
 * Check karo ki guess valid hai ya nahi
 */
function isValidGuess(guess) {
    const config = DIFFICULTY_LEVELS[settings.difficulty];

    // Check: number hai ya nahi?
    if (isNaN(guess) || guess === '') {
        showFeedback('Bhai, ek valid number daalo!', 'error');
        return false;
    }

    // Check: range mein hai ya nahi?
    if (guess < config.min || guess > config.max) {
        showFeedback(`Number ${config.min} se ${config.max} ke beech hona chahiye!`, 'error');
        return false;
    }

    return true;
}

/**
 * User ko hint do ki number chhota ya bada hai
 */
function giveHint(guess) {
    if (!settings.hintsEnabled) {
        // Hints band hain toh simple message
        showFeedback(`Galat! ${game.attemptsLeft} chances bache hain.`, 'error');
        playSound('wrong');
        return;
    }

    // Too high ya too low?
    if (guess > game.secretNumber) {
        showFeedback(
            `📉 Bahut zyada! Chhota number try karo. ${game.attemptsLeft} chances bache.`,
            'too-high'
        );
    } else {
        showFeedback(
            `📈 Bahut kam! Bada number try karo. ${game.attemptsLeft} chances bache.`,
            'too-low'
        );
    }

    // Sound play karo
    playSound('wrong');
}

/**
 * Jab user jeet jaye
 */
function handleWin() {
    console.log('🎉 User jeet gaya!');

    game.isActive = false;
    game.hasWon = true;

    const attempts = game.guesses.length;
    const timeSpent = Math.floor((Date.now() - game.startTime) / 1000);

    // Success feedback
    showFeedback('🎉 Shabash! Sahi pakda!', 'correct');

    // Sound effect
    playSound('win');

    // Stats update karo
    updateStats(true, attempts);

    // Game over screen dikhao
    showGameOverScreen(true, attempts, timeSpent);

    // Secret number reveal karo
    revealSecretNumber();
}

/**
 * Jab user haar jaye
 */
function handleLoss() {
    console.log('😢 User haar gaya');

    game.isActive = false;
    game.hasWon = false;

    const timeSpent = Math.floor((Date.now() - game.startTime) / 1000);

    // Failure feedback
    showFeedback('😢 Game Over! Chances khatam ho gaye.', 'error');

    // Sound effect
    playSound('lose');

    // Stats update karo
    const config = DIFFICULTY_LEVELS[settings.difficulty];
    updateStats(false, config.attempts);

    // Game over screen dikhao
    showGameOverScreen(false, config.attempts, timeSpent);

    // Secret number reveal karo
    revealSecretNumber();
}

// ============================================
// 6. UI UPDATE FUNCTIONS (Screen update karne ke liye)
// ============================================

/**
 * Game info display update karo
 */
function updateDisplay() {
    const config = DIFFICULTY_LEVELS[settings.difficulty];

    difficultyDisplay.textContent = config.name;
    rangeDisplay.textContent = `${config.min} - ${config.max}`;
    attemptsLeftDisplay.textContent = config.attempts;
    hintText.textContent = `${config.min} se ${config.max} ke beech ek number daalo`;

    // High score dikhao
    if (stats.bestScore) {
        highScoreDisplay.textContent = stats.bestScore;
    } else {
        highScoreDisplay.textContent = '-';
    }
}

/**
 * UI ko fresh game ke liye reset karo
 */
function resetUI() {
    // Mystery number reset
    mysteryNumber.textContent = '?';
    mysteryNumber.classList.remove('revealed');

    // Feedback clear
    feedback.innerHTML = '';

    // Guesses list clear
    guessesList.innerHTML = '<p class="empty-state">Abhi koi guess nahi hai</p>';

    // Game section dikhao, game over chhupao
    gameSection.style.display = 'block';
    gameOver.style.display = 'none';

    // Input enable karo
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
}

/**
 * Previous guesses ki list update karo
 */
function updateGuessesList() {
    if (game.guesses.length === 0) {
        guessesList.innerHTML = '<p class="empty-state">Abhi koi guess nahi hai</p>';
        return;
    }

    // Har guess ke liye ek box banao
    guessesList.innerHTML = game.guesses
        .map(guess => {
            // High ya low class lagao color ke liye
            const className = guess > game.secretNumber ? 'high' : 'low';
            return `<div class="guess-item ${className}">${guess}</div>`;
        })
        .join('');
}

/**
 * Feedback message dikhao (hints aur results)
 */
function showFeedback(message, type) {
    feedback.innerHTML = `
        <div class="feedback-message ${type}">
            ${message}
        </div>
    `;
}

/**
 * Game over screen dikhao
 */
function showGameOverScreen(won, attempts, timeSpent) {
    // Game section chhupao
    gameSection.style.display = 'none';

    const resultAnimation = document.querySelector('.result-animation');

    if (won) {
        // Win screen
        resultAnimation.innerHTML = '<i class="fas fa-trophy"></i>';
        resultAnimation.className = 'result-animation win';
        resultTitle.textContent = '🎉 Badhiya! Jeet gaye!';
        resultMessage.textContent = `Sirf ${attempts} ${attempts === 1 ? 'try' : 'tries'} mein! Time: ${timeSpent}s`;
    } else {
        // Loss screen
        resultAnimation.innerHTML = '<i class="fas fa-sad-tear"></i>';
        resultAnimation.className = 'result-animation lose';
        resultTitle.textContent = '😢 Game Over!';
        resultMessage.textContent = `Agli baar zaroor! Time: ${timeSpent}s`;
    }

    revealedNumber.textContent = game.secretNumber;
    gameOver.style.display = 'block';
}

/**
 * Secret number reveal karo
 */
function revealSecretNumber() {
    mysteryNumber.textContent = game.secretNumber;
    mysteryNumber.classList.add('revealed');
}

// ============================================
// 7. STATISTICS FUNCTIONS (Stats track karne ke liye)
// ============================================

/**
 * Game ke baad stats update karo
 */
function updateStats(won, attempts) {
    stats.totalGames++;

    if (won) {
        stats.gamesWon++;
        stats.currentStreak++;

        // Best score check karo
        if (!stats.bestScore || attempts < stats.bestScore) {
            stats.bestScore = attempts;
            showToast(`🏆 Naya record! Best score: ${attempts}`);
        }
    } else {
        // Haar gaye toh streak break
        stats.currentStreak = 0;
    }

    // Recent games mein add karo
    stats.recentGames.unshift({
        won: won,
        attempts: attempts,
        number: game.secretNumber,
        date: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        })
    });

    // Sirf last 10 games rakho
    if (stats.recentGames.length > 10) {
        stats.recentGames = stats.recentGames.slice(0, 10);
    }

    // LocalStorage mein save karo
    saveToLocalStorage();
}

/**
 * Stats modal mein display karo
 */
function displayStats() {
    totalGamesDisplay.textContent = stats.totalGames;
    gamesWonDisplay.textContent = stats.gamesWon;

    // Win rate calculate karo
    const winRate = stats.totalGames > 0
        ? Math.round((stats.gamesWon / stats.totalGames) * 100)
        : 0;
    winRateDisplay.textContent = `${winRate}%`;

    // Best score
    bestScoreDisplay.textContent = stats.bestScore || '-';

    // Average guesses
    const avgGuesses = stats.gamesWon > 0
        ? Math.round(
            stats.recentGames
                .filter(g => g.won)
                .reduce((sum, g) => sum + g.attempts, 0) / stats.gamesWon
          )
        : 0;
    avgGuessesDisplay.textContent = avgGuesses || '-';

    // Current streak
    currentStreakDisplay.textContent = stats.currentStreak;

    // Recent games list
    if (stats.recentGames.length === 0) {
        recentGamesList.innerHTML = '<p class="empty-state">Abhi koi game nahi khela</p>';
    } else {
        recentGamesList.innerHTML = stats.recentGames
            .map(game => `
                <div class="recent-game-item" style="
                    padding: 1rem;
                    margin-bottom: 0.5rem;
                    background: var(--bg-color);
                    border-radius: var(--radius-md);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <div>
                        <strong style="color: ${game.won ? 'var(--success-color)' : 'var(--danger-color)'}">
                            ${game.won ? '✓ Jeeta' : '✗ Haara'}
                        </strong>
                        <span> - Number: ${game.number}</span>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">
                            ${game.date}
                        </div>
                    </div>
                    <div style="font-weight: 700;">
                        ${game.attempts} ${game.attempts === 1 ? 'try' : 'tries'}
                    </div>
                </div>
            `)
            .join('');
    }
}

/**
 * Stats reset karo (warning ke saath)
 */
function resetStats() {
    const confirmed = confirm('Sab stats delete ho jayenge. Pakka karna hai?');

    if (confirmed) {
        stats = {
            totalGames: 0,
            gamesWon: 0,
            bestScore: null,
            currentStreak: 0,
            recentGames: []
        };

        saveToLocalStorage();
        displayStats();
        updateDisplay();
        showToast('Stats reset ho gaye!');
    }
}

// ============================================
// 8. SETTINGS FUNCTIONS
// ============================================

/**
 * Settings apply karo
 */
function applySettings() {
    settings.difficulty = difficultySelect.value;
    settings.soundEffects = soundEffectsCheckbox.checked;
    settings.hintsEnabled = hintsEnabledCheckbox.checked;
    settings.timerMode = timerModeCheckbox.checked;

    // LocalStorage mein save
    saveToLocalStorage();

    // Modal band karo
    settingsModal.style.display = 'none';

    // Naya game start karo nayi settings ke saath
    startNewGame();

    showToast('Settings save ho gayi!');
}

// ============================================
// 9. LOCAL STORAGE (Data save/load)
// ============================================

/**
 * Settings aur stats save karo
 */
function saveToLocalStorage() {
    localStorage.setItem('guessGame_settings', JSON.stringify(settings));
    localStorage.setItem('guessGame_stats', JSON.stringify(stats));
}

/**
 * Saved data load karo
 */
function loadFromLocalStorage() {
    // Settings load
    const savedSettings = localStorage.getItem('guessGame_settings');
    if (savedSettings) {
        settings = { ...settings, ...JSON.parse(savedSettings) };

        // UI mein apply karo
        difficultySelect.value = settings.difficulty;
        soundEffectsCheckbox.checked = settings.soundEffects;
        hintsEnabledCheckbox.checked = settings.hintsEnabled;
        timerModeCheckbox.checked = settings.timerMode;
    }

    // Stats load
    const savedStats = localStorage.getItem('guessGame_stats');
    if (savedStats) {
        stats = JSON.parse(savedStats);
    }
}

// ============================================
// 10. UTILITY FUNCTIONS (Helper functions)
// ============================================

/**
 * Toast notification dikhao
 */
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

/**
 * Sound effect play karo (simple beep)
 */
function playSound(type) {
    if (!settings.soundEffects) return;

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Sound type ke basis par frequency set karo
        if (type === 'win') {
            oscillator.frequency.value = 800;  // High pitch
        } else if (type === 'lose') {
            oscillator.frequency.value = 200;  // Low pitch
        } else {
            oscillator.frequency.value = 400;  // Medium pitch
        }

        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Sound play nahi hua:', error);
    }
}

/**
 * Modal open karo
 */
function openModal(modal) {
    modal.style.display = 'flex';
}

/**
 * Modal close karo
 */
function closeModal(modal) {
    modal.style.display = 'none';
}

// ============================================
// 11. EVENT LISTENERS (User interactions)
// ============================================

// Form submit hone par
guessForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleGuess(guessInput.value);
});

// New game buttons
newGameBtn.addEventListener('click', startNewGame);
playAgainBtn.addEventListener('click', startNewGame);

// Settings button
settingsBtn.addEventListener('click', () => openModal(settingsModal));
closeSettings.addEventListener('click', () => closeModal(settingsModal));
saveSettingsBtn.addEventListener('click', applySettings);

// Stats button
statsBtn.addEventListener('click', () => {
    displayStats();
    openModal(statsModal);
});
closeStats.addEventListener('click', () => closeModal(statsModal));

// Reset stats button
resetStatsBtn.addEventListener('click', resetStats);

// Modal close on outside click
window.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        closeModal(settingsModal);
    }
    if (e.target === statsModal) {
        closeModal(statsModal);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Agar input mein type kar rahe ho toh shortcuts mat chalao
    if (e.target === guessInput) return;

    switch(e.key.toLowerCase()) {
        case 'n':
            startNewGame();
            break;
        case 's':
            openModal(settingsModal);
            break;
        case 't':
            displayStats();
            openModal(statsModal);
            break;
    }
});

// ============================================
// 12. PAGE LOAD PAR INITIALIZE
// ============================================

/**
 * Jab page load ho toh sab kuch setup karo
 */
function initializeGame() {
    console.log('🎮 Guess the Number Game - Chai aur Code Style');
    console.log('📖 Code mein har cheez explain ki gayi hai');

    // Saved data load karo
    loadFromLocalStorage();

    // Display update karo
    updateDisplay();

    // Pehla game start karo
    startNewGame();
}

// Page ready hone ka wait karo, phir game start karo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGame);
} else {
    initializeGame();
}

// ============================================
// DONE! ☕
// ============================================
// Bhai ab game tayar hai! Chai pi lo aur khelo!
