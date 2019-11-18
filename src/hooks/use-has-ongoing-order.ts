import { useSelector } from "@tarojs/redux"
import { useMemo } from "@tarojs/taro"
import { RootState } from "@/store/types"
import { ORDER_STATUS } from "@/constant"

export const useHasOngoingOrder = () => {
  const detail = useSelector((state: RootState) => state.charge.chargeInfo);
  return {
    hasOngoingOrder: useMemo(() => {
      return [ORDER_STATUS.正在充电, ORDER_STATUS.暂停中].includes(
        detail.order_status,
      )
    }, [detail]),
  }
}
