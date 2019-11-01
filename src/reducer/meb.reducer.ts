import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { mebApi } from "@/api/meb";
import { LoadingType } from "@/types";
import { loginAsync } from '@/actions/meb.actions'

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
	.handleAction(loginAsync.request, (state) => {
		return { ...state, loading: true }
	})
	.handleAction(loginAsync.success, (state) => {
		return { ...state, loading: false }
	})
	.handleAction(loginAsync.failure, (state) => {
		return { ...state, loading: false }
	})

export const mebReducer = combineReducers({
	userInfo
})
