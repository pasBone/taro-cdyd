import './style.scss';
import { CoverView, CoverImage } from "@tarojs/components";
import { IMAGE_MAP } from "@/assets";
import { switchTab } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { scanCodeWithPileAsync } from "@/store/module/common/common.actions";
import { Dispatch } from 'redux';

class Tabbar extends Taro.Component<{ dispatch: Dispatch<any> }> {

  state = {
    selected: 0,
    tabBarData: [{
      text: "首页",
      pagePath: '/pages/home/index',
      iconPath: IMAGE_MAP.tabHomeIcon,
      selectedIconPath: IMAGE_MAP.tabHomeIconFill,
    }, {
      text: '卡包',
      pagePath: '/pages/wallet/index',
      iconPath: IMAGE_MAP.tabWalletIcon,
      selectedIconPath: IMAGE_MAP.tabWalletIconFill,
      dot: true
    }, {
      text: '扫码',
      icon: IMAGE_MAP.tabScanIconFill,
    }, {
      text: '订单',
      pagePath: '/pages/order/list/index',
      iconPath: IMAGE_MAP.tabOrderIcon,
      selectedIconPath: IMAGE_MAP.tabOrderIconFill
    }, {
      text: '我的',
      pagePath: '/pages/mine/index',
      iconPath: IMAGE_MAP.tabMineIcon,
      selectedIconPath: IMAGE_MAP.tabMineIconFill
    }]
  }

  handleScanCode() {
    this.props.dispatch(
      scanCodeWithPileAsync()
    )
  }

  switchTab(item) {
    switchTab({ url: item.pagePath });
  }

  showDot(item) {
    // const walletDetails = useSelector((state: RootState) => state.wallet.walletDetails);
    // return walletDetails.totalAmount < 20 && item.dot;
    return false
  }

  render() {
    return (
      <CoverView className="tab-bar__view">
        <CoverView className="tab-bar__list">
          {
            this.state.tabBarData.map((item, index) => {
              const iconPath = this.state.selected === index ? item.selectedIconPath : item.iconPath;
              return index == 2 ?
                <CoverView className="tab-bar__item" onClick={this.handleScanCode}>
                  <CoverImage className="tab-bar__scan" src={item.icon} />
                </CoverView>
                :
                <CoverView className={`tab-bar__item ${this.showDot(item) && 'dot'}`} onClick={() => this.switchTab(item)} key={item.pagePath}>
                  <CoverImage className="icon" src={iconPath} />
                  <CoverView className="text">{item.text}</CoverView>
                </CoverView>
            })
          }
        </CoverView>
      </CoverView>
    )
  }
}

export default connect(() => ({}), dispatch => ({dispatch}))(Tabbar);