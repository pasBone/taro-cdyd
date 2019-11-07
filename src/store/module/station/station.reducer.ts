import { IAction } from "@/store/types";
import { combineReducers } from "redux";
import { stationApi } from "@/api/station";
import * as types from './station.types'
import { LoadingType } from "@/types";

/** 站点列表 */
export const stationListState: stationApi.ListRes = {
  totalRow: 0,
  pageNumber: 1,
  firstPage: true,
  lastPage: false,
  totalPage: 0,
  pageSize: 0,
  loading: false,
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

export const stationReducer = combineReducers({
  stationList,
  stationDetails
})