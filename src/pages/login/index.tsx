import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { IMAGE_MAP } from '@/assets'
import { AtButton, AtInput } from 'taro-ui';
import { mebApi } from '@/api/meb';
import { DEFAULT_REG_WAY } from '@/constant';
import './index.scss'

class LoginView extends Component {

  config: Config = {
    navigationBarTitleText: '登录',
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  state: mebApi.LoginReq = {
    tel: "",
    code: "",
    open_id: "",
    reg_way: DEFAULT_REG_WAY,
    plate_number: ""
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onTelChange = (tel: string) => {
    this.setState({
      tel
    })
  }

  onCodeChange = (code: string) => {
    this.setState({
      code
    })
  }

  render() {
    // const { counterStore: { counter } } = this.props
    return (
      <View className='login-view' style={'background-image:url(' + IMAGE_MAP.loginBg + ')'}>
        <View className="logo">
          {/* <Image className="logo-img" src={IMAGE_MAP.logo} /> */}
          <Image className="logo-img" src='' />
        </View>

        <View className="login-box">
          <View className="login-row">
            <AtInput
              className="login-input"
              name='tel'
              type='phone'
              border={false}
              placeholder='请输入手机号码'
              value={this.state.tel}
              onChange={this.onTelChange}
            />
            <Text className="send-code"> 发送验证码 </Text>
          </View>

          <View className="login-row">
            <AtInput
              className="login-input"
              name='code'
              type='number'
              border={false}
              placeholder='验证码'
              maxLength='6'
              value={this.state.code}
              onChange={this.onCodeChange}
            />
          </View>
        </View>

        <AtButton className="login-btn" type='primary'>登录</AtButton>
      </View>
    )
  }
}

export default LoginView as ComponentType
