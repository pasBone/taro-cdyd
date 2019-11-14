import gcoord from 'gcoord'
import { getSetting, authorize } from '@tarojs/taro';

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