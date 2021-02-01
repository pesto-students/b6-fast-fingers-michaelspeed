import {Subject, timer} from "rxjs";
import data from '../data/dictionary.json'
import {map, takeWhile} from "rxjs/operators";

const subject = new Subject();

const initialState = {
    state: 'init',
    timer: 0,
    difficulty: 0,
    easy: [],
    hard: [],
    medium: [],
    usedWords: [],
    currentWord: '',
    initialPlay: false,
    attempts: 0,
    loader: 250,
    currentScore: 0,
    finish: false
}

let state = initialState;

// eslint-disable-next-line no-unused-vars
let timerSubs

const playStore = {
    init: () => {
        if (state.state === 'init') {
            state = {
                ...state,
                timer: 0,
                difficulty: 0,
                state: 'resting'
            }
            subject.next(state)
        }
    },
    subscribe: setState => subject.subscribe(setState),
    updateTimer: time => {
        state = {
            ...state,
            timer: time
        }
        subject.next(state)
    },
    updateDifficulty: difficulty => {
        let easy = []
        let medium = []
        let hard = []
        switch (difficulty) {
            case 0:
                const easyWords = data.filter(word => word.length <= 4)
                easy = [...easyWords]
                break;
            case 1:
                const mediumWords = data.filter(word => (word.length >= 5 && word.length <= 8))
                medium = [...mediumWords]
                break;
            default:
                const hardWords = data.filter(word => word.length > 8)
                hard = [...hardWords]
                break;
        }
        state = {
            ...state,
            easy,
            medium,
            hard,
            difficulty
        }
        subject.next(state)
        playStore.setCurrentWord()
    },
    setCurrentWord: () => {
        let diff
        switch (state.difficulty) {
            case 0:
                diff = state.easy.filter(x => !state.usedWords.includes(x))
                state = {
                    ...state,
                    currentWord: diff[Math.floor(Math.random() * diff.length)]
                }
                break;
            case 1:
                diff = state.medium.filter(x => !state.usedWords.includes(x))
                state = {
                    ...state,
                    currentWord: diff[Math.floor(Math.random() * diff.length)]
                }
                break;
            default:
                diff = state.hard.filter(x => !state.usedWords.includes(x))
                state = {
                    ...state,
                    currentWord: diff[Math.floor(Math.random() * diff.length)]
                }
                break;
        }
        subject.next(state);
    },
    checkNewWord: (word) => {
        let usedWords = [...state.usedWords, word]
        let diff
        switch (state.difficulty) {
            case 0:
                diff = state.easy.filter(x => !usedWords.includes(x))
                state.currentWord = diff[Math.floor(Math.random() * diff.length)]
                break;
            case 1:
                diff = state.medium.filter(x => !usedWords.includes(x))
                state.currentWord = diff[Math.floor(Math.random() * diff.length)]
                break;
            default:
                diff = state.hard.filter(x => !usedWords.includes(x))
                state.currentWord = diff[Math.floor(Math.random() * diff.length)]
                break;
        }
        state = {
            ...state,
            usedWords,
            currentScore: state.currentScore + state.timer,
            timer: 0,
            attempts: state.attempts + 1
        }
        subject.next(state);
        playStore.startCounter();
    },
    startCounter: () => {
        let diffFactor = 1
        let attmept = state.attempts
        switch (state.difficulty) {
            case 1:
                diffFactor = 1.5 + (state.attempts * 0.01);
                break;
            case 2:
                diffFactor = 2 + (state.attempts * 0.01);
                break;
            default:
                diffFactor = 1 + (state.attempts * 0.01);
                break;
        }
        const factoredTime = ((state.currentWord.length) / diffFactor) * 100
        let initTime = factoredTime < 200 ? 200 : factoredTime
        const mainTimer = timer(0, 10)
        timerSubs = mainTimer.pipe(
            map(i => initTime - i),
            takeWhile(i => (i >= 0 && attmept === state.attempts))
        ).subscribe(value => {
            const percentage = ((value / initTime) * 100).toFixed(2)
            state = {
                ...state,
                timer: parseInt(value),
                initialPlay: true,
                loader: (250 * Number(percentage)) / 100,
                finish: parseInt(value) === 0
            }
            subject.next(state);
        })
    },
    resetGame:() => {
        state = {
            ...state,
            timer: 0,
            initialPlay: false,
            finish: false,
            loader: 250,
            currentScore: 0,
            attempts: 0,
        }
        subject.next(state);
    },
    initialState
}

export default playStore;
