import { FC, useMemo } from "@tarojs/taro";
import { CoverView, CoverImage, View } from "@tarojs/components";
import { stationApi } from "@/api/station";

import './style.scss';
import { IMAGE_MAP } from "@/assets";

const StationCard: FC<stationApi.ListItem> = (props) => {

  const stationRule = useMemo(() => {
    if (props.current_rule) {
      const { charge_price, service_price, start_time, end_time } = props.current_rule;
      const price = (parseFloat(charge_price) + parseFloat(service_price)).toFixed(4);
      return { price, start_time, end_time, }
    }
    return { price: 0, start_time: '', end_time: '' }
  }, [props.station_id])

  return props.station_id !== 'none' ? (
    <CoverView className="current-station-card">

      <CoverView className="station-card-header">

        <CoverView className="station-name">{props.station_name}</CoverView>
        <CoverView className="distance">距我{props.distance} km</CoverView>

        <CoverView className="price">
          <CoverView className="price-number">{stationRule.price}</CoverView>
          <CoverView className="price-text">元/度({stationRule.start_time}-{stationRule.end_time})</CoverView>
        </CoverView>

        <CoverView className="number-of">
          <CoverView className="number-text-pile">{props.available_pile}</CoverView>
          <CoverView className="number-text-quantity">/{props.quantity}</CoverView>
        </CoverView>

      </CoverView>

      <CoverView className="station-card-body">
        <CoverView className="station-card-link">
          <CoverImage className="station-card-img" src={IMAGE_MAP.detailsIcon} />
          <CoverView className="station-text">详情</CoverView>
        </CoverView>

        <CoverView className="station-card-link">
          <CoverImage className="station-card-img" src={IMAGE_MAP.navigationIcon} />
          <CoverView className="station-text">导航</CoverView>
        </CoverView>
      </CoverView>
    </CoverView>
  ) : <View></View>
}

export default StationCard;