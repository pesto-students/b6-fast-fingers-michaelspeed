import React from 'react';

export default function Profile() {
  return (
    <React.Fragment>
      <div className="max-w-xl w-full space-y-8 shadow-lg sm:rounded-lg p-10 ring-red-300 ring-2">
        <div className='flex align-center flex-row justify-center align-items-center'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-10 text-red-700'>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className='ml-3'>
            <h2>Name</h2>
            <a className="inline-flex items-center justify-center px-2  border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
              easy
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
