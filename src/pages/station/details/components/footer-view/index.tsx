import { CoverView } from "@tarojs/components"
import { FC, useMemo, useCallback } from "@tarojs/taro"
import { scanCodeWithPileAsync } from "@/store/module/common/common.actions";
import { stationApi } from "@/api/station";
import { useDispatch } from "@tarojs/redux";
import './style.scss';

type IProps = {
  rules: stationApi.RuleDetailRes
}

export const FooterView: FC<IProps> = (props) => {
  const dispatch = useDispatch();

  /** 当前电价 */
  const currentPrice = useMemo(() => {
    if (props.rules) {
      const { charge_price, service_price } = props.rules.current_rule;
      return (parseFloat(charge_price) + parseFloat(service_price)).toFixed(4);
    }
    return 0;
  }, [props.rules]);

  /** 调起微信扫码功能 */
  const handleScanCode = useCallback(async () => {
    dispatch(
      scanCodeWithPileAsync()
    )
  }, [])

  return (
    <CoverView className="footer_view">
      <CoverView className="footer_view-text">
        <CoverView className="price">{currentPrice}</CoverView>元/度（{props.rules.current_rule.start_time}-{props.rules.current_rule.end_time}）
      </CoverView>
      <CoverView className="start-button" onClick={handleScanCode}>
        开始充电
      </CoverView>
    </CoverView>
  )
}