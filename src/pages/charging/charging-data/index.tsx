import './style.scss';
import { View, Text } from '@tarojs/components';
import { RootState } from '@/store/types';
import { useSelector } from '@tarojs/redux';
import { useDuration } from '@/hooks/use-duration';

export const ChargingData = () => {
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  const durationTime = useDuration();
  return (
    <View className="charging-data">
      <View className="charging-item">
        <View className="value">{durationTime}</View>
        <View className="label">充电时长</View>
      </View>

      <View className="charging-item">
        <View className="value">{chargeInfo.electricity}</View>
        <View className="label">充电度数</View>
      </View>

      <View className="charging-item">
        <View className="value"><Text>￥</Text>{chargeInfo.total_fee}</View>
        <View className="label">当前费用</View>
      </View>
    </View>
  )
}
