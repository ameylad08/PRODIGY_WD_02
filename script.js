let startTime, updatedTime, difference, tInterval, running = false, lapCounter = 1;
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startPauseBtn.innerHTML = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startPauseBtn.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startPauseBtn.innerHTML = 'Start';
    difference = 0;
    display.innerHTML = '00:00:00.000';
    lapsList.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter++}: ${display.innerHTML}`;
        lapsList.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 100) ? '0' + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? '00' + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
