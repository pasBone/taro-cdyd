import * as types from './order.types'
import { orderApi } from '@/api/order'
import { combineReducers } from 'redux'
import { IAction } from '@/store/types'
import { LoadingType } from '@/types'

/** 订单列表 */
const orderListState: orderApi.ListRes = {
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
/** 订单列表 */
export const orderList = (state = orderListState, actions: IAction<orderApi.ListRes>) => {
  switch (actions.type) {
    case types.GET_ORDER_LIST:
      return { ...state, loading: true }
    case types.GET_ORDER_LIST_SUCCESS:
      if (actions.payload.firstPage) return actions.payload;
      const { list } = actions.payload;
      return {
        loading: false,
        error: false,
        ...actions.payload,
        list: [...state.list, ...list || []],
      }
    default:
      return { ...state, loading: false }
  }
}

/** 订单详情 */
const orderDetailsState: orderApi.DetailRes & LoadingType = {
  /** 主键 */
  order_id: '',
  /** 交易流水（主要记录电桩上传的流水） */
  order_code: '',
  /** 订单类型（1：正常订单，2-异常订单）	 */
  order_type: '',
  /** 订单状态：0-启动中，1-充电中，2-暂停中，3-已完成，4-已关闭，5-已作废 */
  order_status: 3,
  /** 1-APP启，2-微信公众号，3-刷卡启动，4-密码启动  */
  startup_mode: 1,
  /** 充电开始时间 */
  start_time: 0,
  /** 充电结束时间 */
  end_time: 0,
  /** 结束原因  1-用户手动结束  2-钱包余额不足  3-电量已充满  4-硬件故障，5-后台结算，6-app结算，7-离网后系统结算	 */
  end_type: 1,
  /** 充电时长 */
  duration: 0,
  /** 充电电量 */
  electricity: '',
  /** 电费 */
  charge_fee: '',
  /** 服务费 */
  service_fee: '',
  /** 订单金额 */
  total_fee: '',
  /** 支付钱包类型：1-个人钱包，2-企业钱包 */
  pay_wallet: '',
  /** 运营商ID */
  operator_id: '',
  /** 站点ID */
  station_id: '',
  /** 站点名称 */
  station_name: '',
  /** 充电桩ID */
  pile_id: '',
  /** 充电桩编号 */
  pile_code: '',
  address: '',
  loading: false
}

/** 订单详情 */
export const orderDetails = (state = orderDetailsState, actions: IAction<orderApi.DetailRes>) => {
  switch (actions.type) {
    case types.GET_ORDER_DETAILS:
      return { ...state, loading: true };
    case types.GET_ORDER_DETAILS_SUCCESS:
      return { ...actions.payload, loading: false };
    default:
      return { ...state, loading: false }
  }
}

export const orderReducer = combineReducers({
  orderList,
  orderDetails
});