import './style.scss';
import { View, Text, Image, Block } from "@tarojs/components"
import { useDidShow, useCallback, useState, setNavigationBarTitle, usePullDownRefresh, stopPullDownRefresh, showNavigationBarLoading, hideNavigationBarLoading, switchTab } from "@tarojs/taro";
import { setTabbarSelected, reLogin } from "@/utils/common";
import { AtTag, AtInput, AtIcon } from 'taro-ui';
import { IMAGE_MAP } from '@/assets';
import { useSelector, useDispatch } from '@tarojs/redux';
import { RootState } from '@/store/types';
import { getWalletDetailsAsync } from '@/store/module/wallet/wallet.actions';

const initTagList = [{
  value: 300,
  active: false,
}, {
  value: 200,
  active: false,
}, {
  value: 100,
  active: true,
}, {
  value: 50,
  active: false,
}]

export function WalletView() {
  const [tagList, setTagList] = useState(initTagList);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.meb.userInfo);
  const walletDetails = useSelector((state: RootState) => state.wallet.walletDetails);

  const tagChange = useCallback((current) => {
    const result = initTagList.map(item => ({
      value: item.value,
      active: current.name == item.value
    }));
    setTagList(result);
  }, []);

  /** 获取钱包详情 */
  const getWalletDetails = useCallback(() => {
    showNavigationBarLoading();
    dispatch(
      getWalletDetailsAsync({
        meb_id: userInfo.meb_id,
        operator_id: userInfo.operator_id
      })
    ).finally(_ => {
      hideNavigationBarLoading();
      stopPullDownRefresh();
    });
  }, [userInfo.meb_id]);

  usePullDownRefresh(() => {
    getWalletDetails();
  });

  useDidShow(() => {
    if (userInfo.meb_id && userInfo.token) {
      setNavigationBarTitle({ title: '我的卡包' });
      setTabbarSelected(1, this);
      getWalletDetails();
    } else {
      reLogin().then((res)=>{
        if(res.cancel){
          switchTab({
            url: '/pages/home/index'
          })
        }
      })
    }
  });

  return (
    <View className="wallet-view">
      {
        userInfo.meb_id && <Block>
          <View className="wallet-balance">
            <View className="wallet-balance__number">
              <View>{walletDetails.totalAmount}</View>
              <View className="wallet-balance__label">当前余额(元)</View>
            </View>
          </View>

          <View className="wallet-recharge">
            <View className="wallet-recharge__name">充值金额</View>

            <View className="wallet-recharge__list">
              {tagList.map(item => (
                <AtTag
                  type='primary'
                  onClick={tagChange}
                  active={item.active}
                  name={`${item.value}`}
                  key={item.value}
                >{item.value}元</AtTag>
              ))}
            </View>

            <View className="wallet-recharge__input">
              <Text className="wallet-recharge__label">￥</Text>
              <AtInput
                border={false}
                name='value'
                type='text'
                placeholder='其他金额（元）'
                onChange={() => { }}
              />
            </View>
          </View>

          <View className="recharge-way">
            <View className="recharge-way__label">充值方式</View>
            <View className="recharge-way__list">
              <Image className="pay-icon" src={IMAGE_MAP.wxPay} />
              <Text className="pay-text">微信支付</Text>
              <View className="check-box checked">
                <AtIcon value='check' size='14' color='#fff'></AtIcon>
              </View>
            </View>
            <View></View>
          </View>
        </Block>
      }
    </View>
  )
}

WalletView.config = {
  enablePullDownRefresh: true
}