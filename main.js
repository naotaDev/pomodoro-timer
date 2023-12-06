
// variables 
const clickSound = new Audio('./files/button_click.mp3')
const clickSound2 = new Audio('./files/button_click_2.wav')
const timeEndSound = new Audio('./files/time_end.wav')

const root = document.querySelector(':root')
root.setAttribute('class','pomodoro')

let timer;
let onBreak = false;
let onLongBreak = false;
let pomodoroCount = 0;

let minutes = 25;
let seconds = 0;
let minutesDisplay = document.querySelector('#minutes')
let secondsDisplay = document.querySelector('#seconds')

// top buttons
const pomodoroTopButton = document.querySelector('#pom-btn')
const shortTopButton = document.querySelector('#shB-btn')
const longTopButton = document.querySelector('#lngB-btn')

pomodoroTopButton.setAttribute('class', 'indented')

// control buttons
const startButton = document.querySelector('.start-btn')
const stopButton = document.querySelector('.stop-btn')
const breakButton = document.querySelector('.break-btn')
const pomodoroButton = document.querySelector('.pomo-btn')

function controlButtonDisplay(controlButton) {
    if (controlButton === 'start') {
        startButton.setAttribute('style', 'display: flex')
        stopButton.setAttribute('style', 'display: none')
        breakButton.setAttribute('style', 'display: none')
        pomodoroButton.setAttribute('style', 'display: none')
    } else if (controlButton === 'stop') {
        startButton.setAttribute('style', 'display: none')
        stopButton.setAttribute('style', 'display: flex')
        breakButton.setAttribute('style', 'display: none')
        pomodoroButton.setAttribute('style', 'display: none')
    } else if (controlButton === 'break') {
        startButton.setAttribute('style', 'display: none')
        stopButton.setAttribute('style', 'display: none')
        breakButton.setAttribute('style', 'display: flex')
        pomodoroButton.setAttribute('style', 'display: none')
    } else if (controlButton === 'pomodoro') {
        startButton.setAttribute('style', 'display: none')
        stopButton.setAttribute('style', 'display: none')
        breakButton.setAttribute('style', 'display: none')
        pomodoroButton.setAttribute('style', 'display: flex')
    }
}

// mode functions
function updateInitialDisplay(mode) {
    clearInterval(timer)
    if (mode === 'pomodoro') {
        minutes = 25;
        seconds = 0;
        minutesDisplay.textContent = minutes
        secondsDisplay.textContent = seconds + '0'
    } else if (mode === 'shortBreak') {
        minutes = 5;
        seconds = 0;
        minutesDisplay.textContent = '0' + minutes
        secondsDisplay.textContent = seconds + '0'
    } else if (mode === 'longBreak') {
        minutes = 15;
        seconds = 0;
        minutesDisplay.textContent = minutes
        secondsDisplay.textContent = seconds + '0'
    }
}

function displayMode(mode) {
    if (mode === 'pomodoro') {
        root.setAttribute('class','pomodoro')
        pomodoroTopButton.setAttribute('class','indented')
        shortTopButton.removeAttribute('class','indented')
        longTopButton.removeAttribute('class','indented')
    } else if (mode === 'shortBreak') {
        root.setAttribute('class','short')
        pomodoroTopButton.removeAttribute('class', 'indented')
        shortTopButton.setAttribute('class','indented')
        longTopButton.removeAttribute('class','indented')
    } else if (mode === 'longBreak') {
        root.setAttribute('class','long')
        pomodoroTopButton.removeAttribute('class', 'indented')
        shortTopButton.removeAttribute('class','indented')
        longTopButton.setAttribute('class','indented')
    }
}

function changeMode(mode) {
    if (mode === 'pomodoro') {
        displayMode('pomodoro')
        updateInitialDisplay('pomodoro')
        controlButtonDisplay('start')
    } else if (mode === 'shortBreak') {
        onBreak = true
        displayMode('shortBreak')
        updateInitialDisplay('shortBreak')
        controlButtonDisplay('start')
    } else if (mode === 'longBreak') {
        displayMode('longBreak')
        updateInitialDisplay('longBreak')
        controlButtonDisplay('start')
    }
}

function updateDisplay() {
    if (minutes < 10) {
        minutesDisplay.textContent = '0' + minutes
        if (seconds < 10) {
            secondsDisplay.textContent = '0' + seconds
        } else {
            secondsDisplay.textContent = seconds
        }
    } else if (seconds < 10) {
        minutesDisplay.textContent = minutes
        secondsDisplay.textContent = '0' + seconds
    } else {
        minutesDisplay.textContent = minutes
        secondsDisplay.textContent = seconds
    }

}

// event listeners
pomodoroTopButton.addEventListener('click',()=>{
    changeMode('pomodoro')
    clickSound2.play()
})

shortTopButton.addEventListener('click',()=>{
    changeMode('shortBreak')
    clickSound2.play()
})

longTopButton.addEventListener('click',()=>{
    changeMode('longBreak')
    clickSound2.play()
})

startButton.addEventListener('click',()=>{
    controlButtonDisplay('stop')
    clickSound.play()
    // timer functionality
    timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
            timeEndSound.play()
           if (onBreak === false && onLongBreak === false) {
               pomodoroCount += 1
               clearInterval(timer)
               if (pomodoroCount < 4) {
                   controlButtonDisplay('break') 
                   onBreak = true
               } else if (pomodoroCount === 4) {
                   controlButtonDisplay('break') 
                   pomodoroCount = 0
                   onLongBreak = true;
               }
           } else if (onBreak === true || onLongBreak === true) {
               clearInterval(timer)
               controlButtonDisplay('pomodoro') 
               onBreak = false
               onLongBreak = false
           }

        } else if (seconds === 0) {
            minutes -= 1
            seconds = 59
            updateDisplay()
        } else {
            seconds -= 1
            updateDisplay()
        }

    }, 0.1);
})

stopButton.addEventListener('click',()=>{
    clickSound.play()
    controlButtonDisplay('start')
    clearInterval(timer)
})

breakButton.addEventListener('click',()=>{
    clickSound.play()
    controlButtonDisplay('start')
    if (onLongBreak === true) {
        changeMode('longBreak')
    } else {
        changeMode('shortBreak')
    }
})

pomodoroButton.addEventListener('click',()=>{
    clickSound.play()
    controlButtonDisplay('start')
    changeMode('pomodoro')
})