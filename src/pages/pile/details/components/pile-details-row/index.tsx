import { View } from "@tarojs/components"
import { PILE_STATUS, PILE_SHOW_MAP } from "@/constant"
import { FC } from "@tarojs/taro"
import { useSelector } from "@tarojs/redux"
import { RootState } from "@/store/types"
import './style.scss'

export const PileDetailsRow: FC = () => {
  const pileDetails = useSelector((state: RootState) => state.pile.pileDetails);
  return (
    <View className="pile-list__view">
      <View className="pile-list__item">
        <View className="label">电桩编号/位置编号</View>
        <View className="value">{`${String(pileDetails.pile_code)}/${String(pileDetails.order_num)}#`}</View>
      </View>

      <View className="pile-list__item">
        <View className="label">站点名称</View>
        <View className="value">{pileDetails.station_name}</View>
      </View>

      <View className="pile-list__item">
        <View className="label">使用状态</View>
        <View className="value">
          <View className="pile_status__tag" style={PILE_SHOW_MAP[pileDetails.pile_status].style}>{PILE_STATUS[pileDetails.pile_status]}</View>
        </View>
      </View>

      <View className="pile-list__item">
        <View className="label">充电功率</View>
        <View className="value">{`${pileDetails.power}KW`}</View>
      </View>

      <View className="pile-list__item">
        <View className="label">充电电压</View>
        <View className="value">{`${pileDetails.output_voltage}V`}</View>
      </View>

      <View className="pile-list__item">
        <View className="label">充电电流</View>
        <View className="value">{`${pileDetails.output_current}A`}</View>
      </View>
    </View>
  )
}
