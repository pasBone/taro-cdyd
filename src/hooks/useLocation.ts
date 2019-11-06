import { getLocation } from '@tarojs/taro'
export const useGetLocation = () => {
  return getLocation({ type: 'wgs84' })
}