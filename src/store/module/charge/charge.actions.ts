import * as types from './charge.types';
import { chargeApi } from '@/api/charge';
import Toast from '@/utils/toast';
import { OPERATE_CODE } from '@/types';
import { showModal, navigateTo, switchTab } from '@tarojs/taro';
import { ORDER_STATUS } from '@/constant';
import { loop } from '@/utils/common';

/** modal 按钮颜色 */
const confirmColor = '#f00';
/** 获取充电详情定时器 */
let chargeInfoPollingTimer: any = null;

type IChargeInfoPollingParams = {
  /** 总共轮询次数 */
  pollingTimes: number,
  /** 轮询频率 */
  frequency: number
} & chargeApi.GetChargingInfoReq;

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
    confirmText: "重试",
    confirmColor
  });
}

/** 是否确认结束充电 */
export const confirmStop = () => {
  return showModal({
    title: "请确认是否结束充电",
    content: "确认结束充电后系统将会停止充电， 若需继续冲充电需重新插枪启动充电。启动失败，请重试",
    confirmText: "确认结束",
    confirmColor
  });
}

/** 重试结束充电 */
export const stopRetry = () => {
  return showModal({
    title: "提示",
    content: "结束失败请重试",
    confirmText: "重试",
    confirmColor
  });
}


/** 启动充电 */
export const applyChargeAsync = (params: chargeApi.ApplyChargeReq) => {
  return async (dispatch) => {
    try {
      dispatch(applyCharge());

      /** 启动充电 */
      await chargeApi.applyCharge(params);

      /** 轮询充电信息 */
      dispatch(
        chargeInfoPollingAsync(
          { meb_id: params.meb_id, frequency: 3000, pollingTimes: 30 },
          (data: { stopPolling: Function, payload: chargeApi.GetChargingInfoRes }) => {
            const payload = data.payload;
            if ([ORDER_STATUS.正在充电, ORDER_STATUS.暂停中].includes(payload.order_status)) {
              dispatch(
                applyChargeSuccess()
              );
              data.stopPolling();
              return navigateTo({ url: '/pages/charging/index' });
            }
          },
          () => {
            dispatch(clearChargeInfoPollingTimer());
            dispatch(applyChargeError());
            retry().then((res) => {
              /** 轮询结束提示失败,点击重试 */
              res.confirm && dispatch(
                applyChargeAsync(params)
              );
            })
          }
        )
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

export const chargeInfoPollingAsync = (params: IChargeInfoPollingParams, resolve = loop, reject = loop) => {
  /** 获取启动充电结果频率 */
  const frequency = params.frequency;
  /** 最大轮询次数 */
  let pollingTimes = params.pollingTimes;
  return async (dispatch) => {
    const pollingFn = () => {
      const stopPolling = () => {
        clearTimeout(chargeInfoPollingTimer);
      }
      return dispatch(
        getChargeInfoAsync({
          meb_id: params.meb_id
        })
      ).then(data => {
        if (pollingTimes > 0) {
          chargeInfoPollingTimer = setTimeout(_ => {
            pollingFn();
          }, frequency);
        } else {
          stopPolling();
          return reject();
        }
        pollingTimes--;
        resolve({
          stopPolling,
          payload: data.payload
        });
      });
    }
    return pollingFn();
  }
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

/** 结束充电 */
export const stopChargeAsync = (params: chargeApi.StopChargeReq) => {
  return async (dispatch) => {

    /** 确认结束 */
    confirmStop().then(async (res) => {
      res.confirm && stopChargeFn();
    });

    async function stopChargeFn() {
      try {
        dispatch(clearChargeInfoPollingTimer());
        dispatch(stopCharge());
        const response = await chargeApi.stopCharge(params);
        dispatch(
          chargeInfoPollingAsync(
            { meb_id: params.meb_id, frequency: 3000, pollingTimes: 20 },
            (data: { stopPolling: Function, payload: chargeApi.GetChargingInfoRes }) => {
              if (data.payload !== null) {
                const { order_status } = data.payload;
                if (order_status != ORDER_STATUS.正在充电 && order_status != ORDER_STATUS.暂停中) {
                  data.stopPolling();
                  dispatch(stopChargeSuccess(response.data));
                  switchTab({
                    url: '/pages/home/index'
                  });
                }
              } else {
                data.stopPolling();
                dispatch(stopChargeSuccess(response.data));
                switchTab({
                  url: '/pages/home/index'
                });
              }
            },
            () => {
              dispatch(stopChargeError());
              stopRetry().then(res => {
                if (res.confirm) {
                  stopChargeFn();
                }
              });
            }
          )
        )
      } catch (error) {
        dispatch(stopChargeError());
      }
    }
  }
}

export const stopCharge = () => ({ type: types.STOP_CHARGE });
export const stopChargeError = () => ({ type: types.STOP_CHARGE_ERROR });
export const stopChargeSuccess = (payload) => ({ type: types.STOP_CHARGE_SUCCESS, payload });

/** 清除定时器 */
export const clearChargeInfoPollingTimer = () => {
  clearTimeout(chargeInfoPollingTimer);
  return { type: types.CLEAR_APPLY_CHARGE_TIMER }
}
