import './style.scss';
import { View } from '@tarojs/components';
import { AtButton, AtNavBar } from 'taro-ui';
import { FC, useCallback, usePullDownRefresh, useEffect, navigateBack, switchTab, useDidHide, navigateTo } from '@tarojs/taro';
import { useDispatch, useSelector } from '@tarojs/redux';
import { stopChargeAsync, chargeInfoPollingAsync, clearChargeInfoPollingTimer } from '@/store/module/charge/charge.actions';
import { RootState } from '@/store/types';
import { ORDER_STATUS } from '@/constant';
import { chargeApi } from '@/api/charge';
import { ChargingBall } from './charging-ball';
import { ChargingData } from './charging-data';
import { ChargingInfo } from './charging-info';

export const ChargingView: FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  const stopChargeInfo = useSelector((state: RootState) => state.charge.stopCharge);
  const { order_status, pile_sn } = chargeInfo;
  const { meb_id } = userInfo;

  const getChargeInfo = useCallback(() => {
    return dispatch(
      chargeInfoPollingAsync({
        meb_id,
        frequency: 30000,
        pollingTimes: 100
      }, (data: { stopPolling: Function, payload: chargeApi.GetChargingInfoRes }) => {
        console.log('实时计费>获取充电信息>>>');
        if (order_status != ORDER_STATUS.正在充电 && order_status != ORDER_STATUS.暂停中) {
          data.stopPolling();
          /** 没有正在充电的信息则跳转到首页 */
          switchTab({
            url: '/pages/home/index'
          });
        }
      })
    )
  }, [meb_id, order_status]);

  /** 结束充电 */
  const stopCharge = useCallback(() => {
    if (stopChargeInfo.loading) return;
    dispatch(
      stopChargeAsync({
        meb_id,
        pile_sn,
        startup_mode: 1
      })
    );
  }, [meb_id, order_status, pile_sn]);

  useEffect(() => {
    getChargeInfo();
  }, [meb_id]);

  usePullDownRefresh(() => {
    getChargeInfo();
  });

  useDidHide(() => {
    dispatch(
      clearChargeInfoPollingTimer()
    )
  });

  return (
    <View className="charging-realtime__view">

      <AtNavBar
        leftIconType="chevron-left"
        color='#fff'
        fixed
        border={false}
        customStyle={{ backgroundColor: 'rgba(255,255,255,0)', top: '36rpx' }}
        onClickLeftIcon={() => navigateBack({
          fail: () => navigateTo({ url: '/pages/home/index' })
        })}
      />

      <View className="charging-box">
        <View className="charging-block">
          <ChargingBall />
          <ChargingData />
          <ChargingInfo />
        </View>
      </View>
      {chargeInfo.order_status === 1 && <AtButton loading={stopChargeInfo.loading} onClick={() => stopCharge()} className="charging-btn">结束充电</AtButton>}
      {chargeInfo.order_status === 2 && <AtButton className="charging-btn">已结束充电，请拔枪</AtButton>}
    </View>
  )
}

ChargingView.config = {
  navigationBarTitleText: '正在充电',
  enablePullDownRefresh: true,
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white'
}