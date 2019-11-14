import './style.scss'
import { FC, useCallback, useEffect, usePullDownRefresh, useReachBottom, useState, stopPullDownRefresh, hideNavigationBarLoading, showNavigationBarLoading, useMemo } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useSelector, useDispatch } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { getStationListAsync } from '@/store/module/station/station.actions';
import { AtLoadMore } from 'taro-ui';

export const StationList: FC = () => {
  const stationList = useSelector((state: RootState) => state.station.stationList);
  const { latitude, longitude } = useSelector((state: RootState) => state.common.gpsLocation);
  const dispatch = useDispatch();

  /** 获取列表 */
  const getStationList = useCallback((isRefresh = false) => {
    showNavigationBarLoading();
    dispatch(
      getStationListAsync({
        latitude,
        longitude,
        pageSize: 10,
        pageNumber: isRefresh ? 1 : stationList.pageNumber + 1
      })
    ).then(_ => {
      stopPullDownRefresh();
      hideNavigationBarLoading();
    })
  }, [stationList, latitude, longitude]);

  /** 下拉刷新 */
  usePullDownRefresh(() => {
    getStationList(true);
  });

  /** 上拉加载更多 */
  useReachBottom(() => {
    getStationList();
  });

  useEffect(() => {
    getStationList(true);
  }, []);

  return (
    <View className="station-list__view">
      <View className="station-list">
        {
          stationList.list.map(item => {

            let current_rule = { price: '0', start_time: '', end_time: '' };
            if (item.current_rule) {
              const { charge_price, service_price, start_time, end_time } = item.current_rule;
              const price = (parseFloat(charge_price) + parseFloat(service_price)).toFixed(4);
              current_rule = { price, start_time, end_time, }
            }

            return (
              <View className="station-item" key={item.station_id}>
                <View className="station-info">
                  <View className="station-name">{item.station_name}</View>
                  <View className="station-distance">距我 {item.distance} km</View>

                  <View className="station-price">
                    <Text className="text">{current_rule.price}</Text>
                    <Text>元/度({current_rule.start_time}-{current_rule.end_time})</Text>
                  </View>

                </View>
                <View className="station-num">
                  <Text className="text">{item.available_pile}</Text>
                  <Text>/{item.quantity}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
      {stationList.loading && <AtLoadMore status={'loading'} />}
      {stationList.lastPage && <AtLoadMore status={'noMore'} />}
    </View>
  )
}

StationList.config = {
  navigationBarTitleText: '站点列表',
  enablePullDownRefresh: true
}