import * as types from './charge.types';
import { Dispatch } from 'redux';
import { chargeApi } from '@/api/charge';
import Toast from '@/utils/toast';
import { OPERATE_CODE } from '@/types';
import { showModal, navigateTo } from '@tarojs/taro';
import { ORDER_STATUS } from '@/constant';

/** 重新发起充电 */
export const reApplyCharge = () => {
  return showModal({
    title: "请检查充电枪连接状态",
    content: "系统检测到充电枪和车辆未连接，请确保两者已有效连接",
    confirmText: "已连接好"
  });
}

/** 检查车主是否认证 */
export const checkCarVerify = (content: string) => {
  return showModal({
    content,
    confirmText: "去认证",
    title: "请完成车主认证",
  });
}

/** 检查钱包余额 */
export const checkWallet = (content: string) => {
  return showModal({
    title: "提示信息",
    content,
    confirmText: "去充值",
  });
}

/** 启动充电 */
export const applyChargeAsync = (params: chargeApi.ApplyChargeReq) => {
  return async (dispatch) => {
    try {
      dispatch(applyCharge());
      const response = await chargeApi.applyCharge(params);
      dispatch(
        getChargeInfoAsync({
          meb_id: params.meb_id
        })
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
            //todo 跳转到钱包充值界面
            console.log('todo 跳转到钱包充值界面');
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

export const applyCharge = () => ({ type: types.APPLY_CHARGE });
export const applyChargeError = () => ({ type: types.APPLY_CHARGE_ERROR });
export const applyChargeSuccess = () => ({ type: types.APPLY_CHARGE_SUCCESS });

/** 获取充电信息 */
export const getChargeInfoAsync = (params: chargeApi.GetChargingInfoReq) => {
  return async (dispatch: Dispatch) => {
    try {

      /** 获取启动充电结果频率 */
      const frequency: number = 3000;
      /** 最大轮询次数 */
      let pollingTimes: number = 20;
      /** 定时器 */
      let timer: any = null;

      dispatch(getChargeInfo({ loading: true }));

      /** 初次查询一次 */
      getChargeInfoPolling();

      async function getChargeInfoPolling() {
        pollingTimes--;
        clearTimeout(timer);
        const resposne = await chargeApi.getChargingInfo(params);
        const data = resposne.data;
        dispatch(
          getChargeInfoSuccess({ ...data, loading: true })
        );

        /** order_status等于 1 || 2 表示启动成功则跳转到实时计费页面 */
        if (data) {
          if ([ORDER_STATUS.正在充电, ORDER_STATUS.暂停中].includes(data.order_status) && timer !== null) {
            dispatch(
              applyChargeSuccess()
            );
            return navigateTo({ url: '/pages/charging/index' });
          }

          /** 启动中则轮询接口至启动成功 */
          if (ORDER_STATUS.启动中 == data.order_status) {
            if (pollingTimes >= 1) {
              timer = setTimeout(() => {
                getChargeInfoPolling();
              }, frequency);
            } else {
              //todo 轮询结束提示失败
              console.log('todo 轮询结束提示失败');
            }
          }
          
        } else {
          if (timer === null) {  //首次查询充电信息且没有充电信息
            dispatch(getChargeInfoError());
          } else {
            //todo 重新启动
            dispatch(applyChargeError());
          }
        }
      }
    } catch (error) {
      dispatch(getChargeInfoError());
    }
  }
}

export const getChargeInfo = (payload) => ({ type: types.GET_CHARGE_INFO, payload });
export const getChargeInfoError = () => ({ type: types.GET_CHARGE_INFO_ERROR });
export const getChargeInfoSuccess = (payload) => ({ type: types.GET_CHARGE_INFO_SUCCESS, payload });
