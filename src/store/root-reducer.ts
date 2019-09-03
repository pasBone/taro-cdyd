import { combineReducers } from 'redux'
import { mebReducer } from './module/meb/reducer'
import todosReducer from './module/todos/reducer';

export const rootReducer =  combineReducers({
    meb: mebReducer,
    todos: todosReducer
})

export default rootReducer;