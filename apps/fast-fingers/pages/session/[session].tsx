import React, {useEffect, useState} from 'react';
import GameLayout from "../../layouts/GameLayout";
import Scores from "../../components/scores/Scores";
import Game from "../../components/game/game";
import {apiSessionInfo} from "../../config/config";
import axios from "axios";
import {inject, observer} from "mobx-react";
import {NextPageContext} from "next";
import {User} from "@fast-fingers/entities";
import {Store} from "../../store/store";
import {useRouter} from "next/router";

interface Props {
  data: {
    user: User,
    createdAt: Date,
    difficulty: number,
    id: string,
    invalidate: boolean,
    updatedAt: Date,
  },
  store: Store
}

function Session({data, store}: Props) {
  const {user, id, difficulty} = data
  const navigator = useRouter()
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (store.token === null) {
      navigator.push('/')
      store.logout()
    } else {
      setInit(true)
    }
  }, [init])
  return (
    <div className='bg-gradient-to-r from-red-600 to-red-300' style={{marginTop: -20, height: '110vh'}}>
      {init && <GameLayout user={user} difficulty={difficulty}>
        <div className='p-10'>
          <div className='grid grid-cols-4 gap-4'>
            <Scores/>
            <div className='col-span-3 ms-motion-slideUpIn'>
              <Game id={id} difficulty={difficulty}/>
            </div>
          </div>
        </div>
      </GameLayout>}
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let response
  try {
     response = await axios.get(`${apiSessionInfo}/${context.query.session}?join=user`)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  const {data} = response
  return {
    props: {
      data
    }
  }
}

export default inject('store')(observer(Session))

