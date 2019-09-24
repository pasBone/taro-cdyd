import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { RootAction, RootState, isActionOf, Services } from 'typesafe-actions';
import { loadTodoAsync, saveTodoAsync, switchTodoAsync } from './actions';
import { getTodos } from './selectors';

export const loadTodosAsyncEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) => {
  return action$.pipe(
    filter(isActionOf(loadTodoAsync.request)),
    switchMap(() =>
      from(api.todo.loadSnapshot(getTodos(state$.value.todos))).pipe(
        map(loadTodoAsync.success),
        catchError((message: string) => of(loadTodoAsync.failure(message)))
      )
    )
  )
}

export const saveTodosAsyncEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) => {
  return action$.pipe(
    filter(isActionOf(saveTodoAsync.request)),
    switchMap((data) => {
      return from(api.todo.saveSnapshot([data.payload])).pipe(
        map(saveTodoAsync.success),
        catchError((message: string) => of(saveTodoAsync.failure(message)))
      )
    })
  )
}

export const switchTodoAsyncEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) => {
  return action$.pipe(
    filter(isActionOf(switchTodoAsync.request)),
    switchMap((data) => {
      return from(api.todo.switchTodo(data.payload)).pipe(
        map(switchTodoAsync.success),
        catchError((message: string) => of(switchTodoAsync.failure(message)))
      )
    })
  )
}