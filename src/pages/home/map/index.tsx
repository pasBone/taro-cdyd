import { View, Map, CoverImage } from '@tarojs/components'
import Taro, { FC, useCallback, useEffect, createMapContext, useState, useRef } from '@tarojs/taro'
import { IMAGE_MAP } from '@/assets';
import { useSelector, useDispatch } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { getLocationAsync } from '@/store/module/common/common.actions'
import './index.scss';

const MapView: FC = () => {
    const dispatch = useDispatch();
    const { latitude, longitude } = useSelector((state: RootState) => state.common.gpsLocation);
    const mapRef = useRef<any>();

    useEffect(() => {
        mapRef.current = createMapContext('homeMap')
    }, [])

    const getLocation = useCallback(() => {
        dispatch(getLocationAsync(true));
        mapRef.current.moveToLocation();
    }, [latitude, longitude])

    return (
        <View className="home-map__view">
            <CoverImage onClick={getLocation} className="gps-icon" src={IMAGE_MAP.gps} />
            <Map
                id="homeMap"
                latitude={latitude}
                longitude={longitude}
                show-location
            />
        </View>
    )
}

export default MapView;