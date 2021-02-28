import {action, makeObservable, observable} from "mobx";
import { enableStaticRendering } from 'mobx-react'
import {useMemo} from "react";
import {User, Words} from "@fast-fingers/entities";
import axios from "axios";
import {apiCreateScore, apiGetWords} from "../config/config";

enableStaticRendering(typeof window === 'undefined')

let store

export class Store {
  constructor(){
    makeObservable(this)
  }

  @observable token: string | null = null;
  @observable session: string | null = null;
  @observable user: User | null = null;
  @observable words: Words[] = []
  @observable score = 0

  @action hydrate = (data) => {
    if (!data) return;
    this.token = data.token;
  }

  @action startGame = async () => {
    const response = await axios.post(apiGetWords, {id: this.session})
    if (response.status === 201) {
      this.words = response.data
    }
    this.score = 0
  }

  @action popWord = async(score) => {
    this.words.shift()
    this.score = score
    if (this.words.length === 3) {
      const response = await axios.post(apiGetWords, {id: this.session})
      if (response.status === 201) {
        this.words = [...this.words, ...response.data]
      }
    }
  }

  @action gameEnd = async() => {
    await axios.post(apiCreateScore, {
      score: this.score,
      session: this.session,
      user: this.user.id
    })
    this.words = []
  }

  @action setUserData = (token: string, user: User) => {
    this.token = token;
    this.user = user
  }

  @action setSession = (session: string) => {
    this.session = session
  }

  @action logout = () => {
    this.token = null;
    this.user = null;
  }
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store();
  if (initialData) {
    _store.hydrate(initialData)
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store;
}
