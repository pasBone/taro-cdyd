import * as types from './order.types'
import { Dispatch } from 'redux'
import { orderApi } from '@/api/order'

/** 获取订单列表 */
export const getOrderListAsync = (params: orderApi.ListReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        getOrderList()
      );
      const response = await orderApi.list(params);
      dispatch(
        getOrderListSuccess(response.data)
      );
    } catch (error) {
      dispatch(
        getOrderListError()
      );
    }
  }
}

export const getOrderList = (() => ({ type: types.GET_ORDER_LIST }));
export const getOrderListError = (() => ({ type: types.GET_ORDER_LIST_ERROR }));
export const getOrderListSuccess = ((payload) => ({ type: types.GET_ORDER_LIST_SUCCESS, payload }));

/** 获取订单详情 */
export const getOrderDetailsAsync = (params: orderApi.DetailReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        getOrderDetails()
      );
      const response = await orderApi.details(params);
      dispatch(
        getOrderDetailsSuccess(response.data)
      );
    } catch (error) {
      dispatch(
        getOrderDetailsError()
      );
    }
  }
}
export const getOrderDetails = (() => ({ type: types.GET_ORDER_DETAILS }));
export const getOrderDetailsError = (() => ({ type: types.GET_ORDER_DETAILS_ERROR }));
export const getOrderDetailsSuccess = ((payload) => ({ type: types.GET_ORDER_DETAILS_SUCCESS, payload }));
