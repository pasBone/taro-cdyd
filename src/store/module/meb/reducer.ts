import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { mebApi } from "@/api/meb";
import { LoadingType } from "@/types";
import { loginActionaAsync } from './actions'

type UserInfo = mebApi.LoginRes & LoadingType

const userInfoState: UserInfo = {
    loading: false,
    meb_id: '',
    operator_id: '',
    reg_way: '',
    tel: '',
    token: '',
    avatar: '',
    plate_number: ''
}

export const userInfo = createReducer(userInfoState)
    /** handleAction(actionCreator) */
    .handleAction(loginActionaAsync.request, (state) => {
        return { ...state, loading: true }
    })
    .handleAction([loginActionaAsync.success, loginActionaAsync.failure], (state) => {
        return { ...state, loading: false }
    })

export const mebReducer = combineReducers({
    userInfo
});