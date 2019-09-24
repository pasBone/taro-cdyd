import { useState } from "@tarojs/taro";
import { useDispatch } from "@tarojs/redux";
import { AtForm, AtInput, AtButton } from "taro-ui";
import { addTodo } from '@/store/module/todos/actions'

const AddTodosView = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleNameChange = (name: string) => {
        setName(name)
    }

    const handleAddClick = () => {
        dispatch(addTodo({
            payload: {
                name,
                disabled: false,
                done: false
            }
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
            <AtButton onClick={handleAddClick} disabled={!name}>
                Add
        </AtButton>
        </AtForm>
    )
}

export default AddTodosView;