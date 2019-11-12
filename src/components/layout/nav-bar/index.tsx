import Taro, { FC } from '@tarojs/taro'
import { CoverView } from '@tarojs/components'
import { CSSProperties } from 'react'
import { APP_NAME } from '@/constant'
import './style.scss'

type NavbarProps = {
  /** 左边icon slot 例如：
   * <Image src={IMAGE_MAP.mine} />或者
   * <CoverView><Image src={IMAGE_MAP.mine} /><Image src={IMAGE_MAP.mine} /></CoverView>*/
  renderLeftIcon: JSX.Element,
  /** 右边icon slot */
  renderRightIcon: JSX.Element,
  /** 中间title */
  title?: string
}

// const buttonStyle: CSSProperties = {
//     border: 'none',
//     minWidth: 'auto',
//     padding: 0,
//     height: '48px',
//     lineHeight: '56px'
// }

const Navbar: FC<NavbarProps> = (props) => {

  return (
    <CoverView className="nav__bar">
      <CoverView className="nav__bar-left">
        {/* <AtButton customStyle={buttonStyle}> */}
        {props.renderLeftIcon}
        {/* </AtButton> */}
      </CoverView>

      <CoverView className="nav__bar-center">{props.title || APP_NAME}</CoverView>

      <CoverView className="nav__bar-right">
        {/* <AtButton customStyle={buttonStyle}> */}
        {props.renderRightIcon}
        {/* </AtButton> */}
      </CoverView>
    </CoverView>
  )
}

export default Navbar;