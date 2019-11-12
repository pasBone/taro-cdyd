import { FC, useCallback } from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";
import { scanCodeWithPileAsync } from "@/store/module/common/common.actions";
import { useDispatch } from "@tarojs/redux";
import { IMAGE_MAP } from "@/assets";
import './style.scss';

const ChargeEntry: FC = () => {
  const dispatch = useDispatch();

  /** 调起微信扫码功能 */
  const handleScanCode = useCallback(async () => {
    dispatch(
      scanCodeWithPileAsync()
    )
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