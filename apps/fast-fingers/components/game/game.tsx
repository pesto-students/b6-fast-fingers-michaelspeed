import React, {useState} from 'react';
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Input from "../Input/Input";

export default function Game() {
  const [word, setWord] = useState('')

  return (
    <React.Fragment>
      <div style={{width: '100%'}}>
        <div className='flex justify-center align-items-center align-center'>
          <div style={{height: 300, width: 300}}>
            <CircularProgressbar value={50} text={`${50}%`} styles={buildStyles({
              pathColor: '#EF4444',
              textColor: '#EF4444',
            })}/>
          </div>
        </div>
        <div className='flex justify-center align-items-center align-center mt-10'>
          <div className='w-1/3'>
            <Input value={word} onChange={event => setWord(event.target.value)} classes={['border-red-300']}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
