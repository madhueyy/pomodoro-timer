// Timer function
document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById("timer");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const startBtn = document.getElementById("start");
    const resetBtn = document.getElementById("reset");
    const goalNum = document.getElementById("goal-number");
    const editBtn = document.getElementById("edit-goal");
    const goalInput = document.getElementById("goal-input");
    const completed = document.getElementById("completed");
    const progressCircle = document.getElementById("circle");
    const containers = document.querySelectorAll('.container');
    const blueBtn = document.getElementById('blue');
    const orangeBtn = document.getElementById('orange');
    const pinkBtn = document.getElementById('pink');
    const greenBtn = document.getElementById('green');
    const bgPrimary = document.querySelector('.bg-primary');
    const bgTeal = document.querySelector('.bg-teal');
    const bgPurple = document.querySelector('.bg-purple');
    const radioBtns = document.querySelectorAll('input[type="radio"]');
    const interBubble = document.querySelector('.bg-interactive');

    let defaultTime = 1;
    let defaultGoal = 1;
    let countdown;
    let timeLeft = defaultTime * 60;
    let completedTime = 0;
    let isRunning = false;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();

    // Update timer text when adjusted/reset
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function stopTimer() {
        clearInterval(countdown);
        isRunning = false;
        startBtn.textContent = "START";
    }

    function startTimer() {
        if (isRunning) {
            stopTimer();
        } else {
            startBtn.textContent = "STOP";
            isRunning = true;

            countdown = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    isRunning = false;
                    startBtn.textContent = "START";
                    alert("Time completed!");
                    updateDaily(defaultTime);
                    resetTimer();
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(countdown);
        timeLeft = defaultTime * 60;
        updateTimerDisplay();
    }

    // Adjust timer's default time and display onto timer text
    function adjustTime(amount) {
        defaultTime += amount;
        if (defaultTime < 0) {
            defaultTime = 0;
        }

        timeLeft = defaultTime * 60;
        updateTimerDisplay();
    }

    function playSound() {
        let sound = new Audio('resources/ringtone.mp3');
        sound.play();
    }

    containers.forEach((container, index) => {
        container.addEventListener('click', () => {
            document.getElementById(`s${index + 1}`).checked = true;
        });
    });

    function editGoal() {
        goalNum.style.display = 'none';
        goalInput.style.display = 'block';
        goalInput.value = defaultGoal;
        goalInput.focus();
        editBtn.style.opacity = '0';
    }

    goalInput.addEventListener('blur', () => {
        updateGoal();
    });

    goalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateGoal();
        }
    });

    function updateGoal() {
        const newGoal = parseInt(goalInput.value);
        if (!isNaN(newGoal) && newGoal >= 1 && newGoal <= 9) {
            defaultGoal = newGoal;
            goalNum.textContent = newGoal;
        }
        editBtn.style.opacity = '1';
        goalInput.style.display = 'none';
        goalNum.style.display = 'block';
    }

    // Functions for changing colour themes
    function toBlue() {
        document.documentElement.style.backgroundColor = "#20126d";

        bgPrimary.style.backgroundColor = "#5680E9";
        bgTeal.style.backgroundColor = "#5AB9EA";
        bgPurple.style.backgroundColor = "#8860D0";

        timerDisplay.style.background = 'linear-gradient(217deg, #5680E9, #8860D0)';
        startBtn.style.background = 'linear-gradient(0.25turn, #5680E9, #5AB9EA)';
        resetBtn.style.background = 'linear-gradient(0.25turn, #5680E9, #5AB9EA)';
        
        radioBtns.forEach(radioBtn => {
            radioBtn.style.accentColor = '#8860D0';
        });
    }

    function toOrange() {
        document.documentElement.style.backgroundColor = "#bb3838";

        bgPrimary.style.backgroundColor = "#fc8253";
        bgTeal.style.backgroundColor = "#f1f07d";
        bgPurple.style.backgroundColor = "#ff96e5";

        timerDisplay.style.background = 'linear-gradient(217deg, #ff7139, #ff688e)';
        startBtn.style.background = 'linear-gradient(0.25turn, #fd9a29, #eed04b)';
        resetBtn.style.background = 'linear-gradient(0.25turn, #fd9a29, #eed04b)';
        
        radioBtns.forEach(radioBtn => {
            radioBtn.style.accentColor = '#ec6b44';
        });
    }

    function toPink() {
        document.documentElement.style.backgroundColor = "#bb386e";

        bgPrimary.style.backgroundColor = "#ff96e5";
        bgTeal.style.backgroundColor = "#ffffff";
        bgPurple.style.backgroundColor = "#fdbaba";

        timerDisplay.style.background = 'linear-gradient(217deg, #de3772, #fca2a6)';
        startBtn.style.background = 'linear-gradient(0.25turn, #fc5d95, #ff96e5)';
        resetBtn.style.background = 'linear-gradient(0.25turn, #fc5d95, #ff96e5)';
        
        radioBtns.forEach(radioBtn => {
            radioBtn.style.accentColor = '#de3772';
        });
    }

    function toGreen() {
        document.documentElement.style.backgroundColor = "#319135";

        bgPrimary.style.backgroundColor = "#b2fcb8";
        bgTeal.style.backgroundColor = "#a2cffc";
        bgPurple.style.backgroundColor = "#ffffff";

        timerDisplay.style.background = 'linear-gradient(217deg, #359455, #60d186)';
        startBtn.style.background = 'linear-gradient(-0.25turn, #b0ff8a, #3eb344)';
        resetBtn.style.background = 'linear-gradient(-0.25turn, #b0ff8a, #3eb344)';
        
        radioBtns.forEach(radioBtn => {
            radioBtn.style.accentColor = '#299459';
        });
    }

    // Increase and decrease timer by 5 mins
    increaseBtn.addEventListener("click", () => adjustTime(5));
    decreaseBtn.addEventListener("click", () => adjustTime(-1));
    // Start and reset timer
    startBtn.addEventListener("click", startTimer);
    resetBtn.addEventListener("click", resetTimer);
    // Edit goal
    editBtn.addEventListener("click", editGoal);
    // Colour theme settings
    blueBtn.addEventListener("click", toBlue);
    orangeBtn.addEventListener("click", toOrange);
    pinkBtn.addEventListener("click", toPink);
    greenBtn.addEventListener("click", toGreen);

    updateTimerDisplay();

    // Update daily goal after countdown completes
    function updateDaily(defaultTime) {
        completedTime += defaultTime;

        // If time is in hours
        if (completedTime % 60 === 0) {
            completed.textContent = "Completed: " + completedTime/60 + " hour(s)";
        // If time is in hours and mins
        } else if (completedTime > 60) {
            completed.textContent = "Completed: " + Math.floor(completedTime/60) + " hour(s)" 
            + completedTime%60 + " mins";
        // If time is in mins
        } else {
            completed.textContent = "Completed: " + completedTime + " mins";
        }

        // If completed total time reaches or goes over goal
        if (completedTime/60 >= defaultGoal) {
            progressCircle.style.background = "conic-gradient(#45af41 0% 100%, #e0e0e0 0% 100%)";
        } else {
            completedPercent = completedTime/(defaultGoal*60) * 100;
            progressCircle.style.background = `conic-gradient(#45af41 0% ${completedPercent}%, #e0e0e0 0% 100%)`;
        }
    }


});