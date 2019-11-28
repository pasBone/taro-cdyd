import { Vi, ViewewView, View } from "@tarojs/components"
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
  }, []);

  return (
    <View className="footer_view">
      <View className="footer_view-text">
        <View className="price">{currentPrice}</View><View>元/度（{stationRules.current_rule.start_time}-{stationRules.current_rule.end_time}）</View>
      </View>
      <View className="start-button" onClick={handleScanCode}>
        开始充电
      </View>
    </View>
  )
}