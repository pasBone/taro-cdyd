import { IAction } from "@/store/types";
import { combineReducers } from "redux";
import { stationApi } from "@/api/station";
import * as types from './station.types'

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

export const stationReducer = combineReducers({
  stationList
})