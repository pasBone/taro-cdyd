import { AtToast } from 'taro-ui';

export interface ToastProps {
    /** 是否显示toast */
    show: boolean,
    /** 元素的内容 */
    text: string,
    /** 元素持续的事件（设置为 0 将不会自动消失） */
    duration?: number,
    /** icon图标 */
    icon?: string,
    /** icon-image */
    image?: string,
    /** 原始状态 */
    status?: 'error' | 'loading' | 'success',
    /** 是否存在底部遮罩层 */
    hasMask?: boolean,
    /** 关闭之后触发的事件 */
    handleClose?: () => void | false | true;
}

export const Toast: Taro.FC<ToastProps> = toast => {
    return <AtToast className='cdyd-toast' isOpened={toast.show} text={toast.text} icon={`${toast.icon}`} duration={toast.duration} onClose={toast.handleClose}></AtToast>
}

Toast.defaultProps = {
    icon: 'alert-circle',
    duration: 2500,
    hasMask: true
}