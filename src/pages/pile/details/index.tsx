import { FC, useRouter, useCallback, useEffect, usePullDownRefresh, stopPullDownRefresh, showNavigationBarLoading, hideNavigationBarLoading } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { StationRulesTable } from "@/components/station-rules-table";
import { useDispatch, useSelector } from "@tarojs/redux";
import { getPileDetailsAsync } from "@/store/module/pile/pile.actions";
import { RootState } from "@/store/types";
import { PileDetailsRow } from "./components/pile-details-row";
import './style.scss'

export const PileDetailsView: FC = () => {
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
    <View className="pile-details__view">

      <PileDetailsRow />

      <StationRulesTable stationId={pileDetails.station_id} />

      <View className="pile_footer">
        <AtButton type='primary' className="cdyd-primary-button" full>启动充电</AtButton>
      </View>
    </View>
  )
}

PileDetailsView.config = {
  navigationBarTitleText: '充电桩详情',
  enablePullDownRefresh: true
}