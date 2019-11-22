import { View } from "@tarojs/components"
import { useDidShow } from "@tarojs/taro";

export function WalletView() {
  useDidShow(() => {
    if (typeof this.$scope.getTabBar === 'function' &&
      this.$scope.getTabBar()) {
      this.$scope.getTabBar().$component.setState({
        selected: 1,
      });
    }
  });
  return (
    <View>
      wallet
    </View>
  )
}

WalletView.config = {
  navigationBarTitleText: '钱包'
}