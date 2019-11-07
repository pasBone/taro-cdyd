import MapView from './map'
import { FC, createMapContext, useEffect, useMemo } from "@tarojs/taro"
import { IMAGE_MAP } from "@/assets"
import { APP_NAME } from "@/constant"
import { View, Image, Map } from "@tarojs/components"
import Navbar from '@/components/layout/nav-bar'
import SideMenu from '@/components/layout/side-menu'
import ChargeEntry from './charge-entry';
import { useDispatch, useSelector } from "@tarojs/redux";
import { setSideMenuClose, setSideMenuOpen } from '@/store/module/common/common.actions'
import { getStationListAsync } from '@/store/module/station/station.actions'
import { RootState } from '@/store/types'


const HomeView: FC = () => {
    const dispatch = useDispatch();
    const menuState = useSelector((state: RootState) => state.common.sideMenu.state);
    const { latitude, longitude } = useSelector((state: RootState) => state.common.gpsLocation);
    const stationList = useSelector((state: RootState) => state.station.stationList);

    useEffect(() => {
        dispatch(
            getStationListAsync({
                longitude,
                latitude
            })
        )
    }, [])

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
                id: item.station_id,
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

            {/* 小程序组件有坑，直接拆分组件无法拿到map实例，采用props传递 */}
            <MapView
                mapCtx={createMapContext('homeMap')}
                renderMapView={<Map id="homeMap" markers={markers} latitude={latitude} longitude={longitude} show-location={true} />}
            />

        </View>
    )
}

HomeView.config = {
    navigationBarTitleText: APP_NAME
}

export default HomeView;