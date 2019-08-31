import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState } from 'typesafe-actions';

import { composeEnhancers } from '@/utils/common';
import { rootReducers } from './root-reducer';
import rootEpic from './root-epic';
import { RootServices } from './root-services';

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  typeof RootServices
>({
  dependencies: RootServices,
});

// configure middlewares
const middlewares = [epicMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducers, initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
