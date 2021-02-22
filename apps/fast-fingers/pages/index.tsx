import React, {useEffect, useRef, useState} from 'react';

import styles from './index.module.css';
import Input from "../components/Input/Input";
import {useRouter} from "next/router";
import {anime} from "react-anime";

export function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigator = useRouter()

  return (
    <div className={styles.page}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8 shadow-lg sm:rounded-lg p-10 ring-2 ring-red-400">
          <div>
              <div>
                <h6 className="mt-6 text-center text-6xl font-extrabold text-red-500">Fast Fingers</h6>
              </div>
          </div>
          <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <Input value={email} onChange={event => setEmail(event.target.value)} label='email'/>
                </div>
                <div>
                  <Input value={password} onChange={event => setPassword(event.target.value)} label={password} type='password'/>
                </div>
              </div>
              <div>
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => navigator.push('/session/ssss')}
                >
                  Sign in
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
