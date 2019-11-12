import './style.scss'
import { View, Text, Image } from '@tarojs/components'
import { IMAGE_MAP } from '@/assets'
import { FC } from '@tarojs/taro'

export const Tabbar: FC = () => {
  return (
    <View className="tab-bar__view">
      <View className="tab-bar__list">
        <View className="tab-bar__item">
          <Text className="text">首页</Text>
          <Image className="icon" src={IMAGE_MAP.mine} />
        </View>

        <View className="tab-bar__item">
          钱包
        </View>
        <View className="tab-bar__scan">

        </View>
        <View className="tab-bar__item">
          订单
        </View>
        <View className="tab-bar__item">
          我的
          </View>
      </View>
    </View>
  )
}