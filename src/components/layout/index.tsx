import { FC } from "@tarojs/taro";
import NavBar from './nav-bar/'
import { View } from "@tarojs/components";

const Layout: FC = () => {
    return (
        <View>
            <NavBar></NavBar>
        </View>
    )
}

export default Layout;