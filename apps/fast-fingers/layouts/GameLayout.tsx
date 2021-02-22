import React from 'react';
import Profile from "../components/profile/Profile";

export default function GameLayout({children}) {
  return (
    <React.Fragment>
      <div className='w-full space-y-8 mt-3 p-10'>
        <div className='flex justify-between align-center'>
          <div style={{width: 300}}>
            <Profile/>
          </div>
          <div>
            <h1 className="mt-6 text-center text-6xl font-extrabold text-red-700">
              Fast Fingers
            </h1>
            <h6 className="mt-1 text-center text-3xl font-extrabold text-red-700">
              Score
            </h6>
          </div>
        </div>
      </div>
      {children}
    </React.Fragment>
  )
}
