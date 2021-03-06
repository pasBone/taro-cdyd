import { StringOrNumber } from "@/types";
import { post } from '@/utils/http';
import { CAR_VERIFY_STATUS } from "@/constant";

export const mebApi = {
    login: post<mebApi.LoginReq, mebApi.LoginRes>('/meb/login'),
    /** 发送验证码 */
    sendCode: post<mebApi.SendCodeReq>("/meb/sendCode"),
    /** 通过openId获取用户信息 */
    getUserInfoByOpenId: post<mebApi.logoutReq, mebApi.LoginRes>("/meb/loginByOpenId"),
    /** 获取车主认证状态 */
    getCarVerifyStatus: post<mebApi.carVerifyInfoReq, mebApi.carVerifyStatusRes>("/mebCarVerify/getCarVerifyStatus"),
}

export namespace mebApi {
    export interface SendCodeReq {
        /** 运营商编码 */
        operator_code?: StringOrNumber
        /** 用户手机号码 */
        tel: StringOrNumber
    }

    export interface ValidationCodeReq extends SendCodeReq {
        /** 验证码 */
        code: StringOrNumber
    }

    export interface LoginReq extends ValidationCodeReq {
        /** 登录途径（1表示APP， 2表示微信公众号） */
        reg_way: number,
        /** 微信公众号openid，登录途径为微信公众号时需要传递 */
        open_id?: string,
        /** 车牌号码 */
        plate_number?: string
    }

    export interface LoginRes {
        /** token（通过header传递到后台）	 */
        token: string
        /** 运营方id(需要缓存到本地，后面有一些接口需要传递)	 */
        operator_id: string
        /** 用户ID	 */
        meb_id: string
        /** 登录途径（1表示APP， 2表示微信公众号）	 */
        reg_way: string
        /** 用户手机号码	 */
        tel: string
        /** 头像 */
        avatar: string,
        /** 车牌号码 */
        plate_number: string
    }

    export interface logoutReq {
        open_id: string
    }

    export interface carVerifyInfoReq {
        /** meb_id */
        meb_id: StringOrNumber
    }

    export interface carVerifyStatusRes {
        /** 审核状态(1-待审核 2-未通过 3-已认证)	 */
        status: CAR_VERIFY_STATUS
        /** 审核状态描述 */
        status_desc: string
    }
}