import './style.scss';
import { View } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { navigateTo, useEffect, useDidHide, useState, useDidShow } from '@tarojs/taro';
import { useHasOngoingOrder } from '@/hooks/use-has-ongoing-order';
import { chargeInfoPollingAsync, clearChargeInfoPollingTimer } from '@/store/module/charge/charge.actions';
import { ORDER_STATUS } from '@/constant';
import { useDuration } from '@/hooks/use-duration';
import { chargeApi } from '@/api/charge';

export const ChargingCard = () => {
  const dispatch = useDispatch();
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const { order_status } = chargeInfo;
  const { meb_id } = userInfo;
  const [start, setStart] = useState(true);

  /** 定时请求接口 */
  useEffect(() => {
    if (userInfo.meb_id && userInfo.token && start) {
      dispatch(
        chargeInfoPollingAsync({
          meb_id,
          pollingTimes: 100,
          frequency: 30000
        },
          (data: { stopPolling: Function, payload: chargeApi.GetChargingInfoRes }) => {
            console.log('首页>充电悬浮块>获取充电信息>>>');
            if (order_status != ORDER_STATUS.正在充电 && order_status != ORDER_STATUS.暂停中) {
              data.stopPolling();
            }
          },
          () => { }
        )
      );
    }
  }, [order_status, meb_id, start]);

  useDidHide(() => {
    setStart(false);
    dispatch(clearChargeInfoPollingTimer());
  });

  useDidShow(() => {
    setStart(true);
  });

  const durationTime = useDuration();

  return (
    useHasOngoingOrder().hasOngoingOrder ?
      <View className="charging-card" onClick={() => navigateTo({ url: '/pages/charging/index' })}>
        <View className="charging-card__ball">
          <View className="water w1"></View>
          <View className="water w2"></View>
          <View className="water"></View>
        </View>

        <View className="charging-card__block">
          <View className="charging-card__status">
            <View className="charging-card__state">正在充电中</View>
            <View className="charging-card__price">
              <View>￥{chargeInfo.total_fee || 0.00}</View>
            </View>
          </View>

          <View className="charging-card__time">
            <View>{durationTime}　|　{chargeInfo.electricity || 0}度</View>
            <View className="current-money">当前费用</View>
          </View>
        </View>
      </View>
      :
      <View></View>
  )
}