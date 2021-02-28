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

  let timerSub

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
    if (timerSub) {
      timerSub.unsubscribe()
      timerSub = null
    }
    const cword = word
    setWord(currentWord)
    if (cword !== '') {
      initiate()
    }
  }

  const factoredTime = ((word.length) / factor) * 100
  const initTime = factoredTime < 200 ? 200 : factoredTime
  const mainTimer = timer(0,10)

  function initiate() {
    setPlayState(true)
    timerSub = mainTimer.pipe(
      map(i => initTime - i),
      takeWhile(i => (i >= 0))
    )
    timerSub.subscribe(value => {
      const percentage = ((value / initTime) * 100).toFixed(2)
      setTimers(value)
      setLoader(Number(percentage))
    })
  }

  function reset() {
    timerSub.unsubscribe()
    setAttempts(0)
    setFactor(0)
    setCurrentWord('')
    timerSub = null
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
