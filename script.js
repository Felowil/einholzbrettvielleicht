
document.addEventListener('DOMContentLoaded', () => {
    // Page Elements
    const pageElements = {
        'landing-page': document.getElementById('landing-page'),
        'quiz-page': document.getElementById('quiz-page'),
        'clue-reveal-page': document.getElementById('clue-reveal-page'),
        'hint-page': document.getElementById('hint-page'),
        'idea-question-page': document.getElementById('idea-question-page'),
        'sure-question-1-page': document.getElementById('sure-question-1-page'),
        'sure-question-2-page': document.getElementById('sure-question-2-page'),
        'sure-question-3-page': document.getElementById('sure-question-3-page'),
        'countdown-page': document.getElementById('countdown-page'),
        'countdown-retry-page': document.getElementById('countdown-retry-page'),
        'game-over-page': document.getElementById('game-over-page'),
        'countdown2-page': document.getElementById('countdown2-page'),
        'final-error-page': document.getElementById('final-error-page'),
        'relief-page': document.getElementById('relief-page'),
        'quiz-answers-page': document.getElementById('quiz-answers-page'),
        'thinking-page': document.getElementById('thinking-page'),
        'difficulty-choice-page': document.getElementById('difficulty-choice-page'),
        'dead-end-no-hints-page': document.getElementById('dead-end-no-hints-page'),
        'dead-end-second-thoughts-page': document.getElementById('dead-end-second-thoughts-page'),
        'dead-end-final-doubt-page': document.getElementById('dead-end-final-doubt-page'),
        'game-resistance-1-page': document.getElementById('game-resistance-1-page'),
        'game-resistance-2-page': document.getElementById('game-resistance-2-page'),
        'game-resistance-3-page': document.getElementById('game-resistance-3-page'),
        'game-suggestions-page': document.getElementById('game-suggestions-page'),
        'mini-games-challenge-page': document.getElementById('mini-games-challenge-page'),
        'tic-tac-toe-game-page': document.getElementById('tic-tac-toe-game-page'),
        'rock-paper-scissors-game-page': document.getElementById('rock-paper-scissors-game-page'),
        'math-battle-game-page': document.getElementById('memory-match-game-page'), // Reusing the same HTML element
        'mini-games-victory-page': document.getElementById('mini-games-victory-page'),
        'quiz-answers-review-page': document.getElementById('quiz-answers-review-page'),
        'quiz-answers-display-page': document.getElementById('quiz-answers-display-page'), 
        'loading-minigame-page': document.getElementById('loading-minigame-page'),
        'pending-next-step-page': document.getElementById('pending-next-step-page'),
        'give-up-confirmation-page': document.getElementById('give-up-confirmation-page'),
        'game-disappointed-page': document.getElementById('game-disappointed-page'),
        'game-convince-attempt-page': document.getElementById('game-convince-attempt-page'),
        'game-not-convinced-page': document.getElementById('game-not-convinced-page'),
        'hard-mode-transition-page': document.getElementById('hard-mode-transition-page'),
        'hard-quiz-page': document.getElementById('hard-quiz-page'),
        'hard-game-over-page': document.getElementById('hard-game-over-page'),
        'hard-mode-victory-page': document.getElementById('hard-mode-victory-page'),
        'final-countdown-page': document.getElementById('final-countdown-page'),
        'credits-page': document.getElementById('credits-page'),
    };

    // Other UI Elements
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const feedbackText = document.getElementById('feedback-text');
    const confettiContainer = document.querySelector('.confetti-container');
    const starContainer = document.querySelector('.star-container');
    const backgroundMusic = document.getElementById('background-music');
    const collectedHintsDisplay = document.getElementById('collected-hints-display');
    const revealSound = document.getElementById('reveal-sound');
    const creditsMusic = document.getElementById('credits-music');
    const countdownMusic = document.getElementById('countdown-music');
    const countdown1000Music = document.getElementById('countdown1000-music');
    const errorSound = document.getElementById('error-sound');
    const reliefSound = document.getElementById('relief-sound');
    const gameOverSound = document.getElementById('game-over-sound');
    const gameSuggestionMusic = document.getElementById('game-suggestion-music');
    const sadMusic = document.getElementById('sad-music');
    const hardmodeMusic = document.getElementById('hardmode-music');
    const finalCountdownMusic = document.getElementById('final-countdown-music');
    const hardModeVictoryMusic = document.getElementById('hard-mode-victory-music');
    const quizReflectionMusic = document.getElementById('quiz-reflection-music');
    const gamingMusic = document.getElementById('gaming-music');
    const gameover2Sound = document.getElementById('gameover2-sound');
    const quizanswerMusic = document.getElementById('quizanswer-music');
    const loadingMusic = document.getElementById('loading-music');
    const glitchSound = document.getElementById('glitch-sound');
    const loadinggameMusic = document.getElementById('loadinggame-music');
    const barloadedSound = document.getElementById('barloaded-sound');
    const pageMarker = document.getElementById('pm');
    const countdownDisplay = document.getElementById('countdown-display');
    const countdown2Display = document.getElementById('countdown2-display');
    const starsDisplay = document.getElementById('gold-display');
    const speedBoostBtn = document.getElementById('speed-boost-btn');
    const doubleSpeedBtn = document.getElementById('double-speed-btn');
    const tripleSpeedBtn = document.getElementById('triple-speed-btn');
    const bonusButton = document.getElementById('bonus-button');
    const notEnoughStarsMsg = document.getElementById('not-enough-gold');
    const rebootProgressContainer = document.getElementById('reboot-progress-container');
    const rebootProgressFill = document.getElementById('reboot-progress-fill');
    const rebootProgressText = document.getElementById('reboot-progress-text');
    
    // Mini-game elements
    const clickChallenge = document.getElementById('click-challenge');
    const clickChallengeBtn = document.getElementById('click-challenge-btn');
    const clickCount = document.getElementById('click-count');
    const clickTimer = document.getElementById('click-timer');
    const mathChallenge = document.getElementById('math-challenge');
    const mathQuestion = document.getElementById('math-question');
    const mathTimer = document.getElementById('math-timer');
    
    // Stars shop elements
    const starsShop = document.getElementById('gold-shop');
    const buySkip50 = document.getElementById('buy-skip-50');
    const buySkip100 = document.getElementById('buy-skip-100');
    const buySkip200 = document.getElementById('buy-skip-200');
    const buyTurbo = document.getElementById('buy-turbo');

    // State
    let currentQuestionIndex = 0;
    let collectedHints = [];
    let questions = [];
    let countdownInterval;
    let countdown2Interval;
    let countdown2Value = 1000;
    let countdown2Speed = 1000; // milliseconds between counts
    let playerStars = 0;
    let starsInterval;
    let countdown2StartTime = 0;
    let starsEarningEnabled = true;
    let countdownStarted = false; // Track if countdown has started to hide birthday visuals
    
    // Mini-game state
    let miniGameActive = false;
    let currentGameStep = 'tic-tac-toe-game'; // Track which game we're currently in
    let clickChallengeInterval;
    let mathChallengeInterval;
    let clickChallengeClicks = 0;
    let miniGameCooldown = false;
    let miniGamesPlayed = 0; // Track how many games played
    let maxMiniGames = 10; // Maximum number of mini-games allowed (increased)
    let playedGameTypes = []; // Track which game types have been played
    let turboModeActive = false; // Turbo mode makes countdown go faster
    
    // Shop pricing state - increases after each purchase
    let shopPrices = {
        skip50: 300,  // More expensive
        skip100: 600,  // More expensive
        skip200: 1000,  // More expensive
        turbo: 800,   // More expensive
    };
    let shopPurchaseCounts = {
        skip50: 0,
        skip100: 0,
        skip200: 0,
        turbo: 0
    };
    let totalShopPurchases = 0;
    const maxShopPurchases = 3;
    let slowModeActive = false;
    let slowModeCounter = 0;
    
    // Hard mode state
    let hardModeActive = false;
    let hardModeLives = 3;
    let hardModeCurrentQuestion = 0;
    let hardModeCountdownTimer;
    let hardModeCountdownSeconds = 15;
    let hardModeCountdownExpired = false;
    
    // Mini games state
    let miniGamesProgress = 0; // 0 = not started, 1 = tic-tac-toe won, 2 = RPS won, 3 = all won
    let ticTacToeBoard = [];
    let ticTacToeCurrentPlayer = 'X'; // Player is X, computer is O
    let rpsPlayerScore = 0;
    let rpsComputerScore = 0;
    let rpsRound = 0;
    let memoryCards = [];
    let memoryFlippedCards = [];
    let memoryAttempts = 0;
    let memoryPairs = 0; // Track if countdown has expired for current question

    // --- GAME STEP DEFINITIONS ---
    const gameSteps = {
        'start': {
            page: 'landing-page',
            background: 'default', // gradient background
            music: null, // no music on landing page
            onLoad: () => manageBirthdayVisuals(),
            buttons: {
                'start-quiz-btn': () => renderStep('quiz'),
                'skip-quiz-btn': () => renderStep('idea-question'),
                'skip-to-system-dialogue-btn': () => {
                    // Jump directly to system dialogue (after countdown ends)
                    renderStep('countdown');
                    // Skip countdown and go straight to the new system dialogue
                    setTimeout(() => {
                        countdownMusic.pause();
                        document.body.classList.remove('countdown-active');
                        startSystemDialogue();
                    }, 1000);
                },
                'skip-to-countdown2-btn': () => renderStep('countdown2'),
                'skip-to-countdown2-error-btn': () => startFinalErrorSequence(),
                'skip-to-relief-btn': () => renderStep('relief'),
                'skip-to-game-suggestions-btn': () => renderStep('game-suggestions'),
                'skip-to-hard-victory-btn': () => renderStep('hard-mode-victory'),
                'skip-to-mini-games-btn': () => renderStep('mini-games-challenge'),
                'skip-to-tic-tac-toe-btn': () => renderStep('tic-tac-toe-game'),
                'skip-to-rock-paper-scissors-btn': () => renderStep('rock-paper-scissors-game'),
                'skip-to-color-match-btn': () => renderStep('connect4-game'),
                'skip-to-mini-victory-btn': () => renderStep('mini-games-victory'),
                'jump-to-credits-btn': () => renderStep('credits'),
                'skip-to-quiz-answers-btn': () => renderStep('quiz-answers-review'),
                'skip-to-loading-game-btn': () => renderStep('loading-minigame'),
                'debug-win-loading-btn': () => debugWinLoading()
            }
        },
        'quiz': {
            page: 'quiz-page',
            background: 'default',
            music: 'happy-birthday', // start happy birthday music with quiz
            onLoad: () => {
                questions = [...allQuestions];
                shuffleArray(questions);
                currentQuestionIndex = 0;
                collectedHints = [];
                loadQuestion();
            }
        },
        'idea-question': {
            page: 'idea-question-page',
            background: 'default',
            music: null, // continue playing happy birthday music (don't restart it)
            onLoad: null,
            buttons: {
                'idea-absolutely-btn': () => renderStep('sure-question-1'),
                'idea-guess-btn': () => renderStep('sure-question-1'), // Both yes options lead to sure questions
                'idea-not-at-all-btn': () => renderStep('dead-end-no-hints') // Dead end!
            }
        },
        'sure-question-1': {
            page: 'sure-question-1-page',
            background: 'default',
            music: null, // continue playing happy birthday music (don't change it)
            onLoad: null,
            buttons: {
                'sure-1-yes-btn': () => renderStep('sure-question-2'),
                'sure-1-no-btn': () => renderStep('clue-reveal-no-1') // This one still leads to reveal
            }
        },
        'sure-question-2': {
            page: 'sure-question-2-page',
            background: 'default',
            music: null, // continue playing happy birthday music (don't change it)
            onLoad: null,
            buttons: {
                'sure-2-yes-btn': () => renderStep('sure-question-3'),
                'sure-2-no-btn': () => renderStep('dead-end-second-thoughts') // Dead end!
            }
        },
        'sure-question-3': {
            page: 'sure-question-3-page',
            background: 'default',
            music: null, // continue playing happy birthday music (don't change it)
            onLoad: null,
            buttons: {
                'sure-3-yes-btn': () => renderStep('countdown'),
                'sure-3-no-btn': () => renderStep('dead-end-final-doubt') // Dead end!
            }
        },
        'countdown': {
            page: 'countdown-page',
            background: 'black', // solid black background
            music: 'countdown', // play countdown music
            onLoad: () => {
                // Mark countdown as started and hide birthday visuals
                countdownStarted = true;
                manageBirthdayVisuals();
                startCountdown();
            }
        },
        'clue-reveal': {
            page: 'clue-reveal-page',
            background: 'default',
            music: null,
            onLoad: () => {
                displayCollectedHints();
                // Change button text to reflect it's a dead end
                const revealBtn = document.getElementById('reveal-final-hint-btn');
                if (revealBtn) {
                    revealBtn.textContent = 'Okay, ich brauche Hilfe... 😵';
                }
            },
            buttons: {
                'reveal-final-hint-btn': () => renderStep('dead-end-no-hints') // Dead end - restart quiz
            }
        },
        // Dead end steps that force quiz restart
        'dead-end-no-hints': {
            page: 'dead-end-no-hints-page',
            background: 'default',
            music: null,
            onLoad: null,
            buttons: {
                'restart-quiz-btn1': () => {
                    countdownStarted = false;
                    manageBirthdayVisuals();
                    renderStep('quiz');
                } // Restart quiz
            }
        },
        'dead-end-second-thoughts': {
            page: 'dead-end-second-thoughts-page',
            background: 'default',
            music: null,
            onLoad: null,
            buttons: {
                'restart-quiz-btn2': () => {
                    countdownStarted = false;
                    manageBirthdayVisuals();
                    renderStep('quiz');
                } // Restart quiz
            }
        },
        'dead-end-final-doubt': {
            page: 'dead-end-final-doubt-page',
            background: 'default',
            music: null,
            onLoad: null,
            buttons: {
                'restart-quiz-btn3': () => {
                    countdownStarted = false;
                    manageBirthdayVisuals();
                    renderStep('quiz');
                } // Restart quiz
            }
        },
        // New steps for different 'No' paths - now all lead to dead ends!
        'clue-reveal-no-1': {
            page: 'clue-reveal-page', 
            background: 'default',
            music: null,
            onLoad: () => {
                // Hide the entire hints display box
                const collectedHintsDisplay = document.getElementById('collected-hints-display');
                if (collectedHintsDisplay) {
                    collectedHintsDisplay.style.display = 'none';
                }
                const hintTitle = document.querySelector('#clue-reveal-page h2');
                if (hintTitle) {
                    hintTitle.textContent = 'Nein, nein, nein! 😅';
                }
                const hintText = document.querySelector('#clue-reveal-page p');
                if (hintText) {
                    hintText.textContent = 'Du warst schon mal sicher und jetzt zweifelst du? Das geht so nicht! Du musst WIRKLICH sicher sein, um das Geschenk zu bekommen!';
                }
                // Change button text to reflect it's a dead end
                const revealBtn = document.getElementById('reveal-final-hint-btn');
                if (revealBtn) {
                    revealBtn.textContent = 'Ich verstehe... 😔';
                }
            },
            buttons: {
                'reveal-final-hint-btn': () => renderStep('dead-end-second-thoughts') // Dead end!
            }
        },
        'countdown-retry': {
            page: 'countdown-retry-page',
            background: 'error-retry',
            music: null,
            onLoad: null,
            buttons: {
                'retry-yes-btn': () => renderStep('countdown2'),
                'retry-no-btn': () => renderStep('game-over')
            }
        },
        'game-over': {
            page: 'game-over-page',
            background: 'black',
            music: 'game-over',
            onLoad: () => {
                // Show restart button after 10 seconds
                setTimeout(() => {
                    document.getElementById('restart-game-btn').classList.remove('hidden');
                }, 10000);
            },
            buttons: {
                'restart-game-btn': () => {
                    // Reset countdown state when restarting game
                    countdownStarted = false;
                    manageBirthdayVisuals();
                    renderStep('start');
                }
            }
        },
        'countdown2': {
            page: 'countdown2-page',
            background: 'countdown2', // black background like first countdown
            music: 'countdown1000', // play 1000countdown music
            onLoad: () => startCountdown2(),
            buttons: {}
            // No other buttons initially - they're added dynamically by the countdown function
        },
        'relief': {
            page: 'relief-page',
            background: 'forest', // peaceful forest background
            music: 'relief', // play calming bird sounds
            onLoad: null, // don't start breathing exercise automatically
            buttons: {
                'start-breathing-btn': () => startBreathingExercise(),
                'lets-move-on-btn': () => renderStep('game-resistance-1')
            }
        },
        'quiz-answers': {
            page: 'quiz-answers-page',
            background: 'default',
            music: 'stop', // stop relief music
            onLoad: () => displayQuizAnswers(),
            buttons: {
                'after-answers-btn': () => renderStep('thinking')
            }
        },
        'thinking': {
            page: 'thinking-page',
            background: 'default',
            music: 'stop', // keep music stopped
            onLoad: null,
            buttons: {
                'thinking-btn': () => {
                    const thinkingText = document.getElementById('thinking-text');
                    const thinkingBtn = document.getElementById('thinking-btn');
                    if (thinkingText.textContent === 'Hmmmmm...') {
                        thinkingText.textContent = 'Ich weiß nicht...';
                        thinkingBtn.textContent = "Was ist denn los?";
                    } else {
                        renderStep('difficulty-choice');
                    }
                }
            }
        },
        'difficulty-choice': {
            page: 'difficulty-choice-page',
            background: 'default',
            music: null,
            onLoad: null,
            buttons: {
                'no-challenge-btn': () => renderStep('final-reveal'), // Easy path to reveal
                'yes-challenge-btn': () => renderStep('hard-quiz') // Hard quiz (to be implemented later)
            }
        },
        'final-reveal': {
            page: 'hint-page',
            background: 'final', // special final background
            music: 'reveal', // play reveal sound
            onLoad: () => {
                const card = pageElements['hint-page'].querySelector('.card');
                card.style.backgroundImage = "url('./assets/final_background.gif')";
                triggerConfetti();
                // Start 30-second timer for credits easter egg
                startCreditsTimer();
            },
            buttons: {} // No buttons - end of game
        },
        'credits': {
            page: 'credits-page',
            background: 'black',
            music: null, // Credits music handled separately
            onLoad: () => startCreditsSequence(),
            buttons: {
                'credits-replay-btn': () => {
                    // Reset to beginning
                    renderStep('start');
                }
            }
        },
        // New game resistance dialog steps
        'game-resistance-1': {
            page: 'game-resistance-1-page',
            background: 'default',
            music: null,
            onLoad: null,
            buttons: {
                'game-resist-1-yes-btn': () => renderStep('game-resistance-3'), // Player insists
                'game-resist-1-maybe-btn': () => renderStep('game-resistance-2') // Player is unsure
            }
        },
        'game-resistance-2': {
            page: 'game-resistance-2-page', 
            background: 'default',
            music: null,
            onLoad: null,
            buttons: {
                'game-resist-2-continue-btn': () => renderStep('game-suggestions')
            }
        },
        'game-resistance-3': {
            page: 'game-resistance-3-page',
            background: 'default', 
            music: null,
            onLoad: null,
            buttons: {
                'game-resist-3-continue-btn': () => renderStep('game-suggestions')
            }
        },
        'game-suggestions': {
            page: 'game-suggestions-page',
            background: 'default',
            music: 'game-suggestion',
            onLoad: null,
            buttons: {
                'choose-hard-mode-btn': () => renderStep('hard-mode-transition'),
                'choose-mini-games-btn': () => renderStep('mini-games-challenge'), 
                'skip-to-answers-btn': () => renderStep('game-disappointed')
            }
        },
        'hard-mode-transition': {
            page: 'hard-mode-transition-page',
            background: 'hard-mode',
            music: 'hardmode',
            onLoad: () => startHardModeTransition(),
            buttons: {}
        },
        'hard-quiz': {
            page: 'hard-quiz-page',
            background: 'hard-mode',
            music: 'hardmode',
            onLoad: () => startHardModeQuiz(),
            buttons: {
                'hard-submit-btn': () => checkHardModeAnswer()
            }
        },
        'hard-game-over': {
            page: 'hard-game-over-page',
            background: 'hard-mode',
            music: 'hardmode',
            onLoad: null,
            buttons: {
                'hard-game-over-restart-btn': () => {
                    countdownStarted = false;
                    manageBirthdayVisuals();
                    renderStep('quiz');
                }
            }
        },
        'hard-mode-victory': {
            page: 'hard-mode-victory-page',
            background: 'golden-victory',
            music: 'hard-mode-victory',
            onLoad: null,
            buttons: {
                'hard-victory-continue-btn': () => renderStep('quiz-answers-review')
            }
        },
        'final-countdown': {
            page: 'final-countdown-page',
            background: 'final-countdown',
            music: 'final-countdown',
            onLoad: () => startFinalCountdown(),
            buttons: {}
        },
        'mini-games-challenge': {
            page: 'mini-games-challenge-page', 
            background: 'gaming',
            music: 'game-suggestion',
            onLoad: () => initMiniGamesChallenge(),
            buttons: {
                'start-mini-games-btn': () => renderStep('tic-tac-toe-game'),
                'mini-games-back-btn': () => renderStep('game-suggestions')
            }
        },
        'tic-tac-toe-game': {
            page: 'tic-tac-toe-game-page',
            background: 'gaming',
            music: 'gaming',
            onLoad: () => {
                currentGameStep = 'tic-tac-toe-game';
                initTicTacToe();
            },
            buttons: {
                'ttt-give-up-btn': () => renderStep('give-up-confirmation')
            }
        },
        'rock-paper-scissors-game': {
            page: 'rock-paper-scissors-game-page',
            background: 'gaming', 
            music: 'gaming',
            onLoad: () => {
                currentGameStep = 'rock-paper-scissors-game';
                initRockPaperScissors();
            },
            buttons: {}
        },
        'connect4-game': {
            page: 'math-battle-game-page', // Reusing same HTML element (memory-match-game-page)
            background: 'gaming',
            music: 'gaming', 
            onLoad: () => {
                currentGameStep = 'connect4-game';
                initConnect4();
            },
            buttons: {}
        },
        'mini-games-victory': {
            page: 'mini-games-victory-page',
            background: 'golden-victory',
            music: 'hard-mode-victory',
            onLoad: null,
            buttons: {
                'mini-victory-final-countdown-btn': () => renderStep('quiz-answers-review')
            }
        },
        'quiz-answers-review': {
            page: 'quiz-answers-review-page',
            background: 'quiz-reflection',
            music: 'background',
            onLoad: () => {
                console.log('Quiz answers review loaded!');
                setTimeout(() => createQuizReviewEffects(), 500);
            },
            buttons: {
                'show-quiz-answers-btn': () => renderStep('quiz-answers-display')
            }
        },
        'quiz-answers-display': {
            page: 'quiz-answers-display-page',
            background: 'quiz-reflection',
            music: 'quizanswer',
            onLoad: () => showQuizAnswers(),
            buttons: {
                'totally-got-it-btn': () => renderStep('loading-minigame'),
                'could-imagine-btn': () => renderStep('loading-minigame')
            }
        },
        'pending-next-step': {
            page: 'pending-next-step-page',
            background: 'quiz-reflection',
            music: 'background',
            onLoad: null,
            buttons: {
                'continue-to-reveal-btn': () => renderStep('loading-minigame')
            }
        },
        'loading-minigame': {
            page: 'loading-minigame-page',
            background: 'gaming',
            music: 'loading',
            onLoad: null,
            buttons: {
                'start-loading-btn': () => startLoadingGame(),
                'help-loading-btn': () => startInteractiveLoading(),
                'reveal-present-btn': () => startPresentRevealAnimation(),
                'debug-add-100-btn': () => applyLoadingChange(100)
            }
        },
        'give-up-confirmation': {
            page: 'give-up-confirmation-page',
            background: 'gaming',
            music: 'gaming',
            onLoad: null,
            buttons: {
                'confirm-give-up-btn': () => {
                    gamingMusic.pause();
                    renderStep('game-suggestions');
                },
                'cancel-give-up-btn': () => {
                    // Go back to the current active game
                    const currentGame = getCurrentGame();
                    renderStep(currentGame);
                }
            }
        },
        // Disappointed game dialog sequence
        'game-disappointed': {
            page: 'game-disappointed-page',
            background: 'default',
            music: 'sad',
            onLoad: null,
            buttons: {
                'disappointed-try-countdown-btn': () => renderStep('countdown'),
                'disappointed-convince-btn': () => renderStep('game-convince-attempt')
            }
        },
        'game-convince-attempt': {
            page: 'game-convince-attempt-page',
            background: 'default',
            music: 'sad',
            onLoad: null,
            buttons: {
                'convince-had-fun-btn': () => renderStep('game-not-convinced-fun'),
                'convince-worked-hard-btn': () => renderStep('game-not-convinced-work'),
                'convince-just-tired-btn': () => renderStep('game-not-convinced-tired'),
                'convince-give-up-btn': () => renderStep('countdown')
            }
        },
        'game-not-convinced-fun': {
            page: 'game-not-convinced-page',
            background: 'default',
            music: 'sad',
            onLoad: () => {
                document.getElementById('not-convinced-title').textContent = 'Genug Spaß? 😤';
                document.getElementById('not-convinced-text').textContent = 'Du hattest noch nicht genug Spaß! Das sehe ich in deinen Augen!';
            },
            buttons: {
                'not-convinced-countdown-btn': () => renderStep('countdown')
            }
        },
        'game-not-convinced-work': {
            page: 'game-not-convinced-page',
            background: 'default',
            music: 'sad',
            onLoad: () => {
                document.getElementById('not-convinced-title').textContent = 'Verdient? 🤔';
                document.getElementById('not-convinced-text').textContent = 'Verdient? Ich denke nicht! Du musst es dir noch mehr verdienen!';
            },
            buttons: {
                'not-convinced-countdown-btn': () => renderStep('countdown')
            }
        },
        'game-not-convinced-tired': {
            page: 'game-not-convinced-page',
            background: 'default',
            music: 'sad',
            onLoad: () => {
                document.getElementById('not-convinced-title').textContent = 'Müde? 😏';
                document.getElementById('not-convinced-text').textContent = 'Müde? Das ist doch kein Argument! Ein bisschen Herausforderung wird dich wach machen!';
            },
            buttons: {
                'not-convinced-countdown-btn': () => renderStep('countdown')
            }
        }
    };

    function getCurrentGame() {
        return currentGameStep;
    }

    function renderStep(stepId) {
        console.log(`Rendering step: ${stepId}`);
        const step = gameSteps[stepId];
        if (!step) {
            console.error(`Step "${stepId}" not found.`);
            return;
        }
        console.log(`Step found:`, step);

        // Stop any ongoing countdown
        if (stepId !== 'countdown' && countdownInterval) {
            clearInterval(countdownInterval);
        }

        // Hide all pages
        Object.values(pageElements).forEach(p => {
            if (p) p.classList.add('hidden');
        });

        // Reset body style and apply background
        document.body.className = '';
        
        // Apply background based on step configuration
        switch (step.background) {
            case 'black':
                document.body.classList.add('countdown-active');
                break;
            case 'countdown2':
                document.body.classList.add('countdown2-active');
                break;
            case 'error':
                document.body.classList.add('error-active');
                break;
            case 'error-retry':
                document.body.classList.add('error-retry-active');
                break;
            case 'forest':
                document.body.classList.add('forest-active');
                break;
            case 'hard-mode':
                document.body.classList.add('hard-mode-active');
                break;
            case 'golden-victory':
                document.body.classList.add('golden-victory-active');
                break;
            case 'quiz-reflection':
                document.body.classList.add('quiz-reflection-active');
                break;
            case 'final-countdown':
                document.body.classList.add('final-countdown-active');
                break;
            case 'final':
                document.body.classList.add('final-reveal-active');
                break;
            case 'gaming':
                document.body.classList.add('gaming-page');
                break;
            case 'default':
            default:
                // Keep default gradient background
                break;
        }
        
        // Handle music based on step configuration
        switch (step.music) {
            case 'play':
                // Stop all other music first
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                hardmodeMusic.pause();
                backgroundMusic.play().catch(e => console.log('Music play prevented:', e));
                break;
            case 'pause':
                backgroundMusic.pause();
                break;
            case 'stop':
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0; // Reset to beginning
                reliefSound.pause(); // Stop relief sounds too
                break;
            case 'happy-birthday':
                // Stop all other music first
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                hardmodeMusic.pause();
                // Play happy birthday music
                backgroundMusic.src = './assets/happy_birthday.mp3';
                backgroundMusic.currentTime = 0;
                backgroundMusic.loop = true; // Loop the happy birthday music
                backgroundMusic.play().catch(e => console.log('Happy birthday music play prevented:', e));
                break;
            case 'countdown':
                backgroundMusic.pause();
                backgroundMusic.loop = false; // Stop looping happy birthday music
                backgroundMusic.currentTime = 0; // Reset background music
                // Stop all other music
                sadMusic.pause();
                gameSuggestionMusic.pause();
                reliefSound.pause();
                revealSound.pause();
                hardmodeMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                finalCountdownMusic.pause();
                countdownMusic.currentTime = 0; // Reset countdown music to start
                countdownMusic.play().catch(e => console.log('Countdown music play prevented:', e));
                break;
            case 'countdown1000':
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0; // Reset background music
                countdownMusic.pause(); // Stop regular countdown music
                countdown1000Music.currentTime = 0; // Reset 1000countdown music to start
                countdown1000Music.play().catch(e => console.log('1000countdown music play prevented:', e));
                break;
            case 'error':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause(); // Stop 1000countdown music
                errorSound.play().catch(e => console.log('Error sound play prevented:', e));
                break;
            case 'relief':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause(); // Stop error sound
                reliefSound.play().catch(e => console.log('Relief sound play prevented:', e));
                break;
            case 'reveal':
                backgroundMusic.pause();
                countdownMusic.pause(); // Stop countdown music
                countdown1000Music.pause(); // Stop 1000countdown music
                errorSound.pause(); // Stop error sound
                reliefSound.pause(); // Stop relief sound
                revealSound.play().catch(e => console.log('Reveal sound play prevented:', e));
                break;
            case 'game-over':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameOverSound.play().catch(e => console.log('Game over sound play prevented:', e));
                break;
            case 'game-suggestion':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                sadMusic.pause();
                gamingMusic.pause();
                gameSuggestionMusic.play().catch(e => console.log('Game suggestion music play prevented:', e));
                break;
            case 'gaming':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                sadMusic.pause();
                gameSuggestionMusic.pause();
                gamingMusic.play().catch(e => console.log('Gaming music play prevented:', e));
                break;
            case 'sad':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                gamingMusic.pause();
                sadMusic.play().catch(e => console.log('Sad music play prevented:', e));
                break;
            case 'hardmode':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                gamingMusic.pause();
                hardmodeMusic.play().catch(e => console.log('Hardmode music play prevented:', e));
                break;
            case 'hard-mode-victory':
                // Stop all music including hardmode music
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                hardmodeMusic.pause();
                finalCountdownMusic.pause();
                gamingMusic.pause();
                // Play hard mode victory music once (no loop)
                hardModeVictoryMusic.currentTime = 0;
                hardModeVictoryMusic.play().catch(e => console.log('Hard mode victory music play prevented:', e));
                break;
            case 'quiz-reflection':
                backgroundMusic.pause();
                countdownMusic.pause();
                sadMusic.pause();
                gameSuggestionMusic.pause();
                reliefMusic.pause();
                hardmodeMusic.pause();
                finalCountdownMusic.pause();
                gamingMusic.pause();
                hardModeVictoryMusic.pause();
                // Play quiz reflection music (if available)
                if (quizReflectionMusic) {
                    quizReflectionMusic.currentTime = 0;
                    quizReflectionMusic.play().catch(e => console.log('Quiz reflection music play prevented:', e));
                } else {
                    console.log('Quiz reflection music element not found - continuing without music');
                }
                break;
            case 'final-countdown':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                hardmodeMusic.pause();
                hardModeVictoryMusic.pause(); // Stop victory music
                gamingMusic.pause();
                finalCountdownMusic.play().catch(e => console.log('Final countdown music play prevented:', e));
                break;
            case 'stop':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                hardmodeMusic.pause();
                finalCountdownMusic.pause();
                quizanswerMusic.pause();
                loadingMusic.pause();
                loadinggameMusic.pause();
                break;
            case 'quizanswer':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                hardmodeMusic.pause();
                finalCountdownMusic.pause();
                gamingMusic.pause();
                hardModeVictoryMusic.pause();
                loadingMusic.pause();
                loadinggameMusic.pause();
                // Play quiz answer music
                quizanswerMusic.currentTime = 0;
                quizanswerMusic.play().catch(e => console.log('Quiz answer music play prevented:', e));
                break;
            case 'loading':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                hardmodeMusic.pause();
                finalCountdownMusic.pause();
                gamingMusic.pause();
                hardModeVictoryMusic.pause();
                quizanswerMusic.pause();
                loadinggameMusic.pause();
                // Play loading music
                loadingMusic.currentTime = 0;
                loadingMusic.play().catch(e => console.log('Loading music play prevented:', e));
                break;
            case 'loadinggame':
                backgroundMusic.pause();
                countdownMusic.pause();
                countdown1000Music.pause();
                errorSound.pause();
                reliefSound.pause();
                revealSound.pause();
                gameSuggestionMusic.pause();
                sadMusic.pause();
                hardmodeMusic.pause();
                finalCountdownMusic.pause();
                gamingMusic.pause();
                hardModeVictoryMusic.pause();
                quizanswerMusic.pause();
                loadingMusic.pause();
                // Play loading game music
                loadinggameMusic.currentTime = 0;
                loadinggameMusic.play().catch(e => console.log('Loading game music play prevented:', e));
                break;
            case null:
            default:
                // Keep current music state
                break;
        }
        
        // Show current page
        const pageElement = pageElements[step.page];
        pageElement.classList.remove('hidden');
        if (pageElement.querySelector('.card')) {
            pageElement.querySelector('.card').classList.add('pop-in');
        }

        // Run onLoad function if it exists
        if (step.onLoad) {
            step.onLoad();
        }

        // Set up button listeners for the current step
        if (step.buttons) {
            console.log(`Setting up buttons for step ${stepId}:`, Object.keys(step.buttons));
            for (const btnId in step.buttons) {
                const btnElement = document.getElementById(btnId);
                if (btnElement) {
                    console.log(`Found button element: ${btnId}`);
                    
                    // Clear any existing onclick handler
                    btnElement.onclick = null;
                    
                    // Add the click event listener directly
                    btnElement.onclick = (e) => {
                        console.log(`Button clicked: ${btnId}`);
                        try {
                            step.buttons[btnId]();
                        } catch (error) {
                            console.error(`Error executing button handler for ${btnId}:`, error);
                        }
                    };
                    console.log(`Event listener attached to: ${btnId}`);
                } else {
                    console.warn(`Button element "${btnId}" not found for step "${stepId}"`);
                }
            }
        }
        updatePageMarker(step.page + ' (' + stepId + ')');
    }

    function updatePageMarker(pageId) {
        if (pageMarker) {
            pageMarker.textContent = `Current Page: ${pageId}`;
        }
    }

    // --- COUNTDOWN LOGIC ---
    function startCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);
        
        const countdownSequence = [
            { display: '10', duration: 2000, className: 'countdown-style-10' },
            { display: '9', duration: 2000, className: 'countdown-style-9' },
            { display: '8', duration: 2000, className: 'countdown-style-8' },
            { display: '7', duration: 2000, className: 'countdown-style-7' },
            { display: '6', duration: 2000, className: 'countdown-style-6' },
            { display: '5', duration: 2000, className: 'countdown-style-5' },
            { display: '4', duration: 2000, className: 'countdown-style-4' },
            { display: '3', duration: 7000, className: 'countdown-style-3' },
            { display: 'oh wo war ich...', duration: 2000, className: 'countdown-style-interjection' },
            { display: 'ach ja richtig!', duration: 2000, className: 'countdown-style-interjection' },
            { display: '2', duration: 2000, className: 'countdown-style-2' },
            { display: '1', duration: 2000, className: 'countdown-style-1' },
            { display: '1/2', duration: 2500, className: 'countdown-style-fraction' },
            { display: '1/4', duration: 2500, className: 'countdown-style-fraction' },
            { display: '1/8', duration: 2500, className: 'countdown-style-fraction' },
            { display: '0,1', duration: 1500, className: 'countdown-style-fraction' },
            { display: '0,01', duration: 1500, className: 'countdown-style-fraction' },
            { display: '0,001', duration: 1500, className: 'countdown-style-fraction' },
            { display: 'fast da...', duration: 2000, className: 'countdown-style-interjection' },
            { display: '0,0001', duration: 1200, className: 'countdown-style-fraction' },
            { display: 'SO NAH!', duration: 1500, className: 'countdown-style-interjection' },
            { display: '0,00001', duration: 1000, className: 'countdown-style-fraction' },
            { display: 'GLEICH!', duration: 1500, className: 'countdown-style-interjection' },
            { display: '...', duration: 3000, className: 'countdown-style-interjection' },
            { display: '0', duration: 2000, className: 'countdown-style-0' }
        ];
        
        let currentIndex = 0;
        
        const countdownStep = () => {
            if (currentIndex < countdownSequence.length) {
                const current = countdownSequence[currentIndex];
                countdownDisplay.textContent = current.display;
                countdownDisplay.className = current.className;
                
                currentIndex++;
                countdownInterval = setTimeout(countdownStep, current.duration);
            } else {
                // Countdown finished - start the new system dialogue sequence
                countdownMusic.pause();
                document.body.classList.remove('countdown-active');
                startSystemDialogue();
            }
        };
        countdownStep();
    }

    // --- SYSTEM DIALOGUE AFTER COUNTDOWN ---
    function startSystemDialogue() {
        // Black screen for 5 seconds
        document.body.classList.add('black-screen');
        countdownDisplay.textContent = '';
        countdownDisplay.className = '';
        
        setTimeout(() => {
            // Start animated "Hallo..." text
            showAnimatedHallo();
        }, 5000);
    }

    function showAnimatedHallo() {
        const fullText = 'Hallo...';
        let currentChar = 0;
        
        countdownDisplay.className = 'system-dialogue-text';
        countdownDisplay.textContent = '';
        
        // Reveal text character by character
        const typeInterval = setInterval(() => {
            if (currentChar < fullText.length) {
                countdownDisplay.textContent = fullText.substring(0, currentChar + 1);
                currentChar++;
            } else {
                clearInterval(typeInterval);
                // Show button only after text is fully revealed
                setTimeout(() => {
                    showHalloButton();
                }, 500);
            }
        }, 200); // 200ms per character
    }

    function showHalloButton() {
        // Create and show the "Hallo" button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'system-dialogue-button-container';
        buttonContainer.innerHTML = '<button id="hallo-button" class="system-dialogue-button">hallo</button>';
        
        const countdownPage = document.getElementById('countdown-page');
        countdownPage.appendChild(buttonContainer);
        
        // Add click handler
        document.getElementById('hallo-button').addEventListener('click', () => {
            // Remove button
            buttonContainer.remove();
            // Show second dialogue
            showSecondDialogue();
        });
    }

    function showSecondDialogue() {
        // Game responds after button click - reveal text character by character
        const texts = [
            'Oh, du bist noch da...',
            'Ich glaube der Countdown ist kaputt gegangen.',
            'Möchtest du den Countdown neu starten?'
        ];
        
        let currentTextIndex = 0;
        
        function showNextText() {
            if (currentTextIndex < texts.length) {
                const fullText = texts[currentTextIndex];
                let currentChar = 0;
                countdownDisplay.textContent = '';
                
                const typeInterval = setInterval(() => {
                    if (currentChar < fullText.length) {
                        countdownDisplay.textContent = fullText.substring(0, currentChar + 1);
                        currentChar++;
                    } else {
                        clearInterval(typeInterval);
                        currentTextIndex++;
                        
                        if (currentTextIndex < texts.length) {
                            // Pause before next text
                            setTimeout(() => {
                                showNextText();
                            }, 2000);
                        } else {
                            // All text shown, now show buttons after a pause
                            setTimeout(() => {
                                showRestartButtons();
                            }, 1500);
                        }
                    }
                }, 100); // 100ms per character (faster than first text)
            }
        }
        
        showNextText();
    }

    function showRestartButtons() {
        // Create restart option buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'system-dialogue-button-container';
        buttonContainer.innerHTML = `
            <button id="restart-ok-button" class="system-dialogue-button">eh ja klar...</button>
            <button id="no-more-button" class="system-dialogue-button">och ne...</button>
        `;
        
        const countdownPage = document.getElementById('countdown-page');
        countdownPage.appendChild(buttonContainer);
        
        // Add click handlers
        document.getElementById('restart-ok-button').addEventListener('click', () => {
            buttonContainer.remove();
            showLoadingText();
        });
        
        document.getElementById('no-more-button').addEventListener('click', () => {
            buttonContainer.remove();
            document.body.classList.remove('black-screen');
            renderStep('game-over');
        });
    }

    function showLoadingText() {
        const fullText = 'Okay! Großer Countdown wird geladen...';
        let currentChar = 0;
        countdownDisplay.textContent = '';
        
        // Reveal text character by character
        const typeInterval = setInterval(() => {
            if (currentChar < fullText.length) {
                countdownDisplay.textContent = fullText.substring(0, currentChar + 1);
                currentChar++;
            } else {
                clearInterval(typeInterval);
                // Wait a bit after text is complete, then proceed
                setTimeout(() => {
                    // Clean up and go to second countdown
                    document.body.classList.remove('black-screen');
                    countdownDisplay.textContent = '';
                    countdownDisplay.className = '';
                    renderStep('countdown2');
                }, 1500);
            }
        }, 80); // 80ms per character (faster loading text)
    }

    // --- SECOND COUNTDOWN LOGIC WITH GOLD SYSTEM ---
    function startCountdown2() {
        console.log('startCountdown2 called');
        // Reset countdown2 values
        countdown2Value = 1000;
        countdown2Speed = 1000;
        playerStars = 0;
        
        // Clear any existing intervals
        if (countdown2Interval) clearInterval(countdown2Interval);
        if (starsInterval) clearInterval(starsInterval);
        
        // Update display with styling like first countdown
        updateCountdown2Display();
        
        // Hide gold display and all buttons initially
        starsDisplay.classList.add('hidden');
        speedBoostBtn.classList.add('hidden');
        doubleSpeedBtn.classList.add('hidden');
        tripleSpeedBtn.classList.add('hidden');
        bonusButton.classList.add('hidden');
        notEnoughStarsMsg.classList.add('hidden');
        rebootProgressContainer.classList.add('hidden');
        clickChallenge.classList.add('hidden');
        mathChallenge.classList.add('hidden');
        starsShop.classList.add('hidden');
        
        // After 20 seconds: show first button
        setTimeout(() => {
            speedBoostBtn.classList.remove('hidden');
            
            // Add event listener for speed boost button (remove old listeners first)
            speedBoostBtn.onclick = null;
            speedBoostBtn.addEventListener('click', handleSpeedBoost);
            
            // Stars will now be earned in the countdown loop itself
            // Enable double speed button when player has 100 stars
            starsInterval = setInterval(() => {
                if (playerStars >= 100 && doubleSpeedBtn.classList.contains('hidden') === false) {
                    doubleSpeedBtn.disabled = false;
                    notEnoughStarsMsg.classList.add('hidden');
                }
                
                // Enable triple speed button when player has 500 stars
                if (playerStars >= 500 && tripleSpeedBtn.classList.contains('hidden') === false) {
                    tripleSpeedBtn.disabled = false;
                }
            }, 100); // Check more frequently for button enabling
        }, 20000);
        
        // Start the countdown immediately
        console.log('About to start countdown2 loop');
        startCountdown2Loop();
    }
    
    function startCountdown2Loop() {
        console.log('startCountdown2Loop called');
        countdown2Interval = setInterval(() => {
            // Calculate countdown decrease based on modes
            let decrease = 1;
            if (turboModeActive && slowModeActive) {
                decrease = 1; // Turbo and slow cancel each other out
            } else if (turboModeActive) {
                decrease = 2; // Double speed
            } else if (slowModeActive) {
                decrease = 0.5; // Half speed
            }
            
            // Apply decrease (handle fractional values)
            if (decrease === 0.5) {
                // For slow mode, alternate between decreasing and not decreasing
                slowModeCounter++;
                if (slowModeCounter % 2 === 0) {
                    countdown2Value--;
                }
            } else {
                countdown2Value -= decrease;
            }
            
            // Earn 1 star every time countdown decreases (after stars display appears)
            if (!starsDisplay.classList.contains('hidden') && starsEarningEnabled) {
                playerStars++;
                updateStarsDisplay();
                // Show stars particle effect for every star earned
                createStarsParticle();
            }
            
            updateCountdown2Display();
            
            // Randomly trigger mini-games (from when stars counter is visible, max 3 times)
            if (!miniGameActive && !miniGameCooldown && !starsDisplay.classList.contains('hidden') && miniGamesPlayed < maxMiniGames && Math.random() < 0.08) {
                triggerRandomMiniGame();
            }
            
            if (countdown2Value <= 0) {
                clearInterval(countdown2Interval);
                clearInterval(starsInterval);
                // Hide stars shop AND stars display when countdown reaches 0
                starsShop.classList.add('hidden');
                starsDisplay.classList.add('hidden');
                // Start error sequence like first countdown - this is SUCCESS!
                startFinalErrorSequence();
            }
        }, countdown2Speed);
    }
    
    function updateCountdown2Display() {
        if (countdown2Display) {
            countdown2Display.textContent = countdown2Value;
            
            // Apply styling based on countdown value with urgency levels
            let styleClass;
            if (countdown2Value <= 10) {
                styleClass = 'countdown-style-critical';
                // Screen shake when very low
                if (countdown2Value <= 5) {
                    document.body.classList.add('screen-shake');
                    setTimeout(() => document.body.classList.remove('screen-shake'), 300);
                }
            } else if (countdown2Value <= 50) {
                styleClass = 'countdown-style-low';
            } else {
                styleClass = `countdown-style-${countdown2Value > 10 ? '10' : countdown2Value}`;
            }
            
            countdown2Display.className = styleClass;
        }
    }
    
    function updateStarsDisplay() {
        if (starsDisplay) {
            starsDisplay.textContent = `⭐ Sterne: ${playerStars}`;
        }
        updateButtonAvailability();
    }
    
    function updateButtonAvailability() {
        // Enable/disable purchase buttons based on gold
        if (!doubleSpeedBtn.classList.contains('hidden')) {
            doubleSpeedBtn.disabled = playerStars < 100;
            if (playerStars >= 100) {
                notEnoughStarsMsg.classList.add('hidden');
            }
        }
        
        if (!tripleSpeedBtn.classList.contains('hidden')) {
            tripleSpeedBtn.disabled = playerStars < 500;
        }
        
        // Update shop buttons if shop is visible
        if (!starsShop.classList.contains('hidden')) {
            updateShopButtons();
        }
    }
    
    function createStarsParticle() {
        if (!starsDisplay.classList.contains('hidden')) {
            const particle = document.createElement('div');
            particle.className = 'stars-particle';
            particle.textContent = '+1⭐';
            
            // Position randomly around the screen (but avoid edges)
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            particle.style.left = (Math.random() * (screenWidth - 100) + 50) + 'px';
            particle.style.top = (Math.random() * (screenHeight - 200) + 100) + 'px';
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => particle.remove(), 1000);
        }
    }
    
    function showStarsBonus(message) {
        // Create a temporary bonus message
        const bonusMsg = document.createElement('div');
        bonusMsg.textContent = message;
        bonusMsg.style.cssText = `
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #000;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.5em;
            font-weight: bold;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            z-index: 10000;
            animation: bonusPopIn 0.5s ease-out;
        `;
        
        // Add animation keyframes if not already added
        if (!document.querySelector('#bonus-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'bonus-animation-styles';
            style.textContent = `
                @keyframes bonusPopIn {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(bonusMsg);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
            bonusMsg.remove();
        }, 3000);
    }
    
    function showBonusButton() {
        bonusButton.classList.remove('hidden');
        
        // Add event listener for bonus button
        bonusButton.onclick = null;
        bonusButton.addEventListener('click', handleBonusButton);
    }
    
    function handleBonusButton() {
        // Add 500 seconds to countdown and 200 gold
        countdown2Value += 500;
        playerStars += 200;
        updateStarsDisplay();
        updateCountdown2Display();
        
        // Hide the bonus button after use
        bonusButton.classList.add('hidden');
        
        // Show a message about what they got
        showStarsBonus('+500 Sekunden + 200 Sterne!');
    }
    
    function handleSpeedBoost() {
        // Hide the speed boost button immediately when clicked
        speedBoostBtn.classList.add('hidden');
        
        countdown2Speed = 500; // Double speed (500ms instead of 1000ms)
        
        // Restart countdown loop with new speed
        clearInterval(countdown2Interval);
        startCountdown2Loop();
        
        // Show double speed button after 20 seconds
        setTimeout(() => {
            doubleSpeedBtn.classList.remove('hidden');
            doubleSpeedBtn.disabled = playerStars < 100;
            
            // Add event listener for double speed button (remove old listeners first)
            doubleSpeedBtn.onclick = null;
            doubleSpeedBtn.addEventListener('click', handleDoubleSpeedPurchase);
            
            if (playerStars < 100) {
                notEnoughStarsMsg.classList.remove('hidden');
            }
            
            // Show gold counter 5 seconds after second purchase button appears
            setTimeout(() => {
                starsDisplay.classList.remove('hidden');
                updateStarsDisplay(); // Show gold: 0
            }, 5000);
            
            // Add bonus button 20 seconds after second purchase button appears
            setTimeout(() => {
                showBonusButton();
            }, 20000);
        }, 20000);
    }
    
    function handleDoubleSpeedPurchase() {
        console.log('Double speed purchase clicked. Current stars:', playerStars);
        if (playerStars >= 100) {
            // Temporarily disable stars earning to prevent conflicts
            starsEarningEnabled = false;
            
            playerStars -= 100;
            console.log('Stars deducted. New stars:', playerStars);
            updateStarsDisplay();
            countdown2Speed = 250; // Quadruple original speed
            console.log('New countdown speed:', countdown2Speed);
            
            // Restart countdown loop with new speed
            clearInterval(countdown2Interval);
            startCountdown2Loop();
            
            // Re-enable gold earning after a short delay
            setTimeout(() => {
                starsEarningEnabled = true;
            }, 100);
            
            // Hide the double speed button immediately when purchased
            doubleSpeedBtn.classList.add('hidden');
            
            // Hide the "not enough gold" message
            notEnoughStarsMsg.classList.add('hidden');
            
            // Show triple speed button after 20 seconds
            setTimeout(() => {
                tripleSpeedBtn.classList.remove('hidden');
                tripleSpeedBtn.disabled = playerStars < 500;
                
                // Add event listener for triple speed button (remove old listeners first)
                tripleSpeedBtn.onclick = null;
                tripleSpeedBtn.addEventListener('click', handleTripleSpeedPurchase);
            }, 20000);
        } else {
            notEnoughStarsMsg.classList.remove('hidden');
        }
    }
    
    function handleTripleSpeedPurchase() {
        console.log('Triple speed purchase clicked. Current stars:', playerStars);
        if (playerStars >= 500) {
            // Temporarily disable stars earning to prevent conflicts
            starsEarningEnabled = false;
            
            playerStars -= 500;
            console.log('Stars deducted. New stars:', playerStars);
            updateStarsDisplay();
            countdown2Speed = 83; // ~12x original speed (1000/12 = 83ms)
            console.log('New countdown speed:', countdown2Speed);
            
            // Restart countdown loop with new speed
            clearInterval(countdown2Interval);
            startCountdown2Loop();
            
            // Re-enable gold earning after a short delay
            setTimeout(() => {
                starsEarningEnabled = true;
            }, 100);
            
            // Hide the triple speed button immediately when purchased
            tripleSpeedBtn.classList.add('hidden');
            // Keep gold display visible so player can see their remaining gold
            
            // Show gold shop
            starsShop.classList.remove('hidden');
            setupStarsShop();
        } else {
            // This shouldn't happen if button is properly disabled, but just in case
            console.log("Not enough gold for triple speed");
        }
    }

    // --- FINAL ERROR SEQUENCE (similar to first countdown error) ---
    function startFinalErrorSequence() {
        // Stop 1000countdown music and clear all intervals
        countdown1000Music.pause();
        if (countdown2Interval) clearInterval(countdown2Interval);
        if (starsInterval) clearInterval(starsInterval);
        
        const errorSequence = [
            { display: 'SYSTEM OVERLOAD', duration: 2000, className: 'countdown-style-error' },
            { display: 'CRITICAL ERROR', duration: 2000, className: 'countdown-style-error' },
            { display: 'MELTDOWN IMMINENT', duration: 2000, className: 'countdown-style-error' },
            { display: '', duration: 500, className: 'countdown-style-error', showProgress: true }
        ];
        
        let currentIndex = 0;
        
        const errorStep = () => {
            if (currentIndex < errorSequence.length) {
                const current = errorSequence[currentIndex];
                countdown2Display.textContent = current.display;
                countdown2Display.className = current.className;
                
                // Switch to red background and play error sound on first error
                if (currentIndex === 0) {
                    document.body.classList.remove('countdown2-active');
                    document.body.classList.add('error-active');
                    errorSound.play().catch(e => console.log('Error sound play prevented:', e));
                }
                
                // Show progress bar for rebooting
                if (current.showProgress) {
                    setTimeout(() => {
                        startRebootProgress();
                    }, current.duration);
                } else {
                    currentIndex++;
                    setTimeout(errorStep, current.duration);
                }
            } else {
                // This should not be reached now since rebooting handles the completion
            }
        };
        errorStep();
    }

    // --- REBOOT PROGRESS BAR ---
    function startRebootProgress() {
        // Hide countdown display and show progress bar with black background
        countdown2Display.classList.add('hidden');
        rebootProgressContainer.classList.remove('hidden');
        
        // Set black background for the reload progress
        document.body.style.backgroundColor = 'black !important';
        document.body.style.background = 'black !important';
        const countdown2Page = document.getElementById('countdown2-page');
        if (countdown2Page) {
            countdown2Page.style.backgroundColor = 'black !important';
            countdown2Page.style.background = 'black !important';
        }
        const countdownCard = document.querySelector('#countdown2-page .card');
        if (countdownCard) {
            countdownCard.style.backgroundColor = 'black !important';
            countdownCard.style.background = 'black !important';
            countdownCard.style.border = 'none';
            countdownCard.style.boxShadow = 'none';
        }
        // Also ensure container has black background
        const container = document.querySelector('#countdown2-page .container');
        if (container) {
            container.style.backgroundColor = 'black !important';
            container.style.background = 'black !important';
        }
        
        let progress = 0;
        const progressMessages = [
            'Initializing system recovery...',
            'Loading core modules...',
            'Checking memory integrity...',
            'Restoring system files...',
            'Verifying security protocols...',
            'Finalizing startup sequence...',
            'System restored successfully!'
        ];
        
        // Set initial message immediately
        rebootProgressText.textContent = progressMessages[0];
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random progress between 5-20%
            
            if (progress >= 100) {
                progress = 100;
                rebootProgressFill.style.width = '100%';
                rebootProgressText.style.display = 'none'; // Hide text immediately
                
                clearInterval(progressInterval);
                
                // After completion, show black screen then go to relief page
                setTimeout(() => {
                    errorSound.pause();
                    document.body.classList.remove('error-active');
                    rebootProgressContainer.classList.add('hidden');
                    countdown2Display.classList.remove('hidden');
                    
                    // Keep black screen for 2 seconds before showing relief page
                    setTimeout(() => {
                        renderStep('relief');
                    }, 2000);
                }, 1000); // Reduced initial timeout to 1 second, then 2 seconds black screen
            } else {
                rebootProgressFill.style.width = progress + '%';
                // Update message based on progress
                const messageIndex = Math.floor((progress / 100) * (progressMessages.length - 1));
                rebootProgressText.textContent = progressMessages[messageIndex];
            }
        }, 300); // Update every 300ms for smooth progress
    }

    // --- MINI-GAMES ---
    function triggerRandomMiniGame() {
        miniGamesPlayed++;
        
        // Create array of available games (not played yet)
        const availableGames = [];
        if (!playedGameTypes.includes('click')) {
            availableGames.push('click');
        }
        if (!playedGameTypes.includes('math')) {
            availableGames.push('math');
        }
        if (!playedGameTypes.includes('color')) {
            availableGames.push('color');
        }
        if (!playedGameTypes.includes('reaction')) {
            availableGames.push('reaction');
        }
        if (!playedGameTypes.includes('word')) {
            availableGames.push('word');
        }
        
        // If no games available, don't start any
        if (availableGames.length === 0) {
            return;
        }
        
        // Pick a random available game
        const gameType = availableGames[Math.floor(Math.random() * availableGames.length)];
        playedGameTypes.push(gameType);
        
        if (gameType === 'click') {
            startClickChallenge();
        } else if (gameType === 'math') {
            startMathChallenge();
        } else if (gameType === 'color') {
            startColorChallenge();
        } else if (gameType === 'reaction') {
            startReactionChallenge();
        } else if (gameType === 'word') {
            startWordChallenge();
        }
    }
    
    function startClickChallenge() {
        miniGameActive = true;
        clickChallengeClicks = 0;
        let timeLeft = 8;
        
        clickChallenge.classList.remove('hidden');
        clickCount.textContent = '0';
        clickTimer.textContent = timeLeft;
        
        // Reset button
        clickChallengeBtn.onclick = () => {
            clickChallengeClicks++;
            clickCount.textContent = clickChallengeClicks;
            
            if (clickChallengeClicks >= 20) {
                // Success!
                playerStars += 25;
                updateStarsDisplay();
                showStarsBonus('+25 Sterne! Schnell-Klick Meister! 🎯');
                endClickChallenge();
            }
        };
        
        // Timer countdown
        clickChallengeInterval = setInterval(() => {
            timeLeft--;
            clickTimer.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                // Time's up!
                if (clickChallengeClicks >= 20) {
                    playerStars += 25;
                    updateStarsDisplay();
                    showStarsBonus('+25 Sterne! Gerade noch geschafft! ⏰');
                } else {
                    // Punishment for losing - add 100 seconds
                    countdown2Value += 100;
                    updateCountdown2Display();
                    showStarsBonus('Zu langsam! +100 Sekunden Strafe! ⚡');
                }
                endClickChallenge();
            }
        }, 1000);
    }
    
    function endClickChallenge() {
        clearInterval(clickChallengeInterval);
        clickChallenge.classList.add('hidden');
        miniGameActive = false;
        startMiniGameCooldown();
    }
    
    function startMathChallenge() {
        miniGameActive = true;
        let timeLeft = 5;
        
        // Generate simple math problem
        const num1 = Math.floor(Math.random() * 15) + 1;
        const num2 = Math.floor(Math.random() * 15) + 1;
        const correctAnswer = num1 + num2;
        
        mathQuestion.textContent = `${num1} + ${num2} = ?`;
        mathTimer.textContent = timeLeft;
        
        // Generate answer options
        const answers = [correctAnswer];
        while (answers.length < 4) {
            const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
            if (wrongAnswer > 0 && !answers.includes(wrongAnswer)) {
                answers.push(wrongAnswer);
            }
        }
        
        // Shuffle answers
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        
        // Set button texts and handlers
        const answerButtons = document.querySelectorAll('.math-answer');
        answerButtons.forEach((btn, index) => {
            btn.textContent = answers[index];
            btn.onclick = () => {
                if (answers[index] === correctAnswer) {
                    // Correct!
                    playerStars += 15;
                    updateStarsDisplay();
                    showStarsBonus('+15 Sterne! Mathe-Genie! 🧮');
                } else {
                    // Punishment for wrong answer - add 75 seconds
                    countdown2Value += 75;
                    updateCountdown2Display();
                    showStarsBonus('Falsch! +75 Sekunden Strafe! 📚');
                }
                endMathChallenge();
            };
        });
        
        mathChallenge.classList.remove('hidden');
        
        // Timer countdown
        mathChallengeInterval = setInterval(() => {
            timeLeft--;
            mathTimer.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                // Punishment for timeout - add 75 seconds
                countdown2Value += 75;
                updateCountdown2Display();
                showStarsBonus('Zeit abgelaufen! +75 Sekunden Strafe! ⏰');
                endMathChallenge();
            }
        }, 1000);
    }
    
    function endMathChallenge() {
        clearInterval(mathChallengeInterval);
        mathChallenge.classList.add('hidden');
        miniGameActive = false;
        startMiniGameCooldown();
    }

    // --- NEW MINI GAMES ---
    
    function startColorChallenge() {
        miniGameActive = true;
        let timeLeft = 10;
        
        const colors = ['rot', 'blau', 'grün', 'gelb'];
        const displayColors = ['red', 'blue', 'green', 'yellow'];
        
        // Pick random color word and display color (make sure they're different)
        const correctColorWord = colors[Math.floor(Math.random() * colors.length)];
        const correctWordIndex = colors.indexOf(correctColorWord);
        
        // Pick a different color to display the word in
        let displayColorIndex;
        do {
            displayColorIndex = Math.floor(Math.random() * displayColors.length);
        } while (displayColorIndex === correctWordIndex);
        
        const displayColor = displayColors[displayColorIndex];
        const correctAnswer = displayColor; // The answer is the actual color shown, not what the word says
        
        // Show color challenge
        showStarsBonus('Welche FARBE hat der Text?');
        
        // Add instruction
        const instructionDiv = document.createElement('div');
        instructionDiv.style.fontSize = '1.2em';
        instructionDiv.style.color = 'white';
        instructionDiv.style.textAlign = 'center';
        instructionDiv.style.margin = '10px 0';
        instructionDiv.textContent = 'Ignoriere das Wort! Welche Farbe siehst du?';
        
        const colorText = document.createElement('div');
        colorText.style.fontSize = '3em';
        colorText.style.color = displayColor;
        colorText.style.fontWeight = 'bold';
        colorText.textContent = correctColorWord;
        colorText.style.textAlign = 'center';
        colorText.style.margin = '20px 0';
        colorText.style.border = '3px solid white';
        colorText.style.padding = '20px';
        colorText.style.borderRadius = '10px';
        
        const countdown2Page = document.getElementById('countdown2-page');
        countdown2Page.appendChild(instructionDiv);
        countdown2Page.appendChild(colorText);
        
        // Add answer buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'center';
        buttonContainer.innerHTML = `
            <button class="color-answer" data-color="red" style="background: red; color: white; margin: 5px; padding: 10px 15px; font-size: 1.2em;">ROT</button>
            <button class="color-answer" data-color="blue" style="background: blue; color: white; margin: 5px; padding: 10px 15px; font-size: 1.2em;">BLAU</button>
            <button class="color-answer" data-color="green" style="background: green; color: white; margin: 5px; padding: 10px 15px; font-size: 1.2em;">GRÜN</button>
            <button class="color-answer" data-color="yellow" style="background: yellow; color: black; margin: 5px; padding: 10px 15px; font-size: 1.2em;">GELB</button>
        `;
        countdown2Page.appendChild(buttonContainer);
        
        // Add click handlers
        document.querySelectorAll('.color-answer').forEach(btn => {
            btn.onclick = () => {
                if (btn.dataset.color === correctAnswer) {
                    playerStars += 20;
                    updateStarsDisplay();
                    showStarsBonus('+20 Sterne! Farben-Experte! 🌈');
                } else {
                    countdown2Value += 50;
                    updateCountdown2Display();
                    showStarsBonus('Falsch! +50 Sekunden! 🎨');
                }
                endColorChallenge();
            };
        });
        
        // Timer
        const colorInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                countdown2Value += 40;
                updateCountdown2Display();
                showStarsBonus('Zeit abgelaufen! +40 Sekunden! ⏰');
                endColorChallenge();
            }
        }, 1000);
        
        function endColorChallenge() {
            clearInterval(colorInterval);
            instructionDiv.remove();
            colorText.remove();
            buttonContainer.remove();
            miniGameActive = false;
            startMiniGameCooldown();
        }
    }
    
    function startReactionChallenge() {
        miniGameActive = true;
        let hasClicked = false;
        
        showStarsBonus('Warte auf das grüne Signal!');
        
        const reactionContainer = document.createElement('div');
        reactionContainer.style.textAlign = 'center';
        reactionContainer.style.margin = '20px 0';
        
        const signalDiv = document.createElement('div');
        signalDiv.style.fontSize = '3em';
        signalDiv.style.fontWeight = 'bold';
        signalDiv.style.padding = '40px';
        signalDiv.style.margin = '20px auto';
        signalDiv.style.width = '200px';
        signalDiv.style.height = '100px';
        signalDiv.style.borderRadius = '15px';
        signalDiv.style.cursor = 'pointer';
        signalDiv.style.backgroundColor = '#ff4444';
        signalDiv.style.color = 'white';
        signalDiv.textContent = 'WARTEN';
        
        reactionContainer.appendChild(signalDiv);
        
        const countdown2Page = document.getElementById('countdown2-page');
        countdown2Page.appendChild(reactionContainer);
        
        // Random delay between 2-5 seconds
        const delay = Math.random() * 3000 + 2000;
        let startTime;
        
        // Too early click handler
        signalDiv.onclick = () => {
            if (!hasClicked && signalDiv.style.backgroundColor === 'rgb(255, 68, 68)') {
                hasClicked = true;
                countdown2Value += 40;
                updateCountdown2Display();
                showStarsBonus('Zu früh! +40 Sekunden! ⚡');
                endReactionChallenge();
            } else if (signalDiv.style.backgroundColor === 'rgb(68, 255, 68)' && !hasClicked) {
                hasClicked = true;
                const reactionTime = Date.now() - startTime;
                if (reactionTime < 500) {
                    playerStars += 25;
                    updateStarsDisplay();
                    showStarsBonus(`+25 Sterne! Blitzschnell! ${reactionTime}ms ⚡`);
                } else {
                    playerStars += 15;
                    updateStarsDisplay();
                    showStarsBonus(`+15 Sterne! Reaktionszeit: ${reactionTime}ms ⚡`);
                }
                endReactionChallenge();
            }
        };
        
        setTimeout(() => {
            if (!hasClicked) {
                signalDiv.style.backgroundColor = '#44ff44';
                signalDiv.textContent = 'KLICK!';
                startTime = Date.now();
                
                // Timeout after 2 seconds
                setTimeout(() => {
                    if (!hasClicked) {
                        hasClicked = true;
                        countdown2Value += 30;
                        updateCountdown2Display();
                        showStarsBonus('Zu langsam! +30 Sekunden! 🐌');
                        endReactionChallenge();
                    }
                }, 2000);
            }
        }, delay);
        
        function endReactionChallenge() {
            reactionContainer.remove();
            miniGameActive = false;
            startMiniGameCooldown();
        }
    }
    
    function startWordChallenge() {
        miniGameActive = true;
        let timeLeft = 15;
        
        const words = ['HOLZBRETT', 'EINHORN', 'PFIRSICH', 'RUFUS', 'TIMO', 'NIBS'];
        const word = words[Math.floor(Math.random() * words.length)];
        
        // Scramble the word
        const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
        
        showStarsBonus('Sortiere die Buchstaben!');
        
        const wordContainer = document.createElement('div');
        wordContainer.style.textAlign = 'center';
        wordContainer.style.margin = '20px 0';
        wordContainer.innerHTML = `
            <div style="font-size: 2em; color: #FFD700; margin: 10px;">${scrambled}</div>
            <input type="text" id="word-input" placeholder="Deine Antwort..." style="font-size: 1.2em; padding: 10px; width: 200px;">
            <br>
            <button id="word-submit" style="margin-top: 10px; padding: 10px 20px; font-size: 1.2em;">Bestätigen</button>
        `;
        
        const countdown2Page = document.getElementById('countdown2-page');
        countdown2Page.appendChild(wordContainer);
        
        document.getElementById('word-submit').onclick = checkWord;
        document.getElementById('word-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkWord();
        });
        
        const wordInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                countdown2Value += 80;
                updateCountdown2Display();
                showStarsBonus('Zeit abgelaufen! +80 Sekunden! ⏰');
                endWordChallenge();
            }
        }, 1000);
        
        function checkWord() {
            const userWord = document.getElementById('word-input').value.toUpperCase();
            if (userWord === word) {
                playerStars += 35;
                updateStarsDisplay();
                showStarsBonus('+35 Sterne! Wort-Meister! 📝');
            } else {
                countdown2Value += 70;
                updateCountdown2Display();
                showStarsBonus(`Falsch! Das Wort war: ${word}. +70 Sekunden! 📚`);
            }
            endWordChallenge();
        }
        
        function endWordChallenge() {
            clearInterval(wordInterval);
            wordContainer.remove();
            miniGameActive = false;
            startMiniGameCooldown();
        }
    }
    
    function startMiniGameCooldown() {
        miniGameCooldown = true;
        // 10-20 second cooldown between mini-games (more frequent)
        setTimeout(() => {
            miniGameCooldown = false;
        }, Math.random() * 10000 + 10000);
    }

    // --- GOLD SHOP ---
    function setupStarsShop() {
        buySkip50.onclick = () => buySkip(50, 'skip50');
        buySkip100.onclick = () => buySkip(100, 'skip100');
        buySkip200.onclick = () => buySkip(200, 'skip200');
        buyTurbo.onclick = () => buyTurboMode();
        updateShopButtons();
    }
    
    function buySkip(seconds, priceKey) {
        const cost = shopPrices[priceKey];
        if (totalShopPurchases >= maxShopPurchases) {
            showStarsBonus('Maximale Anzahl Einkäufe erreicht! (3/3)');
            return;
        }
        if (playerStars >= cost) {
            playerStars -= cost;
            countdown2Value -= seconds;
            // Don't let it go below 1
            if (countdown2Value < 1) countdown2Value = 1;
            updateStarsDisplay();
            updateCountdown2Display();
            
            // Increase purchase count and price for next time
            totalShopPurchases++;
            shopPurchaseCounts[priceKey]++;
            shopPrices[priceKey] = Math.floor(shopPrices[priceKey] * 1.5); // 50% price increase
            
            showStarsBonus(`⚡ -${seconds} Sekunden! (${totalShopPurchases}/${maxShopPurchases})`);
            updateShopButtons();
        } else {
            showStarsBonus('Nicht genug Sterne! 💰');
        }
    }
    
    function buyTurboMode() {
        const cost = shopPrices.turbo;
        if (totalShopPurchases >= maxShopPurchases) {
            showStarsBonus('Maximale Anzahl Einkäufe erreicht! (3/3)');
            return;
        }
        if (playerStars >= cost && !turboModeActive) {
            playerStars -= cost;
            turboModeActive = true;
            
            // Increase turbo price for potential future purchases (if we add multiple turbo levels)
            totalShopPurchases++;
            shopPurchaseCounts.turbo++;
            shopPrices.turbo = Math.floor(shopPrices.turbo * 2); // Double price
            
            updateStarsDisplay();
            showStarsBonus(`🚀 Turbo Mode aktiv! Countdown geht 2x schneller! (${totalShopPurchases}/${maxShopPurchases})`);
            updateTurboButton();
            updateShopButtons();
        } else if (turboModeActive) {
            showStarsBonus('Turbo Mode bereits aktiv! 🚀');
        } else {
            showStarsBonus('Nicht genug Sterne! 💰');
        }
    }
    
    function updateShopButtons() {
        const purchaseLimitReached = totalShopPurchases >= maxShopPurchases;
        
        // Update button text with current prices
        buySkip50.textContent = `⚡ -50 Sekunden (${shopPrices.skip50} Sterne)`;
        buySkip100.textContent = `⚡ -100 Sekunden (${shopPrices.skip100} Sterne)`;
        buySkip200.textContent = `⚡ -200 Sekunden (${shopPrices.skip200} Sterne)`;
        // Update button availability (either not enough gold OR purchase limit reached)
        buySkip50.disabled = playerStars < shopPrices.skip50 || purchaseLimitReached;
        buySkip100.disabled = playerStars < shopPrices.skip100 || purchaseLimitReached;
        buySkip200.disabled = playerStars < shopPrices.skip200 || purchaseLimitReached;
        
        updateTurboButton();
        
        // Show purchase counter in shop header
        if (starsShop && !starsShop.classList.contains('hidden')) {
            const shopTitle = starsShop.querySelector('h4');
            if (shopTitle) {
                shopTitle.textContent = `⭐ Sterne Shop (${totalShopPurchases}/${maxShopPurchases})`;
            }
        }
    }
    
    
    function updateTurboButton() {
        const purchaseLimitReached = totalShopPurchases >= maxShopPurchases;
        if (turboModeActive) {
            buyTurbo.disabled = true;
            buyTurbo.textContent = '🚀 Turbo Mode aktiv';
            buyTurbo.style.background = '#6c757d';
        } else {
            buyTurbo.disabled = playerStars < shopPrices.turbo || purchaseLimitReached;
            buyTurbo.textContent = `🚀 Turbo Mode (${shopPrices.turbo} Sterne)`;
            buyTurbo.style.background = '#28a745';
        }
    }
    
    

    // --- QUIZ LOGIC ---
    const allQuestions = [
        {
            question: "Ich bin ein großes Reptil mit einer großen Klappe",
            type: "scrambled-text",
            answer: "Krokodil",
            scrambled: "LOKKORID",
            hint: "Krokodil"
        },
        {
            question: "10 * 10 + 1900 + 100 / 4 = ?",
            type: "multiple-choice",
            options: ["14", "Banane", "2035", "keine Ahnung zu schwer","2025", "oh man Mathe...", "2025,666"],
            answer: "2025",
            hint: "2025"
        },
        {
            question: "Wer trägt eine Krone und herrscht über ein Reich, hat sein Schloss aber oft nur in Märchen?",
            type: "multiple-choice",
            options: ["Präsident", "Backenzahn", "König", "Bürgermeister", "Ritter", "Du"],
            answer: "König",
            hint: "König"
        },
        {
            question: "Ich mische Tränke und spreche Zauberformeln. Wer bin ich?",
            type: "multiple-choice",
            options: ["Ein Koch", "Ein Apotheker", "Ein Zauberer", "Ein Arzt", "Ein Harry Potter", "Ein Ei", "Ein Szweidrei"],
            answer: "Ein Zauberer",
            hint: "Zauberer"
        },
        {
            question: "Wo kann man Moshpits erleben",
            type: "dropdown-select",
            options: ["Bibliothek", "Konzert", "Supermarkt", "im Bürooo", "im Bett", "auf dem Klo"],
            answer: "Konzert",
            hint: "Konzert"
        },
        {
            question: "Wer ist der brillante Kopf hinter diesem Geschenk?",
            type: "multiple-choice",
            options: ["Ein Superheld", "Ein Geheimagent", "Dein bezaubernder Ehegatte", "Der Weihnachtsmann", "Rufus" , "Rufus und Nibs", "Nibs und Rufus", "Ein Holzbrett"],
            answer: "Dein bezaubernder Ehegatte",
            hint: "Dein bezaubernder Ehegatte"
        },
        {
            question: "Denk dir eine Zahl zwischen 1 und 9 aus. Nehme sie mit mal 2, dann mal 3. Addiere deine ausgedachte Zahl und teile das Ergebnis durch deine ausgedachte Zahl",
            type: "number",
            answer: 7,
            hint: "7"
        },
        {
            question: "Englisch für Nein, Deutsch für who, Ist Braun und lebt im Wald?",
            type: "dropdown-select",
            options: ["Oktober","Wat?!?","November", "Dezember", "Nein","Januar"],
            answer: "November",
            hint: "November"
        },
        {
            question: "Was machen wir am liebsten am Wochenende zusammen?",
            type: "all-correct-select",
            isFun: true,
            options: [
                { text: "Gemütlich auf der Couch liegen 😴" },
                { text: "Ein neues Restaurant ausprobieren 🍽️" },
                { text: "Abenteuer erleben! 🚀" },
                { text: "Serie Gucken 🎉" },
                { text: "Ausschlafen 😴" },
                { text: "Zocken 🎮" }
            ]
        }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadQuestion() {
        feedbackText.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');
        optionsContainer.innerHTML = '';
        optionsContainer.classList.remove('activity-buttons');

        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            questionText.textContent = q.question;

            switch (q.type) {
                case "multiple-choice":
                    q.options.forEach(option => {
                        const button = document.createElement('button');
                        button.textContent = option;
                        button.addEventListener('click', () => checkAnswer(option, q.answer, button, q));
                        optionsContainer.appendChild(button);
                    });
                    break;
                case "scrambled-text":
                    const scrambledDisplay = document.createElement('p');
                    scrambledDisplay.classList.add('scrambled-word');
                    scrambledDisplay.textContent = q.scrambled;
                    optionsContainer.appendChild(scrambledDisplay);

                    const input = document.createElement('input');
                    input.type = "text";
                    input.placeholder = "Entschlüssle das Wort...";
                    optionsContainer.appendChild(input);

                    const submitBtn = document.createElement('button');
                    submitBtn.textContent = "Antwort abschicken";
                    submitBtn.addEventListener('click', () => checkAnswer(input.value, q.answer, submitBtn, q));
                    optionsContainer.appendChild(submitBtn);
                    break;
                case "number":
                    const numberInput = document.createElement('input');
                    numberInput.type = "number";
                    numberInput.placeholder = "Deine Zahl...";
                    optionsContainer.appendChild(numberInput);

                    const numberSubmitBtn = document.createElement('button');
                    numberSubmitBtn.textContent = "Antwort abschicken";
                    numberSubmitBtn.addEventListener('click', () => checkAnswer(parseInt(numberInput.value), q.answer, numberSubmitBtn, q));
                    optionsContainer.appendChild(numberSubmitBtn);
                    break;
                case "love-scale":
                    const sliderContainer = document.createElement('div');
                    sliderContainer.classList.add('slider-container');
                    const slider = document.createElement('input');
                    slider.type = "range";
                    slider.min = "1";
                    slider.max = q.scaleLabels.length.toString();
                    slider.value = "1";
                    slider.classList.add('love-slider');
                    sliderContainer.appendChild(slider);
                    const sliderValueDisplay = document.createElement('p');
                    sliderValueDisplay.textContent = q.scaleLabels[0];
                    sliderContainer.appendChild(sliderValueDisplay);
                    slider.addEventListener('input', () => {
                        sliderValueDisplay.textContent = q.scaleLabels[parseInt(slider.value) - 1];
                    });
                    optionsContainer.appendChild(sliderContainer);
                    const loveSubmitBtn = document.createElement('button');
                    loveSubmitBtn.textContent = "Antwort abschicken";
                    loveSubmitBtn.addEventListener('click', () => checkAnswer(parseInt(slider.value), q.answer, loveSubmitBtn, q));
                    optionsContainer.appendChild(loveSubmitBtn);
                    break;
                case "dropdown-select":
                    const select = document.createElement('select');
                    q.options.forEach(option => {
                        const opt = document.createElement('option');
                        opt.value = option;
                        opt.textContent = option;
                        select.appendChild(opt);
                    });
                    optionsContainer.appendChild(select);
                    const dropdownSubmitBtn = document.createElement('button');
                    dropdownSubmitBtn.textContent = "Antwort abschicken";
                    dropdownSubmitBtn.addEventListener('click', () => checkAnswer(select.value, q.answer, dropdownSubmitBtn, q));
                    optionsContainer.appendChild(dropdownSubmitBtn);
                    break;
                case "all-correct-select":
                    optionsContainer.classList.add('activity-buttons');
                    q.options.forEach(opt => {
                        const button = document.createElement('button');
                        button.textContent = opt.text;
                        button.addEventListener('click', () => {
                            // For all-correct-select, always consider it correct
                            if (!button.classList.contains('correct')) {
                                button.classList.add('correct');
                                button.disabled = true;
                                
                                // Show that all answers are correct
                                feedbackText.textContent = "Alle Antworten sind richtig! Klicke ruhig alle an! 😊";
                                feedbackText.style.color = "#28a745";
                                feedbackText.classList.remove('hidden');
                                
                                // Trigger confetti for each correct click in easy mode
                                if (!hardModeActive) {
                                    triggerConfetti();
                                }
                                
                                // Check if all buttons have been clicked
                                const allButtons = optionsContainer.querySelectorAll('button');
                                const clickedButtons = optionsContainer.querySelectorAll('button.correct');
                                
                                if (clickedButtons.length === allButtons.length) {
                                    // All buttons clicked, show next question button
                                    feedbackText.textContent = "Perfekt! Du kennst mich so gut! Alle Antworten sind richtig! 🥰";
                                    nextQuestionBtn.classList.remove('hidden');
                                }
                            }
                        });
                        optionsContainer.appendChild(button);
                    });
                    break;
                default:
                    console.error("Unknown question type: ", q.type);
                    break;
            }
        } else {
            renderStep('idea-question');
        }
    }

    function checkAnswer(selectedInput, correctAnswer, element, question) {
        let isCorrect = false;
        if (typeof selectedInput === 'string') {
            isCorrect = selectedInput.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        } else {
            isCorrect = selectedInput === correctAnswer;
        }

        Array.from(optionsContainer.querySelectorAll('button, input, select')).forEach(el => {
            el.disabled = true;
        });

        if (isCorrect || question.isFun) {
            if (element.tagName === 'BUTTON') element.classList.add('correct');
            feedbackText.textContent = "Richtig! Gut gemacht!";
            feedbackText.style.color = "#28a745";
            if (question.hint && !question.isFun) {
                collectedHints.push(question.hint);
            }
            // Trigger confetti for correct answers in easy mode (not hard mode)
            if (!hardModeActive) {
                triggerConfetti();
            }
            nextQuestionBtn.classList.remove('hidden');
        } else {
            if (element.tagName === 'BUTTON') element.classList.add('incorrect');
            feedbackText.textContent = "Leider falsch. Versuch es noch einmal!";
            feedbackText.style.color = "#dc3545";
            Array.from(optionsContainer.querySelectorAll('button, input, select')).forEach(el => {
                el.disabled = false;
            });
        }
        feedbackText.classList.remove('hidden');
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    function displayCollectedHints() {
        collectedHintsDisplay.innerHTML = '';
        if (collectedHints.length > 0) {
            const ul = document.createElement('ul');
            collectedHints.forEach(hint => {
                const li = document.createElement('li');
                li.textContent = hint;
                ul.appendChild(li);
            });
            collectedHintsDisplay.appendChild(ul);
        } else {
            collectedHintsDisplay.innerHTML = '<p>Noch keine Hinweise gesammelt. Vielleicht beim nächsten Mal genauer aufpassen! 😉</p>';
        }
    }

    function startBreathingExercise() {
        console.log('Starting breathing exercise...');
        const startBreathingBtn = document.getElementById('start-breathing-btn');
        const breathingExercise = document.getElementById('breathing-exercise');
        const breathingInstruction = document.getElementById('breathing-instruction');
        const afterBreathing = document.getElementById('after-breathing');
        const letsMoveOnBtn = document.getElementById('lets-move-on-btn');
        
        // Hide start button and show breathing exercise
        if (startBreathingBtn) {
            startBreathingBtn.classList.add('hidden');
        }
        if (breathingExercise) {
            breathingExercise.classList.remove('hidden');
        }
        
        console.log('Elements found:', {
            breathingInstruction: !!breathingInstruction,
            afterBreathing: !!afterBreathing,
            letsMoveOnBtn: !!letsMoveOnBtn
        });
        
        const breathingSequence = [
            { text: 'Atme ein', duration: 4 },
            { text: 'Halte an', duration: 4 },
            { text: 'Atme aus', duration: 6 },
            { text: 'Atme ein', duration: 4 },
            { text: 'Halte an', duration: 4 },
            { text: 'Atme aus', duration: 6 },
            { text: 'Atme ein', duration: 4 },
            { text: 'Halte an', duration: 4 },
            { text: 'Atme aus', duration: 6 },
            { text: 'Perfekt! Fühlst du dich besser? 🌸', duration: 0 }
        ];
        
        let currentStep = 0;
        
        function nextBreathingStep() {
            if (currentStep < breathingSequence.length) {
                const step = breathingSequence[currentStep];
                console.log(`Breathing step ${currentStep}: ${step.text}`);
                
                if (step.duration === 0) {
                    // Final message
                    breathingInstruction.textContent = step.text;
                    currentStep++;
                    // After breathing exercise is complete - wait a bit longer on final message
                    console.log('Breathing exercise complete, showing button in 3 seconds...');
                    setTimeout(() => {
                        console.log('Hiding breathing exercise, showing button...');
                        document.getElementById('breathing-exercise').classList.add('hidden');
                        afterBreathing.classList.remove('hidden');
                        // Show the original button
                        if (letsMoveOnBtn) {
                            letsMoveOnBtn.classList.remove('hidden');
                            console.log('Showing original lets-move-on button');
                        }
                    }, 3000);
                } else {
                    // Show the action text and start countdown
                    breathingInstruction.textContent = step.text + '...';
                    
                    let countdown = step.duration;
                    const countdownInterval = setInterval(() => {
                        if (countdown > 0) {
                            breathingInstruction.textContent = step.text + '... ' + countdown;
                            countdown--;
                        } else {
                            clearInterval(countdownInterval);
                            currentStep++;
                            setTimeout(nextBreathingStep, 500); // Short pause between steps
                        }
                    }, 1000); // Update every second
                }
            }
        }
        
        nextBreathingStep();
    }

    // --- HARD MODE LOGIC ---
    const hardModeQuestions = [
        {
            brutal_question: "💀 RÄTSEL DES TODES 💀\n\nIch lauere im Wasser seit Millionen Jahren,\nMeine Zähne sind schärfer als jeder Dolch.\nIch bewege mich lautlos, geduldig und kalt,\nUnd wenn du mich siehst... ist es oft zu spät.\n\nWas bin ich? 💀",
            answer: "krokodil",
            correct_variations: ["krokodil", "crocodile", "alligator"]
        },
        {
            brutal_question: "💀 ZAHLEN DER VERDAMMNIS 💀\n\nDrei Würfel fallen perfekt - addiere das Ergebnis zu zweitausend,\nAddiere die Finger deiner beiden Hände,\nSubtrahiere die Köpfe des Höllenhunds.\n\nWelche Zahl bin ich? 💀",
            answer: "2025",
            correct_variations: ["2025", "2025.0", "2025,0"]
        },
        {
            brutal_question: "💀 HERRSCHER DER FINSTERNIS 💀\n\nIch trage eine Krone aus Gold und Macht,\nBefehle über Leben und Tod.\nMein Thron steht hoch über allen anderen,\nDoch selbst ich muss einst fallen.\n\nWer bin ich? 💀",
            answer: "könig",
            correct_variations: ["könig", "king", "koenig"]
        },
        {
            brutal_question: "💀 MEISTER DER DUNKLEN KÜNSTE 💀\n\nMit Stab und Spruch beherrsche ich die Elemente,\nIch wandle Realität nach meinem Willen.\nIn Türmen hoch studiere ich uraltes Wissen,\nUnd flüstere Geheimnisse, die sterbliche fürchten.\n\nWas bin ich? 💀",
            answer: "zauberer",
            correct_variations: ["zauberer", "ein zauberer", "magier", "wizard"]
        },
        {
            brutal_question: "💀 TEMPEL DES DONNERS 💀\n\nHier versammeln sich die Massen im Dunkeln,\nUm Klänge zu hören, die Seelen bewegen.\nLicht und Schatten tanzen wild,\nWährend Musik die Nacht durchbricht.\n\nWo bin ich? 💀",
            answer: "konzert",
            correct_variations: ["konzert", "concert", "festival"]
        },
        {
            brutal_question: "💀 RÄTSEL DER EWIGEN LIEBE 💀\n\nIch bin derjenige, der dein Herz gestohlen hat,\nMit Kaffee in der Hand und Code im Kopf.\nFür dich erschaffe ich digitale Welten,\nUnd trage einen Ring als Zeichen unseres Bundes.\n\nWer bin ich? 💀",
            answer: "dein bezaubernder ehegatte",
            correct_variations: ["dein bezaubernder ehegatte", "ehegatte", "mein ehegatte", "du", "mein mann", "timo", "mein schatz", "schatz"]
        },
        {
            brutal_question: "💀 ZAHL DES SCHICKSALS 💀\n\nIch bin die Zahl der Vollendung,\nDer Glück-Bringer und Pech-Bringer zugleich.\nIn Märchen bin ich die Anzahl der Gefährten,\nIn Spielen das höchste Glück.\n\nWelche Zahl bin ich? 💀",
            answer: "7",
            correct_variations: ["7", "7.0", "sieben", "seven"]
        },
        {
            brutal_question: "💀 MONAT DER SCHATTEN 💀\n\nIch bringe Nebel und Kälte mit mir,\nDie Blätter fallen in meinen Tagen.\nIch bin der Elfte im Kreise der Zeit,\nWenn das Jahr seinem Ende entgegen geht.\n\nWelcher Monat bin ich? 💀",
            answer: "november",
            correct_variations: ["november", "nov"]
        }
    ];

    function createExplosionEffect() {
        // Create temporary explosion element
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 8em;
            z-index: 100;
            pointer-events: none;
            animation: explosion-burst 1s ease-out forwards;
        `;
        explosion.textContent = '💥';
        document.body.appendChild(explosion);
        
        // Remove after animation
        setTimeout(() => explosion.remove(), 1000);
    }
    
    function intensifyFlames() {
        // Temporarily add more flame intensity class
        document.body.classList.add('flame-intensify');
        
        // Remove after 2 seconds
        setTimeout(() => {
            document.body.classList.remove('flame-intensify');
        }, 2000);
    }
    
    function createWrongAnswerEffect() {
        // Create blood drops effect
        for (let i = 0; i < 6; i++) {
            const bloodDrop = document.createElement('div');
            bloodDrop.style.cssText = `
                position: fixed;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                font-size: ${2 + Math.random() * 3}em;
                z-index: 100;
                pointer-events: none;
                animation: blood-fall ${2 + Math.random() * 2}s ease-in forwards;
            `;
            bloodDrop.textContent = '🩸';
            document.body.appendChild(bloodDrop);
            
            // Remove after animation
            setTimeout(() => bloodDrop.remove(), 4000);
        }
    }
    
    function screenShakeEffect() {
        // Add screen shake class
        document.body.classList.add('screen-shake');
        
        // Remove after shake
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
        }, 600);
    }

    function startFinalCountdown() {
        const display = document.getElementById('final-countdown-display');
        const text = document.getElementById('final-countdown-text');
        const title = document.getElementById('final-countdown-title');
        let count = 10;
        
        const countdownInterval = setInterval(() => {
            // Create excitement effects on each count
            createCountdownEffects();
            
            // Update display
            display.textContent = count;
            display.style.color = `hsl(${count * 36}, 100%, 50%)`;
            
            // Update text based on countdown
            switch(count) {
                case 9: text.textContent = "Die Spannung steigt..."; break;
                case 8: text.textContent = "Gleich ist es soweit..."; break;
                case 7: text.textContent = "Dein Herz schlägt schneller..."; break;
                case 6: text.textContent = "Die Vorfreude ist unbeschreiblich..."; break;
                case 5: text.textContent = "Fast geschafft..."; break;
                case 4: text.textContent = "Die letzten Sekunden..."; break;
                case 3: text.textContent = "Drei..."; break;
                case 2: text.textContent = "Zwei..."; break;
                case 1: text.textContent = "Eins..."; break;
                case 0: 
                    text.textContent = "🎊 JETZT! 🎊";
                    display.textContent = "🎁";
                    display.style.fontSize = "12em";
                    createMassiveConfetti();
                    // Stop final countdown music and start reveal music
                    finalCountdownMusic.pause();
                    revealSound.play().catch(e => console.log('Reveal sound play prevented:', e));
                    break;
            }
            
            count--;
            
            if (count < 0) {
                clearInterval(countdownInterval);
                setTimeout(() => {
                    renderStep('final-reveal');
                }, 2000);
            }
        }, 1000);
    }
    
    function createCountdownEffects() {
        // Create sparkle effects
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                top: ${20 + Math.random() * 60}%;
                left: ${10 + Math.random() * 80}%;
                font-size: ${1 + Math.random() * 2}em;
                z-index: 50;
                pointer-events: none;
                animation: sparkle-burst ${1 + Math.random()}s ease-out forwards;
            `;
            sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }
    }
    
    function createMassiveConfetti() {
        // Create lots of confetti for the final moment
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: ${1.5 + Math.random() * 2}em;
                z-index: 100;
                pointer-events: none;
                animation: confetti-fall ${3 + Math.random() * 2}s ease-in forwards;
            `;
            confetti.textContent = ['🎉', '🎊', '🎈', '🎁', '🎀', '⭐', '✨'][Math.floor(Math.random() * 7)];
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    function startLaughingAnimation(element) {
        const laughText = "HAHAHAHAHAHAHAHAHA! MUAHAHAHAHA! HIHIHIHIHI! HEHEHEHE! BWAHAHAHA!";
        let currentText = '';
        let index = 0;
        
        function typeNextChar() {
            if (index < laughText.length) {
                currentText += laughText[index];
                element.textContent = currentText;
                index++;
                
                // Random delay between characters for more chaotic effect
                const delay = Math.random() * 100 + 50; // 50-150ms
                setTimeout(typeNextChar, delay);
            }
        }
        
        // Start typing
        element.textContent = '';
        typeNextChar();
    }

    function startHardModeTransition() {
        const transitionText = document.getElementById('hard-mode-transition-text');
        const laughing = document.getElementById('hard-mode-laughing');
        const warning = document.getElementById('hard-mode-warning');
        
        // Phase 1: Initial text
        setTimeout(() => {
            transitionText.textContent = '🔥💀 HARD MODE WIRD BESCHWOREN... BEREITE DICH VOR! 💀🔥';
        }, 1500);
        
        // Phase 2: Animated laughter
        setTimeout(() => {
            laughing.classList.remove('hidden');
            transitionText.textContent = '😈 DIE HÖLLE ERWACHT! 😈';
            startLaughingAnimation(laughing);
        }, 4000);
        
        // Phase 3: Warning
        setTimeout(() => {
            warning.classList.remove('hidden');
            transitionText.textContent = '🔥💀🔥 HARD MODE ACTIVATED! 🔥💀🔥';
        }, 9000);
        
        // Phase 4: Start quiz
        setTimeout(() => {
            renderStep('hard-quiz');
        }, 13000);
    }

    function startHardModeQuiz() {
        hardModeActive = true;
        hardModeLives = 3;
        hardModeCurrentQuestion = 0;
        
        // Shuffle hard mode questions like in easy mode
        const shuffledHardModeQuestions = [...hardModeQuestions];
        shuffleArray(shuffledHardModeQuestions);
        
        // Replace the original array with shuffled version
        hardModeQuestions.length = 0;
        hardModeQuestions.push(...shuffledHardModeQuestions);
        
        updateHardModeLives();
        loadHardModeQuestion();
        
        // Set up enter key support
        const input = document.getElementById('hard-answer-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkHardModeAnswer();
            }
        });
    }

    function updateHardModeLives() {
        const livesDisplay = document.getElementById('hard-lives-count');
        const livesContainer = document.querySelector('.lives-display');
        
        if (livesDisplay) {
            livesDisplay.textContent = hardModeLives;
            
            // Visual feedback based on lives
            if (hardModeLives <= 1) {
                livesContainer.style.background = 'rgba(255, 0, 0, 0.5)';
                livesContainer.style.animation = 'brutal-pulse 0.5s infinite alternate';
            } else if (hardModeLives <= 2) {
                livesContainer.style.background = 'rgba(255, 100, 0, 0.3)';
            }
        }
    }

    function loadHardModeQuestion() {
        const questionText = document.getElementById('hard-question-text');
        const currentQuestionSpan = document.getElementById('hard-current-question');
        const totalQuestionsSpan = document.getElementById('hard-total-questions');
        const input = document.getElementById('hard-answer-input');
        const feedback = document.getElementById('hard-feedback-text');
        
        if (hardModeCurrentQuestion >= hardModeQuestions.length) {
            // Hard mode completed successfully!
            renderStep('hard-mode-victory');
            return;
        }
        
        const question = hardModeQuestions[hardModeCurrentQuestion];
        
        questionText.textContent = question.brutal_question;
        
        input.value = '';
        // Don't auto-focus input to avoid mobile keyboard popup
        feedback.classList.add('hidden');
        
        // Reset countdown state for new question
        hardModeCountdownExpired = false;
        
        // Start 15-second countdown
        startHardModeCountdown();
    }

    function startHardModeCountdown() {
        // Clear any existing countdown
        if (hardModeCountdownTimer) {
            clearInterval(hardModeCountdownTimer);
        }
        
        // Reset countdown
        hardModeCountdownSeconds = 15;
        const countdownDisplay = document.getElementById('hard-countdown-time');
        const countdownContainer = document.querySelector('.hard-countdown-display');
        
        if (countdownDisplay) {
            countdownDisplay.textContent = hardModeCountdownSeconds;
        }
        
        // Remove warning and expired classes
        if (countdownContainer) {
            countdownContainer.classList.remove('warning', 'expired');
        }
        
        // Start countdown
        hardModeCountdownTimer = setInterval(() => {
            hardModeCountdownSeconds--;
            
            if (countdownDisplay) {
                countdownDisplay.textContent = hardModeCountdownSeconds;
            }
            
            // Add warning visual when 5 seconds or less
            if (hardModeCountdownSeconds <= 5 && countdownContainer) {
                countdownContainer.classList.add('warning');
            }
            
            // Time's up!
            if (hardModeCountdownSeconds <= 0) {
                clearInterval(hardModeCountdownTimer);
                handleHardModeTimeout();
            }
        }, 1000);
    }

    function handleHardModeTimeout() {
        const feedback = document.getElementById('hard-feedback-text');
        const input = document.getElementById('hard-answer-input');
        const countdownContainer = document.querySelector('.hard-countdown-display');
        
        // Mark countdown as expired - it won't restart until next question
        hardModeCountdownExpired = true;
        
        // Lose a life for timeout
        hardModeLives--;
        feedback.textContent = `⏰ ZEIT ABGELAUFEN! Der Teufel lacht über deine Langsamkeit! -1 Leben! ⏰`;
        feedback.className = 'brutal-feedback wrong';
        
        // Make countdown display show expired state
        if (countdownContainer) {
            countdownContainer.classList.add('expired');
        }
        
        // Add timeout effects
        createWrongAnswerEffect();
        screenShakeEffect();
        
        updateHardModeLives();
        
        if (hardModeLives <= 0) {
            // Game over
            setTimeout(() => {
                renderStep('hard-game-over');
            }, 3000);
        } else {
            // Continue with same question, but DON'T restart countdown
            setTimeout(() => {
                feedback.classList.add('hidden');
                input.value = '';
                // Don't restart countdown - it stays at 0 until next question
            }, 3000);
        }
    }

    function checkHardModeAnswer() {
        const input = document.getElementById('hard-answer-input');
        const feedback = document.getElementById('hard-feedback-text');
        const question = hardModeQuestions[hardModeCurrentQuestion];
        
        const playerAnswer = input.value.toLowerCase().trim();
        const isCorrect = question.correct_variations.some(variant => 
            variant.toLowerCase() === playerAnswer
        );
        
        feedback.classList.remove('hidden');
        
        if (isCorrect) {
            // Stop the countdown timer since answer is correct
            if (hardModeCountdownTimer) {
                clearInterval(hardModeCountdownTimer);
            }
            
            // Correct answer - no life gain, just progression
            feedback.textContent = '🔥 RICHTIG! Du hast dem Teufel getrotzt! Weiter zur nächsten Qual! 🔥';
            feedback.className = 'brutal-feedback correct';
            
            // Add explosion and more flames effect
            createExplosionEffect();
            intensifyFlames();
            
            setTimeout(() => {
                hardModeCurrentQuestion++;
                loadHardModeQuestion();
            }, 2000);
            
        } else {
            // Stop the countdown timer since wrong answer feedback is showing
            if (hardModeCountdownTimer) {
                clearInterval(hardModeCountdownTimer);
            }
            
            // Wrong answer
            hardModeLives--;
            feedback.textContent = `💀 FALSCH! Der Teufel lacht über dich! -1 Leben! 💀`;
            feedback.className = 'brutal-feedback wrong';
            
            // Add wrong answer effects
            createWrongAnswerEffect();
            screenShakeEffect();
            
            updateHardModeLives();
            
            if (hardModeLives <= 0) {
                // Game over
                setTimeout(() => {
                    renderStep('hard-game-over');
                }, 3000);
            } else {
                // Continue with same question, don't advance
                setTimeout(() => {
                    feedback.classList.add('hidden');
                    input.value = '';
                    // Don't auto-focus input to avoid mobile keyboard popup
                    // Only restart countdown if it hasn't expired yet
                    if (!hardModeCountdownExpired) {
                        startHardModeCountdown(); // Restart countdown for retry
                    }
                }, 3000);
            }
        }
    }

    function displayQuizAnswers() {
        const quizAnswersDisplay = document.getElementById('quiz-answers-display');
        if (quizAnswersDisplay) {
            const ul = document.createElement('ul');
            allQuestions.forEach((question, index) => {
                const li = document.createElement('li');
                let answerText = '';
                if (question.type === 'all-correct-select') {
                    answerText = 'Alle Antworten sind richtig! 😊';
                } else {
                    answerText = question.answer || question.hint || 'Antwort nicht verfügbar';
                }
                li.innerHTML = `<strong>Frage ${index + 1}:</strong> ${question.question}<br><strong>Antwort:</strong> ${answerText}`;
                li.style.marginBottom = '15px';
                ul.appendChild(li);
            });
            quizAnswersDisplay.innerHTML = '';
            quizAnswersDisplay.appendChild(ul);
        }
    }

    // --- BIRTHDAY VISUALS MANAGEMENT ---
    function manageBirthdayVisuals() {
        let birthdayVisuals = document.querySelector('.birthday-visuals');
        
        // If birthday visuals don't exist and countdown hasn't started, recreate them
        if (!birthdayVisuals && !countdownStarted) {
            birthdayVisuals = document.createElement('div');
            birthdayVisuals.className = 'birthday-visuals';
            birthdayVisuals.innerHTML = `
                <div class="floating-balloon">🎈</div>
                <div class="floating-balloon">🎈</div>
                <div class="floating-balloon">🎈</div>
                <div class="floating-balloon">🎈</div>
                <div class="floating-star">⭐</div>
                <div class="floating-star">✨</div>
                <div class="floating-star">🌟</div>
                <div class="floating-star">⭐</div>
                <div class="floating-gift">🎁</div>
                <div class="floating-gift">🎁</div>
                <div class="floating-confetti">🎊</div>
                <div class="floating-confetti">🎉</div>
                <div class="floating-confetti">🎊</div>
            `;
            document.body.insertBefore(birthdayVisuals, document.body.firstChild.nextSibling);
        }
        
        // Show/hide based on countdown state
        if (birthdayVisuals) {
            if (countdownStarted) {
                birthdayVisuals.style.display = 'none';
            } else {
                birthdayVisuals.style.display = 'block';
            }
        }
    }

    // --- GAME PARTICLE EFFECTS ---
    function createGameParticles(element, emoji) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.textContent = emoji;
            particle.style.position = 'fixed';
            particle.style.left = (rect.left + rect.width/2) + 'px';
            particle.style.top = (rect.top + rect.height/2) + 'px';
            particle.style.fontSize = '1.5em';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.animation = `game-particle-${i} 1s ease-out forwards`;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Add particle animations to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes game-particle-0 {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(-30px, -50px) scale(0.3); opacity: 0; }
        }
        @keyframes game-particle-1 {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(0, -60px) scale(0.3); opacity: 0; }
        }
        @keyframes game-particle-2 {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(30px, -50px) scale(0.3); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // --- GENERAL PURPOSE & INITIALIZATION ---
    function createStars() {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            starContainer.appendChild(star);
        }
    }

    function triggerConfetti() {
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * 100 + 'vh';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confettiContainer.appendChild(confetti);
            confetti.addEventListener('animationend', () => confetti.remove());
        }
    }

    // --- MINI GAMES LOGIC ---
    
    function initMiniGamesChallenge() {
        // Reset mini games progress
        miniGamesProgress = 0;
    }
    
    // TIC TAC TOE GAME
    function initTicTacToe() {
        // Reset game state
        ticTacToeBoard = Array(9).fill('');
        ticTacToeCurrentPlayer = 'X';
        
        // Get all cells and clear them
        const cells = document.querySelectorAll('.ttt-cell');
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.style.background = '#f8f9fa';
            cell.disabled = false;
            cell.onclick = () => makeTicTacToeMove(index);
        });
        
        // Update status
        document.getElementById('ttt-status').textContent = 'Du bist dran!';
        document.getElementById('ttt-result').classList.add('hidden');
    }
    
    function makeTicTacToeMove(index) {
        if (ticTacToeBoard[index] !== '' || ticTacToeCurrentPlayer !== 'X') return;
        
        // Player move
        ticTacToeBoard[index] = 'X';
        document.querySelector(`[data-index="${index}"]`).textContent = 'X';
        document.querySelector(`[data-index="${index}"]`).style.color = '#007bff';
        
        // Check for player win
        if (checkTicTacToeWin('X')) {
            endTicTacToeGame('Gewonnen! 🎉');
            return;
        }
        
        // Check for tie
        if (ticTacToeBoard.every(cell => cell !== '')) {
            endTicTacToeGame('Unentschieden!', true);
            return;
        }
        
        // Computer move
        ticTacToeCurrentPlayer = 'O';
        document.getElementById('ttt-status').textContent = 'Ich bin dran...';
        
        setTimeout(() => {
            const computerMove = getBestTicTacToeMove();
            ticTacToeBoard[computerMove] = 'O';
            document.querySelector(`[data-index="${computerMove}"]`).textContent = 'O';
            document.querySelector(`[data-index="${computerMove}"]`).style.color = '#dc3545';
            
            // Check for computer win
            if (checkTicTacToeWin('O')) {
                endTicTacToeGame('Ich habe gewonnen! 😈', true);
                return;
            }
            
            // Check for tie
            if (ticTacToeBoard.every(cell => cell !== '')) {
                endTicTacToeGame('Unentschieden!', true);
                return;
            }
            
            ticTacToeCurrentPlayer = 'X';
            document.getElementById('ttt-status').textContent = 'Du bist dran!';
        }, 1000);
    }
    
    function getBestTicTacToeMove() {
        // BALANCED MODE: Strong but not perfect to avoid constant ties
        const shouldPlayOptimally = Math.random() < 0.65; // 65% optimal play
        
        if (shouldPlayOptimally) {
            // Always try to win first
            for (let i = 0; i < 9; i++) {
                if (ticTacToeBoard[i] === '') {
                    ticTacToeBoard[i] = 'O';
                    if (checkTicTacToeWin('O')) {
                        ticTacToeBoard[i] = '';
                        return i;
                    }
                    ticTacToeBoard[i] = '';
                }
            }
            
            // Block player wins most of the time (78% chance)
            if (Math.random() < 0.78) {
                for (let i = 0; i < 9; i++) {
                    if (ticTacToeBoard[i] === '') {
                        ticTacToeBoard[i] = 'X';
                        if (checkTicTacToeWin('X')) {
                            ticTacToeBoard[i] = '';
                            return i;
                        }
                        ticTacToeBoard[i] = '';
                    }
                }
            }
            
            // Use minimax for optimal play
            const bestMove = minimax(ticTacToeBoard, 0, true);
            if (bestMove.position !== undefined) {
                return bestMove.position;
            }
            
            // Fallback strategic positioning
            const strategicMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
            for (let move of strategicMoves) {
                if (ticTacToeBoard[move] === '') {
                    return move;
                }
            }
        }
        
        // Occasional random move (25% chance)
        const availableSpots = ticTacToeBoard.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        return availableSpots[Math.floor(Math.random() * availableSpots.length)];
    }

    function minimax(board, depth, isMaximizing) {
        // Check terminal states
        if (checkTicTacToeWin('O')) return { score: 10 - depth };
        if (checkTicTacToeWin('X')) return { score: depth - 10 };
        if (board.every(cell => cell !== '')) return { score: 0 };
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            let bestPosition;
            
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = minimax(board, depth + 1, false).score;
                    board[i] = '';
                    
                    if (score > bestScore) {
                        bestScore = score;
                        bestPosition = i;
                    }
                }
            }
            return { score: bestScore, position: bestPosition };
        } else {
            let bestScore = Infinity;
            let bestPosition;
            
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = minimax(board, depth + 1, true).score;
                    board[i] = '';
                    
                    if (score < bestScore) {
                        bestScore = score;
                        bestPosition = i;
                    }
                }
            }
            return { score: bestScore, position: bestPosition };
        }
    }
    
    function checkTicTacToeWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns  
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        return winPatterns.some(pattern => 
            pattern.every(index => ticTacToeBoard[index] === player)
        );
    }
    
    function endTicTacToeGame(message, lost = false) {
        // Disable all cells
        document.querySelectorAll('.ttt-cell').forEach(cell => cell.disabled = true);
        
        // Show result
        document.getElementById('ttt-status').textContent = '';
        document.getElementById('ttt-result').classList.remove('hidden');
        document.getElementById('ttt-result-text').textContent = message;
        
        if (lost) {
            // Player lost - stop gaming music and play game over sound
            gamingMusic.pause();
            gameover2Sound.play().catch(e => console.log('Game over 2 sound play prevented:', e));
            
            // Player lost - restart mini games challenge
            document.getElementById('ttt-restart-challenge-btn').classList.remove('hidden');
            document.getElementById('ttt-continue-btn').classList.add('hidden');
            
            // Set up restart button
            document.getElementById('ttt-restart-challenge-btn').onclick = () => {
                miniGamesProgress = 0;
                renderStep('tic-tac-toe-game');
            };
        } else {
            // Player won - continue to next game
            miniGamesProgress = 1;
            document.getElementById('ttt-continue-btn').classList.remove('hidden');
            document.getElementById('ttt-restart-challenge-btn').classList.add('hidden');
            
            // Set up continue button
            document.getElementById('ttt-continue-btn').onclick = () => {
                renderStep('rock-paper-scissors-game');
            };
        }
    }
    
    // ROCK PAPER SCISSORS GAME
    function predictPlayerChoice() {
        const history = window.rpsPlayerHistory;
        if (history.length < 2) return 'rock'; // default
        
        // Advanced pattern recognition with multiple strategies
        const lastChoice = history[history.length - 1];
        const secondLastChoice = history[history.length - 2];
        const thirdLastChoice = history.length >= 3 ? history[history.length - 3] : null;
        
        // Strategy 1: Look for exact sequence patterns (3-4 moves)
        if (history.length >= 4) {
            const last3 = history.slice(-3).join('');
            for (let i = 0; i < history.length - 3; i++) {
                const seq = history.slice(i, i + 3).join('');
                if (seq === last3 && i + 3 < history.length) {
                    return history[i + 3]; // Found matching pattern, predict next
                }
            }
        }
        
        // Strategy 2: Counter frequency-based prediction  
        const counts = { rock: 0, paper: 0, scissors: 0 };
        history.forEach(choice => counts[choice]++);
        const mostFrequent = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        
        // Strategy 3: Look for anti-frequency (what player avoids)
        const recentHistory = history.slice(-Math.min(6, history.length));
        const recentCounts = { rock: 0, paper: 0, scissors: 0 };
        recentHistory.forEach(choice => recentCounts[choice]++);
        const leastRecent = Object.keys(recentCounts).reduce((a, b) => recentCounts[a] < recentCounts[b] ? a : b);
        
        // Strategy 4: Detect repetition patterns
        if (lastChoice === secondLastChoice && thirdLastChoice === lastChoice) {
            return lastChoice; // Strong repetition pattern
        }
        
        // Strategy 5: Detect alternating patterns with higher complexity
        if (history.length >= 4) {
            const last4 = history.slice(-4);
            if (last4[0] === last4[2] && last4[1] === last4[3] && last4[0] !== last4[1]) {
                return last4[0]; // ABAB pattern, predict A
            }
        }
        
        // Strategy 6: Meta-gaming - if player beat us recently, they might repeat
        if (window.rpsRecentResults && window.rpsRecentResults.length > 0) {
            const lastResult = window.rpsRecentResults[window.rpsRecentResults.length - 1];
            if (lastResult === 'player_win') {
                return lastChoice; // Player might stick with winning choice
            }
        }
        
        // Strategy 7: Weighted prediction based on multiple factors
        const predictions = [mostFrequent, leastRecent, lastChoice];
        const weights = [0.4, 0.3, 0.3];
        
        // Choose prediction based on weighted random
        const random = Math.random();
        let cumulative = 0;
        for (let i = 0; i < predictions.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return predictions[i];
            }
        }
        
        // Fallback to frequency analysis
        return mostFrequent;
    }

    function initRockPaperScissors() {
        // Reset game state
        rpsPlayerScore = 0;
        rpsComputerScore = 0;
        rpsRound = 0;
        
        // Update UI
        document.getElementById('rps-player-score').textContent = '0';
        document.getElementById('rps-computer-score').textContent = '0';
        document.getElementById('rps-player-choice').textContent = '❓';
        document.getElementById('rps-computer-choice').textContent = '❓';
        document.getElementById('rps-status').textContent = 'Wähle deine Waffe!';
        document.getElementById('rps-result').classList.add('hidden');
        
        // Set up choice buttons
        document.querySelectorAll('.rps-choice-btn').forEach(btn => {
            btn.disabled = false;
            btn.onclick = () => makeRPSChoice(btn.dataset.choice);
        });
    }
    
    function makeRPSChoice(playerChoice) {
        // HARD MODE: Smart AI that tracks player patterns and counters them
        let computerChoice;
        
        // Track player history for pattern recognition
        if (!window.rpsPlayerHistory) window.rpsPlayerHistory = [];
        if (!window.rpsRoundNumber) window.rpsRoundNumber = 0;
        
        window.rpsPlayerHistory.push(playerChoice);
        window.rpsRoundNumber++;
        
        // 85% chance to use advanced pattern analysis, 15% strategic randomness
        if (Math.random() < 0.85 && window.rpsPlayerHistory.length >= 2) {
            // Track results for meta-gaming
            if (!window.rpsRecentResults) window.rpsRecentResults = [];
            
            // Use multiple prediction strategies and counter them
            const predictions = [];
            
            // Primary prediction
            predictions.push(predictPlayerChoice());
            
            // Secondary: Counter-counter psychology (what if they expect us to counter?)
            if (window.rpsPlayerHistory.length >= 3) {
                const prevChoice = window.rpsPlayerHistory[window.rpsPlayerHistory.length - 2];
                predictions.push(prevChoice);
            }
            
            // Tertiary: Anti-meta (assume they're trying to be unpredictable)
            const recentChoices = window.rpsPlayerHistory.slice(-3);
            if (recentChoices.length >= 3) {
                const unused = ['rock', 'paper', 'scissors'].filter(choice => 
                    !recentChoices.includes(choice)
                );
                if (unused.length > 0) {
                    predictions.push(unused[0]);
                }
            }
            
            // Choose best prediction based on recent success
            let bestPrediction = predictions[0];
            
            // Weight predictions by recent AI success rate
            if (window.rpsRecentResults.length >= 2) {
                const recentAIWins = window.rpsRecentResults.slice(-4).filter(r => r === 'ai_win').length;
                if (recentAIWins >= 3) {
                    // AI is winning too much, player might adapt - use more complex prediction
                    bestPrediction = predictions[Math.min(predictions.length - 1, 1)];
                }
            }
            
            // Counter the predicted choice
            const counterMap = {
                'rock': 'paper',
                'paper': 'scissors', 
                'scissors': 'rock'
            };
            computerChoice = counterMap[bestPrediction];
            
        } else {
            // Intelligent randomness - adapt based on player's recent performance
            const choices = ['rock', 'paper', 'scissors'];
            let weights = [0.33, 0.34, 0.33]; // Default equal
            
            // Adjust weights based on player patterns
            if (window.rpsPlayerHistory.length >= 4) {
                const recent = window.rpsPlayerHistory.slice(-4);
                const rockCount = recent.filter(c => c === 'rock').length;
                const paperCount = recent.filter(c => c === 'paper').length;
                const scissorsCount = recent.filter(c => c === 'scissors').length;
                
                // Counter the most frequent recent choice
                if (rockCount >= 2) weights = [0.2, 0.6, 0.2]; // More paper to counter rock
                else if (paperCount >= 2) weights = [0.2, 0.2, 0.6]; // More scissors to counter paper
                else if (scissorsCount >= 2) weights = [0.6, 0.2, 0.2]; // More rock to counter scissors
            }
            
            const random = Math.random();
            let cumulative = 0;
            for (let i = 0; i < choices.length; i++) {
                cumulative += weights[i];
                if (random <= cumulative) {
                    computerChoice = choices[i];
                    break;
                }
            }
        }
        
        // Disable buttons during round
        document.querySelectorAll('.rps-choice-btn').forEach(btn => btn.disabled = true);
        
        // Show choices
        const choiceEmojis = {
            rock: '🪨',
            paper: '📄', 
            scissors: '✂️'
        };
        
        document.getElementById('rps-player-choice').textContent = choiceEmojis[playerChoice];
        document.getElementById('rps-computer-choice').textContent = choiceEmojis[computerChoice];
        
        // Determine winner
        let roundResult = '';
        if (playerChoice === computerChoice) {
            roundResult = 'Unentschieden!';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            rpsPlayerScore++;
            roundResult = 'Du gewinnst die Runde!';
        } else {
            rpsComputerScore++;
            roundResult = 'Computer gewinnt die Runde!';
        }
        
        // Track results for AI learning
        if (!window.rpsRecentResults) window.rpsRecentResults = [];
        if (roundResult.includes('Du gewinnst')) {
            window.rpsRecentResults.push('player_win');
        } else if (roundResult.includes('Computer gewinnt')) {
            window.rpsRecentResults.push('ai_win');
        } else {
            window.rpsRecentResults.push('tie');
        }
        // Keep only last 10 results for performance
        if (window.rpsRecentResults.length > 10) {
            window.rpsRecentResults = window.rpsRecentResults.slice(-10);
        }
        
        // Update scores
        document.getElementById('rps-player-score').textContent = rpsPlayerScore;
        document.getElementById('rps-computer-score').textContent = rpsComputerScore;
        document.getElementById('rps-status').textContent = roundResult;
        
        rpsRound++;
        
        // Check for game end (best of 5) - need 3 wins
        if (rpsPlayerScore === 3 || rpsComputerScore === 3) {
            setTimeout(() => endRPSGame(), 2000);
        } else {
            // Continue game
            setTimeout(() => {
                document.getElementById('rps-status').textContent = `Runde ${rpsRound + 1} - Wähle deine Waffe!`;
                document.getElementById('rps-player-choice').textContent = '❓';
                document.getElementById('rps-computer-choice').textContent = '❓';
                document.querySelectorAll('.rps-choice-btn').forEach(btn => btn.disabled = false);
            }, 2000);
        }
    }
    
    function endRPSGame() {
        const won = rpsPlayerScore === 3;
        const message = won ? 'RPS Victory! 🎉 Weiter zum finalen Spiel!' : 'Computer hat gewonnen! 😈 Versuch es nochmal!';
        
        document.getElementById('rps-result').classList.remove('hidden');
        document.getElementById('rps-result-text').textContent = message;
        
        if (won) {
            // Player won - continue to final game
            miniGamesProgress = 2;
            document.getElementById('rps-continue-btn').classList.remove('hidden');
            document.getElementById('rps-restart-challenge-btn').classList.add('hidden');
            
            document.getElementById('rps-continue-btn').onclick = () => {
                renderStep('connect4-game');
            };
        } else {
            // Player lost - stop gaming music and play game over sound
            gamingMusic.pause();
            gameover2Sound.play().catch(e => console.log('Game over 2 sound play prevented:', e));
            
            // Player lost - restart challenge
            document.getElementById('rps-restart-challenge-btn').classList.remove('hidden');
            document.getElementById('rps-continue-btn').classList.add('hidden');
            
            document.getElementById('rps-restart-challenge-btn').onclick = () => {
                miniGamesProgress = 0;
                renderStep('tic-tac-toe-game');
            };
        }
    }
    
    // CONNECT 4 GAME
    let connect4Grid = [];
    let connect4CurrentPlayer = 1; // 1 = player (red), 2 = AI (blue)
    let connect4GameOver = false;
    let connect4Columns = 5;
    let connect4Rows = 4;
    
    function initConnect4() {
        // Reset game state
        connect4Grid = [];
        connect4CurrentPlayer = 1;
        connect4GameOver = false;
        
        // Initialize empty grid
        for (let row = 0; row < connect4Rows; row++) {
            connect4Grid[row] = [];
            for (let col = 0; col < connect4Columns; col++) {
                connect4Grid[row][col] = 0; // 0 = empty, 1 = player, 2 = AI
            }
        }
        
        // Update UI
        document.getElementById('connect4-status').textContent = 'Du bist dran! Klicke auf eine Spalte!';
        document.getElementById('connect4-result').classList.add('hidden');
        
        createConnect4Grid();
        createConnect4Buttons();
    }
    
    function createConnect4Grid() {
        const grid = document.getElementById('connect4-game-grid');
        grid.innerHTML = '';
        
        // Create 4x5 grid (4 rows, 5 columns)
        for (let row = 0; row < connect4Rows; row++) {
            for (let col = 0; col < connect4Columns; col++) {
                const cell = document.createElement('div');
                cell.className = 'connect4-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.style.cssText = `
                    width: 50px; height: 50px; border: 2px solid #FFF;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 2em; cursor: default; border-radius: 50%;
                    background: #FFF;
                `;
                
                grid.appendChild(cell);
            }
        }
        
        updateConnect4Display();
    }
    
    function createConnect4Buttons() {
        const buttonsContainer = document.getElementById('connect4-buttons');
        buttonsContainer.innerHTML = '';
        
        // Create column buttons
        for (let col = 0; col < connect4Columns; col++) {
            const btn = document.createElement('button');
            btn.className = 'connect4-col-btn pulse-button';
            btn.textContent = `${col + 1}`;
            btn.style.cssText = `
                width: 50px; height: 35px; background: #28a745;
                border: none; border-radius: 5px; color: white;
                font-weight: bold; cursor: pointer; font-size: 1em;
            `;
            
            btn.onclick = () => dropPiece(col);
            buttonsContainer.appendChild(btn);
        }
    }
    
    function updateConnect4Display() {
        const cells = document.querySelectorAll('.connect4-cell');
        cells.forEach((cell, index) => {
            const row = Math.floor(index / connect4Columns);
            const col = index % connect4Columns;
            const value = connect4Grid[row][col];
            
            if (value === 1) {
                cell.textContent = '🔴'; // Player
                cell.style.background = '#FFB3B3';
            } else if (value === 2) {
                cell.textContent = '🔵'; // AI
                cell.style.background = '#B3B3FF';
            } else {
                cell.textContent = '';
                cell.style.background = '#FFF';
            }
        });
    }
    
    function dropPiece(col) {
        if (connect4GameOver || connect4CurrentPlayer !== 1) return;
        
        // Find the lowest empty row in this column
        let targetRow = -1;
        for (let row = connect4Rows - 1; row >= 0; row--) {
            if (connect4Grid[row][col] === 0) {
                targetRow = row;
                break;
            }
        }
        
        if (targetRow === -1) {
            document.getElementById('connect4-status').textContent = 'Diese Spalte ist voll!';
            return;
        }
        
        // Drop player piece
        connect4Grid[targetRow][col] = 1;
        updateConnect4Display();
        createGameParticles(document.querySelector(`[data-row="${targetRow}"][data-col="${col}"]`), '🔴');
        
        // Check for player win
        const playerWinPositions = checkConnect4Win(targetRow, col, 1);
        if (playerWinPositions) {
            highlightWinningPieces(playerWinPositions);
            setTimeout(() => endConnect4Game(true), 1000); // Delay to show highlight
            return;
        }
        
        // Check for tie
        if (isConnect4BoardFull()) {
            endConnect4Game(null); // Tie
            return;
        }
        
        // AI turn
        connect4CurrentPlayer = 2;
        document.getElementById('connect4-status').textContent = 'KI denkt nach... 🤖';
        
        setTimeout(() => {
            makeAIMove();
        }, 800);
    }
    
    function makeAIMove() {
        if (connect4GameOver) return;
        
        // CHALLENGING AI: Use minimax but with limited depth for balance
        const useOptimalPlay = Math.random() < 0.95; // 95% chance for optimal play
        let bestCol = -1;
        
        if (useOptimalPlay) {
            const depth = 6; // Look ahead 6 moves (very challenging)
            const result = minimaxConnect4(connect4Grid, depth, -Infinity, Infinity, true);
            bestCol = result.column;
        }
        
        // If minimax didn't find a good move or we're playing sub-optimally, use heuristics
        if (bestCol === -1) {
            bestCol = getAdvancedHeuristicMove();
        }
        
        // Final fallback: prefer center columns
        if (bestCol === -1) {
            const centerCols = [2, 1, 3, 0, 4];
            for (const col of centerCols) {
                if (getLowestEmptyRow(col) !== -1) {
                    bestCol = col;
                    break;
                }
            }
        }

        // Make the move
        if (bestCol !== -1) {
            const targetRow = getLowestEmptyRow(bestCol);
            connect4Grid[targetRow][bestCol] = 2;
            updateConnect4Display();
            createGameParticles(document.querySelector(`[data-row="${targetRow}"][data-col="${bestCol}"]`), '🔵');
            
            // Check for AI win
            const aiWinPositions = checkConnect4Win(targetRow, bestCol, 2);
            if (aiWinPositions) {
                highlightWinningPieces(aiWinPositions);
                setTimeout(() => endConnect4Game(false), 1000); // AI wins
                return;
            }
            
            // Check for tie
            if (isConnect4BoardFull()) {
                endConnect4Game(null); // Tie
                return;
            }
            
            // Player's turn
            connect4CurrentPlayer = 1;
            document.getElementById('connect4-status').textContent = 'Du bist dran! Wähle eine Spalte.';
        }
    }

    function minimaxConnect4(grid, depth, alpha, beta, maximizing) {
        // Check terminal conditions
        const gameState = checkConnect4GameState(grid);
        if (gameState !== null) {
            if (gameState === 2) return { score: 1000 + depth, column: -1 }; // AI wins
            if (gameState === 1) return { score: -1000 - depth, column: -1 }; // Player wins
            return { score: 0, column: -1 }; // Tie
        }
        
        if (depth === 0) {
            return { score: evaluateConnect4Board(grid), column: -1 };
        }
        
        let bestScore = maximizing ? -Infinity : Infinity;
        let bestColumn = -1;
        
        // Try all columns in order of preference (center first)
        const columnOrder = [2, 1, 3, 0, 4];
        
        for (const col of columnOrder) {
            const row = getLowestEmptyRowInGrid(grid, col);
            if (row === -1) continue; // Column full
            
            // Make move
            grid[row][col] = maximizing ? 2 : 1;
            
            const result = minimaxConnect4(grid, depth - 1, alpha, beta, !maximizing);
            
            // Undo move
            grid[row][col] = 0;
            
            if (maximizing) {
                if (result.score > bestScore) {
                    bestScore = result.score;
                    bestColumn = col;
                }
                alpha = Math.max(alpha, bestScore);
            } else {
                if (result.score < bestScore) {
                    bestScore = result.score;
                    bestColumn = col;
                }
                beta = Math.min(beta, bestScore);
            }
            
            // Alpha-beta pruning
            if (beta <= alpha) {
                break;
            }
        }
        
        return { score: bestScore, column: bestColumn };
    }

    function getAdvancedHeuristicMove() {
        let bestCol = -1;
        let bestScore = -10000;
        
        for (let col = 0; col < connect4Columns; col++) {
            const testRow = getLowestEmptyRow(col);
            if (testRow === -1) continue;
            
            let score = 0;
            
            // Test AI move
            connect4Grid[testRow][col] = 2;
            
            // Priority 1: Check for immediate win
            if (checkConnect4Win(testRow, col, 2)) {
                connect4Grid[testRow][col] = 0;
                return col; // Immediate win!
            }
            
            // Priority 2: Block player wins (multiple moves ahead)
            score += blockPlayerThreats(testRow, col) * 1000;
            
            // Priority 3: Create multiple threats
            score += countPotentialWins(testRow, col, 2) * 200;
            
            // Priority 4: Advanced position evaluation
            score += evaluatePositionAdvanced(testRow, col, 2) * 50;
            
            // Priority 5: Control center positions
            if (col === 2) score += 30;
            if (col === 1 || col === 3) score += 20;
            
            // Priority 6: Prevent giving player opportunities (deeper check)
            score -= evaluatePlayerOpportunities(testRow, col) * 300;
            
            // Priority 7: Build connected sequences
            score += evaluateConnections(testRow, col, 2) * 100;
            
            connect4Grid[testRow][col] = 0; // Reset
            
            if (score > bestScore) {
                bestScore = score;
                bestCol = col;
            }
        }
        
        return bestCol;
    }

    // Helper functions for advanced Connect 4 AI
    function checkConnect4GameState(grid) {
        // Check if anyone has won or if board is full
        for (let row = 0; row < connect4Rows; row++) {
            for (let col = 0; col < connect4Columns; col++) {
                if (grid[row][col] !== 0) {
                    if (checkConnect4WinFromPosition(grid, row, col, grid[row][col])) {
                        return grid[row][col];
                    }
                }
            }
        }
        
        // Check for tie
        let full = true;
        for (let col = 0; col < connect4Columns; col++) {
            if (grid[0][col] === 0) {
                full = false;
                break;
            }
        }
        return full ? 0 : null; // 0 for tie, null for ongoing game
    }

    function checkConnect4WinFromPosition(grid, row, col, player) {
        const directions = [
            [0, 1], [1, 0], [1, 1], [1, -1] // horizontal, vertical, diagonal
        ];
        
        for (const [dr, dc] of directions) {
            let count = 1;
            
            // Check positive direction
            for (let i = 1; i < 3; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                if (newRow >= 0 && newRow < connect4Rows && 
                    newCol >= 0 && newCol < connect4Columns && 
                    grid[newRow][newCol] === player) {
                    count++;
                } else break;
            }
            
            // Check negative direction
            for (let i = 1; i < 3; i++) {
                const newRow = row - dr * i;
                const newCol = col - dc * i;
                if (newRow >= 0 && newRow < connect4Rows && 
                    newCol >= 0 && newCol < connect4Columns && 
                    grid[newRow][newCol] === player) {
                    count++;
                } else break;
            }
            
            if (count >= 3) return true;
        }
        return false;
    }

    function getLowestEmptyRowInGrid(grid, col) {
        for (let row = connect4Rows - 1; row >= 0; row--) {
            if (grid[row][col] === 0) return row;
        }
        return -1;
    }

    function evaluateConnect4Board(grid) {
        let score = 0;
        
        // Evaluate all positions for both players
        for (let row = 0; row < connect4Rows; row++) {
            for (let col = 0; col < connect4Columns; col++) {
                if (grid[row][col] !== 0) {
                    score += evaluatePositionScore(grid, row, col, grid[row][col]);
                }
            }
        }
        
        return score;
    }

    function evaluatePositionScore(grid, row, col, player) {
        let score = 0;
        const multiplier = player === 2 ? 1 : -1; // AI is positive, player is negative
        
        // Center column preference
        if (col === 2) score += 3;
        if (col === 1 || col === 3) score += 2;
        
        // Count potential connections
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        
        for (const [dr, dc] of directions) {
            let connected = 1;
            let spaces = 0;
            
            // Check in both directions
            for (const direction of [1, -1]) {
                for (let i = 1; i < 3; i++) {
                    const newRow = row + dr * i * direction;
                    const newCol = col + dc * i * direction;
                    
                    if (newRow >= 0 && newRow < connect4Rows && 
                        newCol >= 0 && newCol < connect4Columns) {
                        if (grid[newRow][newCol] === player) {
                            connected++;
                        } else if (grid[newRow][newCol] === 0) {
                            spaces++;
                            break;
                        } else {
                            break; // Blocked by opponent
                        }
                    }
                }
            }
            
            // Score based on potential
            if (connected >= 2 && spaces > 0) {
                score += connected * 10;
            }
        }
        
        return score * multiplier;
    }

    function blockPlayerThreats(row, col) {
        let threats = 0;
        
        // Check if placing AI piece here blocks immediate player threats
        connect4Grid[row][col] = 1; // Test player move
        if (checkConnect4Win(row, col, 1)) {
            threats += 10; // High priority block
        }
        connect4Grid[row][col] = 2; // Reset to AI move
        
        return threats;
    }

    function evaluatePositionAdvanced(row, col, player) {
        let score = 0;
        
        // Advanced position evaluation considering multiple factors
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        
        for (const [dr, dc] of directions) {
            let consecutive = 1;
            let openSpaces = 0;
            
            // Count consecutive pieces and open spaces
            for (const dir of [1, -1]) {
                for (let i = 1; i < 3; i++) {
                    const newRow = row + dr * i * dir;
                    const newCol = col + dc * i * dir;
                    
                    if (newRow >= 0 && newRow < connect4Rows && 
                        newCol >= 0 && newCol < connect4Columns) {
                        if (connect4Grid[newRow][newCol] === player) {
                            consecutive++;
                        } else if (connect4Grid[newRow][newCol] === 0) {
                            openSpaces++;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
            
            score += consecutive * consecutive + openSpaces;
        }
        
        return score;
    }

    function evaluatePlayerOpportunities(row, col) {
        let opportunities = 0;
        
        // Check if this move gives player winning opportunities above
        if (row > 0) {
            connect4Grid[row - 1][col] = 1;
            if (checkConnect4Win(row - 1, col, 1)) {
                opportunities += 5;
            }
            connect4Grid[row - 1][col] = 0;
        }
        
        return opportunities;
    }

    function evaluateConnections(row, col, player) {
        let connections = 0;
        
        // Look for existing connected pieces
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        
        for (const [dr, dc] of directions) {
            for (const dir of [1, -1]) {
                const adjacentRow = row + dr * dir;
                const adjacentCol = col + dc * dir;
                
                if (adjacentRow >= 0 && adjacentRow < connect4Rows && 
                    adjacentCol >= 0 && adjacentCol < connect4Columns && 
                    connect4Grid[adjacentRow][adjacentCol] === player) {
                    connections++;
                }
            }
        }
        
        return connections;
    }
    
    function getLowestEmptyRow(col) {
        for (let row = connect4Rows - 1; row >= 0; row--) {
            if (connect4Grid[row][col] === 0) {
                return row;
            }
        }
        return -1;
    }
    
    function checkConnect4Win(row, col, player) {
        // Check all 4 directions: horizontal, vertical, diagonal1, diagonal2
        const directions = [
            [0, 1],  // horizontal
            [1, 0],  // vertical
            [1, 1],  // diagonal \
            [1, -1]  // diagonal /
        ];
        
        for (const [dRow, dCol] of directions) {
            let count = 1; // Count the current piece
            let winningPositions = [[row, col]]; // Track all winning positions
            
            // Check in positive direction
            let checkRow = row + dRow;
            let checkCol = col + dCol;
            while (checkRow >= 0 && checkRow < connect4Rows && 
                   checkCol >= 0 && checkCol < connect4Columns && 
                   connect4Grid[checkRow][checkCol] === player) {
                count++;
                winningPositions.push([checkRow, checkCol]);
                checkRow += dRow;
                checkCol += dCol;
            }
            
            // Check in negative direction
            checkRow = row - dRow;
            checkCol = col - dCol;
            while (checkRow >= 0 && checkRow < connect4Rows && 
                   checkCol >= 0 && checkCol < connect4Columns && 
                   connect4Grid[checkRow][checkCol] === player) {
                count++;
                winningPositions.push([checkRow, checkCol]);
                checkRow -= dRow;
                checkCol -= dCol;
            }
            
            // Win condition: 3 in a row (since we have a 5x4 grid)
            if (count >= 3) {
                return winningPositions; // Return the winning positions
            }
        }
        
        return false; // No win found
    }
    
    function isConnect4BoardFull() {
        for (let col = 0; col < connect4Columns; col++) {
            if (connect4Grid[0][col] === 0) {
                return false;
            }
        }
        return true;
    }
    
    function highlightWinningPieces(winningPositions) {
        // Add special highlight class to winning pieces
        winningPositions.forEach(([row, col]) => {
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('winning-piece');
                cell.style.cssText += `
                    animation: winPulse 0.8s infinite alternate;
                    border: 3px solid #FFD700;
                    box-shadow: 0 0 15px #FFD700;
                    transform: scale(1.1);
                `;
            }
        });
    }
    
    // Helper function to count potential winning opportunities
    function countPotentialWins(row, col, player) {
        let threats = 0;
        const directions = [
            [0, 1],  // horizontal
            [1, 0],  // vertical  
            [1, 1],  // diagonal \
            [1, -1]  // diagonal /
        ];
        
        for (const [dRow, dCol] of directions) {
            let count = 1; // Count the piece we just placed
            let openEnds = 0;
            
            // Count in positive direction
            let checkRow = row + dRow;
            let checkCol = col + dCol;
            while (checkRow >= 0 && checkRow < connect4Rows && 
                   checkCol >= 0 && checkCol < connect4Columns) {
                if (connect4Grid[checkRow][checkCol] === player) {
                    count++;
                } else if (connect4Grid[checkRow][checkCol] === 0) {
                    openEnds++;
                    break;
                } else {
                    break; // Blocked by opponent
                }
                checkRow += dRow;
                checkCol += dCol;
            }
            
            // Count in negative direction
            checkRow = row - dRow;
            checkCol = col - dCol;
            while (checkRow >= 0 && checkRow < connect4Rows && 
                   checkCol >= 0 && checkCol < connect4Columns) {
                if (connect4Grid[checkRow][checkCol] === player) {
                    count++;
                } else if (connect4Grid[checkRow][checkCol] === 0) {
                    openEnds++;
                    break;
                } else {
                    break; // Blocked by opponent
                }
                checkRow -= dRow;
                checkCol -= dCol;
            }
            
            // If we have 2+ in a row with open ends, that's a threat
            if (count >= 2 && openEnds > 0) {
                threats += count; // More pieces = stronger threat
            }
        }
        
        return threats;
    }
    
    // Helper function to evaluate position strength
    function evaluatePosition(row, col, player) {
        let score = 0;
        const directions = [
            [0, 1],  // horizontal
            [1, 0],  // vertical  
            [1, 1],  // diagonal \
            [1, -1]  // diagonal /
        ];
        
        for (const [dRow, dCol] of directions) {
            let count = 1; // Count the piece we just placed
            
            // Count in positive direction
            let checkRow = row + dRow;
            let checkCol = col + dCol;
            while (checkRow >= 0 && checkRow < connect4Rows && 
                   checkCol >= 0 && checkCol < connect4Columns && 
                   connect4Grid[checkRow][checkCol] === player) {
                count++;
                checkRow += dRow;
                checkCol += dCol;
            }
            
            // Count in negative direction
            checkRow = row - dRow;
            checkCol = col - dCol;
            while (checkRow >= 0 && checkRow < connect4Rows && 
                   checkCol >= 0 && checkCol < connect4Columns && 
                   connect4Grid[checkRow][checkCol] === player) {
                count++;
                checkRow -= dRow;
                checkCol -= dCol;
            }
            
            // Score based on how many pieces are connected
            if (count >= 2) {
                score += count * count; // Exponential reward for longer connections
            }
        }
        
        return score;
    }
    
    function endConnect4Game(playerWon) {
        connect4GameOver = true;
        let message;
        
        if (playerWon === true) {
            message = 'Connect 3 Victory! 🎉 Challenge erfolgreich!';
        } else if (playerWon === false) {
            message = 'KI hat gewonnen! 🤖 Versuch es nochmal!';
        } else {
            message = 'Unentschieden! ⚖️ Beide Connect 3 Profis!';
        }
        
        // Clear the status message when game ends
        document.getElementById('connect4-status').textContent = playerWon === true ? 'Du hast gewonnen!' : 
            playerWon === false ? 'Computer hat gewonnen!' : 'Unentschieden!';
        
        document.getElementById('connect4-result').classList.remove('hidden');
        document.getElementById('connect4-result-text').textContent = message;
        
        if (playerWon === true) {
            // Player won all mini games!
            miniGamesProgress = 3;
            const victorySound = document.getElementById('victory-sound');
            if (victorySound) victorySound.play().catch(e => {});
            
            document.getElementById('connect4-continue-btn').classList.remove('hidden');
            document.getElementById('connect4-restart-challenge-btn').classList.add('hidden');
            document.getElementById('connect4-continue-btn').onclick = () => renderStep('mini-games-victory');
        } else if (playerWon === false) {
            // Player lost - restart challenge
            gamingMusic.pause();
            gameover2Sound.play().catch(e => {});
            
            document.getElementById('connect4-restart-challenge-btn').classList.remove('hidden');
            document.getElementById('connect4-continue-btn').classList.add('hidden');
            document.getElementById('connect4-restart-challenge-btn').onclick = () => {
                miniGamesProgress = 0;
                renderStep('tic-tac-toe-game');
            };
        } else {
            // Tie - allow player to try again or continue
            document.getElementById('connect4-restart-challenge-btn').classList.remove('hidden');
            document.getElementById('connect4-continue-btn').classList.remove('hidden');
            document.getElementById('connect4-restart-challenge-btn').onclick = () => {
                initConnect4(); // Just restart this game
            };
            document.getElementById('connect4-continue-btn').onclick = () => renderStep('mini-games-victory');
        }
    }

    // Create enhanced floating question marks for quiz review page
    function createQuizReviewEffects() {
        const floatingContainer = document.querySelector('#quiz-answers-review-page .floating-questions');
        if (!floatingContainer) {
            console.log('No quiz review floating container found - trying to create one');
            // Create the container if it doesn't exist
            const page = document.getElementById('quiz-answers-review-page');
            if (page) {
                const bgEffects = document.createElement('div');
                bgEffects.className = 'quiz-answers-bg-effects';
                const floatingQuestions = document.createElement('div');
                floatingQuestions.className = 'floating-questions';
                bgEffects.appendChild(floatingQuestions);
                page.prepend(bgEffects);
                // Try again with the new container
                createQuizReviewEffects();
            }
            return;
        }
        
        // Create multiple floating question marks
        const questionMarks = ['🎯', '❓', '💭', '🤔'];
        const positions = [
            { top: '20%', left: '8%', delay: '0s', duration: '7s' },
            { top: '30%', right: '10%', delay: '2s', duration: '8s' },
            { top: '50%', left: '15%', delay: '4s', duration: '6s' },
            { top: '70%', right: '12%', delay: '1s', duration: '9s' }
        ];
        
        positions.forEach((pos, index) => {
            const mark = document.createElement('div');
            mark.textContent = questionMarks[index % questionMarks.length];
            mark.style.cssText = `
                position: absolute;
                font-size: ${2.5 + Math.random() * 0.8}em;
                color: rgba(255, 255, 255, ${0.5 + Math.random() * 0.3});
                text-shadow: 0 0 15px rgba(102, 126, 234, 0.8), 0 0 30px rgba(240, 147, 251, 0.5);
                animation: floatQuestion ${pos.duration} infinite ease-in-out;
                animation-delay: ${pos.delay};
                pointer-events: none;
                z-index: 10;
                ${pos.top ? `top: ${pos.top};` : ''}
                ${pos.left ? `left: ${pos.left};` : ''}
                ${pos.right ? `right: ${pos.right};` : ''}
            `;
            floatingContainer.appendChild(mark);
        });
    }

    // Create enhanced floating question marks for quiz answers page
    function createQuizAnswersEffects() {
        const floatingContainer = document.querySelector('#quiz-answers-display-page .floating-questions');
        if (!floatingContainer) {
            console.log('No floating container found - trying to create one');
            // Create the container if it doesn't exist
            const page = document.getElementById('quiz-answers-display-page');
            if (page) {
                const bgEffects = document.createElement('div');
                bgEffects.className = 'quiz-answers-bg-effects';
                const floatingQuestions = document.createElement('div');
                floatingQuestions.className = 'floating-questions';
                bgEffects.appendChild(floatingQuestions);
                page.prepend(bgEffects);
                // Try again with the new container
                createQuizAnswersEffects();
            }
            return;
        }
        
        // Create multiple floating question marks
        const questionMarks = ['❓', '❔', '🤔', '💭'];
        const positions = [
            { top: '15%', left: '5%', delay: '0s', duration: '6s' },
            { top: '25%', right: '8%', delay: '2s', duration: '8s' },
            { top: '45%', left: '12%', delay: '4s', duration: '7s' },
            { top: '65%', right: '15%', delay: '1s', duration: '9s' },
            { top: '80%', left: '20%', delay: '3s', duration: '6s' }
        ];
        
        positions.forEach((pos, index) => {
            const mark = document.createElement('div');
            mark.textContent = questionMarks[index % questionMarks.length];
            mark.style.cssText = `
                position: absolute;
                font-size: ${3 + Math.random() * 1}em;
                color: rgba(255, 255, 255, 0.9);
                text-shadow: 0 0 15px rgba(102, 126, 234, 1), 0 0 30px rgba(240, 147, 251, 0.6);
                animation: floatQuestion ${pos.duration} infinite ease-in-out;
                animation-delay: ${pos.delay};
                pointer-events: none;
                z-index: 10;
                ${pos.top ? `top: ${pos.top};` : ''}
                ${pos.left ? `left: ${pos.left};` : ''}
                ${pos.right ? `right: ${pos.right};` : ''}
            `;
            floatingContainer.appendChild(mark);
        });
    }

    // Quiz Answers Review Function
    function showQuizAnswers() {
        const answersList = document.getElementById('quiz-answers-list');
        const completeDiv = document.getElementById('quiz-answers-complete');
        
        console.log('showQuizAnswers called');
        console.log('collectedHints:', collectedHints);
        console.log('collectedHints length:', collectedHints.length);
        
        // Additional debugging
        console.log('Current question index:', currentQuestionIndex);
        console.log('All questions:', allQuestions.length);
        
        // Create enhanced floating effects
        setTimeout(() => createQuizAnswersEffects(), 500);
        
        answersList.innerHTML = '';
        let delay = 0;
        
        // Check if we have any collected hints
        if (collectedHints.length === 0) {
            // Try to reconstruct from completed quiz - use all questions with hints
            console.log('No collected hints, trying to reconstruct from quiz');
            const reconstructedAnswers = [];
            for (let i = 0; i < allQuestions.length; i++) {
                if (allQuestions[i] && allQuestions[i].hint && !allQuestions[i].isFun) {
                    reconstructedAnswers.push(allQuestions[i].hint);
                }
            }
            
            // If we successfully reconstructed some answers, use them
            const answersToShow = reconstructedAnswers.length > 0 ? reconstructedAnswers : ['Krokodil', '2025', 'König', 'Ein Zauberer', 'Banane'];
            console.log('Using answers:', answersToShow);
            answersToShow.forEach((answer, index) => {
                setTimeout(() => {
                    const answerDiv = document.createElement('div');
                    answerDiv.className = 'quiz-answer-item';
                    answerDiv.textContent = answer;
                    answersList.appendChild(answerDiv);
                    
                    // Trigger the show animation
                    setTimeout(() => {
                        answerDiv.classList.add('show');
                    }, 100);
                    
                    // Show completion buttons after last answer
                    if (index === answersToShow.length - 1) {
                        setTimeout(() => {
                            completeDiv.classList.remove('hidden');
                        }, 1000);
                    }
                }, delay);
                
                delay += 1500;
            });
        } else {
            // Use actual collected hints
            console.log('Using collected hints');
            collectedHints.forEach((answer, index) => {
                setTimeout(() => {
                    const answerDiv = document.createElement('div');
                    answerDiv.className = 'quiz-answer-item';
                    answerDiv.textContent = answer;
                    answersList.appendChild(answerDiv);
                    
                    // Trigger the show animation
                    setTimeout(() => {
                        answerDiv.classList.add('show');
                    }, 100);
                    
                    // Show completion buttons after last answer
                    if (index === collectedHints.length - 1) {
                        setTimeout(() => {
                            completeDiv.classList.remove('hidden');
                        }, 1000);
                    }
                }, delay);
                
                delay += 1500; // 1.5 second delay between answers
            });
        }
    }

    // Loading Bar Mini-Game Logic
    let loadingProgress = 0;
    let loadingInterval = null;
    let brokenLoadingInterval = null;
    let interactiveLoadingActive = false;
    let loadingClickerTimeout = null;

    function startLoadingGame() {
        console.log('Starting loading game');
        
        // Hide initial content, show loading section
        document.getElementById('loading-title').style.display = 'none';
        document.getElementById('loading-description').style.display = 'none';
        document.getElementById('start-loading-btn').classList.add('hidden');
        document.getElementById('loading-section').classList.remove('hidden');
        
        // Start the broken loading animation
        loadingProgress = 0;
        startBrokenLoading();
    }

    function startBrokenLoading() {
        const progressBar = document.getElementById('loading-progress');
        const percentageDisplay = document.getElementById('loading-percentage');
        
        // Phase 1: Load normally to 20%
        loadingInterval = setInterval(() => {
            if (loadingProgress < 20) {
                loadingProgress += 1;
                progressBar.style.width = loadingProgress + '%';
                percentageDisplay.textContent = loadingProgress + '%';
            } else {
                clearInterval(loadingInterval);
                
                // Play glitch sound when loading starts to break (right at 20%)
                glitchSound.currentTime = 0;
                glitchSound.play().catch(e => console.log('Glitch sound play prevented:', e));
                
                // Start the broken oscillation after 500ms delay
                setTimeout(() => {
                    startBrokenOscillation();
                }, 500);
            }
        }, 400); // Much slower loading to 20%
    }

    function startBrokenOscillation() {
        const progressBar = document.getElementById('loading-progress');
        const percentageDisplay = document.getElementById('loading-percentage');
        
        let oscillationCount = 0;
        const maxOscillations = 8; // Oscillate for about 4 seconds
        
        brokenLoadingInterval = setInterval(() => {
            if (oscillationCount < maxOscillations) {
                // Randomly add 2% then subtract 5%, or other chaotic patterns
                const change = Math.random() > 0.6 ? 2 : -5;
                loadingProgress = Math.max(0, Math.min(100, loadingProgress + change));
                
                progressBar.style.width = loadingProgress + '%';
                percentageDisplay.textContent = loadingProgress + '%';
                
                // Add a glitch effect
                progressBar.style.animation = 'none';
                setTimeout(() => {
                    progressBar.style.animation = 'loadingShimmer 2s infinite';
                }, 100);
                
                oscillationCount++;
            } else {
                clearInterval(brokenLoadingInterval);
                // Force it to stop at 14%
                loadingProgress = 14;
                progressBar.style.width = '14%';
                percentageDisplay.textContent = '14%';
                
                // Stop loading music when loading gets stuck at 14%
                loadingMusic.pause();
                
                // Show the error dialog after 5 seconds delay
                setTimeout(() => {
                    showLoadingError();
                }, 5000);
            }
        }, 500); // Every 500ms
    }

    function showLoadingError() {
        document.getElementById('loading-section').classList.add('hidden');
        document.getElementById('loading-error-dialog').classList.remove('hidden');
        
        // No error sound for this step
    }

    function startInteractiveLoading() {
        document.getElementById('loading-error-dialog').classList.add('hidden');
        document.getElementById('interactive-loading').classList.remove('hidden');
        
        // Switch to loading game music
        loadingMusic.pause();
        loadinggameMusic.currentTime = 0;
        loadinggameMusic.play().catch(e => console.log('Loading game music play prevented:', e));
        
        // Set initial progress to 14%
        loadingProgress = 14;
        const interactiveProgress = document.getElementById('interactive-progress');
        const interactivePercentage = document.getElementById('interactive-percentage');
        
        interactiveProgress.style.width = loadingProgress + '%';
        interactivePercentage.textContent = loadingProgress + '%';
        
        interactiveLoadingActive = true;
        startLoadingClicker();
    }


    function handleLoadingClick(event) {
        const btn = event.target;
        const text = btn.textContent;
        console.log('Button clicked:', text);
        
        // Parse the percentage correctly (handle both +3% and -2% formats)
        let change;
        if (text.startsWith('+')) {
            change = parseInt(text.replace('+', '').replace('%', ''));
        } else if (text.startsWith('-')) {
            change = parseInt(text.replace('%', '')); // Keep the negative
        } else {
            change = parseInt(text.replace('%', ''));
        }
        
        console.log('Parsed change:', change);
        applyLoadingChange(change); // Apply any change (positive or negative)
        clearTimeout(loadingClickerTimeout);
        setTimeout(() => startLoadingClicker(), 300); // Brief pause after click
    }

    function startLoadingClicker() {
        if (!interactiveLoadingActive) return;
        
        const clickers = [
            document.getElementById('loading-clicker-1'),
            document.getElementById('loading-clicker-2'), 
            document.getElementById('loading-clicker-3'),
            document.getElementById('loading-clicker-4'),
            document.getElementById('loading-clicker-5')
        ];
        const gameArea = document.querySelector('.loading-game-area');
        
        // Always ensure at least 1 green button appears
        // Randomly pick which button will be green (positive)  
        const positiveButtonIndex = Math.floor(Math.random() * 5);
        
        clickers.forEach((clicker, index) => {
            let percentChange;
            if (index === positiveButtonIndex) {
                // Rare positive button: +2% to +4%
                percentChange = Math.floor(Math.random() * 3) + 2; // +2 to +4
                clicker.className = 'loading-percent-btn enhanced-percent-btn green-btn';
            } else {
                // Negative buttons: -1% to -3%
                percentChange = Math.floor(Math.random() * 3) * -1 - 1; // -1 to -3
                clicker.className = 'loading-percent-btn enhanced-percent-btn red-btn';
            }
            // Update button text
            clicker.textContent = (percentChange > 0 ? '+' : '') + percentChange + '%';
            
            // Random position within game area (but keep it clickable)
            const gameAreaRect = gameArea.getBoundingClientRect();
            const randomLeft = Math.random() * (gameAreaRect.width - 120); // 120px for button width
            const randomTop = Math.random() * (gameAreaRect.height - 60); // 60px for button height
            
            clicker.style.left = randomLeft + 'px';
            clicker.style.top = randomTop + 'px';
            clicker.style.position = 'absolute';
            clicker.style.display = 'block';
            
            // Add direct click event listener
            clicker.onclick = (e) => {
                console.log('Direct click on button:', clicker.id, clicker.textContent);
                handleLoadingClick(e);
            };
        });
        
        // Auto-next timeout (just move to next button set)
        loadingClickerTimeout = setTimeout(() => {
            if (interactiveLoadingActive) {
                startLoadingClicker(); // Next button set
            }
        }, Math.random() * 300 + 800); // 800ms to 1100ms
    }

    function applyLoadingChange(change) {
        if (!interactiveLoadingActive) {
            console.log('Interactive loading not active');
            return;
        }
        
        const oldProgress = loadingProgress;
        loadingProgress = Math.max(0, Math.min(100, loadingProgress + change));
        
        console.log(`Progress: ${oldProgress}% + ${change}% = ${loadingProgress}%`);
        
        const interactiveProgress = document.getElementById('interactive-progress');
        const interactivePercentage = document.getElementById('interactive-percentage');
        
        if (!interactiveProgress || !interactivePercentage) {
            console.log('Progress elements not found!');
            return;
        }
        
        interactiveProgress.style.width = loadingProgress + '%';
        interactivePercentage.textContent = loadingProgress + '%';
        
        // Check if we've reached 100%
        if (loadingProgress >= 100) {
            interactiveLoadingActive = false;
            clearTimeout(loadingClickerTimeout);
            
            // Stop loading game music and play bar loaded sound
            loadinggameMusic.pause();
            barloadedSound.currentTime = 0;
            barloadedSound.play().catch(e => console.log('Bar loaded sound play prevented:', e));
            
            showLoadingSuccess();
        }
    }

    function showLoadingSuccess() {
        // COMPLETELY hide the entire loading minigame page content
        const loadingPage = document.getElementById('loading-minigame-page');
        const gameCard = loadingPage.querySelector('.loading-game-card');
        
        // Clear all content from the card
        gameCard.innerHTML = '';
        
        // Create ONLY the final glowing loading bar
        gameCard.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 40vh;">
                <div class="final-loading-container">
                    <div class="final-loading-bar">
                        <div class="final-loading-fill"></div>
                    </div>
                    <div class="final-loading-percentage">100%</div>
                </div>
            </div>
        `;
        
        console.log('Single final loading bar created');
        
        // Start music after 3.4 seconds (1.6 seconds before final reveal)  
        setTimeout(() => {
            backgroundMusic.pause();
            if (revealSound) {
                revealSound.currentTime = 0;
                revealSound.play().catch(e => console.log('Final reveal music play prevented:', e));
            }
            
            // Start giftbox animation synchronized with music
            startPresentRevealAnimation();
        }, 3400);
        
        // Jump to final reveal after 5 seconds total
        setTimeout(() => {
            // Clean up giftbox animation if it exists
            const giftboxContainer = document.getElementById('giftbox-animation-container');
            if (giftboxContainer) {
                document.body.removeChild(giftboxContainer);
            }
            
            console.log('Jumping to final reveal step');
            renderStep('final-reveal');
        }, 5000);
    }
    
    function startPresentRevealAnimation() {
        console.log('Starting giftbox animation');
        
        // Create growing giftbox animation
        const giftboxContainer = document.createElement('div');
        giftboxContainer.id = 'giftbox-animation-container';
        giftboxContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            pointer-events: none;
        `;
        
        const giftbox = document.createElement('div');
        giftbox.textContent = '🎁';
        giftbox.style.cssText = `
            font-size: 2em;
            animation: giftboxGrow 3s ease-out forwards;
        `;
        
        giftboxContainer.appendChild(giftbox);
        document.body.appendChild(giftboxContainer);
        
        // The giftbox will be removed and final reveal triggered by the main timeout in showLoadingSuccess
    }
    
    // Debug function to instantly win loading game
    function debugWinLoading() {
        loadingProgress = 100;
        showLoadingSuccess();
    }

    // Debug mode variables
    let debugClickCount = 0;
    let debugModeEnabled = false;
    
    // Hide all debug buttons by default
    function initializeDebugMode() {
        const debugButtons = [
            'skip-to-quiz-btn',
            'skip-to-system-dialogue-btn',
            'skip-to-countdown2-btn',
            'skip-to-countdown2-error-btn',
            'skip-to-countdown-btn', 
            'skip-to-relief-btn',
            'skip-to-game-suggestions-btn',
            'skip-to-hard-victory-btn',
            'skip-to-mini-games-btn',
            'skip-to-tic-tac-toe-btn',
            'skip-to-rock-paper-scissors-btn',
            'skip-to-color-match-btn',
            'skip-to-mini-victory-btn',
            'jump-to-credits-btn',
            'skip-to-quiz-answers-btn',
            'skip-to-loading-game-btn',
            'debug-win-loading-btn',
            'debug-add-100-btn',
            'skip-to-answers-btn'
        ];
        
        debugButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.classList.add('hidden');
                button.style.display = 'none';
            }
        });
        
        // Hide the debug panel entirely
        const debugPanel = document.querySelector('.debug-panel');
        if (debugPanel) {
            debugPanel.style.display = 'none';
        }
        
        // Hide page marker
        const pageMarker = document.getElementById('pm');
        if (pageMarker) {
            pageMarker.style.display = 'none';
        }
    }
    
    // Setup debug mode toggle
    const debugMusicNote = document.getElementById('debug-music-note');
    if (debugMusicNote) {
        debugMusicNote.addEventListener('click', () => {
            debugClickCount++;
            debugMusicNote.classList.add('clicked');
            setTimeout(() => debugMusicNote.classList.remove('clicked'), 300);
            
            if (debugClickCount >= 7) {
                toggleDebugMode();
                debugClickCount = 0;
            }
            
            // Reset counter after 3 seconds of no clicks
            setTimeout(() => {
                debugClickCount = 0;
            }, 3000);
        });
    }
    
    function toggleDebugMode() {
        debugModeEnabled = !debugModeEnabled;
        
        // List of all debug button IDs
        const debugButtons = [
            'skip-to-quiz-btn',
            'skip-to-system-dialogue-btn',
            'skip-to-countdown2-btn',
            'skip-to-countdown2-error-btn',
            'skip-to-countdown-btn', 
            'skip-to-relief-btn',
            'skip-to-game-suggestions-btn',
            'skip-to-hard-victory-btn',
            'skip-to-mini-games-btn',
            'skip-to-tic-tac-toe-btn',
            'skip-to-rock-paper-scissors-btn',
            'skip-to-color-match-btn',
            'skip-to-mini-victory-btn',
            'jump-to-credits-btn',
            'skip-to-quiz-answers-btn',
            'skip-to-loading-game-btn',
            'debug-win-loading-btn',
            'debug-add-100-btn',
            'skip-to-answers-btn'
        ];
        
        debugButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                if (debugModeEnabled) {
                    button.classList.remove('hidden');
                    button.style.display = 'inline-block';
                } else {
                    button.classList.add('hidden');
                    button.style.display = 'none';
                }
            }
        });
        
        // Toggle debug panel
        const debugPanel = document.querySelector('.debug-panel');
        if (debugPanel) {
            debugPanel.style.display = debugModeEnabled ? 'block' : 'none';
        }
        
        // Toggle page marker
        const pageMarker = document.getElementById('pm');
        if (pageMarker) {
            pageMarker.style.display = debugModeEnabled ? 'block' : 'none';
        }
        
        // Show notification
        showDebugNotification(debugModeEnabled ? 'Debug Mode ENABLED' : 'Debug Mode DISABLED');
    }
    
    function showDebugNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            animation: debugNotificationSlide 3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    // Setup music volume
    backgroundMusic.volume = 0.3;

    // Initial Load
    createStars();
    // Hide debug buttons by default
    initializeDebugMode();
    // Don't start music automatically - let the quiz step handle it
    backgroundMusic.pause();
    
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('DOM ready, about to render start step');
        console.log('Landing page element:', pageElements['landing-page']);
        console.log('Start quiz button element:', document.getElementById('start-quiz-btn'));
        console.log('All debug buttons:');
        console.log('- skip-to-mini-games-btn:', document.getElementById('skip-to-mini-games-btn'));
        console.log('- skip-to-tic-tac-toe-btn:', document.getElementById('skip-to-tic-tac-toe-btn'));
        
        
        renderStep('start');
    }, 100);
    
    // Credits Easter Egg Functions
    let creditsTimer;
    let creditsActive = false;
    
    function startCreditsTimer() {
        console.log('Starting credits timer - 30 seconds until credits button appears...');
        creditsTimer = setTimeout(() => {
            if (!creditsActive) {
                console.log('30 seconds elapsed, showing credits button!');
                showCreditsButton();
            }
        }, 30000); // 30 seconds
    }
    
    function showCreditsButton() {
        // Create credits button on reveal screen
        const revealPage = pageElements['hint-page'];
        const creditsBtn = document.createElement('button');
        creditsBtn.id = 'reveal-credits-btn';
        creditsBtn.textContent = '🎬 Credits';
        creditsBtn.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: #FFD700;
            border: 2px solid #FFD700;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        // Add click handler
        creditsBtn.onclick = () => {
            console.log('Credits button clicked!');
            renderStep('credits');
        };
        
        // Add to reveal page
        revealPage.appendChild(creditsBtn);
        
        // Fade in button
        setTimeout(() => {
            creditsBtn.style.opacity = '1';
            creditsBtn.style.transform = 'translateX(-50%) scale(1.05)';
        }, 100);
        
        // Add hover effects
        creditsBtn.onmouseenter = () => {
            creditsBtn.style.background = '#FFD700';
            creditsBtn.style.color = '#000';
            creditsBtn.style.transform = 'translateX(-50%) scale(1.1)';
        };
        
        creditsBtn.onmouseleave = () => {
            creditsBtn.style.background = 'rgba(0, 0, 0, 0.8)';
            creditsBtn.style.color = '#FFD700';
            creditsBtn.style.transform = 'translateX(-50%) scale(1.05)';
        };
    }
    
    function startCreditsSequence() {
        creditsActive = true;
        console.log('Credits sequence started!');
        
        const revealPage = pageElements['hint-page'];
        const creditsPage = pageElements['credits-page'];
        const creditsRoll = document.getElementById('credits-roll');
        
        // Fade out reveal screen (2 seconds)
        revealPage.style.transition = 'opacity 2s ease-out';
        revealPage.style.opacity = '0';
        
        // Fade out reveal sound
        if (revealSound && !revealSound.paused) {
            const fadeOutInterval = setInterval(() => {
                if (revealSound.volume > 0.1) {
                    revealSound.volume -= 0.1;
                } else {
                    revealSound.pause();
                    revealSound.volume = 1; // Reset for next time
                    clearInterval(fadeOutInterval);
                }
            }, 200);
        } else {
            revealSound.pause();
        }
        
        // After fade out, show empty credits background first
        setTimeout(() => {
            revealPage.classList.add('hidden');
            creditsPage.classList.remove('hidden');
            
            // Hide credits text initially - only show background
            creditsRoll.style.opacity = '0';
            
            console.log('Credits background shown, waiting for introduction...');
            
            // Wait 2 seconds, then start credits rolling from bottom with music
            setTimeout(() => {
                // Make credits visible and start rolling up from their off-screen position
                creditsRoll.style.opacity = '1';
                creditsRoll.style.animation = 'creditsRoll 191s linear forwards'; // Slower to match full music duration
                
                // Start credits music simultaneously
                creditsMusic.volume = 0;
                creditsMusic.currentTime = 0;
                creditsMusic.play().catch(e => console.log('Credits music play prevented:', e));
                
                // Fade in credits music
                const fadeInInterval = setInterval(() => {
                    if (creditsMusic.volume < 0.4) {
                        creditsMusic.volume += 0.05;
                    } else {
                        creditsMusic.volume = 0.4;
                        clearInterval(fadeInInterval);
                    }
                }, 100);
                
                console.log('Credits roll and music started after background introduction!');
                
            }, 2000);
            
        }, 2000);
        
        // Show flying button after credits and music finish (2s fade + 2s intro + 80s credits = 84s, but wait for full music at 175s)
        setTimeout(() => {
            console.log('Credits finished, showing replay button');
            showFlyingButton();
        }, 175000);
    }
    
    function showFlyingButton() {
        const replayBtn = document.getElementById('credits-replay-btn');
        replayBtn.classList.remove('hidden');
        
        // Add click handler
        replayBtn.onclick = () => {
            console.log('Replay button clicked!');
            creditsActive = false;
            creditsMusic.pause();
            creditsMusic.currentTime = 0;
            renderStep('start');
        };
    }
    
    // Clear credits timer if user navigates away
    window.addEventListener('beforeunload', () => {
        if (creditsTimer) {
            clearTimeout(creditsTimer);
        }
        if (creditsMusic) {
            creditsMusic.pause();
        }
    });
});
