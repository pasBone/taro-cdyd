import * as types from './charge.types'
import { combineReducers } from "redux"
import { chargeApi } from '@/api/charge';
import { IAction } from '@/store/types';
import { LoadingType, ErrorType } from '@/types';

/** 获取充电信息 */
const chargeInfoState: chargeApi.GetChargingInfoRes & LoadingType & ErrorType = {
  /** 会员id */
  order_id: '',
  /** 电桩id */
  pile_id: '',
  /** 电桩编号 */
  pile_code: '',
  /** 电桩SN */
  pile_sn: '',
  /** 订单状态：/**  0-启动中，1-充电中，2-暂停中，3-已完成，4-已关闭，5-已作废	 */
  order_status: 0,
  /** 充电开始时间 */
  start_time: 0,
  /** 充电时长 */
  duration: 0,
  /** 钱包余额 */
  balance: '',
  /** 当前电价 */
  price: '',
  /** 充电时长描述 */
  duration_desc: {
    /** 充电天数	 */
    day: 0,
    /** 充电小时	 */
    hour: 0,
    /** 充电分钟	 */
    minute: 0,
    /** 充电秒数 */
    second: 0,
  },
  /** 桩号位置 */
  order_num: '',
  /** 充电电量 */
  electricity: '',
  /** 订单费用 */
  total_fee: '',
  /** 实时充电数据 */
  charging_data: {
    /** 当前电压 */
    voltage: '',
    /** 当前电流 */
    currentFlow: '',
    /** 电池使用率 */
    soc: 0,
    /** 电桩状态 */
    pileStatus: '',
    /** 功率 */
    power: '',
    /** 剩余时间 */
    restTime: 0,
  },
  loading: false,
  error: false
}

export const chargeInfo = (state = chargeInfoState, actions: IAction<chargeApi.GetChargingInfoRes>) => {
  switch (actions.type) {
    case types.APPLY_CHARGE:
      return { ...state, loading: true, error: false }
    case types.APPLY_CHARGE_ERROR:  //启动充电失败
      return { ...state, loading: false, error: true }
    case types.APPLY_CHARGE_SUCCESS: //启动充电成功
      return { ...state, loading: false, error: false }

    case types.GET_CHARGE_INFO:  //获取充电信息
      return { ...chargeInfoState, loading: false, error: false, ...actions.payload }
    case types.GET_CHARGE_INFO_SUCCESS:
      return { ...chargeInfoState, loading: false, error: false, ...actions.payload }
    case types.GET_CHARGE_INFO_ERROR:
      return { ...state, error: true, loading: false }
    default:
      return state
  }
}

export const chargeReducer = combineReducers({
  chargeInfo
});