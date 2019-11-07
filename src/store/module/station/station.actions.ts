import * as types from './station.types'
import { Dispatch } from 'redux'
import { stationApi } from '@/api/station'


export const getStationListAsync = (params?: stationApi.ListReq) => {

  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        getStationList()
      )
      const response = await stationApi.list(params);
      dispatch(
        getStationSuccess(response.data)
      )

    } catch (error) { }
  }
}

/** 获取站点列表 */
export const getStationList = () => ({ type: types.GET_STATION_LIST })
export const getStationSuccess = (payload) => ({ type: types.GET_STATION_LIST_SUCCESS, payload })