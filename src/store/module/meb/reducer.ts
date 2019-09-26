import { combineReducers } from "redux"
import { createReducer } from "typesafe-actions"
import { loginActionaAsync, sendCodeActionaAsync } from "./actions"
import { OPERATE_CODE, LoadingType } from "@/types";
import { mebApi } from "@/api/meb";


type UserInfo = mebApi.LoginRes & LoadingType;

export const userInfo = createReducer({
    loading: false
} as UserInfo)
    .handleAction([loginActionaAsync.request], (state, action) => ({ ...state, loading: true }))
    .handleAction(
        [loginActionaAsync.success, loginActionaAsync.failure], (state, action) => ({ ...state, loading: false })
    )


export const verifyCode = createReducer(OPERATE_CODE.success)
    .handleAction(sendCodeActionaAsync.failure, (state, action) => OPERATE_CODE.fail);

export const mebReducer = combineReducers({
    userInfo,
    verifyCode
})

export default mebReducer;