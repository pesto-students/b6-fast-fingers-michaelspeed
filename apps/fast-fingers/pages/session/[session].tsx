import React from 'react';
import GameLayout from "../../layouts/GameLayout";
import Scores from "../../components/scores/Scores";
import Game from "../../components/game/game";
import {apiSessionInfo} from "../../config/config";
import axios from "axios";
import {inject, observer} from "mobx-react";
import {NextPageContext} from "next";
import {User} from "@fast-fingers/entities";

interface Props {
  data: {
    user: User,
    createdAt: Date,
    difficulty: number,
    id: string,
    invalidate: boolean,
    updatedAt: Date,
  }
}

function Session({data}: Props) {
  const {user, id, difficulty} = data
  return (
    <GameLayout user={user}>
      <div className='p-10'>
        <div className='grid grid-cols-4 gap-4'>
          <Scores/>
          <div className='col-span-3'>
            <Game id={id} difficulty={difficulty}/>
          </div>
        </div>
      </div>
    </GameLayout>
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

