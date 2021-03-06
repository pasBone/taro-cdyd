import dayjs from "dayjs";
import gcoord from 'gcoord'
import { getSetting, authorize, getSystemInfoSync, navigateTo, showModal } from '@tarojs/taro';

/**
 * @description 适用于小程序内所有需要授权的地方，在用户拒绝授权之后重新要求用户授权
 * @param scope 需要获取权限的 scope，详见微信scope 列表
 * @return Promise<authorize.Promised | undefined>
 */
export const reAuthorize = async (scope: string) => {
  const { authSetting } = await getSetting();
  // 如果没有授权则重新拉去授权
  if (!authSetting[scope]) {
    authorize({ scope })
    return authorize({ scope })
    // 注意此处有坑，如果用户拒绝授权后，短期内调用不会出现弹窗，而是直接进入 fail 回调。如果是开发环境，请点击开发工具左侧 缓存-清除授权数据；如果是手机，请进入小程序后点击右上菜单-关于xx-右上角菜单-设置中进行权限的手动设置，或删除小程序后重新添加
    //https://developers.weixin.qq.com/community/develop/doc/27930d7c4dc9ce8ae75e7005d1ee39aa
  }
}

/**
 * @description 坐标转换https://github.com/hujiulong/gcoord
 * @param coord Array[lng, lat]
 * @param to 要转换的目标坐标系, 默认火星坐标系
 * @param from 需要被转换的坐标系， 默认百度09坐标系
 */
export const gcoordTransform = (coord: Array<number>, to = gcoord.GCJ02, from = gcoord.BD09) => {
  return gcoord.transform(coord, from, to) as Array<number>;
}

export const formatDate = function (ms: number, format: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(ms).format(format)
}

/** 
 *  @description 根据毫秒数计算时长 
 *  @params duration: 毫秒数
 *  @return times: 返回时长 5h39min
*/
export const getDuration = (duration: number, h = 'h', min = 'min ', min2 = 'min ') => {
  duration = duration / 1000;
  let hour = Math.floor(duration / 3600);
  let minutes = Math.floor((duration / 60 % 60));
  let _min = min;
  // let seconds = addZero(Math.floor((duration % 60)));
  let times = '';
  // 如果有“小时” 则使用分，否则使用分钟
  _min = hour > 0 ? min2 : min;
  hour > 0 && (times += hour + h)
  times += minutes + _min
  return times
}

/** 增加前导零 */
export const addZero = function (times: number) {
  return times < 10 ? '0' + times : times;
}

/** 
 *  @description 根据毫秒数计算时长 
 *  @params duration: 毫秒数
 *  @return times: 返回时长 01:12:53
*/
export const getDurationFull = (duration: number) => {
  duration = duration / 1000;
  let hour = addZero(Math.floor(duration / 3600));
  let minutes = addZero(Math.floor((duration / 60 % 60)));
  let seconds = addZero(Math.floor((duration % 60)));
  return `${hour}:${minutes}:${seconds}`
}

/**
 * @descrption px 装换成 rpx, 用于js计算
 * @param px 
 * @return rpx
 */
export const px2rpx = (px: number) => {
  var systemInfo = getSystemInfoSync();
  return px / 750 * systemInfo.windowWidth;
}

/** 空函数 */
export const loop = (params?: any) => { };

/** 设置小程序tabbar选中 */
export const setTabbarSelected = (id: number, vm) => {
  if (typeof vm.$scope.getTabBar === 'function' &&
    vm.$scope.getTabBar()) {
    vm.$scope.getTabBar().$component.setState({
      selected: id,
    });
  }
}

/** 提示重新登录 */
export const reLogin = () => {
  return showModal({
    title: '提示',
    content: '您还没有登录,请先登录',
    confirmText: '立即登录',
    cancelText: '取消'
  }).then((res) => {
    if (res.confirm) {
      return navigateTo({
        url: '/pages/login/index'
      });
    }
    return res;
  });
}