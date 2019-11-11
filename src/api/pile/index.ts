import { post } from '@/utils/http';
import { StringOrNumber, BaseList } from "@/types"
import { CODE_TYPE, PILE_STATUS } from "@/constant"

export const pileApi = {
  /** 电桩详情 */
  get: post<pileApi.PileGetReq, pileApi.PileGetRes>("/pile/get"),
  /** 电桩列表 */
  list: post<pileApi.PileListReq, pileApi.PileListRes>("/pile/list"),
  /** 通过二维码或者电桩编号获取电桩信息 */
  getByCode: post<pileApi.GetByCodeReq, pileApi.PileGetRes>(
    "/pile/getByCode",
  ),
}

/* eslint-disable */
export namespace pileApi {
  /** 通过二维码或者电桩编号获取电桩信息 请求参数类型 */
  export interface GetByCodeReq {
    /** 会员id */
    meb_id: StringOrNumber
    /** 电桩信息类型（1：二维码，2：电桩编号） */
    code_type: CODE_TYPE
    /** 电桩信息（二维码或者电桩编号） */
    code: StringOrNumber
  }

  export interface PileGetReq {
    /** 电桩ID */
    pile_id: StringOrNumber
  }
  export interface PileGetRes {
    /**  主键	 */
    pile_id: string
    /**  电桩编号	 */
    pile_code: string
    /**  充电站表ID	 */
    station_id: string
    /**  供应商公司ID	 */
    supplier_id: string
    /**  充电桩出厂标识	 */
    pile_sn: string
    /**  电桩二维码	 */
    qr_code: string
    /**  充电桩类型	 */
    type: string
    /**  充电桩标准	 */
    std: string
    /**  充电桩电流类型	 */
    direct: string
    /**  输入电压	 */
    input_voltage: string
    /**  输出电压	 */
    output_voltage: string
    /**  输出电流	 */
    output_current: string
    /**  安装方式	 */
    install_way: string
    /**  通信方式	 */
    commication: string
    /**  防护等级	 */
    protectgrade: string
    /**  额定功率	 */
    power: string
    /**  正式使用日期	 */
    use_date: string
    /**  排序号	 */
    order_num: string
    /** 状态  0-禁用 1-启动中 2-使用中 3-充满 4-故障 6-空闲 */
    pile_status: PILE_STATUS,
    /** 站点名称 */
    station_name: string
  }

  export interface PileListReq {
    /** 电桩ID */
    station_id: StringOrNumber,
     /** 分页 */
     pageNumber?: number,
     pageSize?: number,
  }

  export type PileListRes = BaseList<PileGetRes>
}
