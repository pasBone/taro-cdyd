import { IAction } from "@/store/types";
import { combineReducers } from "redux";
import { stationApi } from "@/api/station";
import * as types from './station.types'
import { LoadingType } from "@/types";

/** 站点列表 */
export const stationListState: stationApi.ListRes = {
  totalRow: 0,
  pageNumber: 0,
  firstPage: true,
  lastPage: false,
  totalPage: 0,
  pageSize: 0,
  loading: false,
  error: false,
  list: []
}

export const stationList = (state = stationListState, action: IAction<stationApi.ListRes>) => {
  switch (action.type) {
    case types.GET_STATION_LIST:
      return { ...state, loading: true }
    case types.GET_STATION_LIST_SUCCESS:
      if (action.payload.firstPage) return action.payload;
      return {
        ...action.payload,
        loading: false,
        error: false,
        list: [...state.list, ...action.payload.list || []]
      }
    default:
      return { ...state, loading: false }
  }
}

/** 站点详情 */
export const stationDetailsState: stationApi.DetailRes & LoadingType = {
  station_id: '',
  operator_id: '',
  owner_id: '',
  station_code: '',
  station_name: '',
  station_type: '',
  address: '',
  longitude: '',
  latitude: '',
  quantity: '',
  transfor_type: '',
  max_power: '',
  station_logo: '',
  desc: '',
  distance: 0,
  fast_fill_all: 0,
  fast_fill_available: 0,
  slow_fill_all: 0,
  slow_fill_available: 0,
  loading: false,
  station_status: 1
}
export const stationDetails = (state = stationDetailsState, action: IAction<stationApi.DetailRes>) => {
  switch (action.type) {
    case types.GET_STATION_DETAILS:
      return { ...state, loading: true }
    case types.GET_STATION_DETAILS_SUCCESS:
      return { ...action.payload, loading: false }
    default:
      return state
  }
}

export const flat: stationApi.Flat = {
  mode: '',
  start_time: '',
  service_price: '0',
  end_time: '',
  charge_price: '0',
}

/** 站点计费规则 */
export const stationRulesState: stationApi.RuleDetailRes & LoadingType = {
  config_name: '',
  creator: '',
  create_time: 0,
  operator_id: '',
  owner_id: '',
  rule_list: {
    flat: [flat],
    peak: [flat],
    unit: [flat],
    valley: [flat]
  },
  current_rule: flat,
  config_param: '',
  update_time: 0,
  config_id: '',
  is_valid: 0,
  template_id: '',
  desc: '',
  loading: false
}

export const stationRules = (state = stationRulesState, action: IAction<stationApi.RuleDetailRes>) => {
  switch (action.type) {
    case types.GET_STATION_RULES:
      return { ...state, loading: true }
    case types.GET_STATION_RULES_SUCCESS:
      return { ...action.payload, loading: false };
    default:
      return state
  }
}

export const stationReducer = combineReducers({
  stationList,
  stationDetails,
  stationRules
})