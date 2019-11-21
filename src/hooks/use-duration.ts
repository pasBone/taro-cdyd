import { useSelector } from "@tarojs/redux"
import { RootState } from "@/store/types"
import { useEffect, useState, useRef } from "@tarojs/taro";
import { getDurationFull } from "@/utils/common";
import { ORDER_STATUS } from "@/constant";

export const useDuration = () => {
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  const { duration, order_status, update_time } = chargeInfo;
  const [durationStr, setDurationStr] = useState(() => getDurationFull(0));
  const timer = useRef<any>();

  useEffect(() => {
    if (order_status !== ORDER_STATUS.正在充电) {
      clearInterval(timer.current);
    }
  }, [order_status, update_time]);

  useEffect(() => {
    let times = duration;
    timer.current = setInterval(_ => {
      times += 1000;
      setDurationStr(getDurationFull(times));
    }, 1000);

    return () => clearInterval(timer.current);
  }, [duration, update_time]);

  return durationStr;
}