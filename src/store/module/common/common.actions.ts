
import * as types from './common.types';
import { Dispatch } from 'redux';
import { getLocation, scanCode, navigateTo } from '@tarojs/taro'
import { reAuthorize } from '@/utils/common';
import { wxApiError, WX_API_ERROR } from '@/types';
import Toast from '@/utils/toast';

/** 设置侧边菜单状态 */
export const setSideMenuOpen = () => ({ type: types.SET_SIDE_MENU_OPEN });
export const setSideMenuClose = () => ({ type: types.SET_SIDE_MENU_CLOSE });

/** 设置tabbar选中id */
export const setTabbarId = (payload) => ({ type: types.SET_TAB_BAR_ID, payload });

/** 获取定位
 * @param retry ?用户尝试手动定位时，重新拉起授权
 */
export const getLocationAsync = (retry: boolean = false): any => {
  return (dispatch: Dispatch) => {
    getLocation({
      type: 'gcj02'
    }).then(res => dispatch(
      setLocation(res)
    )).catch(async (res: wxApiError) => {
      // 用户拒绝过授权，则需要重新拉起授权
      if (retry && (res.errMsg === WX_API_ERROR["位置-用户拒绝授权位置信息"] || res.errMsg === WX_API_ERROR["位置-用户关闭该小程序的定位"])) {
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

export const setLocation = ((payload) => ({ type: types.SET_LOCATION, payload }));

/** 电桩扫码 */
export const scanCodeWithPileAsync = () => {
  return async () => {
    try {
      const code = await scanCode();
      navigateTo({
        url: `/pages/pile/details/index?id=${code.result}`
      });
    } catch (err) {
      if (err.errMsg !== WX_API_ERROR["扫码-用户取消扫码"]) {
        Toast.info('请检测二维码是否正确...')
      }
    }
  }
}
