import React, {useState} from 'react';
import {User} from "@fast-fingers/entities";
import {Callout } from '@fluentui/react';
import {inject, observer} from "mobx-react";
import {Store} from "../../store/store";
import axios from "axios";
import {apiSessionCreate} from "../../config/config";
import {useRouter} from "next/router";
import {useToasts} from "react-toast-notifications";

interface Props {
  user: User;
  userOnly?: boolean
  store: Store;
  difficulty?: number
}

function Profile(props: Props) {

  const [callout, setCallout] = useState(false)
  const navigator = useRouter()
  const { addToast } = useToasts()

  const triggerCallOut = () => setCallout(!callout)

  const onSelectDifficulty = difficulty => {
    console.log(difficulty)
    axios.post(apiSessionCreate, {difficulty}, {
      headers: {
        'Authorization': props.store.token
      }
    }).then((response) => {
      if (response.status === 201) {
        const {id} = response.data
        props.store.setSession(id)
        navigator.push(`/session/${id}`)
      }
    }).catch((error) => {
      addToast(error.message, {autoDismiss: true, appearance: "error"})
    })
  }

  return (
    <React.Fragment>
      <div className="max-w-xl w-full space-y-8 shadow-lg sm:rounded-lg p-10 ring-white ring-2 bg-white">
        <div className='flex align-center flex-row justify-center align-items-center'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-10 text-red-700'>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className='ml-3'>
            <h2 className='text-red-600 text-2xl'>{props.user.email}</h2>
            {!props.userOnly && <a className="inline-flex items-center justify-center px-2  border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer difficulty"
                                   onClick={() => triggerCallOut()}
            >
              {props.difficulty === 0 && 'Easy'}
              {props.difficulty === 1 && 'Medium'}
              {props.difficulty === 2 && 'Hard'}
            </a>}
            {callout && <Callout onDismiss={() => setCallout(!callout)} target={`.difficulty`}>
              <div className='p-10'>
                <h3 className='text-red-500 text-2xl'>Change Difficulty</h3>
                <div className='flex justify-between align-center mt-4'>
                  <a className="inline-flex items-center justify-center px-2  border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer difficulty"
                     onClick={() => {
                       triggerCallOut();
                       onSelectDifficulty(0)
                     }}
                  >
                    Easy
                  </a>
                  <a className="inline-flex items-center justify-center px-2  border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer difficulty"
                     onClick={() => {
                       triggerCallOut();
                       onSelectDifficulty(1)
                     }}
                  >
                    Medium
                  </a>
                  <a className="inline-flex items-center justify-center px-2  border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer difficulty"
                     onClick={() => {
                       triggerCallOut();
                       onSelectDifficulty(2)
                     }}
                  >
                    Hard
                  </a>
                </div>
              </div>
            </Callout>}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default inject('store')(observer(Profile)) as any;
