import './style.scss';
import { View } from '@tarojs/components';
import { FC, useCallback, usePullDownRefresh, useEffect, useRef, navigateTo, switchTab } from '@tarojs/taro';
import { ChargingBall } from './charging-ball';
import { ChargingData } from './charging-data';
import { ChargingInfo } from './charging-info';
import { AtButton } from 'taro-ui';
import { useDispatch, useSelector } from '@tarojs/redux';
import { getChargeInfoAsync } from '@/store/module/charge/charge.actions';
import { RootState } from '@/store/types';
import { ORDER_STATUS } from '@/constant';

export const ChargingView: FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  let timer = useRef<any>();

  const getChargeInfo = useCallback(() => {
    dispatch(
      getChargeInfoAsync({
        meb_id: userInfo.meb_id
      })
    ).finally(_ => {
      if (chargeInfo.order_status === ORDER_STATUS.正在充电) {
        timer.current = setTimeout(_ => {
          getChargeInfo();
        }, 10000);
      } else if (chargeInfo.order_status === ORDER_STATUS.暂停中) {
        // todo 变更状态为已结束
      } else {
        switchTab({
          url: '/pages/home/index'
        });
        //todo 充电已结束。
      }
    });
  }, [userInfo.meb_id, chargeInfo.order_status]);

  usePullDownRefresh(() => {
    getChargeInfo();
  });

  useEffect(() => {
    getChargeInfo();

    return () => {
      clearTimeout(timer.current);
    }
  }, [userInfo.meb_id]);

  return (
    <View className="charging-realtime__view">
      <View className="charging-box">
        <View className="charging-block">
          <ChargingBall />
          <ChargingData />
          <ChargingInfo />
        </View>
      </View>
      {
        chargeInfo.order_status === 1 && <AtButton className="charging-btn">结束充电</AtButton>
      }
      {
        chargeInfo.order_status === 2 && <AtButton className="charging-btn">已结束充电，请拔枪</AtButton>
      }

    </View>
  )
}

ChargingView.config = {
  navigationBarTitleText: '正在充电',
  enablePullDownRefresh: true,
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white'
}