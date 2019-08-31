import qs from "query-string"
import { Observable, of, throwError } from "rxjs"
import { fromFetch } from "rxjs/fetch"
import { catchError, filter, switchMap, tap } from "rxjs/operators"
import { OPERATE_CODE, Res } from "src/types"
import { OPERATOR_CODE } from '@/constant';


const BASE_URL = "http://wap.succtime.com/wap"

const stringify = (obj?: any) => qs.stringify({ ...obj, operator_code: OPERATOR_CODE }, { arrayFormat: "comma" });

const defaultHeaders: RequestInit["headers"] = {
    "Content-Type": "application/x-www-form-urlencoded",
    Connection: "close",
}

let _token = "";

export const setToken = (t: string) => (_token = t)

enum RequestType {
    "请求数据",
    "上传文件",
}

const genGetHeaderMethods = (type: RequestType) => {
    if (type === RequestType.上传文件) {
        return () => ({
            "Content-Type": "multipart/form-data",
        })
    }
    return () => {
        return { ...defaultHeaders, token: _token }
    }
}
const genGetBodyMethods = (type: RequestType) => {
    if (type === RequestType.上传文件) {
        return <T>(params: T) => {
            return params
        }
    }
    return stringify
}

const genReqestMethods = (type: RequestType) => {
    const genHeader = genGetHeaderMethods(type)
    const genBody = genGetBodyMethods(type)

    return <Q = void, P = void>(url: string) => {
        return (params?: Q): Observable<Res<P>> => {
            return fromFetch(`${BASE_URL}${url}`, {
                method: "POST",
                headers: genHeader(),
                body: genBody(params),
            }).pipe(
                switchMap(response => {
                    if (response.ok) {
                        return response.json() as Promise<Res<P>>
                    }
                    return throwError({
                        success: false,
                        message: `Error ${response.status}`,
                    })
                }),
                tap(res => {
                    if (res.code === OPERATE_CODE.登录信息失效) {

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
