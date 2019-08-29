import Taro from '@tarojs/taro'
import { Res } from '@/types';


enum RequestType {
    "请求数据",
    "上传文件",
}

const baseUrl = '';
const request = (type: RequestType) => {
    console.log(type);
    return <Q = void, P = void>(url: string) => {
        return (params: Q): Promise<Res<P>> => {
            return Taro.request({
                url: `${baseUrl}${url}`,
                data: params
            }).then()
        }
    }

}

export const post = request(RequestType.请求数据);
