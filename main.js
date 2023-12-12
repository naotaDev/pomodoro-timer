
// IMPORTS AND VARIABLES
import buttonEffectDown from "./modules/buttonEffectDown.js"
import buttonEffectUp from "./modules/buttonEffectUp.js"

const clickSound = new Audio('./files/button_click.mp3')
const clickSound2 = new Audio('./files/button_click_2.wav')
const timeEndSound = new Audio('./files/time_end.wav')

const root = document.querySelector(':root')

let pomodorBgImage = 'url(./files/pomodoro-blob.svg)' 
let shortBreakBgImage = 'url(./files/short-blob.svg)'
let longBreakBgImage = 'url(./files/long-blob.svg)'
const body = document.querySelector('body')

const modePomodoroBtn = document.querySelector('.mode-pomodoro')
const modeShortBtn = document.querySelector('.mode-short-break')
const modeLongBtn = document.querySelector('.mode-long-break')

const controlButtonStart = document.querySelector('.control-button-start')
const controlButtonPause = document.querySelector('.control-button-pause')
const controlButtonResume = document.querySelector('.control-button-resume')
const controlButtonShort = document.querySelector('.control-button-short')
const controlButtonLong = document.querySelector('.control-button-long')
const controlButtonPomodoro = document.querySelector('.control-button-pomodoro')

let pomodoros = 3;
let onShortBreak;
let onLongBreak;

// ONLOAD
window.addEventListener("load", () => {
    changeMode('pomodoro')
    buttonEffectUp('short')
    buttonEffectUp('long')
    buttonEffectDown('pomodoro')
});

// TIMER FUNCTIONS

let startTime;
let pauseStartTime;
let isTimerPaused = false;

let timerInterval;
let displayUpdateInterval;
let display = document.querySelector('.display');
let minutesToDisplay;
let secondsToDisplay;

let elapsedMinutes = 0;
let elapsedSeconds = 0;

let minutesToRun;
let secondsToRun;

// defines the timer and sets intervals
function timer() {
    secondsToRun = minutesToRun * 60
    
    timerInterval = setInterval(() => {
        if (!isTimerPaused) {
            let now = new Date().getTime();
            let elapsed;
            
            if (pauseStartTime) {
                elapsed = (now - pauseStartTime) / 1000;
                pauseStartTime = null;
            } else {
                elapsed = (now - startTime) / 1000;
            }

            elapsedSeconds = Math.trunc(elapsed);
            elapsedMinutes = Math.trunc(elapsedSeconds / 60);
        }
        if (secondsToRun === elapsedSeconds) {
            if (onShortBreak) {
                stopTimer()
                timeEndSound.play()
                controlButtonPause.setAttribute('style','display:none')
                controlButtonPomodoro.setAttribute('style','display:flex')
            } else if (onLongBreak) {
                stopTimer()
                timeEndSound.play()
                controlButtonPause.setAttribute('style','display:none')
                controlButtonPomodoro.setAttribute('style','display:flex')
            } else if (!onShortBreak && !onLongBreak) {
                pomodoros += 1;
                if (pomodoros === 4) {
                    pomodoros = 0
                    stopTimer()
                    timeEndSound.play()
                    controlButtonPause.setAttribute('style', 'display:none')
                    controlButtonStart.setAttribute('style','display:none')
                    controlButtonLong.setAttribute('style', 'display:flex')
                } else if (pomodoros < 4) {
                    console.log('im here!')
                    stopTimer()
                    timeEndSound.play()
                    controlButtonPause.setAttribute('style', 'display:none')
                    controlButtonShort.setAttribute('style', 'display:flex')
                }
            }
            

        }
    }, 100);

    displayUpdateInterval = setInterval(() => {
        let remainingSeconds = secondsToRun - elapsedSeconds;
        minutesToDisplay = Math.trunc(remainingSeconds / 60);
        secondsToDisplay = remainingSeconds % 60;

        let displayMinutes = minutesToDisplay < 10 ? '0' + minutesToDisplay : minutesToDisplay;
        let displaySeconds = secondsToDisplay < 10 ? '0' + secondsToDisplay : secondsToDisplay;

        display.textContent = displayMinutes + ' : ' + displaySeconds; 
    }, 1000);

}

// starts previously defined Timer()
function startTimer() {
    if (!startTime) {
        startTime = new Date().getTime();
        timer();
    }
}

function pauseTimer() {
    if (!isTimerPaused) {
        isTimerPaused = true;
        pauseStartTime = new Date().getTime();
    }
    clearInterval(displayUpdateInterval)
}

function resumeTimer() {
    if (isTimerPaused) {
        isTimerPaused = false;
        let now = new Date().getTime();
        let pauseDuration = (now - pauseStartTime) / 1000;
        startTime += pauseDuration * 1000;
        pauseStartTime = null;
    }
    timer()
}

function stopTimer() {
    clearInterval(timerInterval);
    clearInterval(displayUpdateInterval);
    display.textContent = '00:00'
    startTime = null;
    pauseStartTime = null;
    isTimerPaused = false;
}

// MODE CONTROLS
function changeMode(mode) {
    if (mode === 'pomodoro') {
        controlButtonStart.setAttribute('style','display:flex')
        controlButtonPause.setAttribute('style','display:none')
        controlButtonResume.setAttribute('style','display:none')
        controlButtonShort.setAttribute('style','display:none')
        controlButtonLong.setAttribute('style','display:none')
        controlButtonPomodoro.setAttribute('style','display:none')

        stopTimer()
        minutesToRun = 25;
        display.textContent = `${minutesToRun} : 00`
        root.setAttribute('class', 'colors-pomodoro')
        body.setAttribute('style',`background-image: ${pomodorBgImage}`)
    } else if (mode === 'short') {
        controlButtonStart.setAttribute('style', 'display:flex')
        controlButtonPause.setAttribute('style','display:none')
        controlButtonResume.setAttribute('style','display:none')
        controlButtonShort.setAttribute('style','display:none')
        controlButtonLong.setAttribute('style','display:none')
        controlButtonPomodoro.setAttribute('style','display:none')

        stopTimer()
        minutesToRun = 5;
        display.textContent = `0${minutesToRun} : 00`
        root.setAttribute('class','colors-short-break')
        body.setAttribute('style',`background-image: ${shortBreakBgImage}`)
    } else if (mode === 'long') {
        controlButtonStart.setAttribute('style', 'display:flex')
        controlButtonPause.setAttribute('style','display:none')
        controlButtonResume.setAttribute('style','display:none')
        controlButtonShort.setAttribute('style','display:none')
        controlButtonLong.setAttribute('style','display:none')
        controlButtonPomodoro.setAttribute('style','display:none')

        stopTimer()
        minutesToRun = 15;
        display.textContent = `${minutesToRun} : 00`
        root.setAttribute('class','colors-long-break')
        body.setAttribute('style',`background-image: ${longBreakBgImage}`)
    }
}; changeMode('pomodoro')

function switchMode(mode) {
    if (mode === 'pomodoro') {
        changeMode(mode)        
        changeMode('pomodoro')
        buttonEffectUp('short')
        buttonEffectUp('long')
        buttonEffectDown('pomodoro')
    } else if (mode === 'short') {
        changeMode(mode)        
        changeMode('short')
        buttonEffectUp('long')
        buttonEffectUp('pomodoro')
        buttonEffectDown('short')
    } else if (mode === 'long') {
        changeMode(mode)        
        changeMode('long')
        buttonEffectUp('pomodoro')
        buttonEffectUp('short')
        buttonEffectDown('long')
    }
}

// EVENT LISTENERS
modePomodoroBtn.addEventListener('click',()=>{
    clickSound2.play()
    switchMode('pomodoro') 
})

modeShortBtn.addEventListener('click',()=>{
    clickSound2.play()
    switchMode('short')
})

modeLongBtn.addEventListener('click',()=>{
    clickSound2.play()
    switchMode('long') 
})

// event listeners 

controlButtonStart.addEventListener('mousedown',()=>{
    clickSound.play()
    startTimer()
    buttonEffectDown('control-start')
    controlButtonStart.addEventListener('mouseup', () => {
        buttonEffectUp('control-start')
        controlButtonStart.setAttribute('style','display:none')
        controlButtonPause.setAttribute('style','display:flex')
    })
})

controlButtonPause.addEventListener('mousedown',()=>{
    clickSound.play()
    pauseTimer()
    buttonEffectDown('control-pause')
    controlButtonPause.addEventListener('mouseup', () => {
        buttonEffectDown('control-pause')
        controlButtonPause.setAttribute('style', 'display:none')
        controlButtonResume.setAttribute('style','display:flex')
    })
})

controlButtonResume.addEventListener('mousedown',() => {
    clickSound.play()
    resumeTimer()
    buttonEffectDown('control-resume')
    controlButtonResume.addEventListener('mouseup',() => {
        buttonEffectUp('control-resume')
        controlButtonResume.setAttribute('style', 'display:none')
        controlButtonPause.setAttribute('style','display:flex')
    })
})

controlButtonShort.addEventListener('mousedown',()=>{
    clickSound.play()
    onShortBreak = true;
    buttonEffectDown('control-short')
    controlButtonShort.addEventListener('mouseup',()=>{
        buttonEffectUp('control-short')
        switchMode('long')
        controlButtonShort.setAttribute('style', 'display:none')
        controlButtonStart.setAttribute('style','display:flex')
    })
})

controlButtonPomodoro.addEventListener('mousedown',()=>{
    clickSound.play()
    onShortBreak = false;
    onLongBreak = false;
    buttonEffectDown('control-pomodoro')
    controlButtonPomodoro.addEventListener('mouseup',()=>{
        buttonEffectUp('control-pomodoro')
        switchMode('pomodoro')
        controlButtonPomodoro.setAttribute('style', 'display:none')
        controlButtonStart.setAttribute('style','display:flex')
    })
})


controlButtonLong.addEventListener('mousedown',()=>{
    console.log('im here!!')
    clickSound.play()
    onLongBreak = true;
    buttonEffectDown('control-long')
    controlButtonLong.addEventListener('mouseup',()=>{
        switchMode('short') 
        buttonEffectUp('control-long')
        controlButtonLong.setAttribute('style', 'display:none')
        controlButtonStart.setAttribute('style','display:flex')
    })
})
