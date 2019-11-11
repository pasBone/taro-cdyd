import { post } from "@/utils/http"
import { StringOrNumber, BaseList, BaseListReq } from "@/types"

export const stationApi = {
  /** 获取站点详情 */
  details: post<stationApi.DetailReq, stationApi.DetailRes>("/station/get"),
  /** 获取站点列表 */
  list: post<stationApi.ListReq, stationApi.ListRes>("/station/list"),
  /** 获取计费规则 */
  getRules: post<stationApi.RuleDetailReq, stationApi.RuleDetailRes>("/rule/getRule"),
}

/* eslint-disable */
export namespace stationApi {
  export interface DetailReq {
    station_id: StringOrNumber,
    /** 经度 */
    longitude?: StringOrNumber
    /** 纬度 */
    latitude?: StringOrNumber
  }

  /** 站点详情 响应参数类型 */
  export interface DetailRes {
    /** 主键 */
    station_id: string
    /** 运营商ID */
    operator_id: string
    /** 业主ID */
    owner_id: string
    /** 站点编号 */
    station_code: string
    /** 充电站名称 */
    station_name: string
    /** 运营类型 1-自有 2-私营 3-加盟 */
    station_type: string
    /** 充电站详细地址 */
    address: string
    /** 经度 */
    longitude: string
    /** 纬度 */
    latitude: string
    /** 总充电桩数量 */
    quantity: string
    /** 充电站的变压器类型 */
    transfor_type: string
    /** 最大功率 */
    max_power: string
    /** 站点图片 */
    station_logo: string
    /** 充电注意事项 */
    desc: string
    /** 距离 */
    distance: number
    /** 快充桩（总） */
    fast_fill_all?: number
    /** 快充桩（可用） */
    fast_fill_available?: number
    /** 慢充桩（总） */
    slow_fill_all?: number
    /** 慢充桩（可用） */
    slow_fill_available?: number
    /** 站点状态 */
    station_status: number
  }
  export interface ListReq extends BaseListReq {
    /** 分页 */
    pageNumber?: number
    /** 运营商ID */
    operator_code?: StringOrNumber
    /** 站点名称 */
    station_name?: StringOrNumber
    /** 经度 */
    longitude?: StringOrNumber
    /** 纬度 */
    latitude?: StringOrNumber
  }

  export type ListRes = BaseList<ListItem>

  export interface ListItem {
    operator_id: string
    owner_id: string
    latitude: number
    station_code: string
    area_id: string
    update_time: number
    longitude: number
    station_name: string
    creator?: any
    address: string
    quantity: number
    owner_name: string
    create_time: number
    station_id: string
    transfor_type: number
    rule_id: string
    contactnum: string
    max_power?: any
    operator_name: string
    is_valid: number
    available_pile: number
    order_num: number
    station_type: number
    contacts: string
    status: number
    desc?: any
    charge_at_present: StringOrNumber
    distance: number
    current_rule: {
      mode: string
      start_time: string
      service_price: string
      end_time: string
      charge_price: string
    }
  }

  export interface RuleDetailReq {
    station_id: StringOrNumber
  }


  interface Rulelist {
    flat: Flat[]
    peak: Flat[]
    unit: Flat[]
    valley: Flat[]
  }

  export interface Flat {
    mode: string
    start_time: string
    service_price: string
    end_time: string
    charge_price: string
  }
  export interface RuleDetailRes {
    config_name: string
    creator?: any
    create_time: number
    operator_id: string
    owner_id: string
    rule_list: Rulelist
    current_rule: Flat
    config_param: string
    update_time: number
    config_id: string
    is_valid: number
    template_id: string
    desc?: any
  }
}
