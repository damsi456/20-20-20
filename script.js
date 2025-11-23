const startingMinutes = 1;
const breakTime = 20; // seconds
let time = startingMinutes * 60;
let intervalId = null;

let isWorkTime = true
let sessionsCompleted = 0;

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

        // If work time finished, start break
        if (isWorkTime) {
            isWorkTime = false;
            time = breakTime;

            document.querySelector('.bg-blue-100 p').textContent = 'Break Time';
            document.querySelector('.bg-blue-100').className = 'bg-green-100 rounded-full py-2 px-5';
            document.querySelector('.text-blue-700').className = 'text-green-700 font-semibold text-base sm:text-lg tracking-wide';
            document.querySelector('.uppercase.text-gray-500').textContent = 'Rest Your Eyes';

            // Start break timer
            intervalId = setInterval(updateTimer, 1000);
        } else {
            // Break time finished, back to the work time
            sessionsCompleted++;
            updateAnalytics();
            isWorkTime = true;
            time = startingMinutes * 60 // Set to work time again
            
            document.querySelector('.bg-green-100 p').textContent = 'Work Time';
            document.querySelector('.bg-green-100').className = 'bg-blue-100 rounded-full py-2 px-5';
            document.querySelector('.text-green-700').className = 'text-blue-700 font-semibold text-base sm:text-lg tracking-wide';
            document.querySelector('.uppercase.text-gray-500').textContent = 'Time to focus';

            // Start work timer
            intervalId = setInterval(updateTimer, 1000);
        }
    }
}

function updateAnalytics() {
    // Update sessions completed
    document.querySelector('.text-4xl.font-bold.text-cyan-800').textContent = sessionsCompleted;
    
    // Update total time saved (sessions * 20 seconds)
    const totalTimeSaved = sessionsCompleted * 20;
    document.querySelector('.text-2xl.font-bold.text-emerald-600').textContent = `${totalTimeSaved}s`;
}

function startTimer() {
    if (intervalId !== null) return;
    document.getElementById('start-btn').classList.add('hidden');
    document.getElementById('pause-btn').classList.remove('hidden');
    intervalId = setInterval(updateTimer, 1000);
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