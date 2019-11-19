import './style.scss';
import { View } from '@tarojs/components';
import { getDuration } from '@/utils/common';
import CircleProgress from '@/components/circle-progress';
import { useCallback, useEffect, useRef, useState } from '@tarojs/taro';

export const ChargingBall = () => {

  const timer = useRef<any>();
  let [progress, setProgress] = useState(0);
  const update = useCallback(() => {
    setProgress(progress+=0.01)
  }, []);

  useEffect(() => {
    timer.current = setInterval(_ => {
      update();
    }, 100);

    return () => {
      clearInterval(timer.current);
    }
  }, []);

  return (
    <View className="charging-ball">
      <View className="progress-ball">
        <CircleProgress progress={progress}>
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
