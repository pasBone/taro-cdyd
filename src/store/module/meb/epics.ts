import { of } from "rxjs"
import { distinctUntilChanged, filter, mergeMap, switchMap } from "rxjs/operators"
import { getType, isActionOf } from "typesafe-actions"
import { loginActionaAsync } from "./action";
import { Epic } from 'redux-observable';


export const loginEpics: Epic = (action$, state$, { api }) => {
    return action$.pipe(
        filter(isActionOf(loginActionaAsync.request)),
        distinctUntilChanged(),
        switchMap(action => api.meb.login(action.payload)),
        mergeMap(res => {
            if (res.success) {

                return of(
                    loginActionaAsync.success(res.data),
                )
            } else {
                console.log(getType(loginActionaAsync.failure))
                return of(loginActionaAsync.failure(res))
            }
        }),
    )
}