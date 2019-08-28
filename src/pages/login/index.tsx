import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { IMAGE_MAP } from '@/assets'
import { AtButton, AtInput, AtToast, AtIcon } from 'taro-ui';
// import { mebApi } from '@/api/meb';
import { DEFAULT_REG_WAY, REG_MAP } from '@/constant';
import './index.scss'

class LoginView extends Component {

  config: Config = {
    navigationBarTitleText: '登录',
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  state = {
    form: {
      tel: "",
      code: "",
      open_id: "",
      reg_way: DEFAULT_REG_WAY,
      plate_number: ""
    },
    toast: {
      show: false,
      text: '',
      icon: 'alert-circle'
    }
  }

  /** 手机号码赋值 */
  onTelChange = (tel: string) => {
    this.setState({ tel })
  }
  /** 验证码赋值 */
  onCodeChange = (code: string) => {
    this.setState({ code })
  }

  /** 表单验证 */
  validateForm = () => {
    const { tel, code } = this.state.form;
    if (!REG_MAP.mobileNumber.test(String(tel))) {
      this.setState({
        toast: {
          show: true,
          text: '请输入正确的手机号码'
        }
      })
      return false;
    }
  }

  render() {
    // const { counterStore: { counter } } = this.props
    const { form, toast } = this.state;
    return (
      <View className='login-view' style={'background-image:url(' + IMAGE_MAP.loginBg + ')'}>
        <View className="logo">
          <Image className="logo-img" src={IMAGE_MAP.logo} />
        </View>

        <View className="login-box">
          <View className="login-row">
            <AtInput
              className="login-input"
              name='tel'
              type='phone'
              border={false}
              placeholder='请输入手机号码'
              value={form.tel}
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
              value={form.code}
              onChange={this.onCodeChange}
            />
          </View>
        </View>

        <AtButton className='login-btn' onClick={this.validateForm} type='primary'>登录</AtButton>

        <AtToast className='cdyd-toast' isOpened={toast.show} text={toast.text} icon='alert-circle' duration={0}></AtToast>

      </View>
    )
  }
}

export default LoginView as ComponentType
