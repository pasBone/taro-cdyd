
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux'
import { userLogin } from '@/store/module/meb/action';

const HooksRedux = () => {
    const state = useSelector<any, any>(state => state.mebReducer)
    const dispatch = useDispatch()
    return (
        <View>
            <AtButton className='add_btn' onClick={() => dispatch(userLogin({a:10}))}>+</AtButton>
            <AtButton className='dec_btn' onClick={() => dispatch({ type: 'ADD' })}>-</AtButton>
            <View>值：{state.num}</View>
        </View>
    )
}

export default HooksRedux;