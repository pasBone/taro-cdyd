import './style.scss';
import { CoverView } from '@tarojs/components';
export const ChargingCard = () => {

  return (

    <CoverView className="charging-card">
      <CoverView className="charging-card__ball">
        <CoverView className="water w1"></CoverView>
        <CoverView className="water w2"></CoverView>
        <CoverView className="water"></CoverView>
      </CoverView>

      <CoverView className="charging-card__block">
        <CoverView className="charging-card__status">
          <CoverView className="charging-card__state">正在充电中</CoverView>
          <CoverView className="charging-card__price">
            <CoverView>￥</CoverView>
            <CoverView>20.00</CoverView>
          </CoverView>
        </CoverView>

        <CoverView className="charging-card__time">
          <CoverView>
            <CoverView>20&nbsp;&nbsp;|&nbsp;&nbsp;</CoverView>
            <CoverView>20.00</CoverView>
            <CoverView>度</CoverView>
          </CoverView>
          <CoverView className="current-money">当前费用</CoverView>
        </CoverView>
      </CoverView>
    </CoverView>
  )
}