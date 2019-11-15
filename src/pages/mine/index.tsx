import './style.scss'
import { View, Image, OpenData } from "@tarojs/components"
import { FC, navigateTo } from "@tarojs/taro"
import { useSelector } from "@tarojs/redux"
import { RootState } from "@/store/types"
import { ListCell } from '@/components/list-cell'
import { AtButton } from "taro-ui"

export const MineView: FC = () => {
  const userProtocol = 'https://wx.youdaocharge.com/#/mine/user-protocol';
  return (
    <View className="mine-view">

      {/* <ListCell label="头像" renderValue={<OpenData className="avatar" type="userAvatarUrl" />} showArrow />
      <ListCell label="手机号码" value="订单" showArrow />
      <ListCell label="车主认证" value="订单" showArrow />
      <ListCell label="用户协议" onClick={() => navigateTo({ url: `/pages/webview/index?url=${userProtocol}` })} showArrow /> */}

      <AtButton formType="submit" open-type="getPhoneNumber" onGetPhoneNumber={() => { console.log(1) }} type='primary'>按钮文案</AtButton>
    </View>
  )
}
