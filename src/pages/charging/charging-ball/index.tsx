import './style.scss';
import { View } from '@tarojs/components';
import { getDuration } from '@/utils/common';
import CircleProgress from '@/components/circle-progress';

export const ChargingBall = () => {
  return (
    <View className="charging-ball">
      <View className="progress-ball">
        <CircleProgress>
          <View className="progress-content">
            <View className="soc">SOC</View>
            <View className="value">{60}%</View>
            <View className="full-time">充满预计{getDuration(25685555, '小时', '分钟', '分')}</View>
          </View>
        </CircleProgress>
      </View>
    </View>
  )
}
