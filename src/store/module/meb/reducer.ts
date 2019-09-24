import { combineReducers } from "redux"
import { createReducer } from "typesafe-actions"
import { loginActionaAsync } from "./actions"


export const userInfo = createReducer({})
    .handleAction([loginActionaAsync.request], (state, action) => ({b: 10}))
    .handleAction(
        [loginActionaAsync.success, loginActionaAsync.failure],
        (state, action) => ({a:10})
    );

export const mebReducer = combineReducers({
    userInfo,
})

export default mebReducer;