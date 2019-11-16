import './style.scss'
import { View, Text } from "@tarojs/components"

export const OrderListView = () => {
  return (
    <View className="order-list__view">
      <View className="order-list">
        <View className="order-list__item">
          <View className="order-list__title">
            <View className="desc">item.way_desc</View>
            <Text>￥item.total_fee</Text>
          </View>
          <View className="order-list__time">
            <Text>formatDate(item.paid_time)</Text>
            <Text>item.recharge_label</Text>
          </View>
        </View>
      </View>
    </View>
  )
}