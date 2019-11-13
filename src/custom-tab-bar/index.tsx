
import { CoverView, CoverImage } from '@tarojs/components'
import { IMAGE_MAP } from '@/assets'
import { FC, useCallback, switchTab, useMemo } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { RootState } from '@/store/types'
import { setTabbarId, scanCodeWithPileAsync } from '@/store/module/common/common.actions'
import './style.scss'

export const Tabbar: FC = () => {
  const tabbarId = useSelector((item: RootState) => item.common.tabbar.id)
  const dispatch = useDispatch();

  const tabBarData = useMemo(() => {
    return [{
      name: '首页',
      id: 0,
      path: '/pages/home/index'
    }, {
      name: '钱包',
      id: 1,
      path: '/pages/wallet/index'
    }, {
      name: '扫码',
      id: 2,
    }, {
      name: '订单',
      id: 3,
      path: '/pages/order/index'
    }, {
      name: '我的',
      id: 4,
      path: '/pages/mine/index'
    }]

  }, []);

  const switchTabBar = useCallback(item => switchTab({
    url: item.path
  }).then(_ => {
    dispatch(setTabbarId(item.id));
  }), []);

  /** 调起微信扫码功能 */
  const handleScanCode = useCallback(async () => {
    dispatch(
      scanCodeWithPileAsync()
    )
  }, []);

  return (
    <CoverView className="tab-bar__view">
      <CoverView className="tab-bar__list">
        {
          tabBarData.map(item => {
            return item.id == 2 ?
              <CoverView className="tab-bar__scan" onClick={handleScanCode}></CoverView>
              :
              <CoverView className="tab-bar__item " onClick={() => switchTabBar(item)} key={item.id}>
                <CoverImage className="icon" src={IMAGE_MAP.walletIcon} />
                <CoverView className="text">{item.name}{tabbarId == item.id}</CoverView>
              </CoverView>
          })
        }
      </CoverView>
    </CoverView>
  )
}