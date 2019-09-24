import { Todo } from 'MyModels';
import { createStandardAction, createAsyncAction } from 'typesafe-actions';

/** 标准action */
export const addTodo = createStandardAction('ADD_TODO').map((payload: { payload: Todo }) => payload);
export const switchTodo = createStandardAction('SWITCH_TODO').map((payload: { payload: Todo & { index: number } }) => payload);

/** 异步loading */
export const loadTodoAsync = createAsyncAction(
  'LOAD_TODOS_REQUEST',
  'LOAD_TODOS_SUCCESS',
  'LOAD_TODOS_FAILURE'
)<undefined, Todo[], string>();

/** 异步添加 */
export const saveTodoAsync = createAsyncAction(
  'SAVE_TODO_REQUEST',
  'SAVE_TODO_SUCCESS',
  'SAVE_TODO_FAILURE',
)<Todo, Todo[], string>();

export const switchTodoAsync = createAsyncAction(
  'SWITCH_TODO_REQUEST',
  'SWITCH_TODO_SUCCESS',
  'SWITCH_TODO_ERROR'
)<Todo & { index: number }, Todo & { index: number }, string>()
// export const removeTodo = createStandardAction('REMOVE_TODO')<string>();

// export const loadTodosAsync = createAsyncAction(
//   'LOAD_TODOS_REQUEST',
//   'LOAD_TODOS_SUCCESS',
//   'LOAD_TODOS_FAILURE'
// )<undefined, Todo[], string>();

// export const saveTodosAsync = createAsyncAction(
//   'SAVE_TODOS_REQUEST',
//   'SAVE_TODOS_SUCCESS',
//   'SAVE_TODOS_FAILURE'
// )<undefined, undefined, string>();
