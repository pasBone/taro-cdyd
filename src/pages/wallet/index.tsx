import './style.scss';
import { View, Text, Image } from "@tarojs/components"
import { useDidShow, useMemo, useCallback, useState, setNavigationBarTitle } from "@tarojs/taro";
import { setTabbarSelected } from "@/utils/common";
import { AtTag, AtInput, AtIcon } from 'taro-ui';
import { IMAGE_MAP } from '@/assets';

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

  const tagChange = useCallback((current) => {
    const result = initTagList.map(item => ({
      value: item.value,
      active: current.name == item.value
    }));
    setTagList(result);
  }, []);

  useDidShow(() => {
    setNavigationBarTitle({ title: '我的钱包' });
    setTabbarSelected(1, this);
  });

  return (
    <View className="wallet-view">

      <View className="wallet-balance">
        <View className="wallet-balance__number">
          <View>20.00</View>
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
            <AtIcon value='check' size='12' color='#fff'></AtIcon>
          </View>
        </View>
        <View></View>
      </View>

    </View>
  )
}