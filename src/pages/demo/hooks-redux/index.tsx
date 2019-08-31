
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux'
import { loginActionaAsync } from '@/store/module/meb/action';


const login = ()=>{
    loginActionaAsync.request({
        tel: 13038360141,
        reg_way: 2,
        code: 123456
    })
}

const HooksRedux = () => {
    const state = useSelector<any, any>(state => state.mebReducer)
    const dispatch = useDispatch()
    return (
        <View>
            <AtButton className='add_btn' onClick={() => dispatch(login)}>+</AtButton>
            <AtButton className='dec_btn' onClick={() => dispatch({ type: 'ADD' })}>-</AtButton>
            <View>值：{state.num}</View>
        </View>
    )
}

export default HooksRedux;