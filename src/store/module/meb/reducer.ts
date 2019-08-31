import { combineReducers } from "redux"
import { createReducer } from "typesafe-actions"
import { loginActionaAsync } from "./action"

export const userInfo = createReducer({})
    .handleAction(loginActionaAsync.request, (state, action) => action.payload)

export const mebReducer = combineReducers({
    userInfo,
})
