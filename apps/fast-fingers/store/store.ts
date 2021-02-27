import {action, makeObservable, observable} from "mobx";
import { enableStaticRendering } from 'mobx-react'
import {useMemo} from "react";
import {User} from "@fast-fingers/entities";

enableStaticRendering(typeof window === 'undefined')

let store

export class Store {
  constructor(){
    makeObservable(this)
  }

  @observable token: string | null = null;
  @observable user: User | null = null;

  @action hydrate = (data) => {
    if (!data) return;

    this.token = data.token;
  }

  @action setUserData = (token: string, user: User) => {
    this.token = token;
    this.user = user
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
