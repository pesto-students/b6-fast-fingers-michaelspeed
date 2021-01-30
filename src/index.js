import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Router, View} from "react-navi";
import {routes} from "./routes";
import './styles/styles.scss'
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router routes={routes}>
        <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
