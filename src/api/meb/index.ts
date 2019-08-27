import { StringOrNumber } from "@/types";

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
}