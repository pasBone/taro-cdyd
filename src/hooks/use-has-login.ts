import { useSelector } from "@tarojs/redux";
import { RootState } from "@/store/types";

export const useHasLogin = () => {
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  return (userInfo.meb_id && userInfo.token);
}