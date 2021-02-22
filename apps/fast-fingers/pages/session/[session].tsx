import React from 'react';
import GameLayout from "../../layouts/GameLayout";
import Scores from "../../components/scores/Scores";
import Game from "../../components/game/game";

export default function Session() {
  return (
    <GameLayout>
      <div className='p-10'>
        <div className='grid grid-cols-4 gap-4'>
          <Scores/>
          <div className='col-span-3'>
            <Game/>
          </div>
        </div>
        <div className='mt-10'>
          <div className='flex justify-end align-center'>
            <a href="javascript:;" className=" inline-flex items-center justify-center px-3 py-3  text-base font-medium text-red-600 hover:text-white rounded-md text-white ring-2 ring-red-300 hover:bg-red-700">
              Stop Game
            </a>
          </div>
        </div>
      </div>
    </GameLayout>
  )
}
