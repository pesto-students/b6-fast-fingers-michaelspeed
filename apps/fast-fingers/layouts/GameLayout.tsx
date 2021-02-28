import React from 'react';
import Profile from "../components/profile/Profile";
import {inject, observer} from "mobx-react";

function GameLayout({children, user, store}) {
  return (
    <React.Fragment>
      <div className='w-full space-y-8 mt-3 p-10'>
        <div className='flex justify-between align-center'>
          <div style={{width: 300}}>
            <Profile user={user}/>
          </div>
          <div>
            <h1 className="mt-6 text-center text-6xl font-extrabold text-red-700">
              Fast Fingers
            </h1>
            <h6 className="mt-1 text-center text-3xl font-extrabold text-red-700">
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
