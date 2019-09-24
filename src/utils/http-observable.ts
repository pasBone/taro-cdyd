import { Observable, of, throwError, from } from "rxjs"
import { catchError, filter, switchMap, tap } from "rxjs/operators"
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
        return (params?: Q): Observable<Res<P>> => {

            const TaroRequest = Taro.request({
                url: `${BASE_URL}${url}`,
                method: "POST",
                data: {
                    ...params,
                    operator_code: OPERATOR_CODE
                },
                header: genHeader()
            });

            return from(TaroRequest).pipe(
                switchMap(response => {
                    if (response.statusCode === 200) {
                        return response.data as Promise<Res<P>>
                    }
                    return throwError({
                        success: false,
                        message: `Error ${response.statusCode}`,
                    })
                }),
                tap(res => {
                    if (res.code === OPERATE_CODE.登录信息失效) {
                        console.log(res, '登录信息失效');
                    }
                }),
                filter(res => res.code !== OPERATE_CODE.登录信息失效),
                switchMap(res => {
                    if (res.code === OPERATE_CODE.success) {
                        return of(res)
                    }
                    res.success = false
                    return throwError(res)
                }),
                catchError(err => {
                    console.log(`请求接口【${url}】出错`, err)
                    return of(err)
                }),
            )
        }
    }
}

export const post = genReqestMethods(RequestType.请求数据)
export const uploadFile = genReqestMethods(RequestType.上传文件)
