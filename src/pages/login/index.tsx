import './index.scss'
import { IMAGE_MAP } from '@/assets';
import { AtButton, AtInput } from 'taro-ui';
import { View, Image } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux';
import VerificationCode from '@/components/verification-code'
import Taro, { useState, useMemo, useEffect } from '@tarojs/taro'
import { loginAsync, clearUserInfo } from '@/store/module/meb/meb.actions'
import { RootState } from '@/store/types';
import { DEFAULT_REG_WAY } from '@/constant';

const LoginView: Taro.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.meb.userInfo);
  const [tel, setTel] = useState('');
  const [code, setCode] = useState('');

  /** 按钮禁用状态 */
  const loginBtnDisabled = useMemo(() => {
    return loading || !(tel.length === 11 && code.length === 6)
  }, [tel, code, loading]);

  const submit = () => {
    dispatch(
      loginAsync({
        reg_way: DEFAULT_REG_WAY,
        tel,
        code,
      })
    )
  }

  useEffect(() => {
    dispatch(clearUserInfo());
  }, []);

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
            placeholder='请输入手机号码'
            border={false}
            value={tel}
            onChange={value => setTel(value)}
          />

          <VerificationCode
            tel={tel}
            textStyle={{
              textAlign: 'right',
              color: '#1dad92',
              paddingRight: '8px'
            }}
          />
        </View>

        <View className="login-row">
          <AtInput
            className="login-input"
            name='code'
            type='digit'
            placeholder='验证码'
            maxLength='6'
            border={false}
            value={code}
            onChange={value => setCode(value)}
          />
        </View>

      </View>

      <AtButton disabled={loginBtnDisabled} loading={loading} className='login-btn' onClick={submit} type='primary'>登录</AtButton>

    </View>
  )
}

LoginView.config = {
  navigationBarTitleText: '登录'
}

export default LoginView;
