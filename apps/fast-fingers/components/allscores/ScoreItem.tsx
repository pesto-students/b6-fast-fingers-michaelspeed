import moment from "moment";
import React, {useState} from "react";
import {Scores} from "@fast-fingers/entities";

interface Props {
  score: Scores;
  show?: boolean
}

export default function ScoreItem({score, show}: Props) {
  const [expand, setExpand] = useState(false)
  return (
    <div className='m-2 pr-10 pl-10 p-2 shadow-lg sm:rounded-lg ring-1 ring-red-200 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100'
         onMouseEnter={() => setExpand(true)} onMouseLeave={() => setExpand(false)}
    >
      <div>
        <span className='text-3xl text-red-500 font-bold'>{score.score}</span>
      </div>
      <div>
        <span className='text-gray-500'>{moment(score.createdAt).format('DD MMM YYYY')}</span>
      </div>
      {show && <div>
        {expand && score.session && <div>
          <div className='flex'>
            <h2>Used Words</h2>
            <div className='ml-10 text-red-400 font-bold'>
              {score.session.words.length}
            </div>
          </div>
          <div className='grid grid-cols-10 gap-4'>
            {score.session.words.map(words => (
              <div key={words.id}>
                <span className='text-gray-400 font-bold'>{words.word}</span>
              </div>
            ))}
          </div>
        </div>}
      </div>}
    </div>
  )
}
