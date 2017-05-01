import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import teamApp from './reducers'
import App from './App';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

let store = createStore(teamApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
