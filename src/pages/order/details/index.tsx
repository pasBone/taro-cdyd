import './style.scss'
import { FC, usePullDownRefresh, useEffect, hideNavigationBarLoading, stopPullDownRefresh, showNavigationBarLoading, useCallback, useRouter, setNavigationBarTitle, showLoading, hideLoading } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { CardBox } from '@/components/card'
import { ListCell } from '@/components/list-cell'
import { useSelector, useDispatch } from '@tarojs/redux'
import { RootState } from '@/store/types'
import { getOrderDetailsAsync } from '@/store/module/order/order.actions'
import { STARTUP_MODE } from '@/api/order'
import { formatDate, getDuration } from '@/utils/common'
import { getStationDetailsAsync } from '@/store/module/station/station.actions'

const cellProps = {
  itemStyle: { padding: 0 },
  showArrow: false
}

export const OrderDetailsView: FC = () => {

  const $router = useRouter();
  const orderId = $router.params.id;
  const stationId = $router.params.stationId;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state: RootState) => state.order.orderDetails);
  const stationDetails = useSelector((state: RootState) => state.station.stationDetails);

  const getOrderDetails = useCallback(() => {
    setNavigationBarTitle({ title: '订单详情' });
    showLoading();
    showNavigationBarLoading();
    dispatch(
      getOrderDetailsAsync({
        order_id: orderId
      })
    ).finally(_ => {
      hideLoading();
      stopPullDownRefresh();
      hideNavigationBarLoading();
    });
  }, [orderId]);

  const getStationDetails = useCallback(() => {
    dispatch(
      getStationDetailsAsync({
        station_id: stationId
      })
    );
  }, [stationId])

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);

  useEffect(() => {
    getStationDetails();
  }, [stationId])

  usePullDownRefresh(() => {
    getOrderDetails();
    getStationDetails();
  });

  return (
    <View className="order-details__view">
      <CardBox title="计费信息" customStyle={{ marginBottom: 0, borderBottom: '8px solid #f2f2f2' }}>
        <View>
          <ListCell label="订单号：" value={orderDetails.order_id} {...cellProps} />
          <ListCell label="启动方式：" value={STARTUP_MODE[orderDetails.startup_mode]} {...cellProps} />
          <ListCell label="开始时间：" value={formatDate(orderDetails.start_time)} {...cellProps} />
          <ListCell label="结束时间：" value={formatDate(orderDetails.end_time)} {...cellProps} />
          <ListCell label="充电时长：" value={getDuration(orderDetails.duration)} {...cellProps} />
          <ListCell label="充电度数：" value={orderDetails.electricity + 'kWh'} {...cellProps} />
          <ListCell label="电费：" renderValue={<Text style={{ color: '#f54c2b' }}>￥{orderDetails.charge_fee}</Text>} {...cellProps} />
          <ListCell label="服务费：" renderValue={<Text style={{ color: '#f54c2b' }}>￥{orderDetails.service_fee}</Text>} {...cellProps} />
          <ListCell label="总金额：" renderValue={<Text style={{ color: '#f54c2b' }}>￥{orderDetails.total_fee}</Text>} {...cellProps} />
        </View>
      </CardBox>

      <CardBox title="站点信息">
        <View>
          <ListCell label="电桩编号：" value={orderDetails.pile_code} {...cellProps} />
          <ListCell label="充电站点：" value={stationDetails.station_name} {...cellProps} />
          <ListCell label="站点地址：" value={stationDetails.address} {...cellProps} />
        </View>
      </CardBox>
    </View>
  )
}

OrderDetailsView.config = {
  navigationBarTitleText: '订单详情',
  enablePullDownRefresh: true
}