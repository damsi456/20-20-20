const startingMinutes = 20;
let time = startingMinutes * 60;
let intervalId = null;

const timerElement = document.getElementById("timer");

function updateWorkTimer() {
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
        document.getElementById('start-btn').classList.remove('hidden');
        document.getElementById('pause-btn').classList.add('hidden');
    }
}

function startTimer() {
    if (intervalId !== null) return;
    document.getElementById('start-btn').classList.add('hidden');
    document.getElementById('pause-btn').classList.remove('hidden');
    intervalId = setInterval(updateWorkTimer, 1000);
}

function pauseTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById('start-btn').classList.remove('hidden');
        document.getElementById('pause-btn').classList.add('hidden');
        console.log("Timer paused.");
    }
}

function resetTimer() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = null;
    time = startingMinutes * 60;
    timerElement.innerHTML = `${startingMinutes} : 00`
    document.getElementById('start-btn').classList.remove('hidden');
    document.getElementById('pause-btn').classList.add('hidden');
}

document.getElementById("start-btn").onclick = startTimer;
document.getElementById("reset-btn").onclick = resetTimer;
document.getElementById("pause-btn").onclick = pauseTimer;