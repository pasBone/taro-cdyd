import './style.scss';
import { FC } from "@tarojs/taro"
import { View, Image } from "@tarojs/components"
import { IMAGE_MAP } from "@/assets"

type EmptyDataProps = {
  /** 空白图标路径 */
  icon?: string,
  /** 空白提升文案 */
  text?: string
}

export const EmptyData: FC<EmptyDataProps> = (props) => {
  return (
    <View className="empty-data_view">
      <Image className="empty-icon" src={props.icon || IMAGE_MAP.emptyDataIcon} />
      <View className="empty-text">{props.text || '暂时没有数据噢'}</View>
    </View>
  )
}