import React, {useEffect, useState} from 'react';
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Input from "../Input/Input";
import {inject, observer} from "mobx-react";
import {Store} from "../../store/store";
import {useTicker} from "../../hooks/useTicker";

interface Props {
  id: string
  store?: Store;
  difficulty: number
}

function Game({id, store, difficulty}: Props) {
  const [word, setWord] = useState('')
  const [init, setInit] = useState(false)
  const {setAttempts, setCurrentWord, reset, timer, loader, initiate, playState, currentWord, score, finish} = useTicker(difficulty)

  console.log(word, currentWord)

  useEffect(() => {
    reset()
    setWord('')
    store.startGame()
  },[difficulty])

  useEffect(() => {
    if (store.words.length > 0 && store.words[0].word !== currentWord) {
      setCurrentWord(store.words[0].word)
    }
  }, [store.words])

  useEffect(() => {
    if (!init) {
      store.startGame()
      setInit(true)
    }
  },[init, store])

  /*useEffect(() => {
    if (store.words.length > 0 && currentWord === '') {
      setCurrentWord(store.words[0].word)
    }
  })*/

  useEffect(() => {
    if (word !== '' && currentWord === word) {
      setAttempts()
      if (score === 0) {
        store.popWord(Number(timer.toFixed(2)))
      } else {
        store.popWord(Number(score.toFixed(2)))
      }
      setWord('')
      setCurrentWord(store.words[0].word)
    }
  }, [word])

  useEffect(() => {
    if (finish && score !== 0) {
      store.gameEnd()
    }
  }, [finish])

  const setWords = (value) => {
    setWord(value)
    if (!playState) {
      initiate()
    }
  }

  return (
    <React.Fragment>
      <div className='bg-white p-8 shadow-lg sm:rounded-lg ms-motion-slideUpIn'>
        {!finish && <div style={{width: '100%'}}>
          <div className='flex justify-center align-items-center align-center'>
            <div style={{height: 300, width: 300}}>
              <CircularProgressbar value={loader} text={timer.toFixed(2)} styles={buildStyles({
                pathColor: '#EF4444',
                textColor: '#EF4444',
              })}/>
            </div>
          </div>
          <div className='flex justify-center align-items-center align-center mt-10'>
            {store.words.length > 0 && <h3 className='text-red-700 text-6xl font-extrabold'>{store.words[0].word}</h3>}
          </div>
          <div className='flex justify-center align-items-center align-center mt-10'>
            <div className='w-1/3'>
              <Input value={word} onChange={event => setWords(event.target.value)} classes={['border-red-300']}/>
            </div>
          </div>
        </div>}
        {finish && <div style={{width: '100%'}}>
          <div className='flex justify-center align-items-center align-center'>
            <h1 className='text-red-700 text-6xl 2xl:font-bold'>Game Over</h1>
          </div>
          <div className='flex justify-center align-items-center align-center'>
            <h3 className='text-red-700 text-4xl'>{store.score}</h3>
          </div>
          <div className='flex justify-center align-items-center align-center mt-10'>
            <a className=" inline-flex items-center justify-center px-3 py-3  text-base font-medium text-red-600 hover:text-white rounded-md text-white ring-2 ring-red-300 hover:bg-red-700 cursor-pointer"
               onClick={() => {
                 store.startGame()
                 reset()
               }}
            >
              Restart Game
            </a>
          </div>
        </div>}
      </div>
    </React.Fragment>
  )
}

export default inject('store')(observer(Game))
