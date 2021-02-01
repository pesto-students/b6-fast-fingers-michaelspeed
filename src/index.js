import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Router} from "react-navi";
import {routes} from "./routes";
import './styles/styles.scss'
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
      <Suspense fallback={null}>
          <Router routes={routes}>
              <App/>
          </Router>
      </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
