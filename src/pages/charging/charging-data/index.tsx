import './style.scss';
import { View, Text } from '@tarojs/components';

export const ChargingData = () => {
    return (
        <View className="charging-data">
            <View className="charging-item">
                <View className="value">35</View>
                <View className="label">充电时长</View>
            </View>

            <View className="charging-item">
                <View className="value">3.36</View>
                <View className="label">充电度数</View>
            </View>

            <View className="charging-item">
                <View className="value"><Text>￥</Text>3.36</View>
                <View className="label">当前费用</View>
            </View>
        </View>
    )
}
