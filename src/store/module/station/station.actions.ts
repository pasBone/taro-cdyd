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

/** 获取计费规则 */
export const getStationRulesAsync = (params: stationApi.RuleDetailReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getStationRules())
      const response = await stationApi.getRules(params);
      dispatch(getStationRulesSuccess(response.data));
    } catch (error) { }
  }
}

/** 获取站点列表 */
export const getStationList = () => ({ type: types.GET_STATION_LIST });
export const getStationSuccess = (payload) => ({ type: types.GET_STATION_LIST_SUCCESS, payload });

/** 获取站点详情 */
export const getStationDetails = () => ({ type: types.GET_STATION_DETAILS });
export const getStationDetailsSuccess = (payload) => ({ type: types.GET_STATION_DETAILS_SUCCESS, payload });

/** 获取站点计费规则 */
export const getStationRules = () => ({ type: types.GET_STATION_RULES })
export const getStationRulesSuccess = (payload) => ({ type: types.GET_STATION_RULES_SUCCESS, payload })