import React from 'react';
import Profile from "../components/profile/Profile";
import {inject, observer} from "mobx-react";

function GameLayout({children, user, store, difficulty}) {
  return (
    <React.Fragment>
      <div className='w-full space-y-8 mt-3 p-10 '>
        <div className='flex justify-between align-center'>
          <div style={{width: 300}}>
            <Profile user={user} difficulty={difficulty}/>
          </div>
          <div className='shadow-lg sm:rounded-lg ring-2 ring-white p-4'>
            <h1 className="mt-6 text-center text-6xl font-extrabold text-white">
              Fast Fingers
            </h1>
            <h6 className="mt-1 text-center text-3xl font-extrabold text-white">
              Score {store.score}
            </h6>
          </div>
        </div>
      </div>
      {children}
    </React.Fragment>
  )
}

export default inject('store')(observer(GameLayout)) as any;
