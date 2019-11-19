import './style.scss';
import { IMAGE_MAP } from '@/assets';
import { View, Image, Text } from '@tarojs/components';
import { RootState } from '@/store/types';
import { useSelector } from '@tarojs/redux';

export const ChargingInfo = () => {
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  return (
    <View className="charging-info">

      <View className="charging-info__item">
        <Image className="img" src={IMAGE_MAP.wallet} />
        <View>
          <View className="value"><Text>￥</Text>{chargeInfo.balance}</View>
          <View className="label">钱包实时余额</View>
        </View>
      </View>

      <View className="charging-info__item">
        <Image className="img" src={IMAGE_MAP.electricity} />
        <View>
          <View className="value">￥{chargeInfo.price}</View>
          <View className="label">当前电价</View>
        </View>
      </View>

      <View className="charging-info__item">
        <Image className="img" src={IMAGE_MAP.number} />
        <View>
          <View className="value">{chargeInfo.pile_code}/ {chargeInfo.order_num}#</View>
          <View className="label">桩号/位置</View>
        </View>
      </View>


      <View className="charging-info__item">
        <Image className="img" src={IMAGE_MAP.power} />
        <View>
          <View className="value">{chargeInfo.charging_data.power}kW</View>
          <View className="label">实时功率</View>
        </View>
      </View>

      <View className="charging-info__item">
        <Image className="img" src={IMAGE_MAP.voltage} />
        <View>
          <View className="value">{chargeInfo.charging_data.voltage}V</View>
          <View className="label">充电实时电压</View>
        </View>
      </View>

      <View className="charging-info__item">
        <Image className="img" src={IMAGE_MAP.current} />
        <View>
          <View className="value">{chargeInfo.charging_data.currentFlow}A</View>
          <View className="label">充电实时电流</View>
        </View>
      </View>
    </View>
  )
}

