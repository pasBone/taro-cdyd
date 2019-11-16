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