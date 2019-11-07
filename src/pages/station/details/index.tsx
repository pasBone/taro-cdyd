import './style.scss';
import { FC, usePullDownRefresh, useRouter, useCallback, useEffect, stopPullDownRefresh, showNavigationBarLoading, hideNavigationBarLoading } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { IMAGE_MAP } from '@/assets';
import { getStationDetailsAsync } from '@/store/module/station/station.actions'
import { useDispatch, useSelector } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { RechargeDataView } from './components/recharge-data';


export const StationDetails: FC = () => {
  const $router = useRouter();
  const stationId = $router.params.id;
  const dispatch = useDispatch();

  const stationDetails = useSelector((state: RootState) => state.station.stationDetails);
  const { latitude, longitude } = useSelector((state: RootState) => state.common.gpsLocation);

  const getStationDetails = useCallback(() => {
    showNavigationBarLoading();
    dispatch(
      getStationDetailsAsync({
        station_id: stationId,
        latitude,
        longitude
      })
    ).then(_ => {
      stopPullDownRefresh();
      hideNavigationBarLoading();
    })

  }, [stationId]);

  usePullDownRefresh(() => {
    getStationDetails();
  });

  useEffect(() => {
    getStationDetails();
  }, [stationId]);

  return (
    <View className="station-details__view">

      <View className="station__scene">
        <Image mode="aspectFill" className="station__logo" src={stationDetails.station_logo} />

        <View className="station__info">
          <View className="station__info_l">
            <View className="address">{stationDetails.address}</View>
            <View className="station_status_box">
              <View className={`station_status station_status_${stationDetails.station_status}`}>{stationDetails.station_status == 1 ? '正常开放' : '维护中'}</View>
            </View>
          </View>
          <View className="station__info_r" >
            <Image src={IMAGE_MAP.navigationIcon} className="navigation_icon" />
            <View className="distance">{`${stationDetails.distance || 0}`} km</View>
          </View>

        </View>
      </View>

      <RechargeDataView {...stationDetails} />

    </View>
  )
}

StationDetails.config = {
  enablePullDownRefresh: true
}