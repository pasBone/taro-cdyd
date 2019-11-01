
/** 默认登录途径（1表示APP， 2表示微信公众号）	 */
export const DEFAULT_REG_WAY = 2
/** 运营商code */
export const OPERATOR_CODE = "byd"

/** 应用名 */
// export const APP_NAME = "充电有道"
export const APP_NAME = "首页"

/** 正则 map */
export const REG_MAP = {
    /** 匹配手机号码 */
    mobileNumber: /^((\+|00)86)?1[3-9]\d{9}$/,
    /** 车牌号（普通 + 新能源） */
    plateNumber: /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/
} as const
