import { FC } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { useSelector } from "@tarojs/redux"
import { RootState } from "@/store/types"
import './style.scss'

export const RechargeDataView: FC = () => {
  const stationDetails = useSelector((state: RootState) => state.station.stationDetails);
  return (
    <View className="recharge-data">
      <View className="recharge-data__item">
        <View className="recharge-data__num">
          <View className="part">{stationDetails.fast_fill_available}</View>
          <View className="full">/{stationDetails.fast_fill_all}</View>
        </View>
        <View className="name">可用快充</View>
      </View>

      <View className="recharge-data__item">
        <View className="recharge-data__num">
          <View className="part">{stationDetails.slow_fill_available}</View>
          <View className="full">/{stationDetails.slow_fill_all}</View>
        </View>
        <View className="name">可用慢充</View>
      </View>

      <View className="recharge-data__item">
        <View className="recharge-data__num">
          <View className="part">{stationDetails.max_power || 0}</View>
          <View className="full">kW</View>
        </View>
        <View className="name">最大功率</View>
      </View>
    </View>
  )
}