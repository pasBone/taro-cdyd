import { View } from "@tarojs/components"
import { FC } from "@tarojs/taro"
import { useDispatch, useSelector } from "@tarojs/redux"
import { RootState } from "@/store/types";

export const OrderView: FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);

  return (
    <View>
      wallet
    </View>
  )
}

OrderView.config = {
  navigationBarTitleText: '钱包'
}
