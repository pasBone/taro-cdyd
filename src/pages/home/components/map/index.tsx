import { View, CoverImage } from '@tarojs/components'
import Taro, { FC, useCallback } from '@tarojs/taro'
import { useDispatch } from '@tarojs/redux';
import { getLocationAsync } from '@/store/module/common/common.actions'
import { IMAGE_MAP } from '@/assets';
import './index.scss';

type Props = {
    mapCtx: Taro.MapContext,
    renderMapView: JSX.Element
}

const MapView: FC<Props> = (props) => {
    const dispatch = useDispatch();
    const getLocation = useCallback(() => {
        dispatch(getLocationAsync(true));
        props.mapCtx.moveToLocation();
    }, [])

    return (
        <View className="home-map__view">
            <CoverImage onClick={getLocation} className="gps-icon" src={IMAGE_MAP.gps} />
            {props.renderMapView}
        </View>
    )
}

export default MapView;