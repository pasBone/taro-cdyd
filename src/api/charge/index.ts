import { StringOrNumber } from "@/types"
import { post } from "@/utils/http"
import { ORDER_STATUS } from "@/constant"

export const chargeApi = {
  /** 启动充电 */
  applyCharge: post<chargeApi.ApplyChargeReq, chargeApi.ApplyChargeRes>("/charge/applyCharge"),
  /** 查看充电信息 */
  getChargingInfo: post<chargeApi.GetChargingInfoReq, chargeApi.GetChargingInfoRes>("/charge/getChargingInfo"),
  /** 结束充电 */
  stopCharge: post<chargeApi.StopChargeReq, chargeApi.StopChargeRes>("/charge/stopCharge"),
}
/* eslint-disable */
export namespace chargeApi {
  /** 启动充电 请求参数类型 */
  export interface ApplyChargeReq {
    /** 会员id */
    meb_id: StringOrNumber
    /** pile_sn */
    pile_sn: StringOrNumber,
    /** 启动方式：1-app，2-公众号 */
    startup_mode: StringOrNumber
  }

  /** 启动充电 响应参数类型 */
  export interface ApplyChargeRes {
    /** 会员id */
    order_id: string
    /** 电桩id */
    pile_id: string
    /** 电桩编号 */
    pile_code: string
    /** 电桩SN */
    pile_sn: string,
    /** 订单状态：/**  0-启动中，1-充电中，2-暂停中，3-已完成，4-已关闭，5-已作废	 */
    order_status: ORDER_STATUS
    /** 充电开始时间 */
    start_time: number
    /** 充电时长 */
    duration: number
    /** 钱包余额 */
    balance: StringOrNumber,
    /** 当前电价 */
    price: StringOrNumber
    /** 充电时长描述 */
    duration_desc: {
      /** 充电天数	 */
      day: number
      /** 充电小时	 */
      hour: number
      /** 充电分钟	 */
      minute: number
      /** 充电秒数 */
      second: number
    }
    /** 桩号位置 */
    order_num: string,
    /** 充电电量 */
    electricity: StringOrNumber
    /** 订单费用 */
    total_fee: StringOrNumber
    update_time: StringOrNumber,
    /** 实时充电数据 */
    charging_data: {
      /** 当前电压 */
      voltage: StringOrNumber
      /** 当前电流 */
      currentFlow: StringOrNumber
      /** 电池使用率 */
      soc: number
      /** 电桩状态 */
      pileStatus: StringOrNumber
      /** 功率 */
      power: StringOrNumber
      /** 剩余时间 */
      restTime: number
    }
  }

  /** 充电信息 请求参数类型 */
  export interface GetChargingInfoReq {
    /** 会员id */
    meb_id: StringOrNumber
  }
  /** 充电信息 返回参数类型 */
  export type GetChargingInfoRes = ApplyChargeRes

  /** 结束充电 请求参数类型 */
  export interface StopChargeReq {
    /** 会员id */
    meb_id: StringOrNumber
    /** 电桩SN */
    pile_sn: StringOrNumber
    /** 启动方式：1-app，2-公众号 */
    startup_mode: StringOrNumber
  }

  /** 结束充电 请求参数类型 */
  export type StopChargeRes = ApplyChargeRes
}
