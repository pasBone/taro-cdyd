import './style.scss';
import { FC } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from 'taro-ui';

type IProps = {
  /** label */
  label: string,
  /** value */
  value?: string,
  /** value jsx  element */
  renderValue?: JSX.Element,
  /** 是否显示箭头 */
  showArrow?: boolean,
  /** 事件 */
  onClick?: Function
}

export const ListCell: FC<IProps> = (props) => {
  return (
    <View className="list-cell__view" onClick={() => props.onClick && props.onClick()}>
      <View className="list-cell__item">
        <View className="label">{props.label}</View>
        {<View className="value">{props.value || props.renderValue}</View>}
        {props.showArrow && <View className="arrow-icon"><AtIcon value='chevron-right' size='16' color='#ccc'></AtIcon></View>}
      </View>
    </View>
  )
}

ListCell.defaultProps = {
  showArrow: true,
  onClick: () => { }
}