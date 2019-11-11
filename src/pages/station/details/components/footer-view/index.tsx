import { CoverView } from "@tarojs/components"
import { FC, useMemo } from "@tarojs/taro"
import './style.scss';
import { stationApi } from "@/api/station";

type IProps = {
  rules: stationApi.RuleDetailRes
}

export const FooterView: FC<IProps> = (props) => {

  /** 当前电价 */
  const currentPrice = useMemo(() => {
    const { charge_price, service_price } = props.rules.current_rule;
    return (parseFloat(charge_price) + parseFloat(service_price)).toFixed(4);
  }, [props.rules]);

  return (
    <CoverView className="footer_view">
      <CoverView className="footer_view-text">
        <CoverView className="price">{currentPrice}</CoverView>元/度（{props.rules.current_rule.start_time}-{props.rules.current_rule.end_time}）
      </CoverView>
      <CoverView className="start-button">
        开始充电
      </CoverView>
    </CoverView>
  )
}