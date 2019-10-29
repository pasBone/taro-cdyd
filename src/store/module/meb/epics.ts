import { of } from "rxjs"
import { distinctUntilChanged, filter, mergeMap, switchMap } from "rxjs/operators"
import { isActionOf, DefaultEpic } from "typesafe-actions"
import { loginActionaAsync, sendCodeActionaAsync } from "./actions";
import Toast from "@/utils/toast";
import Taro from "@tarojs/taro";

export const loginEpics: DefaultEpic = (action$, state$, { api }) => {
    return action$.pipe(
        filter(isActionOf(loginActionaAsync.request)),
        distinctUntilChanged(),
        switchMap(action => api.meb.login(action.payload)),
        mergeMap(res => {
            if (res.success) {
                Taro.setStorage({ key: 'userInfo', data: res.data })
                return of(
                    loginActionaAsync.success(res.data),
                )
            } else {
                Toast.info('账号或密码错误');
                return of(loginActionaAsync.failure(res))
            }
        }),
    )
}

export const sendCodeRpics: DefaultEpic = (action$, state$, { api }) => action$.pipe(
    filter(isActionOf(sendCodeActionaAsync.request)),
    distinctUntilChanged(),
    switchMap(action => {
        return api.meb.sendCode(action.payload)
    }),
    mergeMap(res => {
        if (res.success) {
            Toast.succeed('发送成功');
            return of(sendCodeActionaAsync.success(res.data))
        } else {
            Toast.alert('发送验证码失败');
            return of(
                sendCodeActionaAsync.failure(res)
            )
        }
    })
)