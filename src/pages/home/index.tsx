import MapView from './map'
import { FC } from "@tarojs/taro"
import { IMAGE_MAP } from "@/assets"
import { APP_NAME } from "@/constant"
import { View, Image } from "@tarojs/components"
import Navbar from '@/components/layout/nav-bar'
import { useSetSideMenuState } from '@/hooks/use-set-side-menu-state'

const HomeView: FC = () => {
    return (
        <View>
            <Navbar
                title="首页"
                renderLeftIcon={<Image src={IMAGE_MAP.mine} onClick={() => useSetSideMenuState()} />}
                renderRightIcon={<Image src={IMAGE_MAP.list} />}
            />

            <MapView />
        </View>
    )
}

HomeView.config = {
    navigationBarTitleText: APP_NAME
}

export default HomeView;