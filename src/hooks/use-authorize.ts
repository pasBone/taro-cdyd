import { useSelector } from "@tarojs/redux";
import { RootState } from "@/store/types";
import { navigateTo } from "@tarojs/taro";

export const useAuthorize = () => {
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  return new Promise((resolve) => {
    if (!userInfo.meb_id || !userInfo.token) {
      return navigateTo({
        url: '/pages/login/index'
      });
    }
    resolve();
  });
}