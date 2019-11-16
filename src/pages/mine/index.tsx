import './style.scss'
import { View, Image } from "@tarojs/components"
import { FC, navigateTo, useEffect, useCallback, usePullDownRefresh, stopPullDownRefresh, hideNavigationBarLoading, showNavigationBarLoading } from "@tarojs/taro"
import { useSelector, useDispatch } from "@tarojs/redux"
import { RootState } from "@/store/types"
import { ListCell } from '@/components/list-cell'
import { getUserInfoByOpenIdAsync, getCarVerifyStatusAsync } from '@/store/module/meb/meb.actions'
import { OPEN_ID } from '@/constant'

export const MineView: FC = () => {
  const userProtocol = 'https://wx.youdaocharge.com/#/mine/user-protocol';
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const carVerifyStatus = useSelector((state: RootState) => state.meb.carVerifyStatus);
  const dispatch = useDispatch();

  const getUserInfoByOpenId = useCallback(() => {
    showNavigationBarLoading();
    dispatch(
      getUserInfoByOpenIdAsync({
        open_id: OPEN_ID
      })
    ).then(()=>{
      getCarVerifyStatus();
    })
    .finally(() => {
      hideNavigationBarLoading();
      stopPullDownRefresh();
    });
  }, []);

  const getCarVerifyStatus = useCallback(() => {
    dispatch(
      getCarVerifyStatusAsync({
        meb_id: userInfo.meb_id
      })
    )
  }, [userInfo]);

  useEffect(() => {
    getUserInfoByOpenId();
  }, []);

  usePullDownRefresh(() => {
    getUserInfoByOpenId();
  });

  return (
    <View className="mine-view">
      <ListCell label="头像" renderValue={<Image className="avatar" src={userInfo.avatar} />} showArrow />
      <ListCell label="手机号码" value={userInfo.tel} showArrow />
      <ListCell label="车主认证" value={carVerifyStatus.status_desc} showArrow />
      <ListCell label="用户协议" onClick={() => navigateTo({ url: `/pages/webview/index?url=${userProtocol}` })} showArrow />
    </View>
  )
}

MineView.config = {
  navigationBarTitleText: '我的',
  enablePullDownRefresh: true
}