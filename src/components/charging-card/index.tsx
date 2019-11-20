import './style.scss';
import { CoverView, Text, View } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { useMemo, navigateTo, useEffect, useCallback, useState, useRef } from '@tarojs/taro';
import { getDurationFull } from '@/utils/common';
import { useHasOngoingOrder } from '@/hooks/use-has-ongoing-order';
import { getChargeInfoAsync } from '@/store/module/charge/charge.actions';
import { ORDER_STATUS } from '@/constant';
export const ChargingCard = () => {
  const dispatch = useDispatch();
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  let [duration, setDuration] = useState(chargeInfo.duration);
  let [times, setTimes] = useState(0);

  const durationTime = useMemo(() => {
    return getDurationFull(duration);
  }, [duration, chargeInfo.duration]);

  const getChargeInfo = useCallback(() => {
    dispatch(
      getChargeInfoAsync({
        meb_id: userInfo.meb_id
      })
    ).then(_=>{
      setDuration(chargeInfo.duration);
    });
  }, [chargeInfo.duration]);

  useEffect(() => {
    getChargeInfo();
  }, []);

  /** 按秒递增充电时长 */
  useEffect(() => {
    let timer = setTimeout(() => {
      if (chargeInfo.order_status === ORDER_STATUS.正在充电) {
        setDuration(duration + 1000);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [duration, chargeInfo.duration, chargeInfo.order_status]);

  /** 定时请求接口 */
  useEffect(() => {
    let timer = setTimeout(_ => {
      if (chargeInfo.order_status === ORDER_STATUS.正在充电) {
        setTimes(times + 1);
        getChargeInfo();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [times, chargeInfo.order_status]);


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