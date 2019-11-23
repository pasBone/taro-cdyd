import './app.scss'
import Taro, { Component, Config } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import configStore from './store'
import { getLocationAsync } from '@/store/module/common/common.actions'
import { APP_NAME } from './constant'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/index',
      'pages/mine/index',
      'pages/order/list/index',
      'pages/order/details/index',
      'pages/wallet/index',
      'pages/station/details/index',
      'pages/station/list/index',
      'pages/pile/details/index',
      'pages/charging/index',
      'pages/webview/index',
      'pages/login/index',
      'pages/react-typescript/index',
    ],
    tabBar: {
      "custom": true,
      "color": "#7A7E83",
      "selectedColor": "#3cc51f",
      "borderStyle": "black",
      "backgroundColor": "#ffffff",
      "list": [
        {
          "pagePath": "pages/home/index",
          "text": "首页"
        },
        {
          "pagePath": "pages/wallet/index",
          "text": "钱包"
        },
        {
          "pagePath": "pages/order/list/index",
          "text": "订单"
        },
        {
          "pagePath": "pages/mine/index",
          "text": "我的"
        }
      ]
    },
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: APP_NAME,
      navigationBarTextStyle: 'black'
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序地图导航"
      }
    },
    usingComponents: {}
  }

  componentDidMount() {
    /** 初始化获取定位信息 */
    store.dispatch(
      getLocationAsync()
    )
  }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}></Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
