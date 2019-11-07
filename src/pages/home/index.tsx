import MapView from './components/map'
import { FC, createMapContext, useEffect, useMemo, useCallback, useState } from "@tarojs/taro"
import { IMAGE_MAP } from "@/assets"
import { APP_NAME } from "@/constant"
import { View, Image, Map } from "@tarojs/components"
import Navbar from '@/components/layout/nav-bar'
import SideMenu from '@/components/layout/side-menu'
import { useDispatch, useSelector } from "@tarojs/redux";
import { setSideMenuClose, setSideMenuOpen } from '@/store/module/common/common.actions'
import { getStationListAsync } from '@/store/module/station/station.actions'
import { RootState } from '@/store/types'
import ChargeEntry from './components/charge-entry';
import CurrentStationCrd from './components/current-station-card'
import { stationApi } from '@/api/station'

const initStationDetails = { station_id: 'none'} as stationApi.ListItem;

const HomeView: FC = () => {
    const dispatch = useDispatch();
    const menuState = useSelector((state: RootState) => state.common.sideMenu.state);
    const { latitude, longitude } = useSelector((state: RootState) => state.common.gpsLocation);
    const stationList = useSelector((state: RootState) => state.station.stationList);
    const [stationDetails, setStationDetails] = useState(initStationDetails);

    useEffect(() => {
        dispatch(
            getStationListAsync({ longitude, latitude })
        )
    }, [])

    const makerTap = useCallback((data) => {
        setStationDetails(data.markerId)
    }, [stationList])

    const mapTap = useCallback(() => {
        setStationDetails(initStationDetails);
    }, []);

    /** 地图站点标记打点 */
    const markers = useMemo(() => {
        /** 当前定位标记 */
        const locationMarker = {
            iconPath: IMAGE_MAP.mapLocationMarker,
            latitude,
            longitude,
            width: 16,
            height: 40
        }
        /** 站点标记 */
        const stationMarker = stationList.list.map(item => {
            return {
                iconPath: IMAGE_MAP.mapStationMarker,
                latitude: item.latitude,
                longitude: item.longitude,
                id: item,
                width: 26,
                height: 35
            }
        });
        return [locationMarker, ...stationMarker]
    }, [stationList, longitude, latitude])

    return (
        <View className="home__view">
            <Navbar
                title='首页'
                renderLeftIcon={<Image src={IMAGE_MAP.mine} onClick={() => dispatch(menuState ? setSideMenuClose() : setSideMenuOpen())} />}
                renderRightIcon={<Image src={IMAGE_MAP.list} />}
            />

            <SideMenu />

            <ChargeEntry />

            <CurrentStationCrd  {...stationDetails} />

            {/* 小程序组件有坑，直接拆分组件无法拿到map实例，采用props传递 */}
            <MapView
                mapCtx={createMapContext('homeMap')}
                renderMapView={
                    <Map
                        id="homeMap"
                        markers={markers}
                        latitude={latitude}
                        longitude={longitude}
                        show-location={true}
                        onMarkerTap={makerTap}
                        onTap={mapTap}
                    />}
            />

        </View>
    )
}

HomeView.config = {
    navigationBarTitleText: APP_NAME
}

export default HomeView;