import { View, Map } from '@tarojs/components'
import { FC } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss';

const MapView: FC = () => {

    Taro.getLocation({
        type: 'wgs84',
        success(res) {
            console.log(res);
        }
    }).then(data => {
        console.log(data);
    })

    return (
        <View>
            <Map className="map-view" latitude={22.53332} longitude={113.93041} />
        </View>
    )
}

export default MapView;