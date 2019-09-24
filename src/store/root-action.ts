import * as loginActions from "@/store/module/meb/actions";
import * as todosActions from '@/store/module/todos/actions';

export const RootAction = {
  login: loginActions,
  todos: todosActions,
}
