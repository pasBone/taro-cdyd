import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { addTodo, switchTodo, loadTodoAsync, saveTodoAsync, switchTodoAsync } from './actions';
import { Todo } from 'MyModels';

const initialTodos: Todo[] = [{
  done: false,
  disabled: false,
  name: 'You can add new todos using the form or load saved snapshot...',
}]

export const isLoadingTodos = createReducer(false)
  .handleAction([loadTodoAsync.request], () => true)
  .handleAction(
    [loadTodoAsync.success, loadTodoAsync.failure],
    () => false
  );

export const todos = createReducer({
  list: initialTodos,
  loading: false,
})
  .handleAction(addTodo, (state, action) => ({ list: [...state.list, action.payload], loading: false }))
  .handleAction(switchTodo, (state, action) => {
    const payload = action.payload;
    state.list = state.list.map((item, index) => ({ ...item, done: index === payload.index ? payload.done : item.done }))
    return state;
  })
  .handleAction(loadTodoAsync.request, (state, action) => ({ ...state, loading: false }))
  .handleAction(loadTodoAsync.success, (state, action) => ({ ...state, loading: false }))
  .handleAction(loadTodoAsync.failure, (state, action) => ({ ...state, loading: false }))
  .handleAction(saveTodoAsync.request, state => ({ ...state, loading: true }))
  .handleAction(saveTodoAsync.success, (state, action) => ({ list: [...state.list, ...action.payload], loading: false }))
  .handleAction(saveTodoAsync.failure, state => ({ ...state, loading: true }))
  .handleAction(switchTodoAsync.request, state => ({ ...state, loading: true }))
  .handleAction(switchTodoAsync.success, (state, action) => {
    const payload = action.payload;
    state.list = state.list.map((item, index) => ({ ...item, done: index === payload.index ? payload.done : item.done }))
    return {
      ...state,
      loading: false
    };
  })

const todosReducer = combineReducers({
  isLoadingTodos,
  todos,
});

export default todosReducer;
export type TodosState = ReturnType<typeof todosReducer>;
