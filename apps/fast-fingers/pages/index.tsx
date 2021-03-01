import React, {useState} from 'react';

import styles from './index.module.css';
import Input from "../components/Input/Input";
import {useRouter} from "next/router";
import {apiHost, apiLogin, apiSessionCreate} from "../config/config";
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Store} from "../store/store";
import Profile from "../components/profile/Profile";
import SegmentedControls from "../components/segmentedControls/SegmentedControls";
import {useToasts} from "react-toast-notifications";
import {Callout, Spinner, SpinnerSize} from '@fluentui/react';
import {interval, timer} from "rxjs";
import {take} from "rxjs/operators";

interface PageProps {
  store: Store;
}

export function Index({store}: PageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigator = useRouter()
  const { addToast } = useToasts()
  const [callout, setCallout] = useState(false)

  const onSelectDifficulty = difficulty => {
    toggleLoading(true)
    axios.post(apiSessionCreate, {difficulty}, {
      headers: {
        'Authorization': store.token
      }
    }).then((response) => {
      if (response.status === 201) {
        const {id} = response.data
        store.setSession(id)
        toggleLoading(false)
        navigator.push(`/session/${id}`)
      }
    }).catch((error) => {
      toggleLoading(false)
      addToast(error.message, {autoDismiss: true, appearance: "error"})
    })
  }

  console.log(loading)

  const toggleLoading = (val?) => setLoading(val)

  return (
    <div className={styles.page}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-300">
        <div className="max-w-xl w-full space-y-8 shadow-lg sm:rounded-lg p-10 ring-2 ring-white bg-white">
          <div>
              <div>
                <h6 className="mt-6 text-center text-6xl font-extrabold text-red-500">Fast Fingers</h6>
              </div>
          </div>
          {store.user && <div className="mt-8 space-y-6 ms-motion-slideUpIn">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Profile userOnly={true} user={store.user}/>
              </div>
            </div>
            <div className='flex justify-evenly'>
              <a className='text-red-300' onClick={() => {
                setCallout(true)
                store.logout()
                timer(3000).pipe(take(1)).subscribe(() => {
                  setCallout(false)
                  setEmail('')
                  setPassword('')
                  setLoading(false)
                })
              }}>Not You?</a>
              {callout && <Callout onDismiss={() => setCallout(!callout)} target={`.difficulty`}>
                <div className='p-10'>
                  <h4 className='text-red-500 text-2xl'>Logging you out</h4>
                  <div>
                    <Spinner size={SpinnerSize.large}/>
                  </div>
                </div>
              </Callout>}
            </div>
            <div>
              <div className='flex justify-center'>
                <span className='text-red-500 text-2xl'>Select Difficulty</span>
              </div>
              <SegmentedControls onChange={onSelectDifficulty} loading={loading}/>
            </div>
          </div>}
          {!store.user && <div className="mt-8 space-y-6 ms-motion-slideUpIn">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Input value={email} onChange={event => setEmail(event.target.value)} label='email'/>
              </div>
              <div>
                <Input value={password} onChange={event => setPassword(event.target.value)} label={password} type='password'/>
              </div>
            </div>
            {!loading && <div>
              <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={ async () => {
                        toggleLoading(true)
                        axios.post(apiLogin, {email: email, password: password}).then(res => {
                          toggleLoading(false)
                          console.log('trigger')
                          const {data: {token, user}} = res
                          store.setUserData(token, user)
                        }).catch(err => {
                          addToast(err.message, {autoDismiss: true, appearance: "error"})
                          toggleLoading(false)
                        })
                      }}
              >
                Sign in
              </button>
            </div>}
            {loading && <div>
              <Spinner size={SpinnerSize.large}/>
            </div>}
          </div>}
        </div>
      </div>
    </div>
  );
}

export default inject('store')(observer(Index));
