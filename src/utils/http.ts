import { OPERATE_CODE, Res } from '@/types';
import { OPERATOR_CODE } from '@/constant';
import Taro, { getStorageSync } from '@tarojs/taro';
import Toast from './toast';
import appConfig from './../config';
import { reLogin } from './common';
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

/** 不需要自动提示的code码 */
const NotToast = (code: OPERATE_CODE) => {
	return [OPERATE_CODE.车主认证未通过_充电中, OPERATE_CODE.车主未认证_充电中, OPERATE_CODE.充电枪未连接, OPERATE_CODE.余额不足请充值].includes(
		code
	);
};

const genReqestMethods = (type: RequestType) => {
	const genHeader = genGetHeaderMethods(type);

	return <Q = void, P = void>(url: string) => {
		return (params?: Q): Promise<Res<P>> => {
			const requestUrl = `${appConfig.API_URL}${url}`;
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
					Toast.info({ title: '服务异常', mask: false, icon: 'none' });
					return throwError(requestUrl, { statusCode: response.statusCode });
				})
				.then((response: Res<P>) => {
					if (response.code === OPERATE_CODE.success) {
						return response;
					}

					if (response.code === OPERATE_CODE.登录信息失效) {
						reLogin();
						// Toast.info({ title: '登录信息失效', mask: false, icon: 'none' });
					}

					/** 业务异常 */
					if (NotToast(response.code) === false) {
						Toast.info({ title: '服务异常', mask: false, icon: 'none' });
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
