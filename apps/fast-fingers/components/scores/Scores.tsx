import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Store} from "../../store/store";
import moment from "moment";
import AllScores from "../allscores/AllScores";
import ScoreItem from "../allscores/ScoreItem";

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
      <div className="max-w-xl w-full space-y-8 shadow-lg sm:rounded-lg ring-2 ring-red-400 pb-2 bg-white ms-motion-slideUpIn ">
        <div className='bg-red-500 rounded-lg p-4 rounded-b-none flex justify-between align-center'>
          <h1 className='text-white text-3xl font-bold'>Scores</h1>
          <AllScores/>
        </div>
        <div style={{overflow: 'auto', maxHeight: 500}}>
          {store.userScores.map(score => (
            <ScoreItem score={score} key={score.id}/>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default inject('store')(observer(Scores)) as any;
