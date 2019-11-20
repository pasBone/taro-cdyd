import * as types from './charge.types';
import { chargeApi } from '@/api/charge';
import Toast from '@/utils/toast';
import { OPERATE_CODE } from '@/types';
import { showModal, navigateTo, switchTab } from '@tarojs/taro';
import { ORDER_STATUS } from '@/constant';
import { IAction } from '@/store/types';

/** modal 按钮颜色 */
const confirmColor = '#f00';
/** 充电定时器 */
let applyChargeTimer: any = null;
/** 重新发起充电 */
export const reApplyCharge = () => {
  return showModal({
    title: "请检查充电枪连接状态",
    content: "系统检测到充电枪和车辆未连接，请确保两者已有效连接",
    confirmText: "已连接好",
    confirmColor
  });
}

/** 检查车主是否认证 */
export const checkCarVerify = (content: string) => {
  return showModal({
    content,
    confirmText: "去认证",
    title: "请完成车主认证",
    confirmColor
  });
}

/** 检查钱包余额 */
export const checkWallet = (content: string) => {
  return showModal({
    title: "提示信息",
    content,
    confirmText: "去充值",
    confirmColor
  });
}

/** 启动失败重试 */
export const retry = () => {
  return showModal({
    title: "提示信息",
    content: "启动失败，请重试",
    confirmText: "重试"
  });
}

/** 启动充电 */
export const applyChargeAsync = (params: chargeApi.ApplyChargeReq) => {
  return async (dispatch) => {
    try {
      dispatch(applyCharge());
      const response = await chargeApi.applyCharge(params);
      dispatch(
        getChargeInfoPolling(dispatch, params)
      );
    } catch (error) {
      if (error.code === OPERATE_CODE.充电枪未连接) {
        reApplyCharge().then((res) => {
          if (res.confirm) {
            dispatch(
              applyChargeAsync(params)
            );
          }
        })
      } else if (error.code === OPERATE_CODE.余额不足请充值) {
        checkWallet(error.message).then((res) => {
          if (res.confirm) {
            switchTab({
              url: '/pages/wallet/index'
            });
          }
        })
      } else if ([OPERATE_CODE.车主未认证_启动充电, OPERATE_CODE.车主认证未通过_启动充电].includes(error.code)) {
        checkCarVerify(error.message).then((res) => {
          if (res.confirm) {
            //todo 跳转到车主认证界面
            console.log('todo 跳转到车主认证界面');
          }
        });
      } else {
        Toast.info(error.message);
      }
      dispatch(applyChargeError());
    }
  }
}

/** 轮询获取充电信息 */
export const getChargeInfoPolling = (dispatch, params) => {
  /** 获取启动充电结果频率 */
  const frequency: number = 3000;
  /** 最大轮询次数 */
  let pollingTimes: number = 20;
  const pollingFn = () => {
    pollingTimes--;
    dispatch(
      getChargeInfoAsync({
        meb_id: params.meb_id
      })
    ).then((data: IAction<chargeApi.GetChargingInfoRes>) => {
      const payload = data.payload;
      if (payload) {
        if ([ORDER_STATUS.正在充电, ORDER_STATUS.暂停中].includes(payload.order_status)) {
          dispatch(
            applyChargeSuccess()
          );
          return navigateTo({ url: '/pages/charging/index' });
        }

        /** 启动中则轮询接口至启动成功 */
        if (ORDER_STATUS.启动中 == payload.order_status) {
          if (pollingTimes >= 1) {
            applyChargeTimer = setTimeout(() => {
              pollingFn();
            }, frequency);
          } else {
            dispatch(applyChargeError());
            retry().then((res) => {
              /** 轮询结束提示失败,点击重试 */
              if (res.confirm) {
                dispatch(
                  applyChargeAsync(params)
                );
              }
            })
          }
        }
      } else {
        //todo 提示启动失败
        dispatch(applyChargeError());
      }
    });
    return { type: types.GET_CHARGE_INFO }
  }
  return pollingFn();
}

export const applyCharge = () => ({ type: types.APPLY_CHARGE });
export const applyChargeError = () => ({ type: types.APPLY_CHARGE_ERROR });
export const applyChargeSuccess = () => ({ type: types.APPLY_CHARGE_SUCCESS });

/** 获取充电信息 */
export const getChargeInfoAsync = (params: chargeApi.GetChargingInfoReq) => {
  return async (dispatch) => {
    try {
      dispatch(getChargeInfo());
      const resposne = await chargeApi.getChargingInfo(params);
      dispatch(
        getChargeInfoSuccess(resposne.data)
      );
      return { type: types.GET_CHARGE_INFO_SUCCESS, payload: resposne.data }
      // return resposne;
    } catch (error) {
      dispatch(getChargeInfoError());
    }
  }
}

export const getChargeInfo = () => ({ type: types.GET_CHARGE_INFO });
export const getChargeInfoError = () => ({ type: types.GET_CHARGE_INFO_ERROR });
export const getChargeInfoSuccess = (payload) => ({ type: types.GET_CHARGE_INFO_SUCCESS, payload });

/** 清除定时器 */
export const clearApplyChargeTimer = () => {
  clearTimeout(applyChargeTimer);
  return { type: types.CLEAR_APPLY_CHARGE_TIMER }
}
