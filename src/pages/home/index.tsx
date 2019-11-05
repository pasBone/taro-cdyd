import MapView from './map'
import { FC } from "@tarojs/taro"
import { IMAGE_MAP } from "@/assets"
import { APP_NAME } from "@/constant"
import { View, Image } from "@tarojs/components"
import Navbar from '@/components/layout/nav-bar'
import SideMenu from '@/components/layout/side-menu'
import { useDispatch, useSelector } from "@tarojs/redux";
import { setSideMenuClose, setSideMenuOpen } from '@/store/module/common/common.actions'
import { RootState } from '@/store/types'

const HomeView: FC = () => {
    const dispatch = useDispatch();
    const menuState = useSelector((state: RootState) => state.common.sideMenu.state);
    return (
        <View className="home__view">
            <Navbar
                title='首页'
                renderLeftIcon={<Image src={IMAGE_MAP.mine} onClick={() => dispatch(menuState ? setSideMenuClose() : setSideMenuOpen())} />}
                renderRightIcon={<Image src={IMAGE_MAP.list} />}
            />
            <SideMenu />
            <MapView />
        </View>
    )
}

HomeView.config = {
    navigationBarTitleText: APP_NAME
}

export default HomeView;