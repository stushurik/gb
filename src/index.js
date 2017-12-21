import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import github from './github.duck';
import ui from './ui.duck';
import App from './app.container';

const reducer = combineReducers({
  github,
  ui
});


const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
