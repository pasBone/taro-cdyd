import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './root-reducer'

const middleware = [
    thunkMiddleware,
    createLogger()
]

export default function configStore() {
    return createStore(rootReducer, applyMiddleware(...middleware))
}