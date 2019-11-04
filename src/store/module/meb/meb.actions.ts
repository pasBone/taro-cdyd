import * as types from './meb.types'
import { mebApi } from '@/api/meb'
import { Dispatch } from 'redux';

/** 登录 */
export const loginAsync = (payload: mebApi.LoginReq) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(
                loginRequest()
            );
            const resposne = await mebApi.login(payload);
            dispatch(
                loginSuccess(resposne.data)
            );
        } catch (error) {
            dispatch(
                loginError()
            );
        }
    }
}

/** 登录中 */
export const loginRequest = () => {
    return {
        type: types.LOG_IN
    }
}

/** 登录成功 */
export const loginSuccess = (payload) => {
    return {
        type: types.LOG_IN_SUCCESS,
        payload
    }
}

/** 登录失败 */
export const loginError = () => {
    return {
        type: types.LOG_IN_ERROR
    }
}

/** 发送短信验证码 */
export const sendCodeAsync = (payload: mebApi.SendCodeReq) => {
    return async (dispatch: Dispatch) => {
        try {
            await mebApi.sendCode(payload);
            dispatch(
                sendCodeSuccess()
            )
        } catch (error) {
            dispatch(
                sendCodeError()
            )
        }
    }
}

/** 发送短信验证码成功 */
export const sendCodeSuccess = () => {
    return {
        type: types.SEND_CODE_SUCCESS
    }
}

/** 发送短信验证码失败 */
export const sendCodeError = () => {
    return {
        type: types.SEND_CODE_ERROR
    }
}


