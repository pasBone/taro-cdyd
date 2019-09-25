import { IMAGE_MAP } from "@/assets"
import Taro, { showToast } from "@tarojs/taro"

export default class Toast {
    /** 自定义通用方法 */
    static showToast(params, image: string) {
        return Taro.showToast({
            image,
            ...params
        })
    }

    /** 成功提示 */
    static succeed(params: showToast.Param) {
        return this.showToast(params, IMAGE_MAP.toastSuccess)
    }

    /** 失败提示 */
    static failed(params: showToast.Param) {
        return this.showToast(params, IMAGE_MAP.toastFaiure)
    }

    /** 警告提示 */
    static alert(params: showToast.Param) {
        return this.showToast(params, IMAGE_MAP.toastAlert)
    }

    /** 关闭提示 */
    static hideToast() {
        return Taro.hideToast();
    }
}
