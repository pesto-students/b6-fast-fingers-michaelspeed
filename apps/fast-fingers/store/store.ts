import {action, makeObservable, observable} from "mobx";
import { enableStaticRendering } from 'mobx-react'
import {useMemo} from "react";
import {Scores, User, Words} from "@fast-fingers/entities";
import axios from "axios";
import {apiCreateScore, apiGetWords, apiScores} from "../config/config";

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
  @observable userScores: Scores[] = []

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
    if (this.score !== 0) {
      await axios.post(apiCreateScore, {
        score: this.score,
        session: this.session,
        user: this.user.id
      })
      this.words = []
    }
    this.updateScores()
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
    this.session = null;
    this.words = [];
    this.score = 0;
    this.userScores = [];
  }

  @action updateScores = async() => {
    const response = await axios.get(`${apiScores}/${this.user.id}/10`)
    if (response.status === 200) {
      this.userScores = response.data
    }
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
