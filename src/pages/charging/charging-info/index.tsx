import './style.scss';
import { IMAGE_MAP } from '@/assets';
import { View, Image, Text } from '@tarojs/components';

export const ChargingInfo = () => {
    return (
        <View className="charging-info">

            <View className="charging-info__item">
                <Image className="img" src={IMAGE_MAP.wallet} />
                <View>
                    <View className="value"><Text>￥</Text>20.33</View>
                    <View className="label">钱包实时余额</View>
                </View>
            </View>

            <View className="charging-info__item">
                <Image className="img" src={IMAGE_MAP.electricity} />
                <View>
                    <View className="value">￥20.33</View>
                    <View className="label">当前电价</View>
                </View>
            </View>

            <View className="charging-info__item">
                <Image className="img" src={IMAGE_MAP.number} />
                <View>
                    <View className="value">5/ 6#</View>
                    <View className="label">桩号/位置</View>
                </View>
            </View>


            <View className="charging-info__item">
                <Image className="img" src={IMAGE_MAP.power} />
                <View>
                    <View className="value">{20}kW</View>
                    <View className="label">实时功率</View>
                </View>
            </View>

            <View className="charging-info__item">
                <Image className="img" src={IMAGE_MAP.voltage} />
                <View>
                    <View className="value">{30}V</View>
                    <View className="label">充电实时电压</View>
                </View>
            </View>

            <View className="charging-info__item">
                <Image className="img" src={IMAGE_MAP.current} />
                <View>
                    <View className="value">{40}A</View>
                    <View className="label">充电实时电流</View>
                </View>
            </View>
        </View>
    )
}

