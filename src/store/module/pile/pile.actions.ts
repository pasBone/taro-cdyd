import * as types from './pile.types';
import { Dispatch } from 'redux';
import { pileApi } from '@/api//pile'

/** 获取电桩列表 */
export const getPileListAsync = (params: pileApi.PileListReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getPileList());
      const response = await pileApi.list(params);
      dispatch(getPileListSuccess(response.data));
    } catch (error) {
      dispatch(getPileListError());
    }
  }
}

/** 获取电桩详情 */
export const getPileDetailsAsync = (params: pileApi.PileDetailsReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getPileList());
      const response = await pileApi.details(params);
      dispatch(getPileDetailsSuccess(response.data));
    } catch (error) {
      dispatch(getPileDetailsError());
    }
  }
}

export const getPileList = () => ({ type: types.GET_PILE_LIST });
export const getPileListSuccess = (payload) => ({ type: types.GET_PILE_LIST_SUCCESS, payload });
export const getPileListError = () => ({ type: types.GET_PILE_LIST_ERROR });

export const getPileDetails = () => ({ type: types.GET_PILE_DETAILS });
export const getPileDetailsSuccess = (payload) => ({ type: types.GET_PILE_DETAILS_SUCCESS, payload });
export const getPileDetailsError = () => ({ type: types.GET_PILE_DETAILS_ERROR });