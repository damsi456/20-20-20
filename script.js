const startingMinutes = 20;
let time = startingMinutes * 60;
let intervalId = null;

const timerElement = document.getElementById("timer");

function updateTimer() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElement.innerHTML = `${minutes} : ${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(intervalId);
        intervalId = null;
        time = 0;
        timerElement.innerHTML = '00 : 00';
    } 
}

function startTimer() {
    if (intervalId !== null) return;
    intervalId = setInterval(updateTimer, 1000);
}

function resetTimer() {
    clearInterval(intervalId);
    intervalId = null;
    time = startingMinutes * 60;
    timerElement.innerHTML = `${startingMinutes} : 00`
}

document.getElementById("start-btn").onclick = startTimer;
document.getElementById("reset-btn").onclick = resetTimer;