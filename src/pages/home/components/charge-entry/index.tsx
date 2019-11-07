import { FC, scanCode, useCallback } from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";
import { IMAGE_MAP } from "@/assets";
import Toast from "@/utils/toast";
import { WX_API_ERROR } from "@/types";
import './style.scss';

const ChargeEntry: FC = () => {

  /** 调起微信扫码功能 */
  const handleScanCode = useCallback(async () => {

    try {
      const code = await scanCode()
      // todo code.result

    } catch (err) {
      if (err.errMsg !== WX_API_ERROR["扫码-用户取消扫码"]) {
        Toast.failed('扫码错误...')
      }
    }
  }, [])

  return (
    <CoverView className="charge-battery__view">
      <CoverView className="charge-battery__view-btn">
        <CoverImage className="charge-img" src={IMAGE_MAP.scanning} />
        <CoverView className="charge-text" onClick={handleScanCode}>扫码充电</CoverView>
      </CoverView>
      <CoverView className="split-line"></CoverView>
      <CoverView className="charge-battery__view-btn">
        <CoverImage className="charge-img" src={IMAGE_MAP.numCodewhite} />
        <CoverView className="charge-text">桩号充电</CoverView>
      </CoverView>

    </CoverView >
  )
}

export default ChargeEntry