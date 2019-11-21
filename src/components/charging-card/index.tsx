import './style.scss';
import { CoverView, Text, View } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { navigateTo, useEffect } from '@tarojs/taro';
import { useHasOngoingOrder } from '@/hooks/use-has-ongoing-order';
import { chargeInfoPollingAsync } from '@/store/module/charge/charge.actions';
import { ORDER_STATUS } from '@/constant';
import { useDuration } from '@/hooks/use-duration';
import { chargeApi } from '@/api/charge';

export const ChargingCard = () => {
  const dispatch = useDispatch();
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const { order_status } = chargeInfo;
  const { meb_id } = userInfo;

  /** 定时请求接口 */
  useEffect(() => {
    dispatch(
      chargeInfoPollingAsync({
        meb_id,
        pollingTimes: 3000,
        frequency: 100
      })
    ).then((data: { stopPolling: Function, payload: chargeApi.GetChargingInfoRes }) => {
      if (order_status != ORDER_STATUS.正在充电 && order_status != ORDER_STATUS.暂停中) {
        data.stopPolling();
      }
    });

  }, [order_status, meb_id]);

  const durationTime = useDuration();

  return (
    useHasOngoingOrder().hasOngoingOrder ?
      <CoverView className="charging-card" onClick={() => navigateTo({ url: '/pages/charging/index' })}>
        <CoverView className="charging-card__ball">
          <CoverView className="water w1"></CoverView>
          <CoverView className="water w2"></CoverView>
          <CoverView className="water"></CoverView>
        </CoverView>

        <CoverView className="charging-card__block">
          <CoverView className="charging-card__status">
            <CoverView className="charging-card__state">正在充电中</CoverView>
            <CoverView className="charging-card__price">
              <CoverView>￥{chargeInfo.total_fee || 0.00}</CoverView>
            </CoverView>
          </CoverView>

          <CoverView className="charging-card__time">
            <CoverView>{durationTime}　|　{chargeInfo.electricity || 0}度</CoverView>
            <CoverView className="current-money">当前费用</CoverView>
          </CoverView>
        </CoverView>
      </CoverView>
      :
      <View></View>
  )
}