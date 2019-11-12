import { FC, useMemo, useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { CardBox } from "@/components/card";
import { stationApi } from "@/api/station";
import './style.scss';
import { RULE_MODE_NAME } from "@/constant";
import { useDispatch, useSelector } from "@tarojs/redux";
import { getStationRulesAsync } from "@/store/module/station/station.actions";
import { RootState } from "@/store/types";

type IProps = {
  stationId: string
}

export const StationRulesTable: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const stationId = props.stationId;
  const stationRules = useSelector((state: RootState) => state.station.stationRules);

  if (!stationId) return <View></View>

  /**获取计费规则 */
  useEffect(() => {
    dispatch(
      getStationRulesAsync({
        station_id: stationId
      })
    );
  }, [stationId])

  /** 计费规则排序 */
  const ruleListSort: Array<Array<stationApi.Flat>> = useMemo(() => {
    const { rule_list } = stationRules;
    return [
      rule_list.peak,
      rule_list.flat,
      rule_list.valley,
      rule_list.unit
    ].filter(item => item)
  }, [stationRules]);

  /** 当前电价 */
  const currentPrice = useMemo(() => {
    const { charge_price, service_price } = stationRules.current_rule;
    return (parseFloat(charge_price) + parseFloat(service_price)).toFixed(4);
  }, [stationRules]);

  return (
    <CardBox title="电价计费规则">
      <View>
        <View className="station-rules-title">当前电价: <Text className="station-rules-current-price">{currentPrice}</Text> 元/度（{stationRules.current_rule.start_time}-{stationRules.current_rule.end_time}）</View>
        <View className="station-rules-table">
          <View className="table-row table-header">
            <View className="table-col">
              <View>类型</View>
            </View>
            <View className="table-col time-col">时段</View>
            <View className="table-col">电价</View>
            <View className="table-col">服务费</View>
            <View className="table-col">总价</View>
          </View>

          {
            ruleListSort.map(item => (
              <View className="table-row table-body">
                <View className="table-col">
                  {RULE_MODE_NAME[item[0].mode]}
                </View>
                <View className="table-col">
                  <View className="table-sub-col time-col">
                    {item.map((subs) => <View className="table-col">{subs.start_time}-{subs.end_time}</View>)}
                  </View>
                </View>
                <View className="table-col">{item[0].charge_price}</View>
                <View className="table-col">{item[0].service_price}</View>
                <View className="table-col">{item[0].service_price}</View>
              </View>
            ))
          }
        </View>
      </View>
    </CardBox>
  )
}