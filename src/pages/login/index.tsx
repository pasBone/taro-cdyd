import { mebApi } from '@/api/meb';
import { IMAGE_MAP } from '@/assets'
import Toast from '@/components/toast';
import { AtButton, AtInput } from 'taro-ui';
import Taro, { useState } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { DEFAULT_REG_WAY, REG_MAP } from '@/constant';
import './index.scss'


const getFormState = (): mebApi.LoginReq => {
  return {
    tel: "",
    code: "",
    open_id: "",
    reg_way: DEFAULT_REG_WAY,
    plate_number: ""
  }
}

const getToastState = () => {
  return {
    show: false,
    text: ''
  }
}

const LoginView: Taro.FC = () => {

  const [form, setFormState] = useState(getFormState());
  const [toast, setToastState] = useState(getToastState());


  /** 手机号码赋值 */
  const onTelChange = (tel: string) => {
    setFormState({ ...form, tel })
  }

  /** 验证码赋值 */
  const onCodeChange = (code: string) => {
    setFormState({ ...form, code })
  }

  /** 验证手机号码是否正确 */
  const validateTel = () => {
    return REG_MAP.mobileNumber.test(String(form.tel));
  }

  /** 验证手机号码是否正确 */
  const validateCode = () => {
    return String(form.code).length === 6;
  }

  const validateForm = () => {
    if (!validateTel()) {
      return setToastState({
        show: true,
        text: '请输入正确的手机号码'
      })
    }
    if (!validateCode()) {
      return setToastState({
        show: true,
        text: '验证码格式错误'
      })
    }
  }

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
            onChange={onTelChange}
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
            onChange={onCodeChange}
          />
        </View>
      </View>

      <AtButton className='login-btn' onClick={validateForm} type='primary'>登录</AtButton>

      <Toast toast={{ show: toast.show, text: toast.text }} />
    </View>
  )
}


export default LoginView
