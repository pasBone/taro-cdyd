import { throwError } from "rxjs"
import { OPERATE_CODE, Res } from "@/types"
import { OPERATOR_CODE } from '@/constant';
import Taro from '@tarojs/taro';

const BASE_URL = "https://wx.succtime.com/wx"

let token = "";

export const setToken = (t: string) => (token = t)

enum RequestType {
    "请求数据",
    "上传文件",
}

const defaultHeaders: RequestInit["headers"] = {
    "Content-Type": "application/x-www-form-urlencoded",
}

const genGetHeaderMethods = (type: RequestType) => {
    if (type === RequestType.上传文件) {
        return () => ({
            "Content-Type": "multipart/form-data",
        })
    }
    return () => {
        return { ...defaultHeaders, token }
    }
}

const genReqestMethods = (type: RequestType) => {
    const genHeader = genGetHeaderMethods(type)

    return <Q = void, P = void>(url: string) => {
        return (params?: Q): Promise<Res<P>> => {

            return Taro.request({
                url: `${BASE_URL}${url}`,
                method: "POST",
                data: {
                    ...params,
                    operator_code: OPERATOR_CODE
                },
                header: genHeader()
            }).then((response) => {
                if (response.statusCode === 200) {
                    return response.data
                }
                return throwError({
                    success: false,
                    message: `Error ${response.statusCode}`,
                })
            }).catch(err => {
                console.log(`请求接口【${url}】出错`, err)
            })
        }
    }
}

export const post = genReqestMethods(RequestType.请求数据)
export const uploadFile = genReqestMethods(RequestType.上传文件)
