import './style.scss';
import { FC, createMapContext, useEffect, useMemo, useCallback, useState, navigateTo, setNavigationBarTitle } from "@tarojs/taro"
import { IMAGE_MAP } from "@/assets"
import { APP_NAME } from "@/constant"
import { View, Map, CoverImage } from "@tarojs/components"
import { useDispatch, useSelector } from "@tarojs/redux";
import { getStationListAsync } from '@/store/module/station/station.actions'
import { RootState } from '@/store/types'
import CurrentStationCard from './components/current-station-card'
import { stationApi } from '@/api/station'
import { getLocationAsync } from '@/store/module/common/common.actions'
import { gcoordTransform } from "@/utils/common";

const initStationDetails = { station_id: 'none' } as stationApi.ListItem;

export const HomeView: FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useSelector((state: RootState) => state.common.gpsLocation);
  const stationList = useSelector((state: RootState) => state.station.stationList);
  const [stationDetails, setStationDetails] = useState(initStationDetails);

  /** 获取站点/地图打点 */
  useEffect(() => {
    setNavigationBarTitle({
      title: APP_NAME
    });
    dispatch(
      getStationListAsync({ longitude, latitude, pageSize: 100 })
    )
  }, [])

  /** 点击站点事件 */
  const makerTap = useCallback((data) => {
    setStationDetails(data.markerId)
  }, [stationList])

  /** 点击空白地图重置事件 */
  const mapTap = useCallback(() => {
    setStationDetails(initStationDetails);
  }, []);

  /** 手动定位 */
  const getLocation = useCallback(() => {
    dispatch(getLocationAsync(true));
    createMapContext('homeMap').moveToLocation();
  }, []);

  /** 地图站点标记打点 */
  const markers = useMemo(() => {
    /** 当前定位标记 */
    const [long, lat] = gcoordTransform([longitude, latitude]);
    const locationMarker = {
      iconPath: IMAGE_MAP.mapLocationMarker,
      latitude: lat,
      longitude: long,
      width: 16,
      height: 40
    }
    /** 站点标记 */
    const stationMarker = stationList.list.map(item => {
      const [long, lat] = gcoordTransform([item.longitude, item.latitude]);
      return {
        iconPath: IMAGE_MAP.mapStationMarker,
        latitude: lat,
        longitude: long,
        id: item,
        width: 26,
        height: 35
      }
    });
    return [locationMarker, ...stationMarker]
  }, [stationList])

  return (
    <View className="home-view">
      <View className="map-view">
        <CoverImage onClick={getLocation} className="gps-icon" src={IMAGE_MAP.gps} />
        <CoverImage onClick={() => navigateTo({ url: '/pages/station/list/index' })} className="station-list-icon" src={IMAGE_MAP.code} />
        <CurrentStationCard  {...stationDetails} />
        <Map
          id="homeMap"
          markers={markers}
          latitude={latitude}
          longitude={longitude}
          show-location={true}
          onMarkerTap={makerTap}
          onTap={mapTap}
          scale={12}
        />
      </View>
    </View>
  )
}

HomeView.config = {
  navigationStyle: 'custom'
}