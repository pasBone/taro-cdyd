import { AtDrawer } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux'
import { RootState } from '@/store/types'
import { setSideMenuClose } from '@/store/module/common/common.actions';
import { View } from '@tarojs/components';
import './style.scss';
import { FC } from '@tarojs/taro';

const SideMenu: FC = () => {
  const menuState = useSelector((state: RootState) => state.common.sideMenu.state);
  const dispatch = useDispatch();
  return (
    <AtDrawer
      customStyle={{ paddingTop: '88px' }}
      show={menuState}
      mask
      onClose={() => dispatch(setSideMenuClose())}
    >
      <View className="side_menu__view">
      //todo 处理原生组件的层级关系
      </View>
    </AtDrawer>
  )
}
export default SideMenu