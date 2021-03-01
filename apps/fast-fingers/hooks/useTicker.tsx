import {useCallback, useEffect, useState} from "react";
import {Subject, timer} from "rxjs";
import {map, takeWhile} from "rxjs/operators";

export const useTicker = (difficulty) => {
  const [attempts, setAttempts] = useState(0)
  const [factor, setFactor] = useState(0)
  const [timers, setTimers] = useState(0)
  const [score, setScore] = useState(0)
  const [loader, setLoader] = useState(100)
  const [word, setWord] = useState('')
  const [playState, setPlayState] = useState(false)
  const [finish, setFinish] = useState(false)
  const [timerObserver, setTimerObserver] = useState(null)

  useEffect(() => {
    switch(difficulty) {
      case 0:
        setFactor(1.5 + (attempts * 0.01))
        break;
      case 1:
        setFactor(2 + (attempts * 0.01))
        break;
      case 2:
        setFactor(1 + (attempts * 0.01))
        break;
    }
    setLoader(100)
  }, [difficulty, attempts, word])

  useEffect(() => {
    if (timers === 0 && playState) {
      setFinish(true)
    }
  },[timers])

  function setterAttempts() {
    setScore(score + Number(timers.toFixed(2)))
    setAttempts(attempts + 1);
  }

  async function setCurrentWord(currentWord) {
    if (timerObserver) {
      timerObserver.unsubscribe()
      setTimerObserver(null)
    }
    const cword = word
    setWord(currentWord)
    if (cword !== '') {
      initiate()
    }
  }

  function initiate() {
    setPlayState(true)
    const factoredTime = (((word.length) / factor) * 100) + 100
    const initTime = factoredTime < 200 ? 200 : factoredTime
    const mainTimer = timer(0,10)

    const timerSub = mainTimer.pipe(
      map(i => initTime - i),
      takeWhile(i => (i >= 0))
    )
    const lateSubscribe = timerSub.subscribe(value => {
      const percentage = ((value / initTime) * 100).toFixed(2)
      if (value < 1) {
        setTimers(0)
      } else {
        setTimers(value)
      }
      setLoader(Number(percentage))
    })
    setTimerObserver(lateSubscribe)
  }

  function reset() {
    if (timerObserver !== null) {
      timerObserver.unsubscribe()
    }
    setPlayState(false)
    setAttempts(0)
    setFactor(0)
    setWord('')
    setTimerObserver(null)
    setFinish(false)
    setScore(0)
  }

  return {
    setAttempts: setterAttempts,
    setCurrentWord,
    reset,
    timer: timers,
    loader,
    initiate,
    playState,
    currentWord: word,
    finish,
    score
  }

}
