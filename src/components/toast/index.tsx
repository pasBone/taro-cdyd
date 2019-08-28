import { AtToast } from 'taro-ui';

interface IToastProps {
    /** 是否显示 */
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

const defaultProps = {
    icon: 'alert-circle',
    duration: 3000,
    hasMask: true
}

function ToastView(props: { toast: IToastProps }) {
    const toast = { ...defaultProps, ...props.toast }
    return (
        <AtToast className='cdyd-toast' isOpened={toast.show} text={toast.text} icon={`${toast.icon}`} duration={toast.duration} onClose={toast.handleClose}></AtToast>
    );
}

export default ToastView;