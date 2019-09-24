import { of } from "rxjs"
import { distinctUntilChanged, filter, mergeMap, switchMap } from "rxjs/operators"
import { isActionOf, DetaultEpic } from "typesafe-actions"
import { loginActionaAsync } from "./actions";


export const loginEpics: DetaultEpic = (action$, state$, { api }) => {
    return action$.pipe(
        filter(isActionOf(loginActionaAsync.request)),
        distinctUntilChanged(),
        switchMap(action => api.meb.login(action.payload)),
        mergeMap(res => {
            console.log(res);
            if (res.success) {

                return of(
                    loginActionaAsync.success(res.data),
                )
            } else {
                // console.log(getType(loginActionaAsync.failure))
                return of(loginActionaAsync.failure(res))
            }
        }),
    )
}