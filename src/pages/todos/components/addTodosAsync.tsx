import { useState } from "@tarojs/taro";
import { useDispatch, useSelector } from "@tarojs/redux";
import { AtForm, AtInput, AtButton } from "taro-ui";
import { saveTodoAsync } from '@/store/module/todos/actions'
import { RootState } from "typesafe-actions";

const AddTodosView = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.todos.todos);


    const handleNameChange = (name: string) => {
        setName(name)
    }

    const handleAddClick = () => {
        dispatch(saveTodoAsync.request({
            name,
            disabled: false,
            done: false
        }));
        setName('');
    }

    return (
        <AtForm>
            <AtInput
                name="abc"
                type="text"
                placeholder="Enter new item"
                value={name}
                onChange={handleNameChange}
            />
            <AtButton loading={loading} onClick={handleAddClick} disabled={!name}>
                Add
        </AtButton>
        </AtForm>
    )
}

export default AddTodosView;