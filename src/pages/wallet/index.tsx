import { View } from "@tarojs/components"
import { useDidShow } from "@tarojs/taro";
import { setTabbarSelected } from "@/utils/common";

export function WalletView() {
  useDidShow(() => {
    setTabbarSelected(1, this);
  });
  return (
    <View className="wallet-view">
      wallet
    </View>
  )
}

WalletView.config = {
  navigationBarTitleText: '钱包'
}