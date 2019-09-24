import { FC } from "@tarojs/taro";
import { AtList, AtListItem, AtButton } from "taro-ui";
import { useSelector, useDispatch } from "@tarojs/redux";
import { RootState } from "typesafe-actions";
import { View } from "@tarojs/components";
import { loadTodoAsync, switchTodoAsync } from '@/store/module/todos/actions'
import { Todo } from "MyModels";
// import { loadTodoAsync } from "@/store/module/todos/actions";

const dispatch = useDispatch();
const handleLoadTodos = () => {
    dispatch(loadTodoAsync.request())
}

const handleChange = (item: Todo, index: number) => {
    dispatch(switchTodoAsync.request({
        ...item,
        done: !item.done,
        index
    }))
}

const TodoList: FC = () => {
    const { list, loading } = useSelector((state: RootState) => state.todos.todos);
    const isLoading = useSelector((state: RootState) => state.todos.isLoadingTodos);

    return (
        <View>
            <AtButton loading={isLoading} type='primary' onClick={handleLoadTodos}>async component</AtButton>
            <AtList>
                {
                    list.map((item, index) => (
                        <AtListItem
                            disabled={loading}
                            key={item.name}
                            title={item.name}
                            switchIsCheck={item.done}
                            onSwitchChange={handleChange.bind(this, item, index)}
                            iconInfo={{ size: 20, color: '#78A4FA', value: item.done ? 'check' : 'close' }}
                            isSwitch
                        />
                    ))
                }
            </AtList>
        </View>
    )
}

export default TodoList;