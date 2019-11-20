import './style.scss';
import { View, Text } from '@tarojs/components';
import { RootState } from '@/store/types';
import { useSelector } from '@tarojs/redux';
import { useEffect, useRef, useState, useMemo } from '@tarojs/taro';
import { getDurationFull } from '@/utils/common';

export const ChargingData = () => {
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  let [duration, setDuration] = useState(chargeInfo.duration);
  let timer = useRef<any>();

  const durationTime = useMemo(() => {
    console.log(chargeInfo.duration, 'chargeInfo.duration1');
    return getDurationFull(duration);
  }, [duration, chargeInfo.duration]);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDuration(duration + 1000);
    }, 1000);
    return () => clearTimeout(timer.current);
  }, [duration]);

  useEffect(() => {
    console.log(chargeInfo.duration, 'chargeInfo.duration2');
    setDuration(() => chargeInfo.duration);
  }, [chargeInfo.duration]);

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
