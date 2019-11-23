import { useSelector } from "@tarojs/redux"
import { RootState } from "@/store/types"
import { useEffect, useState, useRef, useDidShow, useDidHide } from "@tarojs/taro";
import { getDurationFull } from "@/utils/common";
import { ORDER_STATUS } from "@/constant";

export const useDuration = () => {
  const chargeInfo = useSelector((state: RootState) => state.charge.chargeInfo);
  const { duration, order_status, update_time } = chargeInfo;
  const [durationStr, setDurationStr] = useState(() => getDurationFull(0));
  const [start, setStart] = useState(false);
  const timer = useRef<any>();

  useEffect(() => {
    if (order_status === ORDER_STATUS.暂停中 || order_status === ORDER_STATUS.正在充电) {
      let times = duration;
      timer.current = setInterval(_ => {
        times += 1000;
        setDurationStr(getDurationFull(times));
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [duration, order_status, update_time, start]);

  useDidShow(() => {
    setStart(true);
  });

  useDidHide(() => {
    setStart(false);
  });

  return durationStr;
}