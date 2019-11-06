
import * as types from './common.types';
import { Dispatch } from 'redux';
import { getLocation } from '@tarojs/taro'
import { reAuthorize } from '@/utils/common';
import { wxApiError, WX_API_ERROR } from '@/types';

/** 设置侧边菜单状态 */
export const setSideMenuOpen = () => ({ type: types.SET_SIDE_MENU_OPEN })
export const setSideMenuClose = () => ({ type: types.SET_SIDE_MENU_CLOSE })

/** 获取定位
 * @param retry ?用户尝试手动定位时，重新拉起授权
 */
export const getLocationAsync = (retry: boolean = false): any => {
  return (dispatch: Dispatch) => {
    getLocation().then(res => dispatch(
      setLocation(res)
    )).catch(async (res: wxApiError) => {
      // 用户拒绝过授权，则需要重新拉起授权
      if (retry && res.errMsg === WX_API_ERROR["位置-用户拒绝授权位置信息"]) {
        try {
          await reAuthorize('scope.userLocation');
          dispatch(
            getLocationAsync()
          )
        } catch (error) {
          throw {
            error,
            msg: '重新授权出错'
          }
        }
      }
    })
  }
}

export const setLocation = ((payload) => ({ type: types.SET_LOCATION, payload }))