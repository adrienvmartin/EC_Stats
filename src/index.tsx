import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
