// ============================================
// QUIZ APP - JavaScript
// ============================================

// App State
let quizState = {
    category: 'general',
    difficulty: 'easy',
    timerMode: 'perQuiz',
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    skippedCount: 0,
    timeLeft: 120,
    timerInterval: null,
    startTime: null,
    endTime: null,
    hintsUsed: 0,
    isActive: false
};

let highScores = [];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const reviewScreen = document.getElementById('review-screen');

const categorySelect = document.getElementById('category-select');
const difficultySelect = document.getElementById('difficulty-select');
const startQuizBtn = document.getElementById('start-quiz-btn');
const topScoresList = document.getElementById('top-scores-list');

const currentQuestionDisplay = document.getElementById('current-question');
const totalQuestionsDisplay = document.getElementById('total-questions') || document.getElementById('total-question');
const currentScoreDisplay = document.getElementById('current-score');
const timerSection = document.getElementById('timer-section');
const timerText = document.getElementById('timer-text');
const progressBar = document.getElementById('progress-bar');
const questionCategory = document.getElementById('question-category');
const questionDifficulty = document.getElementById('question-difficulty');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const hintSection = document.getElementById('hint-section');
const hintText = document.getElementById('hint-text');
const hintBtn = document.getElementById('hint-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const quitBtn = document.getElementById('quit-btn');

const resultsTitle = document.getElementById('results-title');
const finalScore = document.getElementById('final-score');
const scoreTotal = document.getElementById('score-total');
const scorePercentage = document.getElementById('score-percentage');
const correctCount = document.getElementById('correct-count');
const wrongCount = document.getElementById('wrong-count');
const skippedCount = document.getElementById('skipped-count');
const timeTaken = document.getElementById('time-taken');
const performanceMessage = document.getElementById('performance-message');
const reviewBtn = document.getElementById('review-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const shareBtn = document.getElementById('share-btn');
const highScoreBanner = document.getElementById('high-score-banner');
const resultsAnimation = document.getElementById('results-animation');

const closeReviewBtn = document.getElementById('close-review-btn');
const reviewContainer = document.getElementById('review-container');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Initialize
function init() {
    loadHighScores();
    displayTopScores();
    setupEventListeners();
}

function setupEventListeners() {
    startQuizBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', previousQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    quitBtn.addEventListener('click', quitQuiz);
    hintBtn.addEventListener('click', showHint);
    reviewBtn.addEventListener('click', showReview);
    playAgainBtn.addEventListener('click', resetQuiz);
    shareBtn.addEventListener('click', shareResults);
    closeReviewBtn.addEventListener('click', closeReview);
}

// Start Quiz
function startQuiz() {
    quizState.category = categorySelect.value;
    quizState.difficulty = difficultySelect.value;

    const selectedTimer = document.querySelector('input[name="timer"]:checked');
    quizState.timerMode = selectedTimer.value;

    quizState.questions = getQuestions(quizState.category, quizState.difficulty);

    if (quizState.questions.length === 0) {
        showToast('No questions available!');
        return;
    }

    // Reset state
    quizState.currentQuestionIndex = 0;
    quizState.userAnswers = new Array(quizState.questions.length).fill(null);
    quizState.score = 0;
    quizState.correctCount = 0;
    quizState.wrongCount = 0;
    quizState.skippedCount = 0;
    quizState.hintsUsed = 0;
    quizState.isActive = true;
    quizState.startTime = Date.now();

    // Setup timer
    if (quizState.timerMode === 'perQuiz') {
        quizState.timeLeft = 120;
        startTimer();
    } else if (quizState.timerMode === 'perQuestion') {
        quizState.timeLeft = 20;
        startTimer();
    } else {
        timerSection.style.display = 'none';
    }

    // Show quiz screen
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';

    displayQuestion();
    updateProgress();
}

// Display Question
function displayQuestion() {
    const question = quizState.questions[quizState.currentQuestionIndex];

    currentQuestionDisplay.textContent = quizState.currentQuestionIndex + 1;
    if (totalQuestionsDisplay) {
        totalQuestionsDisplay.textContent = quizState.questions.length;
    }
    currentScoreDisplay.textContent = quizState.score;

    questionCategory.textContent = capitalize(quizState.category);
    questionDifficulty.textContent = capitalize(question.difficulty);
    questionText.textContent = question.question;

    const optionItems = optionsContainer.querySelectorAll('.option-item');
    question.options.forEach((option, index) => {
        const optionItem = optionItems[index];
        const optionTextEl = optionItem.querySelector('.option-text');
        optionTextEl.textContent = option;

        optionItem.classList.remove('selected', 'correct', 'wrong', 'disabled');
        optionItem.querySelector('.option-icon').innerHTML = '';

        if (quizState.userAnswers[quizState.currentQuestionIndex] === index) {
            optionItem.classList.add('selected');
        }

        optionItem.onclick = () => selectOption(index);
    });

    hintSection.style.display = 'none';
    updateNavigationButtons();
}

// Select Option
function selectOption(optionIndex) {
    if (!quizState.isActive) return;

    quizState.userAnswers[quizState.currentQuestionIndex] = optionIndex;

    const optionItems = optionsContainer.querySelectorAll('.option-item');
    optionItems.forEach((item, index) => {
        item.classList.toggle('selected', index === optionIndex);
    });

    nextBtn.disabled = false;

    if (quizState.currentQuestionIndex === quizState.questions.length - 1) {
        submitBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'none';
    }
}

// Show Hint
function showHint() {
    const question = quizState.questions[quizState.currentQuestionIndex];
    hintText.textContent = question.hint;
    hintSection.style.display = 'flex';
    quizState.hintsUsed++;
    hintBtn.disabled = true;
    showToast('Hint revealed!');
}

// Navigation
function nextQuestion() {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
        quizState.currentQuestionIndex++;

        if (quizState.timerMode === 'perQuestion') {
            clearInterval(quizState.timerInterval);
            quizState.timeLeft = 20;
            startTimer();
        }

        displayQuestion();
        updateProgress();
        hintBtn.disabled = false;
    }
}

function previousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        quizState.currentQuestionIndex--;
        displayQuestion();
        updateProgress();
        hintBtn.disabled = false;
    }
}

function updateNavigationButtons() {
    prevBtn.disabled = quizState.currentQuestionIndex === 0;

    const hasAnswer = quizState.userAnswers[quizState.currentQuestionIndex] !== null;
    nextBtn.disabled = !hasAnswer;

    if (quizState.currentQuestionIndex === quizState.questions.length - 1) {
        submitBtn.style.display = hasAnswer ? 'inline-flex' : 'none';
        nextBtn.style.display = 'none';
    } else {
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';
    }
}

function updateProgress() {
    const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;
    progressBar.style.width = progress + '%';
}

// Quit Quiz
function quitQuiz() {
    if (confirm('Are you sure you want to quit?')) {
        stopTimer();
        resetQuiz();
    }
}

// Submit Quiz
function submitQuiz() {
    const unansweredCount = quizState.userAnswers.filter(a => a === null).length;

    if (unansweredCount > 0) {
        if (!confirm('You have ' + unansweredCount + ' unanswered question(s). Submit anyway?')) {
            return;
        }
    }

    stopTimer();
    quizState.endTime = Date.now();
    quizState.isActive = false;

    calculateResults();
    showResults();
}

// Calculate Results
function calculateResults() {
    quizState.score = 0;
    quizState.correctCount = 0;
    quizState.wrongCount = 0;
    quizState.skippedCount = 0;

    quizState.questions.forEach((question, index) => {
        const userAnswer = quizState.userAnswers[index];

        if (userAnswer === null) {
            quizState.skippedCount++;
        } else if (userAnswer === question.correct) {
            quizState.correctCount++;
            quizState.score += 10;
        } else {
            quizState.wrongCount++;
        }
    });

    // Time bonus
    if (quizState.timerMode !== 'none') {
        const timeTakenSeconds = (quizState.endTime - quizState.startTime) / 1000;
        const timeBonus = Math.max(0, Math.floor((120 - timeTakenSeconds) / 10));
        quizState.score += timeBonus;
    }

    // Hint penalty
    quizState.score = Math.max(0, quizState.score - (quizState.hintsUsed * 2));
}

// Show Results
function showResults() {
    quizScreen.style.display = 'none';

    const percentage = Math.round((quizState.correctCount / quizState.questions.length) * 100);

    finalScore.textContent = quizState.correctCount;
    scoreTotal.textContent = quizState.questions.length;
    scorePercentage.textContent = percentage + '%';
    correctCount.textContent = quizState.correctCount;
    wrongCount.textContent = quizState.wrongCount;
    skippedCount.textContent = quizState.skippedCount;

    const seconds = Math.floor((quizState.endTime - quizState.startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeTaken.textContent = minutes + ':' + remainingSeconds.toString().padStart(2, '0');

    // Performance message
    let message = '';
    let animationClass = '';

    if (percentage >= 90) {
        message = 'Outstanding! You\'re a quiz master!';
        animationClass = 'excellent';
        resultsTitle.textContent = 'Excellent Work!';
    } else if (percentage >= 70) {
        message = 'Great job! Keep it up!';
        animationClass = 'good';
        resultsTitle.textContent = 'Well Done!';
    } else if (percentage >= 50) {
        message = 'Good effort! You can do better!';
        animationClass = 'average';
        resultsTitle.textContent = 'Good Try!';
    } else {
        message = 'Keep practicing! You\'ll improve!';
        animationClass = 'poor';
        resultsTitle.textContent = 'Keep Learning!';
    }

    performanceMessage.querySelector('p').textContent = message;
    resultsAnimation.className = 'results-animation ' + animationClass;

    // Check high score
    if (checkHighScore(quizState.score)) {
        highScoreBanner.style.display = 'flex';
        setTimeout(() => {
            highScoreBanner.style.display = 'none';
        }, 3000);
    }

    resultsScreen.style.display = 'block';
}

// Timer Functions
function startTimer() {
    timerSection.style.display = 'flex';

    quizState.timerInterval = setInterval(() => {
        quizState.timeLeft--;

        const minutes = Math.floor(quizState.timeLeft / 60);
        const seconds = quizState.timeLeft % 60;
        timerText.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

        if (quizState.timeLeft <= 30) {
            timerText.classList.add('warning');
        }

        if (quizState.timeLeft <= 0) {
            stopTimer();

            if (quizState.timerMode === 'perQuestion') {
                nextQuestion();
            } else {
                showToast('Time\'s up!');
                submitQuiz();
            }
        }
    }, 1000);
}

function stopTimer() {
    if (quizState.timerInterval) {
        clearInterval(quizState.timerInterval);
        quizState.timerInterval = null;
    }
}

// Review Functions
function showReview() {
    resultsScreen.style.display = 'none';
    reviewScreen.style.display = 'block';

    reviewContainer.innerHTML = '';

    quizState.questions.forEach((question, index) => {
        const userAnswer = quizState.userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        const isSkipped = userAnswer === null;

        const statusClass = isSkipped ? 'skipped' : (isCorrect ? 'correct' : 'wrong');

        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item ' + statusClass;

        let html = '<div class="review-question">';
        html += '<strong>Q' + (index + 1) + ':</strong> ' + question.question;
        html += '</div>';
        html += '<div class="review-answers">';
        html += '<div class="correct-answer">Correct: ' + question.options[question.correct] + '</div>';

        if (userAnswer !== null) {
            html += '<div class="your-answer ' + (isCorrect ? '' : 'wrong') + '">';
            html += (isCorrect ? 'Your Answer: ' : 'Your Answer: ') + question.options[userAnswer];
            html += '</div>';
        } else {
            html += '<div class="your-answer">Not answered</div>';
        }

        html += '</div>';
        reviewItem.innerHTML = html;
        reviewContainer.appendChild(reviewItem);
    });
}

function closeReview() {
    reviewScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
}

// High Scores
function loadHighScores() {
    const saved = localStorage.getItem('quizHighScores');
    if (saved) {
        highScores = JSON.parse(saved);
    }
}

function saveHighScores() {
    localStorage.setItem('quizHighScores', JSON.stringify(highScores));
}

function checkHighScore(score) {
    const highScore = {
        score: score,
        category: quizState.category,
        difficulty: quizState.difficulty,
        percentage: Math.round((quizState.correctCount / quizState.questions.length) * 100),
        date: new Date().toLocaleDateString()
    };

    highScores.push(highScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    saveHighScores();

    return highScores.findIndex(s => s.score === score && s.date === highScore.date) < 3;
}

function displayTopScores() {
    if (highScores.length === 0) {
        topScoresList.innerHTML = '<p class="empty-state">No high scores yet!</p>';
        return;
    }

    let html = '';
    highScores.slice(0, 5).forEach((score, index) => {
        html += '<div class="score-item">';
        html += '<div><strong>' + (index + 1) + '.</strong> ' + capitalize(score.category) + '</div>';
        html += '<div>' + score.score + ' pts (' + score.percentage + '%)</div>';
        html += '</div>';
    });
    topScoresList.innerHTML = html;
}

// Share Results
function shareResults() {
    const percentage = Math.round((quizState.correctCount / quizState.questions.length) * 100);
    const text = 'I scored ' + quizState.correctCount + '/' + quizState.questions.length + ' (' + percentage + '%) on the Quiz App!\n\nTry it at 100devprojects.in';

    if (navigator.share) {
        navigator.share({ title: 'Quiz Results', text: text });
    } else {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        });
    }
}

// Utility Functions
function resetQuiz() {
    stopTimer();

    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    reviewScreen.style.display = 'none';
    startScreen.style.display = 'block';

    quizState.currentQuestionIndex = 0;
    quizState.isActive = false;

    displayTopScores();
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Start App
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
