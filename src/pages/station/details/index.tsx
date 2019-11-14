import './style.scss';
import { FC, usePullDownRefresh, useRouter, useCallback, useEffect, stopPullDownRefresh, showNavigationBarLoading, hideNavigationBarLoading, useMemo, useReachBottom, useRef, setNavigationBarTitle, createRef } from '@tarojs/taro';
import { View, Image, Text, Block } from '@tarojs/components';
import { IMAGE_MAP } from '@/assets';
import { getStationDetailsAsync } from '@/store/module/station/station.actions'
import { useDispatch, useSelector } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { RechargeDataView } from './components/recharge-data';
import { StationRulesTable } from '@/components/station-rules-table'
import { CardBox } from '@/components/card';
import { PileList } from './components/pile-list';
import { FooterView } from './components/footer-view';

export const StationDetails: FC = () => {
  const $router = useRouter();
  const stationId = $router.params.id;
  const dispatch = useDispatch();
  const pileListRef = useRef<any>();

  const stationDetails = useSelector((state: RootState) => state.station.stationDetails);
  const { latitude, longitude } = useSelector((state: RootState) => state.common.gpsLocation);

  /** 获取站点详情信息 */
  const getStationDetails = useCallback(() => {
    showNavigationBarLoading();
    dispatch(
      getStationDetailsAsync({
        station_id: stationId,
        latitude,
        longitude
      })
    ).finally(_ => {
      stopPullDownRefresh();
      hideNavigationBarLoading();
    });
  }, [stationId]);

  usePullDownRefresh(() => {
    getStationDetails();
  });

  useEffect(() => {
    getStationDetails();
  }, [stationId]);

  /**子组件不支持上拉加载函数 */
  useReachBottom(() => {
    pileListRef.current && pileListRef.current.getChildPileList();
  });

  /** 站点其他信息说明 */
  const description = useMemo(() => {
    let { desc } = stationDetails;
    desc = (desc || '').replace(
      /\n/g,
      "<br/>"
    );
    return desc.split("<br/>");
  }, [stationDetails.desc]);

  setNavigationBarTitle({
    title: stationDetails.station_name
  });

  return (

    <View className="station-details__view">

      <View className="station__scene">
        <Image mode="aspectFill" className="station__logo" src={stationDetails.station_logo} />

        <View className="station__info">
          <View className="station__info_l">
            <View className="address">{stationDetails.address}</View>
            <View className="station_status_box">
              <View className={`station_status station_status_${stationDetails.station_status}`}>{stationDetails.station_status == 1 ? '正常开放' : '维护中'}</View>
            </View>
          </View>
          <View className="station__info_r" >
            <Image src={IMAGE_MAP.navigationIcon} className="navigation_icon" />
            <View className="distance">{`${stationDetails.distance || 0}`} km</View>
          </View>

        </View>
      </View>

      <RechargeDataView />

      <StationRulesTable stationId={stationId} />

      <CardBox title="站点其他信息">
        <Block>
          {description.map(item => (<View key={item} className="station__notice"><Text>{item}</Text></View>))}
        </Block>
      </CardBox>

      <PileList cRef={pileListRef} stationId={stationId} />

      <FooterView />

    </View>
  )
}

StationDetails.config = {
  enablePullDownRefresh: true,
  navigationBarTitleText: '充电站详情',
}