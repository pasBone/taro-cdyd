import './style.scss'
import { View, Text } from "@tarojs/components"
import { EmptyData } from '@/components/empty-data';
import { useReachBottom, useEffect, usePullDownRefresh, stopPullDownRefresh, hideNavigationBarLoading, useCallback, showNavigationBarLoading, FC, navigateTo, useMemo, useDidShow } from '@tarojs/taro';
import { useDispatch, useSelector } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { getOrderListAsync } from '@/store/module/order/order.actions';
import { AtLoadMore } from 'taro-ui';
import { formatDate } from '@/utils/common';

export function OrderListView() {

  const orderList = useSelector((state: RootState) => state.order.orderList);
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const dispatch = useDispatch();

  /** 获取列表 */
  const getOrderList = useCallback((isRefresh = false) => {
    if (orderList.lastPage && !isRefresh) return;
    showNavigationBarLoading();
    dispatch(
      getOrderListAsync({
        meb_id: userInfo.meb_id,
        pageSize: 10,
        pageNumber: isRefresh ? 1 : orderList.pageNumber + 1
      })
    ).then(_ => {
      stopPullDownRefresh();
      hideNavigationBarLoading();
    })
  }, [orderList.pageNumber, orderList.lastPage]);

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

  useDidShow(() => {
    if (typeof this.$scope.getTabBar === 'function' &&
      this.$scope.getTabBar()) {
      this.$scope.getTabBar().$component.setState({
        selected: 3,
      });
    }
  });

  const isEmpty = useMemo(() => {
    return orderList.list.length == 0 && orderList.loading == false
  }, [orderList]);

  return (
    <View className="order-list__view">
      {
        isEmpty
          ?
          <EmptyData />
          :
          <View>
            {
              orderList.list.map(item => (
                <View className="order-list" key={item.order_id} onClick={() => navigateTo({ url: `/pages/order/details/index?id=${item.order_id}&stationId=${item.station_id}` })}>
                  <View className="order-list__item">
                    <View className="order-list__title">
                      <View className="desc">{item.station_name}</View>
                      <Text>￥{item.total_fee}</Text>
                    </View>
                    <View className="order-list__time">
                      <Text>{formatDate(item.end_time)}</Text>
                      <Text>充电电量{item.electricity}kWh</Text>
                    </View>
                  </View>
                </View>
              ))
            }
            {orderList.loading && <AtLoadMore status={'loading'} />}
            {orderList.lastPage && <AtLoadMore status={'noMore'} />}
          </View>
      }
    </View>
  )
}

OrderListView.config = {
  navigationBarTitleText: '订单列表',
  enablePullDownRefresh: true
}