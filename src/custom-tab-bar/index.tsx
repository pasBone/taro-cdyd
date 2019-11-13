
import { CoverView, CoverImage } from '@tarojs/components'
import { IMAGE_MAP } from '@/assets'
import { FC, useCallback, switchTab } from '@tarojs/taro'
import './style.scss'

export const Tabbar: FC = () => {

  const switchTabBar = useCallback((url) => switchTab({
    url
  }), [])

  return (
    <CoverView className="tab-bar__view">
      <CoverView className="tab-bar__list">
        <CoverView className="tab-bar__item" onClick={() => switchTabBar('/pages/home/index')}>
          <CoverImage className="icon" src={IMAGE_MAP.walletIcon} />
          <CoverView className="text">首页</CoverView>
        </CoverView>

        <CoverView className="tab-bar__item" onClick={() => switchTabBar('/pages/wallet/index')}>
          <CoverImage className="icon" src={IMAGE_MAP.walletIcon} />
          <CoverView className="text">钱包</CoverView>
        </CoverView>

        <CoverView className="tab-bar__scan">

        </CoverView>

        <CoverView className="tab-bar__item" onClick={() => switchTabBar('/pages/order/index')}>
          <CoverImage className="icon" src={IMAGE_MAP.order} />
          <CoverView className="text">订单</CoverView>
        </CoverView>
        <CoverView className="tab-bar__item" onClick={() => switchTabBar('/pages/mine/index')}>
          <CoverImage className="icon" src={IMAGE_MAP.mine} />
          <CoverView className="text">我的</CoverView>
        </CoverView>
      </CoverView>
    </CoverView>
  )
}