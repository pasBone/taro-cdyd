import { combineReducers } from "redux";
import { mebApi } from "@/api/meb";
import { LoadingType } from "@/types";
import { IAction } from "@/store/types";
import { setStorage } from '@tarojs/taro'
import * as types from './meb.types'

type UserInfo = mebApi.LoginRes & LoadingType

/** 用户基本信息 */
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

/** 短信验证码发送状态 */
const sendCodeState = {
	state: true
}

/** 缓存用户信息 */
const storageUserInfo = (data) => {
	setStorage({ key: 'userInfo', data })
}

/** 车主认证状态 */
const carVerifyStatusState: mebApi.carVerifyStatusRes = {
	status: 2,
	status_desc: ''
}

export const userInfo = (state = userInfoState, action: IAction<mebApi.LoginRes>) => {
	switch (action.type) {

		case types.LOG_IN:
			storageUserInfo(state);
			return { ...userInfoState, loading: true }

		case types.LOG_IN_SUCCESS:
			storageUserInfo(action.payload);
			return { ...state, ...action.payload, loading: false }

		case types.LOG_IN_ERROR || types.CLEAR_USER_INFO:
			storageUserInfo(state);
			return userInfoState

		default:
			return state
	}
}

/** 发送短信验证码 */
export const sendCode = (state = sendCodeState, action: IAction) => {
	switch (action.type) {

		case types.SEND_CODE_SUCCESS:
			return { state: true }

		case types.SEND_CODE_ERROR:
			return { state: false }

		default:
			return state
	}
}

/** 获取车主认证状态 */
export const carVerifyStatus = (state = carVerifyStatusState, action: IAction<mebApi.carVerifyStatusRes>) => {
	switch (action.type) {
		case types.GET_CAR_VERIFY_STATUS_SUCCESS:
			return { ...action.payload }
		default:
			return state;
	}
}

export const mebReducer = combineReducers({
	userInfo,
	sendCode,
	carVerifyStatus
});
