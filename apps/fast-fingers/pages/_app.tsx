import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import {useStore} from "../store/store";
import { Provider } from 'mobx-react';
import { ToastProvider } from 'react-toast-notifications';
import { createTheme, Fabric, loadTheme } from '@fluentui/react';

const myTheme = createTheme({
  palette: {
    themePrimary: '#ef4444',
    themeLighterAlt: '#fef7f7',
    themeLighter: '#fddfdf',
    themeLight: '#fac4c4',
    themeTertiary: '#f68c8c',
    themeSecondary: '#f25858',
    themeDarkAlt: '#d83c3c',
    themeDark: '#b63333',
    themeDarker: '#862626',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#ced2d9',
    neutralSecondary: '#a1a7b3',
    neutralPrimaryAlt: '#7b818f',
    neutralPrimary: '#6b7280',
    neutralDark: '#515761',
    black: '#3c4047',
    white: '#ffffff',
  }});

loadTheme(myTheme);


function CustomApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialState)

  return (
    <>
      <Head>
        <title>Welcome to fast-fingers!</title>
      </Head>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-center"
      >
        <Fabric applyThemeToBody>
          <Provider store={store}>
            <div className="app">
              <main>
                <Component {...pageProps} />
              </main>
            </div>
          </Provider>
        </Fabric>
      </ToastProvider>
    </>
  );
}

export default CustomApp;
