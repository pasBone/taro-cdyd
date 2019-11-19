import './style.scss';
import { View } from '@tarojs/components';
import { getDuration } from '@/utils/common';
import CircleProgress from '@/components/circle-progress';
import { useSelector } from '@tarojs/redux';
import { RootState } from '@/store/types';

export const ChargingBall = () => {
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  return (
    <View className="charging-ball">
      <View className="progress-ball">
        <CircleProgress progress={(chargeInfo.charging_data.soc * 0.02).toFixed(2)}>
          <View className="progress-content">
            <View className="soc">SOC</View>
            <View className="value">{chargeInfo.charging_data.soc}%</View>
            <View className="full-time">充满预计{getDuration(chargeInfo.duration, '小时', '分钟', '分')}</View>
          </View>
        </CircleProgress>
      </View>
    </View>
  )
}
