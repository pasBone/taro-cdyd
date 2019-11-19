import './style.scss';
import { View } from '@tarojs/components';
import { FC } from '@tarojs/taro';
import { ChargingBall } from './charging-ball';
import { ChargingData } from './charging-data';
import { ChargingInfo } from './charging-info';
import { AtButton } from 'taro-ui';

export const ChargingView: FC = () => {
  return (
    <View className="charging-realtime__view">
      <View className="charging-box">
        <View className="charging-block">

          <ChargingBall />
          <ChargingData />
          <ChargingInfo />

        </View>
      </View>

      <AtButton className="charging-btn">结束充电</AtButton>
    </View>
  )
}

ChargingView.config = {
  navigationBarTitleText: '正在充电',
  enablePullDownRefresh: true,
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white'
}