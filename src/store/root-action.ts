import * as loginActions from "@/store/module/meb/action"
import * as todosActions from '@/store/module/todos/actions';

export const RootAction = {
  login: loginActions,
  todos: todosActions,
}
