import { FC, useRouter, useCallback, useEffect, usePullDownRefresh, stopPullDownRefresh, showNavigationBarLoading, hideNavigationBarLoading } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { StationRulesTable } from "@/components/station-rules-table";
import { useDispatch, useSelector } from "@tarojs/redux";
import { getPileDetailsAsync } from "@/store/module/pile/pile.actions";
import './style.scss'
import { RootState } from "@/store/types";
import { PILE_STATUS, PILE_SHOW_MAP } from "@/constant";


export const PileDetails: FC = () => {
  const $router = useRouter();
  const pileId = $router.params.id;
  const dispatch = useDispatch();
  const pileDetails = useSelector((state: RootState) => state.pile.pileDetails);

  const getPileDetails = useCallback(() => {
    showNavigationBarLoading();
    dispatch(
      getPileDetailsAsync({
        pile_id: pileId
      })
    ).finally(_ => {
      stopPullDownRefresh();
      hideNavigationBarLoading();
    });
  }, [pileId]);

  useEffect(() => {
    getPileDetails();
  }, [pileId]);

  usePullDownRefresh(() => {
    getPileDetails();
  });

  return (
    <View>
      <View className="pile-list__view">
        <View className="pile-list__item">
          <View className="label">电桩编号/位置编号</View>
          <View className="value">{`${String(pileDetails.pile_code)}/${String(pileDetails.order_num)}#`}</View>
        </View>

        <View className="pile-list__item">
          <View className="label">站点名称</View>
          <View className="value">{pileDetails.station_name}</View>
        </View>

        <View className="pile-list__item">
          <View className="label">使用状态</View>
          <View className="value">
            <View className="pile_status__tag" style={PILE_SHOW_MAP[pileDetails.pile_status].style}>{PILE_STATUS[pileDetails.pile_status]}</View>
          </View>
        </View>

        <View className="pile-list__item">
          <View className="label">充电功率</View>
          <View className="value">{`${pileDetails.power}KW`}</View>
        </View>

        <View className="pile-list__item">
          <View className="label">充电电压</View>
          <View className="value">{`${pileDetails.output_voltage}V`}</View>
        </View>

        <View className="pile-list__item">
          <View className="label">充电电流</View>
          <View className="value">{`${pileDetails.output_current}A`}</View>
        </View>

      </View>


      <StationRulesTable stationId={pileDetails.station_id} />
    </View>
  )
}

PileDetails.config = {
  navigationBarTitleText: '充电桩详情',
  enablePullDownRefresh: true
}