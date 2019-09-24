import { FC } from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";
import { useSelector, useDispatch } from "@tarojs/redux";
import { RootState } from "typesafe-actions";
import { View } from "@tarojs/components";
import { switchTodo } from '@/store/module/todos/actions'
import { Todo } from "MyModels";

const TodoList: FC = () => {

    const todoList = useSelector((state: RootState) => state.todos.todos.list);
    const dispatch = useDispatch();

    const handleChange = (item: Todo, index: number) => {
        dispatch(switchTodo({
            payload: {
                ...item,
                done: !item.done,
                index
            }
        }))
    }

    return (
        <View>
            <AtList>
                {
                    todoList.map((item, index) => (
                        <AtListItem
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