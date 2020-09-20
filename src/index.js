import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import Bands from './pages/Bands'
import Persons from './pages/Persons'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/index" exact component={App} />
            <Route path="/persons" exact component={Persons} />
            <Route path="/bands" exact component={Bands} />
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
