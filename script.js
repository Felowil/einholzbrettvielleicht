
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
        'memory-match-game-page': document.getElementById('memory-match-game-page'),
        'mini-games-victory-page': document.getElementById('mini-games-victory-page'),
        'game-disappointed-page': document.getElementById('game-disappointed-page'),
        'game-convince-attempt-page': document.getElementById('game-convince-attempt-page'),
        'game-not-convinced-page': document.getElementById('game-not-convinced-page'),
        'hard-mode-transition-page': document.getElementById('hard-mode-transition-page'),
        'hard-quiz-page': document.getElementById('hard-quiz-page'),
        'hard-game-over-page': document.getElementById('hard-game-over-page'),
        'hard-mode-victory-page': document.getElementById('hard-mode-victory-page'),
        'final-countdown-page': document.getElementById('final-countdown-page'),
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
    const gamingMusic = document.getElementById('gaming-music');
    const gameover2Sound = document.getElementById('gameover2-sound');
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
    const buyTime100 = document.getElementById('buy-time-100');
    const buyTime300 = document.getElementById('buy-time-300');
    const buySlowMode = document.getElementById('buy-slow-mode');

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
    
    // Mini-game state
    let miniGameActive = false;
    let clickChallengeInterval;
    let mathChallengeInterval;
    let clickChallengeClicks = 0;
    let miniGameCooldown = false;
    let miniGamesPlayed = 0; // Track how many games played
    let maxMiniGames = 3; // Maximum number of mini-games allowed
    let playedGameTypes = []; // Track which game types have been played
    let turboModeActive = false; // Turbo mode makes countdown go faster
    
    // Shop pricing state - increases after each purchase
    let shopPrices = {
        skip50: 150,  // Increased from 80
        skip100: 300,  // Increased from 150
        skip200: 500,  // Increased from 250
        turbo: 600,   // Increased from 300
        time100: 200,  // Increased from 50 (much more expensive to add time)
        time300: 450,  // Increased from 120
        slowMode: 400  // Increased from 200
    };
    let shopPurchaseCounts = {
        skip50: 0,
        skip100: 0,
        skip200: 0,
        turbo: 0,
        time100: 0,
        time300: 0,
        slowMode: 0
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
            music: null, // keep music stopped on start
            onLoad: null,
            buttons: {
                'start-quiz-btn': () => renderStep('quiz'),
                'skip-quiz-btn': () => renderStep('idea-question'),
                'skip-to-countdown-error-btn': () => {
                    // Jump directly to countdown error sequence
                    renderStep('countdown');
                    // Wait a bit then trigger the error part of countdown
                    setTimeout(() => {
                        const countdownDisplay = document.getElementById('countdown-display');
                        countdownDisplay.textContent = 'ERROR 404';
                        countdownDisplay.className = 'countdown-style-error';
                        document.body.classList.remove('countdown-active');
                        document.body.classList.add('error-active');
                        countdownMusic.pause();
                        errorSound.play().catch(e => console.log('Error sound play prevented:', e));
                        
                        // Continue with the error sequence
                        setTimeout(() => {
                            countdownDisplay.textContent = 'SYSTEM FAILURE';
                            setTimeout(() => {
                                countdownDisplay.textContent = '...';
                                setTimeout(() => {
                                    countdownMusic.pause();
                                    errorSound.pause();
                                    document.body.classList.remove('error-active');
                                    setTimeout(() => {
                                        renderStep('countdown-retry');
                                    }, 1000);
                                }, 2000);
                            }, 2000);
                        }, 3000);
                    }, 500);
                },
                'skip-to-countdown2-btn': () => renderStep('countdown2'),
                'skip-to-relief-btn': () => renderStep('relief'),
                'skip-to-game-suggestions-btn': () => renderStep('game-suggestions'),
                'skip-to-hard-victory-btn': () => renderStep('hard-mode-victory')
            }
        },
        'quiz': {
            page: 'quiz-page',
            background: 'default',
            music: 'happy-birthday', // play happy birthday music during quiz
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
            onLoad: () => startCountdown()
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
                'restart-quiz-btn1': () => renderStep('quiz') // Restart quiz
            }
        },
        'dead-end-second-thoughts': {
            page: 'dead-end-second-thoughts-page',
            background: 'default',
            music: null,
            onLoad: null,
            buttons: {
                'restart-quiz-btn2': () => renderStep('quiz') // Restart quiz
            }
        },
        'dead-end-final-doubt': {
            page: 'dead-end-final-doubt-page',
            background: 'default',
            music: null,
            onLoad: null,
            buttons: {
                'restart-quiz-btn3': () => renderStep('quiz') // Restart quiz
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
                'restart-game-btn': () => renderStep('start')
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
            },
            buttons: {} // No buttons - end of game
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
                'hard-game-over-restart-btn': () => renderStep('quiz')
            }
        },
        'hard-mode-victory': {
            page: 'hard-mode-victory-page',
            background: 'golden-victory',
            music: 'hard-mode-victory',
            onLoad: null,
            buttons: {
                'hard-victory-continue-btn': () => renderStep('final-countdown')
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
            background: 'default',
            music: 'game-suggestion',
            onLoad: () => initMiniGamesChallenge(),
            buttons: {
                'start-mini-games-btn': () => renderStep('tic-tac-toe-game'),
                'mini-games-back-btn': () => renderStep('game-suggestions')
            }
        },
        'tic-tac-toe-game': {
            page: 'tic-tac-toe-game-page',
            background: 'default',
            music: 'gaming',
            onLoad: () => initTicTacToe(),
            buttons: {
                'ttt-give-up-btn': () => {
                    const confirmGiveUp = confirm(
                        '🤔 Bist du dir sicher?\n\n' +
                        'Wenn du aufgibst, wirst du zurück zum allerersten Anfang geschickt!\n\n' +
                        '💔 Du verlässt die Mini-Games Challenge komplett.\n\n' +
                        'Wirklich aufgeben?'
                    );
                    
                    if (confirmGiveUp) {
                        gamingMusic.pause();
                        renderStep('start');
                    }
                }
            }
        },
        'rock-paper-scissors-game': {
            page: 'rock-paper-scissors-game-page',
            background: 'default', 
            music: 'gaming',
            onLoad: () => initRockPaperScissors(),
            buttons: {}
        },
        'memory-match-game': {
            page: 'memory-match-game-page',
            background: 'default',
            music: 'gaming', 
            onLoad: () => initMemoryMatch(),
            buttons: {}
        },
        'mini-games-victory': {
            page: 'mini-games-victory-page',
            background: 'golden-victory',
            music: 'hard-mode-victory',
            onLoad: null,
            buttons: {
                'mini-victory-final-countdown-btn': () => renderStep('final-countdown')
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
            case 'final-countdown':
                document.body.classList.add('final-countdown-active');
                break;
            case 'final':
                document.body.classList.add('final-reveal-active');
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
                    // Replace the listener by cloning the node to remove old listeners
                    const newBtn = btnElement.cloneNode(true);
                    btnElement.parentNode.replaceChild(newBtn, btnElement);
                    newBtn.addEventListener('click', () => {
                        console.log(`Button clicked: ${btnId}`);
                        step.buttons[btnId]();
                    });
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
            { display: '1/16', duration: 2000, className: 'countdown-style-fraction' },
            { display: '1/32', duration: 2000, className: 'countdown-style-fraction' },
            { display: '1/64', duration: 1800, className: 'countdown-style-fraction' },
            { display: '1/128', duration: 1800, className: 'countdown-style-fraction' },
            { display: '0,1', duration: 1500, className: 'countdown-style-fraction' },
            { display: '0,01', duration: 1500, className: 'countdown-style-fraction' },
            { display: '0,001', duration: 1500, className: 'countdown-style-fraction' },
            { display: 'fast da...', duration: 2000, className: 'countdown-style-interjection' },
            { display: 'oh musik wieder anmachen....', duration: 2500, className: 'countdown-style-interjection' },
            { display: '0,0001', duration: 1200, className: 'countdown-style-fraction' },
            { display: 'SO NAH!', duration: 1500, className: 'countdown-style-interjection' },
            { display: '0,00001', duration: 1000, className: 'countdown-style-fraction' },
            { display: 'GLEICH!', duration: 1500, className: 'countdown-style-interjection' },
            { display: '...', duration: 3000, className: 'countdown-style-interjection' },
            { display: '0', duration: 2000, className: 'countdown-style-0' },
            { display: 'ERROR 404', duration: 3000, className: 'countdown-style-error' },
            { display: 'SYSTEM FAILURE', duration: 2000, className: 'countdown-style-error' },
            { display: '...', duration: 2000, className: 'countdown-style-error' }
        ];
        
        let currentIndex = 0;
        
        const countdownStep = () => {
            if (currentIndex < countdownSequence.length) {
                const current = countdownSequence[currentIndex];
                countdownDisplay.textContent = current.display;
                countdownDisplay.className = current.className;
                
                // Check if we've reached the error messages
                if (current.display === 'ERROR 404') {
                    // Switch to red background and play error sound
                    document.body.classList.remove('countdown-active');
                    document.body.classList.add('error-active');
                    countdownMusic.pause();
                    errorSound.play().catch(e => console.log('Error sound play prevented:', e));
                }
                
                currentIndex++;
                countdownInterval = setTimeout(countdownStep, current.duration);
            } else {
                // Stop all sounds and go to retry page
                countdownMusic.pause();
                errorSound.pause();
                // Reset background for retry page
                document.body.classList.remove('error-active');
                setTimeout(() => {
                    renderStep('countdown-retry');
                }, 1000);
            }
        };
        countdownStep();
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
            if (!miniGameActive && !miniGameCooldown && !starsDisplay.classList.contains('hidden') && miniGamesPlayed < maxMiniGames && Math.random() < 0.02) {
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
            top: 50%;
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
            { display: '...REBOOTING...', duration: 1000, className: 'countdown-style-error', showProgress: true }
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
        // Hide countdown display and show progress bar
        countdown2Display.classList.add('hidden');
        rebootProgressContainer.classList.remove('hidden');
        
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
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random progress between 5-20%
            
            if (progress >= 100) {
                progress = 100;
                rebootProgressFill.style.width = '100%';
                rebootProgressText.textContent = progressMessages[progressMessages.length - 1];
                
                clearInterval(progressInterval);
                
                // After completion, go to relief page
                setTimeout(() => {
                    errorSound.pause();
                    document.body.classList.remove('error-active');
                    rebootProgressContainer.classList.add('hidden');
                    countdown2Display.classList.remove('hidden');
                    renderStep('relief');
                }, 2000);
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
        
        // If no games available, don't start any
        if (availableGames.length === 0) {
            return;
        }
        
        // Pick a random available game
        const gameType = availableGames[Math.floor(Math.random() * availableGames.length)];
        playedGameTypes.push(gameType);
        
        if (gameType === 'click') {
            startClickChallenge();
        } else {
            startMathChallenge();
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
    
    function startMiniGameCooldown() {
        miniGameCooldown = true;
        // 30-60 second cooldown between mini-games
        setTimeout(() => {
            miniGameCooldown = false;
        }, Math.random() * 30000 + 30000);
    }

    // --- GOLD SHOP ---
    function setupStarsShop() {
        buySkip50.onclick = () => buySkip(50, 'skip50');
        buySkip100.onclick = () => buySkip(100, 'skip100');
        buySkip200.onclick = () => buySkip(200, 'skip200');
        buyTurbo.onclick = () => buyTurboMode();
        buyTime100.onclick = () => buyTime(100, 'time100');
        buyTime300.onclick = () => buyTime(300, 'time300');
        buySlowMode.onclick = () => handleBuySlowMode();
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
            
            showStarsBonus(`⚡ -${seconds} Sekunden! Schneller zu 0! (${totalShopPurchases}/${maxShopPurchases})`);
            updateShopButtons();
        } else {
            showStarsBonus('Nicht genug Sterne! ⭐');
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
            showStarsBonus('Nicht genug Sterne! ⭐');
        }
    }
    
    function updateShopButtons() {
        const purchaseLimitReached = totalShopPurchases >= maxShopPurchases;
        
        // Update button text with current prices
        buySkip50.textContent = `⚡ -50 Sekunden (${shopPrices.skip50} Gold)`;
        buySkip100.textContent = `⚡ -100 Sekunden (${shopPrices.skip100} Gold)`;
        buySkip200.textContent = `⚡ -200 Sekunden (${shopPrices.skip200} Gold)`;
        buyTime100.textContent = `⏳ +100 Sekunden (${shopPrices.time100} Gold)`;
        buyTime300.textContent = `⏳ +300 Sekunden (${shopPrices.time300} Gold)`;
        
        // Update button availability (either not enough gold OR purchase limit reached)
        buySkip50.disabled = playerStars < shopPrices.skip50 || purchaseLimitReached;
        buySkip100.disabled = playerStars < shopPrices.skip100 || purchaseLimitReached;
        buySkip200.disabled = playerStars < shopPrices.skip200 || purchaseLimitReached;
        buyTime100.disabled = playerStars < shopPrices.time100 || purchaseLimitReached;
        buyTime300.disabled = playerStars < shopPrices.time300 || purchaseLimitReached;
        
        updateTurboButton();
        updateSlowModeButton();
        
        // Show purchase counter in shop header
        if (starsShop && !starsShop.classList.contains('hidden')) {
            const shopTitle = starsShop.querySelector('h4');
            if (shopTitle) {
                shopTitle.textContent = `⭐ Sterne Shop - Schneller zu 0! (${totalShopPurchases}/${maxShopPurchases})`;
            }
        }
    }
    
    function updateSlowModeButton() {
        const purchaseLimitReached = totalShopPurchases >= maxShopPurchases;
        if (slowModeActive) {
            buySlowMode.disabled = true;
            buySlowMode.textContent = '🐌 Slow Mode aktiv';
            buySlowMode.style.background = '#6c757d';
        } else {
            buySlowMode.disabled = playerStars < shopPrices.slowMode || purchaseLimitReached;
            buySlowMode.textContent = `🐌 Slow Mode (${shopPrices.slowMode} Gold)`;
            buySlowMode.style.background = '#6c757d';
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
            buyTurbo.textContent = `🚀 Turbo Mode (${shopPrices.turbo} Gold)`;
            buyTurbo.style.background = '#28a745';
        }
    }
    
    function buyTime(seconds, priceKey) {
        const cost = shopPrices[priceKey];
        if (totalShopPurchases >= maxShopPurchases) {
            showStarsBonus('Maximale Anzahl Einkäufe erreicht! (3/3)');
            return;
        }
        if (playerStars >= cost) {
            playerStars -= cost;
            countdown2Value += seconds;
            updateStarsDisplay();
            updateCountdown2Display();
            
            // Increase purchase count and price for next time
            totalShopPurchases++;
            shopPurchaseCounts[priceKey]++;
            shopPrices[priceKey] = Math.floor(shopPrices[priceKey] * 1.4); // 40% price increase
            
            showStarsBonus(`⏳ +${seconds} Sekunden! Mehr Zeit! (${totalShopPurchases}/${maxShopPurchases})`);
            updateShopButtons();
        } else {
            showStarsBonus('Nicht genug Sterne! ⭐');
        }
    }
    
    function handleBuySlowMode() {
        const cost = shopPrices.slowMode;
        if (totalShopPurchases >= maxShopPurchases) {
            showStarsBonus('Maximale Anzahl Einkäufe erreicht! (3/3)');
            return;
        }
        if (playerStars >= cost && !slowModeActive) {
            playerStars -= cost;
            slowModeActive = true;
            
            // Increase slow mode price
            totalShopPurchases++;
            shopPurchaseCounts.slowMode++;
            shopPrices.slowMode = Math.floor(shopPrices.slowMode * 2); // Double price
            
            updateStarsDisplay();
            showStarsBonus(`🐌 Slow Mode aktiv! Countdown geht langsamer! (${totalShopPurchases}/${maxShopPurchases})`);
            updateSlowModeButton();
            updateShopButtons();
        } else if (slowModeActive) {
            showStarsBonus('Slow Mode bereits aktiv! 🐌');
        } else {
            showStarsBonus('Nicht genug Sterne! ⭐');
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
            brutal_question: "💀 ZAHLEN DER VERDAMMNIS 💀\n\nDrei Würfel fallen perfekt - multipliziere das Ergebnis mit der Anzahl der Elemente,\nSubtrahiere die Finger deiner beiden Hände,\nAddiere das Jahr deiner Geburt,\nSubtrahiere das Doppelte des Tages, an dem deine Liebe geboren wurde im letzten Monat des Jahres.\n\nWelche Zahl bin ich? 💀",
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
        // Balanced AI for ~50% win rate: 50% chance to play optimally, 50% random
        const shouldPlayOptimally = Math.random() < 0.5;
        
        if (shouldPlayOptimally) {
            // Try to win
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
            
            // Try to block player (only 70% of the time)
            if (Math.random() < 0.7) {
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
            
            // Take center if available
            if (ticTacToeBoard[4] === '') return 4;
        }
        
        // Random move (either because AI chose random or fell through strategic logic)
        const availableSpots = ticTacToeBoard.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        return availableSpots[Math.floor(Math.random() * availableSpots.length)];
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
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
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
            roundResult = 'Ich gewinne die Runde!';
        }
        
        // Update scores
        document.getElementById('rps-player-score').textContent = rpsPlayerScore;
        document.getElementById('rps-computer-score').textContent = rpsComputerScore;
        document.getElementById('rps-status').textContent = roundResult;
        
        rpsRound++;
        
        // Check for game end (best of 3)
        if (rpsPlayerScore === 2 || rpsComputerScore === 2) {
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
        const won = rpsPlayerScore === 2;
        const message = won ? 'Du hast gewonnen! 🎉' : 'Ich habe gewonnen! 😈';
        
        document.getElementById('rps-status').textContent = message;
        document.getElementById('rps-result').classList.remove('hidden');
        document.getElementById('rps-result-text').textContent = message;
        
        if (won) {
            // Player won - continue to final game
            miniGamesProgress = 2;
            document.getElementById('rps-continue-btn').classList.remove('hidden');
            document.getElementById('rps-restart-challenge-btn').classList.add('hidden');
            
            document.getElementById('rps-continue-btn').onclick = () => {
                renderStep('memory-match-game');
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
    
    // MEMORY MATCH GAME
    function initMemoryMatch() {
        // Reset game state
        memoryCards = [];
        memoryFlippedCards = [];
        memoryAttempts = 0;
        memoryPairs = 0;
        
        // Update UI
        document.getElementById('memory-attempts').textContent = '0';
        document.getElementById('memory-pairs').textContent = '0';
        document.getElementById('memory-status').textContent = 'Klicke auf die Karten!';
        document.getElementById('memory-result').classList.add('hidden');
        
        // Create card deck (6 pairs)
        const symbols = ['🎯', '🎮', '🎵', '🎪', '🎨', '🎭'];
        const cardDeck = [...symbols, ...symbols];
        shuffleArray(cardDeck);
        
        // Create card elements
        const memoryBoard = document.getElementById('memory-board');
        memoryBoard.innerHTML = '';
        
        cardDeck.forEach((symbol, index) => {
            const card = document.createElement('button');
            card.style.cssText = `
                width: 80px; 
                height: 80px; 
                font-size: 2em; 
                background: #6c757d; 
                border: 2px solid #333; 
                cursor: pointer;
                border-radius: 8px;
            `;
            card.textContent = '❓';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.onclick = () => flipMemoryCard(index);
            memoryBoard.appendChild(card);
            
            memoryCards.push({
                symbol: symbol,
                flipped: false,
                matched: false,
                element: card
            });
        });
    }
    
    function flipMemoryCard(index) {
        const card = memoryCards[index];
        
        // Don't flip if already flipped or matched, or if 2 cards already flipped
        if (card.flipped || card.matched || memoryFlippedCards.length >= 2) return;
        
        // Flip card
        card.flipped = true;
        card.element.textContent = card.symbol;
        card.element.style.background = '#28a745';
        memoryFlippedCards.push(index);
        
        // Check if 2 cards are flipped
        if (memoryFlippedCards.length === 2) {
            memoryAttempts++;
            document.getElementById('memory-attempts').textContent = memoryAttempts;
            
            setTimeout(() => checkMemoryMatch(), 1000);
        }
    }
    
    function checkMemoryMatch() {
        const [index1, index2] = memoryFlippedCards;
        const card1 = memoryCards[index1];
        const card2 = memoryCards[index2];
        
        if (card1.symbol === card2.symbol) {
            // Match found
            card1.matched = true;
            card2.matched = true;
            card1.element.style.background = '#FFD700';
            card2.element.style.background = '#FFD700';
            memoryPairs++;
            document.getElementById('memory-pairs').textContent = memoryPairs;
            
            // Check for game completion
            if (memoryPairs === 6) {
                endMemoryGame(true);
            }
        } else {
            // No match - flip cards back
            card1.flipped = false;
            card2.flipped = false;
            card1.element.textContent = '❓';
            card2.element.textContent = '❓';
            card1.element.style.background = '#6c757d';
            card2.element.style.background = '#6c757d';
        }
        
        // Reset flipped cards
        memoryFlippedCards = [];
        
        // Check for failure (too many attempts)
        if (memoryAttempts >= 15 && memoryPairs < 6) {
            endMemoryGame(false);
        }
    }
    
    function endMemoryGame(won) {
        // Disable all cards
        memoryCards.forEach(card => {
            if (!card.matched) {
                card.element.disabled = true;
            }
        });
        
        const message = won ? 'Alle Paare gefunden! 🎉' : 'Zu viele Versuche! 😔';
        document.getElementById('memory-status').textContent = message;
        document.getElementById('memory-result').classList.remove('hidden');
        document.getElementById('memory-result-text').textContent = message;
        
        if (won) {
            // Player won all mini games!
            miniGamesProgress = 3;
            document.getElementById('memory-continue-btn').classList.remove('hidden');
            document.getElementById('memory-restart-challenge-btn').classList.add('hidden');
            
            document.getElementById('memory-continue-btn').onclick = () => {
                renderStep('mini-games-victory');
            };
        } else {
            // Player lost - stop gaming music and play game over sound
            gamingMusic.pause();
            gameover2Sound.play().catch(e => console.log('Game over 2 sound play prevented:', e));
            
            // Player lost - restart challenge
            document.getElementById('memory-restart-challenge-btn').classList.remove('hidden');
            document.getElementById('memory-continue-btn').classList.add('hidden');
            
            document.getElementById('memory-restart-challenge-btn').onclick = () => {
                miniGamesProgress = 0;
                renderStep('tic-tac-toe-game');
            };
        }
    }

    // Setup music volume
    backgroundMusic.volume = 0.3;

    // Initial Load
    createStars();
    // Don't start music automatically - let the quiz step handle it
    backgroundMusic.pause();
    
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('DOM ready, about to render start step');
        console.log('Landing page element:', pageElements['landing-page']);
        renderStep('start');
    }, 100);
});
