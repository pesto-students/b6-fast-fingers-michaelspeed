import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Store} from "../../store/store";
import moment from "moment";

interface Props {
  store: Store
}

function Scores({store}: Props) {

  const [init, setinit] = useState(false)

  useEffect(() => {
    if (!init) {
      store.updateScores()
      setinit(true)
    }
  }, [init])

  return (
    <React.Fragment>
      <div className="max-w-xl w-full space-y-8 shadow-lg sm:rounded-lg ring-2 ring-red-300 pb-2 bg-white ms-motion-slideUpIn">
        <div className='bg-red-500 rounded-lg p-4 rounded-b-none'>
          <h1 className='text-white text-3xl'>Scores</h1>
        </div>
        <div style={{overflow: 'auto', maxHeight: 500}}>
          {store.userScores.map(score => (
            <div className='m-2 p-2 shadow-lg sm:rounded-lg ring-1 ring-red-200' key={score.id}>
              <div>
                <span className='text-3xl text-red-500 font-bold'>{score.score}</span>
              </div>
              <div>
                <span className='text-gray-500'>{moment(score.createdAt).format('DD MMM YYYY')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default inject('store')(observer(Scores)) as any;
