import './style.scss';
import { CoverView, Text, View } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { useMemo } from '@tarojs/taro';
import { getDurationFull } from '@/utils/common';
import { useHasOngoingOrder } from '@/hooks/use-has-ongoing-order';
export const ChargingCard = () => {
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);

  const duration = useMemo(() => {
    return getDurationFull(chargeInfo.duration);
  }, [chargeInfo.duration]);

  return (
    useHasOngoingOrder().hasOngoingOrder ?
      <CoverView className="charging-card">
        <CoverView className="charging-card__ball">
          <CoverView className="water w1"></CoverView>
          <CoverView className="water w2"></CoverView>
          <CoverView className="water"></CoverView>
        </CoverView>

        <CoverView className="charging-card__block">
          <CoverView className="charging-card__status">
            <CoverView className="charging-card__state">正在充电中</CoverView>
            <CoverView className="charging-card__price">
              <CoverView>￥</CoverView>
              <CoverView>{chargeInfo.total_fee}</CoverView>
            </CoverView>
          </CoverView>

          <CoverView className="charging-card__time">
            <CoverView>
              <CoverView><Text>{duration}</Text>　|　{chargeInfo.electricity}度</CoverView>
            </CoverView>
            <CoverView className="current-money">当前费用</CoverView>
          </CoverView>
        </CoverView>
      </CoverView>
      :
      <View></View>
  )
}