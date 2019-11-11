import { pileApi } from "@/api/pile";
import { combineReducers } from "redux";
import { IAction } from "@/store/types";
import * as types from './pile.types'

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


export const pileReducer = combineReducers({
  pileList
});