import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { RootAction, RootState, isActionOf, Services } from 'typesafe-actions';

import { loadTodosAsync, saveTodosAsync } from './actions';
import { getTodos } from './selectors';

export const loadTodosEpic: Epic<
    RootAction,
    RootAction,
    RootState,
    Services
> = (action$, state$, { api }) => {

    return action$.pipe(
        filter(isActionOf(loadTodosAsync.request)),
        switchMap(() =>
            from(api.todo.loadSnapshot()).pipe(
                map(loadTodosAsync.success),
                catchError((message: string) => of(loadTodosAsync.failure(message)))
            )
        )
    );
}

export const saveTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(saveTodosAsync.request)),
    switchMap(() =>
      from(api.todo.saveSnapshot(getTodos(state$.value.todosReducer))).pipe(
        map(saveTodosAsync.success),
        catchError((message: string) => of(saveTodosAsync.failure(message)))
      )
    )
  );
