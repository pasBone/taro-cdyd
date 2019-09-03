
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux'
import { loginActionaAsync } from '@/store/module/meb/action';
import { loadTodosAsync } from '@/store/module/todos/actions';
import { useCallback } from '@tarojs/taro';
import { RootState } from 'typesafe-actions';

const HooksRedux = () => {
    const dispatch = useDispatch();
    const isLoadingTodos = useSelector((state: RootState)=> state.todos.isLoadingTodos)
    const onSendCodeBtnPress = useCallback(() => {
        dispatch(
            loadTodosAsync.request()
        )
    }, [])
    return (
        <View>
            {isLoadingTodos}
            <AtButton className='add_btn' onClick={onSendCodeBtnPress}>+</AtButton>
        </View>
    )
}

export default HooksRedux;