import { pileApi } from "@/api/pile";
import { combineReducers } from "redux";
import { IAction } from "@/store/types";
import * as types from './pile.types'
import { LoadingType } from "@/types";

/** 电桩列表 */
export const pileListState: pileApi.PileListRes = {
  totalRow: 0,
  pageNumber: 1,
  firstPage: true,
  lastPage: true,
  totalPage: 0,
  pageSize: 10,
  loading: false,
  error: false,
  list: []
}

export const pileList = (state = pileListState, actions: IAction<pileApi.PileListRes>) => {
  switch (actions.type) {
    case types.GET_PILE_LIST:
      return { ...state, loading: true, error: false };
    case types.GET_PILE_LIST_SUCCESS:
      return { ...actions.payload, loading: false, error: false, pageNumber: state.pageNumber + 1 };
    case types.GET_PILE_LIST_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state
  }
}

/** 电桩详情 */
export const pileDetailsState: pileApi.PileDetailsRes & LoadingType = {
  /**  主键	 */
  pile_id: "",
  /**  电桩编号	 */
  pile_code: "",
  /**  充电站表ID	 */
  station_id: "",
  /**  供应商公司ID	 */
  supplier_id: "",
  /**  充电桩出厂标识	 */
  pile_sn: "",
  /**  电桩二维码	 */
  qr_code: "",
  /**  充电桩类型	 */
  type: "",
  /**  充电桩标准	 */
  std: "",
  /**  充电桩电流类型	 */
  direct: "",
  /**  输入电压	 */
  input_voltage: "",
  /**  输出电压	 */
  output_voltage: "",
  /**  输出电流	 */
  output_current: "",
  /**  安装方式	 */
  install_way: "",
  /**  通信方式	 */
  commication: "",
  /**  防护等级	 */
  protectgrade: "",
  /**  额定功率	 */
  power: "",
  /**  正式使用日期	 */
  use_date: "",
  /**  排序号	 */
  order_num: "",
  /** 状态  0-禁用 1-启动中 2-使用中 3-充满 4-故障 6-空闲 */
  pile_status: 0,
  /** 站点名称 */
  station_name: "",
  /** soc进度 */
  soc: 0,
  loading: false
}

export const pileDetails = (state = pileDetailsState, actions: IAction<pileApi.PileDetailsRes>) => {
  switch (actions.type) {
    case types.GET_PILE_DETAILS:
      return { ...state, loading: true };
    case types.GET_PILE_DETAILS_SUCCESS:
      return { ...actions.payload, loading: false };
    case types.GET_PILE_DETAILS_ERROR:
      return { ...state, loading: false };
    default:
      return state
  }
}

export const pileReducer = combineReducers({
  pileList,
  pileDetails
});