import * as types from './order.types'
import { orderApi } from '@/api/order'
import { combineReducers } from 'redux'
import { IAction } from '@/store/types'

/** 订单列表 */
const orderListState: orderApi.ListRes = {
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
/** 订单列表 */
export const orderList = (state = orderListState, actions: IAction<orderApi.ListRes>) => {
  switch (actions.type) {
    case types.GET_ORDER_LIST:
      return { ...state, loading: true }
    case types.GET_ORDER_LIST_SUCCESS:
      if (actions.payload.firstPage) return actions.payload;
      return {
        loading: false,
        error: false,
        list: [...state.list, ...actions.payload.list || []],
        ...actions.payload
      }
    default:
      return { ...state, loading: false }
  }
}

export default combineReducers({
  orderList
});