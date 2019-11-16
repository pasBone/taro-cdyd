import './style.scss'
import { View, Text } from "@tarojs/components"
import { EmptyData } from '@/components/empty-data';
import { useReachBottom, useEffect, usePullDownRefresh, stopPullDownRefresh, hideNavigationBarLoading, useCallback, showNavigationBarLoading } from '@tarojs/taro';
import { useDispatch, useSelector } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { getOrderListAsync } from '@/store/module/order/order.actions';

export const OrderListView = () => {

  const order = useSelector((state: RootState) => state.order.orderList);
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const dispatch = useDispatch();

  /** 获取列表 */
  const getOrderList = useCallback((isRefresh = false) => {
    showNavigationBarLoading();
    dispatch(
      getOrderListAsync({
        meb_id: userInfo.meb_id,
        pageSize: 10,
        pageNumber: isRefresh ? 1 : order.pageNumber + 1
      })
    ).then(_ => {
      stopPullDownRefresh();
      hideNavigationBarLoading();
    })
  }, []);

  /** 下拉刷新 */
  usePullDownRefresh(() => {
    getOrderList(true);
  });

  /** 上拉加载更多 */
  useReachBottom(() => {
    getOrderList();
  });

  useEffect(() => {
    getOrderList(true);
  }, []);

  return (
    <View className="order-list__view">
      {
        order.list.length == 0
          ?
          <EmptyData />
          :
          order.list.map(item => (
            <View className="order-list" key={item.order_id}>
              <View className="order-list__item">
                <View className="order-list__title">
                  <View className="desc">item.way_desc</View>
                  <Text>￥item.total_fee</Text>
                </View>
                <View className="order-list__time">
                  <Text>formatDate(item.paid_time)</Text>
                  <Text>item.recharge_label</Text>
                </View>
              </View>
            </View>
          ))
      }
    </View>
  )
}