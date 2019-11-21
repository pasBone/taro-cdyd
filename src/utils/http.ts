import { OPERATE_CODE, Res } from '@/types';
import { OPERATOR_CODE } from '@/constant';
import Taro, { getStorageSync, navigateTo } from '@tarojs/taro';
import Toast from './toast';
import { useDispatch } from '@tarojs/redux';
import { clearUserInfo } from '@/store/module/meb/meb.actions';

const BASE_URL = 'https://wx.succtime.com/wx';
// const BASE_URL = "https://wx.youdaocharge.com/wx"

enum RequestType {
	'请求数据',
	'上传文件'
}

const defaultHeaders: RequestInit['headers'] = {
	'Content-Type': 'application/x-www-form-urlencoded'
};

const genGetHeaderMethods = (type: RequestType) => {
	if (type === RequestType.上传文件) {
		return () => ({
			'Content-Type': 'multipart/form-data'
		});
	}
	return () => {
		let userInfo = getStorageSync('userInfo');
		if (userInfo && userInfo.token) {
			defaultHeaders.token = userInfo.token;
		}
		return { ...defaultHeaders };
	};
};

const throwError = (url: string, response: object): Res<any> => {
	throw {
		url,
		success: false,
		...response
	};
};

const NotToast = (code: OPERATE_CODE) => {
	return [OPERATE_CODE.车主认证未通过_充电中, OPERATE_CODE.车主未认证_充电中, OPERATE_CODE.充电枪未连接, OPERATE_CODE.余额不足请充值].includes(
		code
	);
};

const genReqestMethods = (type: RequestType) => {
	const genHeader = genGetHeaderMethods(type);

	return <Q = void, P = void>(url: string) => {
		return (params?: Q): Promise<Res<P>> => {
			const requestUrl = `${BASE_URL}${url}`;
			return Taro.request({
				url: requestUrl,
				method: 'POST',
				data: {
					...params,
					operator_code: OPERATOR_CODE
				},
				header: genHeader()
			})
				.then((response) => {
					if (response.statusCode === 200) {
						return response.data;
					}
					/** 请求异常 */
					Toast.info('服务异常');
					return throwError(requestUrl, { statusCode: response.statusCode });
				})
				.then((response: Res<P>) => {
					if (response.code === OPERATE_CODE.success) {
						return response;
					}

					if (response.code === OPERATE_CODE.登录信息失效) {
						Toast.info(response.message);
						useDispatch()(clearUserInfo());
						return navigateTo({
							url: '/pages/login/index'
						});
					}

					/** 业务异常 */
					if (NotToast(response.code) === false) {
						Toast.info(response.message);
					}
					return throwError(requestUrl, response);
				})
				.catch((err) => {
					return throwError(requestUrl, err);
				});
		};
	};
};

export const post = genReqestMethods(RequestType.请求数据);
export const uploadFile = genReqestMethods(RequestType.上传文件);
