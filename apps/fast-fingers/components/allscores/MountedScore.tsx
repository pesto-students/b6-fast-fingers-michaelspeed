import {useEffect, useState} from "react";
import axios from "axios";
import {apiScores} from "../../config/config";
import {inject, observer} from "mobx-react";
import {Store} from "../../store/store";
import { Scores } from '@fast-fingers/entities';
import {Spinner, SpinnerSize} from "@fluentui/react";
import React from 'react';
import ScoreItem from "./ScoreItem";

interface Props {
  store: Store
}

function MountedScore({store}: Props) {

  const [score, setScore] = useState<Scores[]>([])
  const [loading, setLoading] = useState(false)
  const [init, setInit] = useState(false)

  useEffect(() => {
    if(!init) {
      getMyScores()
    }
  }, [init])

  const getMyScores = async() => {
    const response = await axios.get(`${apiScores}/${store.user.id}/100`)
    if (response.status === 200) {
      setScore(response.data);
      setLoading(false);
      setInit(true)
    }
  }

  return (
    <div>
      {loading && <div className='flex justify-center align-center'>
        <Spinner size={SpinnerSize.large}/>
      </div>}
      {!loading && <div>
        <React.Fragment>
          {score.map(item => (
            <ScoreItem score={item} key={item.id} show={true}/>
          ))}
        </React.Fragment>
      </div>}
    </div>
  )
}

export default inject('store')(observer(MountedScore)) as any
