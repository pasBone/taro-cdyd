import './style.scss'
import { FC, useRouter, useCallback, useEffect, usePullDownRefresh, stopPullDownRefresh, showNavigationBarLoading, hideNavigationBarLoading, setNavigationBarTitle, navigateTo, useDidHide, useDidShow } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtIcon } from "taro-ui";
import { RootState } from "@/store/types";
import { useDispatch, useSelector } from "@tarojs/redux";
import { getPileDetailsAsync } from "@/store/module/pile/pile.actions";
import { StationRulesTable } from "@/components/station-rules-table";
import { PileDetailsRow } from "./components/pile-details-row";
import { applyChargeAsync, getChargeInfoAsync, clearApplyChargeTimer } from '@/store/module/charge/charge.actions';
import { useHasOngoingOrder } from '@/hooks/use-has-ongoing-order';

export const PileDetailsView: FC = () => {
  const $router = useRouter();
  const pileId = $router.params.id;
  const dispatch = useDispatch();
  const pileDetails = useSelector((state: RootState) => state.pile.pileDetails);
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const applyChargeInfo = useSelector((state: RootState) => state.charge.applyCharge);

  const getPileDetails = useCallback(() => {
    showNavigationBarLoading();
    dispatch(
      getPileDetailsAsync({
        pile_id: pileId
      })
    ).finally(_ => {
      setNavigationBarTitle({ title: pileDetails.station_name });
      stopPullDownRefresh();
      hideNavigationBarLoading();
    });
  }, [pileId]);

  const getChargeInfo = useCallback(() => {
    dispatch(
      getChargeInfoAsync({
        meb_id: userInfo.meb_id
      })
    );
  }, [userInfo.meb_id]);

  useEffect(() => {
    getPileDetails();
    getChargeInfo();
  }, [pileId]);

  usePullDownRefresh(() => {
    getPileDetails();
    getChargeInfo();
  });

  useDidHide(() => {
    dispatch(
      clearApplyChargeTimer()
    )
  });

  const applyCharge = useCallback(() => {
    if (pileDetails.loading) return;
    dispatch(
      applyChargeAsync({
        meb_id: userInfo.meb_id,
        pile_sn: pileDetails.pile_sn,
        startup_mode: 1
      })
    )
  }, [userInfo.meb_id, pileDetails.pile_sn]);

  return (
    <View className="pile-details__view">

      <PileDetailsRow />

      <StationRulesTable stationId={pileDetails.station_id} />

      <View className="pile_footer">
        {
          useHasOngoingOrder().hasOngoingOrder ?
            <AtButton type='primary' className="cdyd-primary-button" full onClick={() => navigateTo({ url: '/pages/charging/index' })}>
              <AtIcon value='lightning-bolt' size='18' color='#FFF'></AtIcon>正在充电
            </AtButton>
            :
            <AtButton type='primary' className="cdyd-primary-button" disabled={applyChargeInfo.loading} loading={applyChargeInfo.loading} full onClick={applyCharge}>启动充电</AtButton>
        }
      </View>
    </View>
  )
}

PileDetailsView.config = {
  navigationBarTitleText: '充电桩详情',
  enablePullDownRefresh: true
}