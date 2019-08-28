import Toast from '@/components/toast'
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { useState } from '@tarojs/taro';

function CounterDemo() {

    const [tostState, setToastState] = useState(false);

    return (
        <View>
            <Toast toast={{ show: tostState, text: '哈哈哈哈哈哈哈', duration: 0 }} />
            <AtButton onClick={() => setToastState(state => !state)} />
        </View>
    )
}

export default CounterDemo