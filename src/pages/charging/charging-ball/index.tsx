import './style.scss';
import { View } from '@tarojs/components';
import { getDuration } from '@/utils/common';

export const ChargingBall = () => {
    return (
        <View className="charging-ball">
            {/* <md-progress
                    value={this.chargingProcess / 100}
                    width={15}
                    size={210}
                    rotate={-90}
                    color="url(#linear)"
                    border-color="#5996ec"
                    linecap="butt"
                    transition={true}
                > */}
            <View className="progress-ball">
                <View className="soc">SOC</View>
                <View className="value">{60}%</View>
                <View className="full-time">充满预计{getDuration(25685555, '小时', '分钟', '分')}</View>
                {/* <View className="full-time">充满预计1小时15分</View> */}
            </View>
            {/* <defs slot="defs">
                        <pattern id="linear" patternUnits="userSpaceOnUse" width="250" height="250">
                            <image href={this.calibrationBg} x="0" y="0" width="100%" height="100%"></image>
                        </pattern>
                    </defs> */}
            {/* </md-progress> */}
        </View>
    )
}
