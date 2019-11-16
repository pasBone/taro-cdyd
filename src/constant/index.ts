import { IMAGE_MAP } from "@/assets"

/** 默认登录途径（1表示APP， 2表示微信公众号）	 */
export const DEFAULT_REG_WAY = 2
/** 运营商code */
export const OPERATOR_CODE = "byd"

/** openId-tg */
export const OPEN_ID = 'obC_NwYCFZPSHAThFZ0z_1nSlQbc'

/** openId-tg */
// export const OPEN_ID = 'osMUR1GF_9KNXuabZx3E7T1dQUKA'

/** 收费模式(peak：峰，flat：平，valley：谷，unit：统一单价) */
export enum RULE_MODE {
    /** 峰 */
    peak = "peak",
    /** 平 */
    flat = "flat",
    /** 谷 */
    valley = "valley",
    /** 统一单价 */
    unit = "unit",
}

export enum RULE_MODE_NAME {
    /** 峰 */
    peak = "峰时",
    /** 平 */
    flat = "平时",
    /** 谷 */
    valley = "谷时",
    /** 统一单价 */
    unit = "统一单价",
}

/** 应用名 */
export const APP_NAME = "充电有道"
// export const APP_NAME = "首页"

/** 正则 map */
export const REG_MAP = {
    /** 匹配手机号码 */
    mobileNumber: /^((\+|00)86)?1[3-9]\d{9}$/,
    /** 车牌号（普通 + 新能源） */
    plateNumber: /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/
} as const

/** 电桩信息类型 */
export enum CODE_TYPE {
    二维码 = 1,
    电桩编号 = 2,
}

/** 电桩状态 电桩状态   1-空闲 2-刷卡中 3-充电进行中 4-充电结束 5-故障 9-离线	*/
export enum PILE_STATUS {
    空闲中 = 1,
    刷卡中,
    使用中,
    充电结束,
    故障,
    离线 = 9,
}

/** 电桩状态 */
export const PILE_SHOW_MAP = {
    [PILE_STATUS.空闲中]: {
        image: IMAGE_MAP.charging_free,
        style: {
            backgroundColor: '#def1e6',
            color: '#1ea456'
        }
    },
    [PILE_STATUS.使用中]: {
        image: IMAGE_MAP.charging_busy,
        style: {
            backgroundColor: '#fde2dd',
            color: '#f54c2b'
        }
    },
    [PILE_STATUS.刷卡中]: {
        image: IMAGE_MAP.charging_busy,
        style: {
            backgroundColor: '#dce6fa',
            color: '#2565de'
        }
    },
    [PILE_STATUS.充电结束]: {
        image: IMAGE_MAP.charging_busy,
        style: {
            backgroundColor: '#faeedb',
            color: '#ef9e10'
        }
    },
    [PILE_STATUS.故障]: {
        image: IMAGE_MAP.charging_fault,
        style: {
            backgroundColor: '#fde2dd',
            color: '#f54c2b'
        }
    },
    [PILE_STATUS.离线]: {
        image: IMAGE_MAP.charging_fault,
        style: {
            backgroundColor: '#fde2dd',
            color: '#f54c2b'
        }
    },
}

/** 车主认证状态 */
export enum CAR_VERIFY_STATUS {
    未认证 = 0,
    待审核,
    未通过,
    已认证
}