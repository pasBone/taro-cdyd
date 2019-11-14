import './style.scss'
import { View } from "@tarojs/components"
import { FC } from "@tarojs/taro"
import { useSelector } from "@tarojs/redux"
import { RootState } from "@/store/types"
import { ListCell } from '@/components/list-cell'
import { AtAvatar } from "taro-ui"

export const MineView: FC = () => {
  return (
    <View className="mine-view">

      <ListCell label="头像" value="dfsd" renderValue={<View>ddd</View>} showArrow />
      {/* <ListCell label="手机号码" value="订单" showArrow />
      <ListCell label="车主认证" value="订单" showArrow />
      <ListCell label="用户协议" value="订单" showArrow /> */}

    </View>
  )
}
