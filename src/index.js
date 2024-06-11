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

    let defaultTime = 1;
    let defaultGoal = 1;
    let countdown;
    let timeLeft = defaultTime * 60;
    let completedTime = 0;
    let isRunning = false;

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

    // Increase and decrease timer by 5 mins
    increaseBtn.addEventListener("click", () => adjustTime(5));
    decreaseBtn.addEventListener("click", () => adjustTime(-1));
    // Start and reset timer
    startBtn.addEventListener("click", startTimer);
    resetBtn.addEventListener("click", resetTimer);
    // Edit goal
    editBtn.addEventListener("click", editGoal);

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
            progressCircle.style.background = "conic-gradient(rgb(108, 0, 162) 0% 100%, #e0e0e0 0% 100%)";
        } else {
            completedPercent = completedTime/(defaultGoal*60) * 100;
            progressCircle.style.background = `conic-gradient(rgb(108, 0, 162) 0% ${completedPercent}%, #e0e0e0 0% 100%)`;
        }
    }


});