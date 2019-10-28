import { View, Image } from "@tarojs/components"
import { FC } from "@tarojs/taro"
import MapView from './map'
import Navbar from '@/components/layout/nav-bar'
import { IMAGE_MAP } from "@/assets"
import { APP_NAME } from "@/constant"

const HomeView: FC = () => {
    return (
        <View>
            <Navbar title="首页"  renderRightIcon={<Image src={IMAGE_MAP.list} />} renderLeftIcon={<Image src={IMAGE_MAP.mine} />} />
            <MapView />
        </View>
    )
}

HomeView.config = {
    navigationBarTitleText: APP_NAME
}

export default HomeView;