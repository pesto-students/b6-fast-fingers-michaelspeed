import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import useSWR, { SWRConfig } from 'swr';
import {useStore} from "../store/store";
import { Provider } from 'mobx-react';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialState)

  return (
    <>
      <Head>
        <title>Welcome to fast-fingers!</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <div className="app">
            <main>
              <Component {...pageProps} />
            </main>
          </div>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
