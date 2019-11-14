import { CoverView } from "@tarojs/components"
import { FC, useMemo, useCallback } from "@tarojs/taro"
import { scanCodeWithPileAsync } from "@/store/module/common/common.actions";
import { useDispatch, useSelector } from "@tarojs/redux";
import { RootState } from "@/store/types";
import './style.scss';

export const FooterView: FC = () => {
  const dispatch = useDispatch();
  const stationRules = useSelector((state: RootState) => state.station.stationRules);

  /** 当前电价 */
  const currentPrice = useMemo(() => {
    if (stationRules) {
      const { charge_price, service_price } = stationRules.current_rule;
      return (parseFloat(charge_price) + parseFloat(service_price)).toFixed(4);
    }
    return 0;
  }, [stationRules]);

  /** 调起微信扫码功能 */
  const handleScanCode = useCallback(async () => {
    dispatch(
      scanCodeWithPileAsync()
    )
  }, [])

  return (
    <CoverView className="footer_view">
      <CoverView className="footer_view-text">
        <CoverView className="price">{currentPrice}</CoverView><CoverView>元/度（{stationRules.current_rule.start_time}-{stationRules.current_rule.end_time}）</CoverView>
      </CoverView>
      <CoverView className="start-button" onClick={handleScanCode}>
        开始充电
      </CoverView>
    </CoverView>
  )
}