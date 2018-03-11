// @flow
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './config/store';

import App from './components/App';


const render = (element) => (
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    element
  )
)

const container = document.getElementById('app');
if(container){
  render(container)
}

if(window.module){
    window.module.hot.accept();
}
