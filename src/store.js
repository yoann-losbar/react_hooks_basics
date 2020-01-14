import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as reducers from './components/App/reducers';

const whiteList = ['*'];

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  diff: true,
  predicate: (getState, action) => whiteList.includes(action.type) || whiteList.includes('*'),
});


const store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(thunkMiddleware, logger),
);

export default store;
