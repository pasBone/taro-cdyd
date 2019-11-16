import { post } from "@/utils/http"
import { StringOrNumber, BaseList } from "@/types"

export const orderApi = {
  /** 历史订单详情（充电订单） */
  get: post<orderApi.DetailReq, orderApi.DetailRes>("/orderHis/get"),
  /** 历史订单列表（充电订单） */
  list: post<orderApi.ListReq, orderApi.ListRes>("/orderHis/list"),
}

/* eslint-disable */
export namespace orderApi {

  /** 订单详情 请求参数类型 */
  export interface DetailReq {
    /** 订单id */
    order_id: StringOrNumber
  }

  /** 订单详情 响应参数类型 */
  export interface DetailRes {
    /** 主键 */
    order_id: string,
    /** 交易流水（主要记录电桩上传的流水） */
    order_code: string,
    /** 订单类型（1：正常订单，2-异常订单）	 */
    order_type: string,
    /** 订单状态：0-启动中，1-充电中，2-暂停中，3-已完成，4-已关闭，5-已作废 */
    order_status: ORDER_STATUS,
    /** 1-APP启，2-微信公众号，3-刷卡启动，4-密码启动  */
    startup_mode: STARTUP_MODE,
    /** 充电开始时间 */
    start_time: string,
    /** 充电结束时间 */
    end_time: string,
    /** 结束原因  1-用户手动结束  2-钱包余额不足  3-电量已充满  4-硬件故障，5-后台结算，6-app结算，7-离网后系统结算	 */
    end_type: END_TYPE,
    /** 充电时长 */
    duration: string,
    /** 充电电量 */
    electricity: string,
    /** 电费 */
    charge_fee: StringOrNumber,
    /** 服务费 */
    service_fee: StringOrNumber,
    /** 订单金额 */
    total_fee: StringOrNumber,
    /** 支付钱包类型：1-个人钱包，2-企业钱包 */
    pay_wallet: string,
    /** 运营商ID */
    operator_id: string,
    /** 站点ID */
    station_id: string,
    /** 站点名称 */
    station_name: string,
    /** 充电桩ID */
    pile_id: string,
    /** 充电桩编号 */
    pile_code: string,
  }

  /** 订单列表 请求参数类型 */
  export interface ListReq {
    /**  会员id **/
    meb_id: StringOrNumber,
    /** 分页 */
    pageNumber?: number,
    /** 分页 */
    pageSize?: number
  }

  /** 订单列表 相应参数类型 */
  export interface ListItemRes extends DetailRes { }

  export type ListRes = BaseList<ListItemRes>

}

/** 结束原因  1-用户手动结束  2-钱包余额不足  3-电量已充满  4-硬件故障，5-后台结算，6-app结算，7-离网后系统结算	 */
export enum END_TYPE {
  用户手动结束 = 1,
  钱包余额不足,
  电量已充满,
  硬件故障,
  后台结算,
  app结算,
  离网后系统结算
}

/** 订单状态：0-启动中，1-充电中，2-暂停中，3-已完成，4-已关闭，5-已作废 */
export enum ORDER_STATUS {
  启动中,
  充电中,
  暂停中,
  已完成,
  已关闭,
  已作废
}

/** 1-APP启动，2-微信公众号，3-刷卡启动，4-密码启动  */
export enum STARTUP_MODE {
  APP启动 = 1,
  微信公众号,
  刷卡启动,
  密码启动
}