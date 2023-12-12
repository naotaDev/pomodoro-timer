const modePomodoroBtn = document.querySelector('.mode-pomodoro')
const modeShortBtn = document.querySelector('.mode-short-break')
const modeLongBtn = document.querySelector('.mode-long-break')

const controlButtonStart = document.querySelector('.control-button-start')
const controlButtonPause = document.querySelector('.control-button-pause')
const controlButtonShort = document.querySelector('.control-button-short')
const controlButtonLong = document.querySelector('.control-button-long')
const controlButtonPomodoro = document.querySelector('.control-button-pomodoro')
const controlButtonResume = document.querySelector('.control-button-resume')

export default function buttonEffectDown(button) {
    if (button === 'pomodoro') {
        modePomodoroBtn.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    } else if (button === 'short') {
        modeShortBtn.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    } else if (button === 'long') {
        modeLongBtn.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    } else if (button === 'control-start') {
        controlButtonStart.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    } else if (button === 'control-pause') {
        controlButtonPause.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    } else if (button === 'control-short') {
        controlButtonShort.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    } else if (button === 'control-long') {
        controlButtonLong.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    } else if (button === 'control-pomodoro') {
        controlButtonPomodoro.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    } else if (button === 'control-resume') {
        controlButtonResume.setAttribute('style', 'box-shadow: 0px 6px 0px 2px #383838; position: relative; top: 5px;')
    }
}