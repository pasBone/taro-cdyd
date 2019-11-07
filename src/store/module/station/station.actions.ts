import * as types from './station.types'
import { Dispatch } from 'redux'
import { stationApi } from '@/api/station'


/** 获取站点列表 */
export const getStationListAsync = (params?: stationApi.ListReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getStationList());
      const response = await stationApi.list(params);
      dispatch(getStationSuccess(response.data));
    } catch (error) { }
  }
}

/** 获取站点详情 */
export const getStationDetailsAsync = (params: stationApi.DetailReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getStationDetails());
      const response = await stationApi.details(params);
      dispatch(getStationDetailsSuccess(response.data))
    } catch (error) { }
  }
}


/** 获取站点列表 */
export const getStationList = () => ({ type: types.GET_STATION_LIST });
export const getStationSuccess = (payload) => ({ type: types.GET_STATION_LIST_SUCCESS, payload });

/** 获取站点详情 */
export const getStationDetails = () => ({ type: types.GET_STATION_DETAILS });
export const getStationDetailsSuccess = (payload) => ({ type: types.GET_STATION_DETAILS_SUCCESS, payload });


export const asyncAction = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: 'SOME_SYNC_ACTION'})
    return Promise.resolve();
  }
}