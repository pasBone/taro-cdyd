import * as types from '@/constant/meb.const'
import { createAsyncAction, AsyncActionCreator } from 'typesafe-actions';
import { mebApi } from '@/api/meb'

/** 登录 */
export const loginAsync1 = (payload: mebApi.LoginReq) => {
    return async (dispatch) => {

        try {
            const resposne = await mebApi.login(payload);
            dispatch(
                loginSuccess(resposne.data)
            );
        } catch (error) {
            dispatch(
                loginError(error)
            )
        }
    }
}

/** 登录成功 */
export const loginSuccess = (payload: mebApi.LoginRes) => {
    return {
        type: types.LOG_IN_SUCCESS,
        payload
    }
}

/** 登录失败 */
export const loginError = (payload) => {
    return {
        type: types.LOG_IN_ERROR,
        payload
    }
}

export const loginAsync = createAsyncAction(
    'meb/登录',
    'meb/登录成功',
    'meb/登录失败'
)<mebApi.LoginReq, mebApi.LoginRes, null>()