import { FC } from "@tarojs/taro";
import { View } from "@tarojs/components";
import TodoListView from './components/todoList'
import TodoListAsyncView from './components/todoListAsync'
import AddTodosView from './components/addTodos'
import AddTodosAsyncView from './components/addTodosAsync'

export const Todos: FC = () => (
    <View>
        <View>
            <TodoListView />
            <AddTodosView />
        </View>
        <View>
            <TodoListAsyncView />
            <AddTodosAsyncView />
        </View>
    </View>
) 