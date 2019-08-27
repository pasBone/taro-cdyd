import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IMAGE_MAP } from '@/assets'
import { AtForm, AtInput } from 'taro-ui';
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

  onTelChange: () => {

  }

  render() {
    // const { counterStore: { counter } } = this.props
    return (
      <View className='loginView' style={'background-image:url(' + IMAGE_MAP.loginBg + ')'}>
        <View className="logo">
          {/* <Image className="logo-img" src={IMAGE_MAP.logo} /> */}
          <Image className="logo-img" src='' />
        </View>

        <AtForm>
          <AtInput
            clear
            name='tel'
            type='text'
            maxLength='4'
            placeholder='验证码'
            value={this.state.code}
            onChange={this.onTelChange}
          />

        </AtForm>
      </View>
    )
  }
}

export default LoginView as ComponentType
