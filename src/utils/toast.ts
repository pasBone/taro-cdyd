import { IMAGE_MAP } from "@/assets"
import Taro, { showToast } from "@tarojs/taro"

type toastParams = showToast.Param | string;

export default class Toast {
    /** 直接传 title */
    static showToast(params: string, image?: string): Promise<void>;
    /** 传入更多参数配置 */
    static showToast(params: toastParams, image?: string): Promise<void>;

    /** 实现方法 */
    static showToast(params: toastParams, image?: string): Promise<void> {
        let config: toastParams = { image, title: '', mask: true, duration: 2500 };
        /**因为小程序限制有icon/image的情况下title只能显示7个字，所以添加一个不显示icon/image的判断 */
        if (image === 'none') {
            config.image = '';
            config.icon = 'none'
        }
        typeof params === 'string' ? config.title = params : config = params;
        return Taro.showToast(config)
    }

    /** 成功提示 */
    static succeed(params: toastParams) {
        this.showToast(params, IMAGE_MAP.toastSuccess)
    }

    /** 失败提示 */
    static failed(params: toastParams) {
        return this.showToast(params, IMAGE_MAP.toastFaiure)
    }

    /** 警告提示 */
    static alert(params: toastParams) {
        return this.showToast(params, IMAGE_MAP.toastAlert)
    }

    /** 常规提示无icon/image */
    static info(params: toastParams) {
        return this.showToast(params, 'none')
    }

    /** 关闭提示 */
    static hideToast() {
        return Taro.hideToast();
    }
}
