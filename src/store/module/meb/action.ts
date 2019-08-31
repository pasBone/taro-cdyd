import * as types from './constant';
import { mebApi } from '@/api/meb'

/** 用户登录 */
export const userLogin = payload => {
    console.log(payload, 'payload');
    return async (dispatch) => {
        console.log(1);
        const response = await mebApi.login({
            tel: 13038360141,
            reg_way: 1,
            code: 123456
        })
        console.log(response);
        console.log(dispatch);
    }
}