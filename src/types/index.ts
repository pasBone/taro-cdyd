export interface PlainObj {
    [key: string]: any
}

export type StringOrNumber = string | number;

export interface LoadingType {
    loading: boolean
}

/** 操作状态  后台返回也是这个 */
export enum OPERATE_CODE {
    fail = 0,
    success = 1,
    "登录信息失效" = 422,
    "充电桩不存在" = 1401,
    "车主未认证_充电中" = 131256,
    "车主认证未通过_充电中" = 131257,
    "电桩暂不可用" = 191011,
    "充电枪未连接" = 191012,
    "余额不足请充值" = 191013,
    "车主未认证_启动充电" = 191110,
    "车主认证未通过_启动充电" = 191111,
}

export interface Res<T> {
    code: OPERATE_CODE
    success: boolean
    message: string
    data: T
}