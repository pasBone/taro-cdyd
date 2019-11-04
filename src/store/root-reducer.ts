import { combineReducers } from 'redux'
import { mebReducer } from './module/meb/meb.reducer'

export const rootReducer =  combineReducers({
    meb: mebReducer,
})

export default rootReducer;