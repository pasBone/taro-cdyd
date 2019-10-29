import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { CSSProperties } from 'react'
import { APP_NAME } from '@/constant'
import './style.scss'

type NavbarProps = {
    /** 左边icon slot 例如：
     * <Image src={IMAGE_MAP.mine} />或者
     * <View><Image src={IMAGE_MAP.mine} /><Image src={IMAGE_MAP.mine} /></View>*/
    renderLeftIcon: JSX.Element,
    /** 右边icon slot */
    renderRightIcon: JSX.Element,
    /** 中间title */
    title?: string
}

const buttonStyle: CSSProperties = {
    border: 'none',
    minWidth: 'auto',
    padding: 0,
    height: '48px',
    lineHeight: '56px'
}

const Navbar: FC<NavbarProps> = (props) => {

    return (
        <View className="nav__bar">
            <View className="nav__bar-left">
                <AtButton customStyle={buttonStyle}>
                    {props.renderLeftIcon}
                </AtButton>
            </View>

            <View className="nav__bar-center">{props.title || APP_NAME}</View>

            <View className="nav__bar-right">
                <AtButton customStyle={buttonStyle}>
                    {props.renderRightIcon}
                </AtButton>
            </View>
        </View>
    )
}

export default Navbar;