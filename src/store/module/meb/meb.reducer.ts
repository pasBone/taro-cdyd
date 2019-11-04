import { combineReducers } from "redux";
import { mebApi } from "@/api/meb";
import { LoadingType } from "@/types";
import { RootAction } from "@/store/types";
import * as types from './meb.types'

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

const sendCodeState = {
	state: false
}

export const userInfo = (state = userInfoState, action: RootAction) => {
	switch (action.type) {

		case types.LOG_IN:
			return { ...state, loading: true }

		case types.LOG_IN_SUCCESS:
			return { ...state, loading: false }

		case types.LOG_IN_ERROR:
			return userInfoState

		default:
			return state
	}
}

export const sendCode = (state = sendCodeState, action: RootAction) => {
	switch (action.type) {

		case types.SEND_CODE_SUCCESS:
			return { state: true }

		case types.SEND_CODE_ERROR:
			return { state: false }

		default:
			return state
	}
}

export const mebReducer = combineReducers({
	userInfo,
	sendCode
})
