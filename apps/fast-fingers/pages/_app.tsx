import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import useSWR, { SWRConfig } from 'swr';
import {useStore} from "../store/store";
import { Provider } from 'mobx-react';

function CustomApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialState)

  return (
    <>
      <Head>
        <title>Welcome to fast-fingers!</title>
      </Head>
      <Provider store={store}>
        <SWRConfig value={{
          refreshInterval: 3000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
          <div className="app">
            <main>
              <Component {...pageProps} />
            </main>
          </div>
        </SWRConfig>
      </Provider>
    </>
  );
}

export default CustomApp;
