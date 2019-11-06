import MapView from './map'
import { FC, createMapContext } from "@tarojs/taro"
import { IMAGE_MAP } from "@/assets"
import { APP_NAME } from "@/constant"
import { View, Image, Map } from "@tarojs/components"
import Navbar from '@/components/layout/nav-bar'
import SideMenu from '@/components/layout/side-menu'
import ChargeEntry from './charge-entry';
import { useDispatch, useSelector } from "@tarojs/redux";
import { setSideMenuClose, setSideMenuOpen } from '@/store/module/common/common.actions'
import { RootState } from '@/store/types'


const HomeView: FC = () => {
    const dispatch = useDispatch();
    const menuState = useSelector((state: RootState) => state.common.sideMenu.state);
    const { latitude, longitude } = useSelector((state: RootState) => state.common.gpsLocation);
    
    return (
        <View className="home__view">
            <Navbar
                title='首页'
                renderLeftIcon={<Image src={IMAGE_MAP.mine} onClick={() => dispatch(menuState ? setSideMenuClose() : setSideMenuOpen())} />}
                renderRightIcon={<Image src={IMAGE_MAP.list} />}
            />
            <SideMenu />

            {false && <ChargeEntry />}

            {/* 小程序组件有坑，直接拆分组件无法拿到map实例，采用props传递 */}
            <MapView
                mapCtx={createMapContext('homeMap')}
                renderMapView={<Map id="homeMap" latitude={latitude} longitude={longitude} show-location={true} />}
            />

        </View>
    )
}

HomeView.config = {
    navigationBarTitleText: APP_NAME
}

export default HomeView;