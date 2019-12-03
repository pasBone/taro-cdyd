import './style.scss'
import { View, Image, Block } from "@tarojs/components"
import { navigateTo, useEffect, useCallback, usePullDownRefresh, stopPullDownRefresh, hideNavigationBarLoading, showNavigationBarLoading, useDidShow } from "@tarojs/taro"
import { useSelector, useDispatch } from "@tarojs/redux"
import { RootState } from "@/store/types"
import { ListCell } from '@/components/list-cell'
import { getCarVerifyStatusAsync, clearUserInfo } from '@/store/module/meb/meb.actions'
import { setTabbarSelected } from '@/utils/common'
import { useHasLogin } from '@/hooks/use-has-login'

export function MineView() {
  const userProtocol = 'https://wx.youdaocharge.com/#/mine/user-protocol';
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const carVerifyStatus = useSelector((state: RootState) => state.meb.carVerifyStatus);
  const dispatch = useDispatch();

  /** 获取车主认证状态 */
  const getCarVerifyStatus = useCallback(() => {
    if (userInfo.token && userInfo.meb_id) {
      showNavigationBarLoading();
      dispatch(
        getCarVerifyStatusAsync({
          meb_id: userInfo.meb_id
        })
      ).finally(_ => {
        hideNavigationBarLoading();
        stopPullDownRefresh();
      });
    }
  }, [userInfo.meb_id]);

  /*** 退出登录 */
  const logOut = useCallback(() => {
    dispatch(clearUserInfo());
    return navigateTo({
      url: '/pages/login/index'
    });
  }, []);

  useEffect(() => {
    getCarVerifyStatus();
  }, [userInfo.meb_id]);

  usePullDownRefresh(() => {
    getCarVerifyStatus();
  });

  useDidShow(() => {
    setTabbarSelected(4, this);
  });

  return (
    <View className="mine-view">
      {
        useHasLogin() ?
          <Block>
            <ListCell label="头像" renderValue={<Image className="avatar" src={userInfo.avatar} />} showArrow />
            <ListCell label="手机号码" value={userInfo.tel} showArrow />
            <ListCell label="车主认证" value={carVerifyStatus.status_desc} showArrow />
          </Block>
          :
          <ListCell label="登录/注册" onClick={() => navigateTo({ url: '/pages/login/index' })} value='' showArrow />
      }
      <ListCell label="用户协议" onClick={() => navigateTo({ url: `/pages/webview/index?url=${userProtocol}` })} showArrow />
      {
        useHasLogin() && <ListCell label="退出登录" onClick={() => logOut()} showArrow />
      }
    </View>
  )
}

MineView.config = {
  navigationBarTitleText: '我的',
  enablePullDownRefresh: true
}