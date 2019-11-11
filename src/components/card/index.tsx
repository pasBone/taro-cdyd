import { FC } from "@tarojs/taro";
import { View } from "@tarojs/components";
import './style.scss'

type IProps = {
  children: JSX.Element,
  title: string
}

export const CardBox: FC<IProps> = (props) => {
  return (
    <View className="card-box">
      <View className="card-box__title">{props.title}</View>
      <View className="card-box__body">{props.children}</View>
    </View>
  )
}